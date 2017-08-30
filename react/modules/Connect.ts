import { assure_, system_ } from "../../helpers/assure";
import { Store, createConfigurableStore } from "../../modules/Store";
import * as Undoable from "./sub_modules/Undoable";

const hmrstate = (function () {

    let state = undefined;

    return function (store) {

        store.subscribe(() => {
            state = store.state;
        });

        if (state)
            store.setState(state);
    }
}());


export function connect(theClass, creator_, initial_state) {

    system_.notNull(arguments);
    assure_.func(theClass)
    .required(creator_)
    .required(initial_state);

    let hasApplyUndoable = false;
    let hasApplyMiddlewares = false;
    let logs = undefined;
    const binder = {
        applyUndoable: function () {
            system_.notNull(arguments);
            if (hasApplyUndoable) {
                throw new Error("Multiple application not allowed!");
            }
            hasApplyUndoable = true;
            return binder;
        },
        applyMiddleware: function (logs_) {
            system_.notNull(arguments);
            if (hasApplyMiddlewares) {
                throw new Error("Multiple application not allowed!");
            }
            assure_.array(logs_);
            hasApplyMiddlewares = true;
            logs = logs_;
            return binder;
        },
        done: function () {
            system_.notNull(arguments);
            let final_store = createConfigurableStore(theClass.name);
            let final_creator = creator_;

            if (hasApplyMiddlewares && logs) {
                final_store = final_store.use(logs);
            }
            if (hasApplyUndoable) {
                const final = Undoable.applyUndoable(final_store, creator_);
                final_store = final.store;
                final_creator = final.creator;
            }

            connect_custom_methods(final_store, final_creator);
            connect_setState(final_store, theClass);

            final_store.setState(initial_state);

            if (Store.config().isHMR) {
                hmrstate(final_store);
            }

            return final_store;
        }
    };
    return binder;
}

function connect_custom_methods(store, creator_) {

    const setState = function (new_state) {
        system_.notNull(arguments);

        const t = typeof new_state.type;
        if (t !== "undefined" && t !== "string")
            throw new Error("type of new_state can only be string type if provided!");

        const type = new_state.type || 'setState';
        store.diduce({ ...new_state, type });
    };

    const dispatchers = creator_(store);
    if (dispatchers !== undefined) {
        for (let key in dispatchers) {
            if (store[key] !== undefined) {
                throw new Error(`[${key}] duplicates a property of your store! Please choose other method name.`);
            }
        }
        Object.assign(store, dispatchers);
    }

    Object.assign(store, { setState });
    return;
}

function connect_setState(store, theClass) {
    const pro = theClass.prototype;

    const willMount = pro.componentWillMount || function () { };

    const willUnmount = pro.componentWillUnmount || function () { };

    const render = pro.render || function () { };

    const componentWillReceiveProps = pro.componentWillReceiveProps || function () { };

    const shouldComponentUpdate = pro.shouldComponentUpdate || function () { };

    const componentDidUpdate = pro.componentDidUpdate || function () { }

    const subscriptions: Array<any> = [];

    pro.componentDidUpdate = function () {
        const component = this;

        componentDidUpdate.call(component);
    };

    pro.shouldComponentUpdate = function () {
        const component = this;

        return shouldComponentUpdate.call(component) || true;
    };

    pro.componentWillReceiveProps = function () {
        const component = this;

        componentWillReceiveProps.call(component);
    };

    pro.render = function () {
        const component = this;

        unsubscribe();
        subscribe(component, store);

        component.state = component.state || store.state;

        return render.call(component);
    }

    pro.componentWillMount = function () {
        const component = this;
        return willMount.call(component);
    }

    pro.componentWillUnmount = function () {
        const component = this;

        unsubscribe();

        willUnmount.call(component);
    };

    function subscribe(component, store) {
        subscriptions.push(store.subscribe(function () {
            component.setState(store.state);
        }));
    }

    function unsubscribe() {
        const _subscriptions = subscriptions.slice();
        subscriptions.length = 0;

        _subscriptions.forEach(d => {
            // console.log('dispose', d);
            d ? d.dispose() : undefined
        });
    }

}
