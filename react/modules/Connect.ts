import { assure_, system_ } from "../../helpers/assure";
import { Store, createConfigurableStore } from "../../modules/Store";
import * as Undoable from "./sub_modules/Undoable";

export function connect(theClass, creator_, initial_state?: Object) {

    system_.notNull(arguments);
    assure_.func(theClass).required(creator_);

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

            if (initial_state !== undefined) {
                final_store.setState(initial_state);
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

        const type = new_state.type !== undefined ? new_state.type : 'setState';
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

    const initial_WillMount = pro.componentWillMount || function () { };

    const initial_WillUnmount = pro.componentWillUnmount || function () { };

    const subscriptions: Array<any> = [];

    pro.componentWillMount = function () {
        const component = this;

        unsubscribe(subscriptions);
        subscribe(component, subscriptions, store);

        component.state = component.state || store.state;

        return initial_WillMount.call(component);
    }

    pro.componentWillUnmount = function () {
        const component = this;

        unsubscribe(subscriptions);
        console.log('unmount');

        initial_WillUnmount.call(component);
    };


}

function subscribe(component, subscriptions, store) {
    subscriptions.push(store.subscribe(function () {
        component.setState(store.state);
    }));
}

function unsubscribe(subscriptions) {
    const _subscriptions = subscriptions.slice();
    subscriptions.length = 0;

    _subscriptions.forEach(d => {
       // console.log('dispose', d);
        d ? d.dispose() : undefined
    });
}
