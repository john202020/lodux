import 'core-js/fn/object/entries';
import { assure_, system_ } from "../helpers/assure";
import { reduce_, dispatch_ } from "./Dispatcher";
import emitter_factory from "../helpers/emitter";
import { entire_store, entire_store_initial, exist, get_unique_id } from "./Entire_store";
import { proxy } from "./proxy";

let Store_subscribers: Array<Function | undefined> = [];
const stores_subscribers = {};
const config_default = { isHMR: false };
let config_: Object = { ...config_default };


const store_ = (() => {

    function func(store_key: string, isConfigurable: boolean) {

        if (exist(store_key)) {
            if (config_['isHMR'] === true)
                console.warn(store_key + " is already exist in store!");
            else
                throw new Error(store_key + " is already exist in store!");
        }

        Object.defineProperty(this, 'state', {
            configurable: isConfigurable,
            get: function () { return entire_store()[store_key]; }
        });

        Object.defineProperty(this, 'store_key', {
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

        this.dispatch = this.dispatch.bind(this);
        this.reduce = this.reduce.bind(this);
        this.use = this.use.bind(this);
        this.diduce = this.diduce.bind(this);
        this.subscribe = this.subscribe.bind(this);

    }


    func.prototype.proxy = function () { return proxy(this); }


    func.prototype.dispatch = function (action, feedback_fn?: Function) {

        system_.notNull(arguments);

        assure_.string(action.type);

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


    func.prototype.update = (function () {
        let index = 0;
        return function (action) {

            system_.notNull(arguments);

            const type = "update-" + Date.now() + '-' + (index++);

            const subs = this.reduce(type, action_ignore => {
                subs.dispose();
                return { ...action, type: "udpate" };
            });

            this.dispatch({ ...action, type });
        }
    }());


    func.prototype.diduce = (function () {
        let index = 0;

        return function (action) {
            
            console.warn("diduce is deprecated! Please use update() instead.");

            system_.notNull(arguments);
            assure_.string(action.type);

            const type = action.type + (index++);

            const subs = this.reduce(type, action_ignore => {
                subs.dispose();
                return { ...this.state, ...action };
            });

            this.dispatch({ ...action, type });
        }
    }());


    func.prototype.subscribe = function (func: Function) {

        system_.notNull(arguments);

        const store_key = this.store_key;

        stores_subscribers[store_key] = stores_subscribers[store_key] || [];
        const subscribes = stores_subscribers[store_key];

        subscribes.push(func);

        return {
            dispose: function () {

                system_.notNull(arguments);

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


    return func;


    //remove property type
    // function pouch(action) {
    //     return Object.entries(action).reduce((acc, val) => {
    //         return val[0] !== 'type' ? (acc[val[0]] = val[1], acc) : acc;
    //     }, {});
    // }

})();


//this is specifically for react-lodux
export function createConfigurableStore(name: string | undefined) {
    system_.notNull(arguments);
    const store_key = get_unique_id(name);
    return new store_(store_key, true);
};


export const Store = new (function () {

    Object.defineProperty(this, 'state', {
        get: function () {
            return entire_store();
        }
    });

    //only effective before store instance creation
    this.config = function (custom_config?: Object) {
        system_.notNull(arguments);
        if (custom_config !== undefined) {
            config_ = { ...config_, ...custom_config };
        }
        return { ...config_ };
    };


    this.createStore = function (name?: string) {
        system_.notNull(arguments);
        const store_key = get_unique_id(name);
        return new store_(store_key, false);
    };


    this.clone = function (store, properties?) {
        system_.notNull(arguments);
        const isConfigurable = Object.getOwnPropertyDescriptor(store, 'state').configurable || false;
        const s = new store_(store.store_key, isConfigurable);
        return Object.assign(s, ...(properties || {}));
    };



    //only effective before store instance creation
    this.reset_config = function () {
        system_.notNull(arguments);
        config_ = { ...config_default };
    }


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
function update_state(store_key: string, new_state) {

    system_.notNull(arguments);

    entire_store({
        new_state_of_the_comp: { [store_key]: new_state },
        subscribers: Store_subscribers.concat(stores_subscribers[store_key] || [])
    });
}
