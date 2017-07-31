
import { assure_, system_ } from "../helpers/assure";
import { reduce_, dispatch_ } from "./Dispatcher";
import emitter_factory from "../helpers/emitter.js";
import { get_unique_id, unique_prefix, get_without_type } from "./Util.js";
import { get_store_object, get_store_object_initial, set_store_object } from "./Entire_store.js";

let Store_subscribers: Array<Function | undefined> = [];
const stores_subscribers = {};


const store_ = getStoreFunction(emitter_factory.local());

function getStoreFunction(emitter) {

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
            value: emitter
        });

        this.state = this.state.bind(this);
        this.dispatch = this.dispatch.bind(this);
        this.reduce = this.reduce.bind(this);
        this.use = this.use.bind(this);
        this.update = this.update.bind(this);
        this.subscribe = this.subscribe.bind(this);

    }

    func.prototype.state = function () {

        system_.notNull(arguments);

        return get_store_object()[this.name];
    }

    func.prototype.dispatch = function (action, feedback_fn?: Function) {

        system_.notNull(arguments);

        assure_.required(action).string(action.type);

        return dispatch_(this, action, feedback_fn);
    }

    func.prototype.reduce = function (type: string, callback_fn: Function) {

        system_.notNull(arguments);

        return reduce_(this, update_state, type, callback_fn);
    }

    func.prototype.use = function (wares) {

        system_.notNull(arguments);

        const clone = Store.clone(this);

        clone.dispatch
            = wares
                .reduce((acc, ware) => {
                    acc.unshift(ware); return acc;
                }, [])
                .reduce((dispatch, ware) => {
                    return ware(clone)(dispatch.bind(clone));
                }, clone.dispatch);

        return clone;
    }

    func.prototype.update = function (state, typename?: string) {

        system_.notNull(arguments);

        const type = "update" + unique_prefix + (typename || '') + get_unique_id();
        this.reduce(type, action => { return { ...this.state(), ...action } });
        this.dispatch({ ...state, ...{ type } });
    }

    func.prototype.subscribe = function (func: Function) {

        system_.notNull(arguments);

        stores_subscribers[this.name] = stores_subscribers[this.name] || [];
        const subscribes = stores_subscribers[this.name];

        subscribes.push(func);

        function dispose() {

            system_.notNull(arguments);

            const ind = subscribes.indexOf(func);
            if (ind > -1) {
                subscribes[this.name] = [...subscribes.slice(0, ind), ...subscribes.slice(ind + 1)];
            }
        }

        return {
            dispose
        };
    }

    return func;
}


/*
 *  
 * const store = Store.createStore('name');
   store.reduce('test', function(action){        
        return {...store.state(), top:false, time : action.test.time};
    });
 */
//function 
function createStore(name: string = get_unique_id()) {

    system_.notNull(arguments);

    const store_key = `store[${name}]`;

    if (get_store_object()[store_key]) {
        throw new Error(store_key + " duplicated!");
    }


    return new store_(store_key);

}


export const Store = {

    createStore,

    clone: function (store, properties?) {

        system_.notNull(arguments);

        return Object.assign(new store_(store.name), ...(properties || {}));

    },

    subscribe: function (func: Function) {

        system_.notNull(arguments);

        Store_subscribers.push(func);

        function dispose() {

            system_.notNull(arguments);

            const ind = Store_subscribers.indexOf(func);
            if (ind > -1) {
                Store_subscribers = [...Store_subscribers.slice(0, ind), ...Store_subscribers.slice(ind + 1)];
            }
        }

        return {
            dispose
        };
    },

    state: function () {

        system_.notNull(arguments);

        return get_store_object();
    },

    reset_initial: function () {

        system_.notNull(arguments);

        Object.entries(get_store_object_initial()).forEach(([key, value]) => {
            update_state(key, value);
        });
    }
};



/**
 * The only place to update state
 * @param {*} name 
 * @param {*} new_state 
 */
function update_state(store_name: string, new_state) {

    system_.notNull(arguments);

    set_store_object({ [store_name]: new_state }, Store_subscribers.concat(stores_subscribers[store_name] || []));
}

