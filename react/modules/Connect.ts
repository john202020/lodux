import { assure_, system_ } from "../../helpers/assure";
import { Store, createConfigurableStore } from "../../modules/Store";
import * as Undoable from "./sub_modules/Undoable";

export function connect(theClass, creator_) {
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
            connect_setState_dispatchers(final_store, final_creator);
            connect_setState(final_store, theClass);
            return final_store;
        }
    };
    return binder;
}

function connect_setState_dispatchers(store, creator_) {
    const setState = function (new_state) {
        system_.notNull(arguments);
        if (new_state.type !== undefined) {
            throw new Error("Property 'type' is not allowed!");
        }
        store.diduce({ type: 'setState', ...new_state });
    };
    const dispatchers = creator_(store);
    if (dispatchers !== undefined) {
        for (let key in dispatchers) {
            if (store[key]) {
                throw new Error("'" + key + "' is not allowed as method name of your store.");
            }
        }
        Object.assign(store, dispatchers);
    }
    Object.assign(store, { setState: setState });
    return;
}

function connect_setState(store, theClass) {
    const initial_mount = theClass.prototype.componentDidMount || function () { };
    const initial_unmount = theClass.prototype.componentWillUnmount || function () { };
    let subscriptions: Array<any> = [];
    theClass.prototype.componentDidMount = function () {
        const component = this;
        subscriptions.push(store.subscribe(function () {
            component.setState(store.state);
        }));
        initial_mount.call(component);
    };
    theClass.prototype.componentWillUnmount = function () {
        const component = this;
        subscriptions.slice().forEach(function (subscription) {
            if (subscription) {
                subscription.dispose();
            }
            subscription = undefined;
        });
        subscriptions = [];
        initial_unmount.call(component);
    };
    return;
}
