
import { assure_, assure_deep_ } from "../helpers/assure";
import { reduce_, dispatch_ } from "./Dispatcher";
import emitter_factory from "../helpers/emitter";
import { historyFactory } from "./history";
import { set_store_object, exist } from "./Entire_store";
import { get_Store_subscribers } from "./Store";
import { proxy_store } from "./proxy_store";

//(store_key: string, subscribes: Array)
const stores_subscribers = {};

function store_(store_key: string, config: Object) {

    assure_
        .nonEmptyString(store_key)
        .nonPrimitive(config);

    if (!config['isConfigurable'] && exist(store_key)) {
        if (config['isConfigurable']['isHMR'] === true)
            console.warn(store_key + " is already exist in store!");
        else
            throw new Error(store_key + " is already exist in store!");
    }

    Object.defineProperty(this, 'history', {
        enumerable: false,
        configurable: false,
        writable: false,
        value: historyFactory(store_key)
    });

    Object.defineProperty(this, 'store_key', {
        enumerable: false,
        configurable: false,
        writable: false,
        value: store_key
    });

    Object.defineProperty(this, 'emitter', {
        enumerable: false,
        configurable: false,
        writable: false,
        value: emitter_factory.local()
    });

    this.dispatch = this.dispatch.bind(this);
    this.reduce = this.reduce.bind(this);
    this.use = this.use.bind(this);
    this.clone = this.clone.bind(this);
    this.update = this.update.bind(this);
    this.subscribe = this.subscribe.bind(this);
}


store_.prototype.update = (function () {

    let counter = 0;

    return function (new_state) {
        counter++;

        assure_deep_.notNull(arguments);

        assure_
            .required(new_state);

        assure_deep_
            .isPlainJSONSafe(new_state)
            .notReservedKeywords(['key'], new_state);

        const temp_action_type = "update-default-" + counter;

        let subs;
        try {
            subs =
                this.reduce(temp_action_type,
                    action_ignore => {
                        if (subs) {
                            subs.dispose();
                        }
                        subs = undefined;
                        return new_state;
                    }
                );
        } catch (err) {
            if (subs) {
                subs.dispose();
            }
            subs = undefined;
            throw err;
        }

        dispatch_(this, { ...new_state, type: temp_action_type });
    };
}());


store_.prototype.dispatch = function (action, feedback_fn?: Function) {

    assure_deep_.notNull(arguments);

    assure_
        .required(action)
        .nonEmptyString(action.type);

    assure_deep_
        .isPlainJSONSafe(action);

    if (feedback_fn) {
        assure_.func(feedback_fn);
    }

    if (action.type.startsWith('update')) {
        throw new Error("action type should not start with 'update'. Please use a more descriptive action type.");
    }

    return dispatch_(this, action, feedback_fn);
}


store_.prototype.reduce = function (type: string, callback_fn: Function) {

    assure_deep_.notNull(arguments);

    assure_
        .nonEmptyString(type)
        .func(callback_fn);

    return reduce_(this, update_state_fn, type, callback_fn);

}


store_.prototype.use = function (wares: Array<Function>) {

    assure_deep_.notNull(arguments);

    assure_.array(wares);
    for (let w of wares) {
        assure_.func(w);
    }

    const clone = new store_(this.store_key, { isConfigurable: true, isHMR: false });

    const reversed_wares = wares.reduce((acc: Array<Function>, ware: Function) => {
        return [ware, ...acc];
    }, []);

    clone.dispatch = reversed_wares.reduce((dispatch, ware) => {
        return ware(clone)(dispatch.bind(clone));
    }, clone.dispatch);

    return proxy_store(clone);

}


store_.prototype.clone = function () {

    assure_.empty(arguments);

    const cloned = new store_(this.store_key, { isConfigurable: true, isHMR: false });
    return proxy_store(cloned);
}


store_.prototype.subscribe = function (func: Function) {

    assure_deep_.notNull(arguments);

    assure_.func(func);

    const store_key = this.store_key;

    stores_subscribers[store_key] = [
        ...(stores_subscribers[store_key] || []),
        func
    ];

    return {
        dispose: function () {
            assure_.empty(arguments);

            const ind = stores_subscribers[store_key].indexOf(func);

            if (ind > -1) {
                stores_subscribers[store_key] = [
                    ...stores_subscribers[store_key].slice(0, ind),
                    ...stores_subscribers[store_key].slice(ind + 1)
                ];
            }
        }
    };
}


function update_state_fn(store, new_state) {

    assure_
        .required(store)
        .required(new_state);

    assure_deep_
        .isPlainJSONSafe(new_state)
        .notReservedKeywords(['key'], new_state);

    set_store_object(
        { [store.store_key]: new_state },
        [
            ...get_Store_subscribers(),
            ...(stores_subscribers[store.store_key] || [])
        ]
    );

    store.history.push();
}


export default store_;