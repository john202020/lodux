import 'core-js/fn/object/entries';
import { assure_, system_ } from "../helpers/assure";
import { reduce_, dispatch_ } from "./Dispatcher";
import emitter_factory from "../helpers/emitter";
import { get_unique_id, unique_prefix } from "./Util";
import { entire_store, entire_store_initial } from "./Entire_store";

let Store_subscribers: Array<Function | undefined> = [];
const stores_subscribers = {};
let config_ = { isHMR: false, configurable: false };

const store_ = (() => {

    function func(store_key) {

        Object.defineProperty(this, 'name', {
            enumerable: true,
            configurable: false,
            writable: false,
            value: store_key
        });

        Object.defineProperty(this, 'emitter', {
            enumerable: true,
            configurable: false,
            writable: false,
            value: emitter_factory.local()
        });

        Object.defineProperty(this, 'state', {
            configurable: config_.configurable,
            get: function () { return entire_store()[store_key]; }
        });

        this.dispatch = this.dispatch.bind(this);
        this.reduce = this.reduce.bind(this);
        this.use = this.use.bind(this);
        this.diduce = this.diduce.bind(this);
        this.subscribe = this.subscribe.bind(this);

    }

    func.prototype.dispatch = function (action, feedback_fn?: Function) {

        system_.notNull(arguments);

        assure_.required(action).string(action.type);

        if (action.type === 'update') {
            throw new Error("action type 'update' is reserved. Please use a more specific action type.");
        }

        return dispatch_(this, action, feedback_fn);
    }

    func.prototype.reduce = function (type: string, callback_fn: Function) {

        system_.notNull(arguments);

        return reduce_(this, update_state, type, callback_fn);
    }

    func.prototype.use = function (wares) {

        system_.notNull(arguments);

        const clone = Store.clone(this);

        const reversed_wares = wares
            .reduce((acc, ware) => {
                acc.unshift(ware);
                return acc;
            }, []);

        clone.dispatch = reversed_wares.reduce((dispatch, ware) => {
            return ware(clone)(dispatch.bind(clone));
        }, clone.dispatch);

        return clone;
    }

    func.prototype.diduce = function (action) {

        system_.notNull(arguments);
        assure_.string(action.type);

        const subs = this.reduce(action.type, action => {
            subs.dispose();
            const new_state = pouch(action);
            return { ...this.state, ...new_state };
        });

        this.dispatch(action);
    }

    func.prototype.subscribe = function (func: Function) {

        system_.notNull(arguments);

        stores_subscribers[this.name] = stores_subscribers[this.name] || [];
        const subscribes = stores_subscribers[this.name];

        subscribes.push(func);

        return {
            dispose: function () {

                system_.notNull(arguments);

                const ind = subscribes.indexOf(func);
                if (ind > -1) {
                    subscribes[this.name] = [...subscribes.slice(0, ind), ...subscribes.slice(ind + 1)];
                }
            }
        };
    }

    return func;

    //remove type
    function pouch(action) {
        return Object.entries(action).reduce((acc, val) => {
            return val[0] !== 'type' ? (acc[val[0]] = val[1], acc) : acc;
        }, {});
    }

})();


function exist(name: string) {
    system_.notNull(arguments);
    return entire_store()[name] !== undefined;
}

export const Store = new (function () {

    Object.defineProperty(this, 'state', {
        get: function () {
            return entire_store();
        }
    });

    this.createStore = function (name: string | undefined) {

        system_.notNull(arguments);

        const store_key = name || get_unique_id();

        if (exist(store_key)) {
            if (config_['isHMR'] === true)
                console.warn(name + " is already exist in store!");
            else
                throw new Error(name + " is already exist in store!");
        }

        return new store_(store_key);

    };

    this.clone = function (store, properties?) {
        system_.notNull(arguments);
        return Object.assign(new store_(store.name), ...(properties || {}));
    };

    this.config = function (custom_config) {
        system_.notNull(arguments);
        config_ = { ...config_, ...custom_config };
    };

    this.subscribe = function (func: Function) {

        system_.notNull(arguments);

        Store_subscribers.push(func);

        return {
            dispose: function () {

                system_.notNull(arguments);

                const ind = Store_subscribers.indexOf(func);
                if (ind > -1) {
                    Store_subscribers = [...Store_subscribers.slice(0, ind), ...Store_subscribers.slice(ind + 1)];
                }
            }
        };
    };

    this.reset_initial = function () {

        system_.notNull(arguments);

        Object.entries(entire_store_initial()).forEach(([key, value]) => {
            update_state(key, value);
        });

    };
})();



/**
 * The only place to update state
 * @param {*} name 
 * @param {*} new_state 
 */
function update_state(store_name: string, new_state) {

    system_.notNull(arguments);

    entire_store({
        new_state_of_the_comp: { [store_name]: new_state },
        subscribers: Store_subscribers.concat(stores_subscribers[store_name] || [])
    });
}
