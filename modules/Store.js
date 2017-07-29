"use strict";
var __assign = (this && this.__assign) || Object.assign || function(t) {
    for (var s, i = 1, n = arguments.length; i < n; i++) {
        s = arguments[i];
        for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
            t[p] = s[p];
    }
    return t;
};
var __read = (this && this.__read) || function (o, n) {
    var m = typeof Symbol === "function" && o[Symbol.iterator];
    if (!m) return o;
    var i = m.call(o), r, ar = [], e;
    try {
        while ((n === void 0 || n-- > 0) && !(r = i.next()).done) ar.push(r.value);
    }
    catch (error) { e = { error: error }; }
    finally {
        try {
            if (r && !r.done && (m = i["return"])) m.call(i);
        }
        finally { if (e) throw e.error; }
    }
    return ar;
};
var __spread = (this && this.__spread) || function () {
    for (var ar = [], i = 0; i < arguments.length; i++) ar = ar.concat(__read(arguments[i]));
    return ar;
};
Object.defineProperty(exports, "__esModule", { value: true });
var assure_1 = require("../helpers/assure");
var Dispatcher_1 = require("./Dispatcher");
var emitter_js_1 = require("../helpers/emitter.js");
var Util_js_1 = require("./Util.js");
var Entire_store_js_1 = require("./Entire_store.js");
var Store_subscribers = [];
var stores_subscribers = {};
var store_ = getStoreFunction(emitter_js_1.default.local());
/*
 *
 * const store = Store.createStore('name');
   store.reduce('test', function(action){
        return {...store.state(), top:false, time : action.test.time};
    });
 */
//function 
function createStore(name) {
    if (name === void 0) { name = Util_js_1.get_unique_id(); }
    assure_1.system_.notNull(arguments);
    var store_key = "store[" + name + "]";
    if (Entire_store_js_1.get_store_object()[store_key]) {
        throw new Error(store_key + " duplicated!");
    }
    return new store_(store_key);
}
exports.Store = {
    createStore: createStore,
    clone: function (store, properties) {
        assure_1.system_.notNull(arguments);
        return Object.assign.apply(Object, __spread([new store_(store.name)], (properties || {})));
    },
    subscribe: function (func) {
        assure_1.system_.notNull(arguments);
        Store_subscribers.push(func);
        function dispose() {
            assure_1.system_.notNull(arguments);
            var ind = Store_subscribers.indexOf(func);
            if (ind > -1) {
                Store_subscribers = __spread(Store_subscribers.slice(0, ind), Store_subscribers.slice(ind + 1));
            }
        }
        return {
            dispose: dispose
        };
    },
    state: function () {
        assure_1.system_.notNull(arguments);
        return Entire_store_js_1.get_store_object();
    },
    reset_initial: function () {
        assure_1.system_.notNull(arguments);
        Object.entries(Entire_store_js_1.get_store_object_initial()).forEach(function (_a) {
            var _b = __read(_a, 2), key = _b[0], value = _b[1];
            update_state(key, value);
        });
    }
};
/**
 * The only place to update state
 * @param {*} name
 * @param {*} new_state
 */
function update_state(store_name, new_state) {
    assure_1.system_.notNull(arguments);
    Entire_store_js_1.set_store_object((_a = {}, _a[store_name] = new_state, _a), Store_subscribers.concat(stores_subscribers[store_name] || []));
    var _a;
}
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
        assure_1.system_.notNull(arguments);
        return Entire_store_js_1.get_store_object()[this.name];
    };
    func.prototype.dispatch = function (action, feedback_fn) {
        assure_1.system_.notNull(arguments);
        assure_1.assure_.required(action).string(action.type);
        return Dispatcher_1.dispatch_(this, action, feedback_fn);
    };
    func.prototype.reduce = function (type, callback_fn) {
        assure_1.system_.notNull(arguments);
        return Dispatcher_1.reduce_(this, update_state, type, callback_fn);
    };
    func.prototype.use = function (wares_) {
        assure_1.system_.notNull(arguments);
        var wares = wares_.slice();
        wares.reverse();
        var store_calling = this;
        var clone = exports.Store.clone(store_calling);
        clone.dispatch = wares.reduce(function (dispatch, ware) { return ware(clone)(dispatch.bind(clone)); }, clone.dispatch);
        return clone;
    };
    func.prototype.update = function (state, typename) {
        var _this = this;
        assure_1.system_.notNull(arguments);
        var type = "update" + Util_js_1.unique_prefix + (typename || '') + Util_js_1.get_unique_id();
        this.reduce(type, function (action) { return __assign({}, _this.state(), action); });
        this.dispatch(__assign({}, state, { type: type }));
    };
    func.prototype.subscribe = function (func) {
        assure_1.system_.notNull(arguments);
        stores_subscribers[this.name] = stores_subscribers[this.name] || [];
        var subscribes = stores_subscribers[this.name];
        subscribes.push(func);
        function dispose() {
            assure_1.system_.notNull(arguments);
            var ind = subscribes.indexOf(func);
            if (ind > -1) {
                subscribes[this.name] = __spread(subscribes.slice(0, ind), subscribes.slice(ind + 1));
            }
        }
        return {
            dispose: dispose
        };
    };
    return func;
}
// class storeFunction_class{
//     constructor(store_key) {
//         this.name = store_key;
//         this.state = this.state.bind(this);
//         this.dispatch = this.dispatch.bind(this);
//         this.reduce = this.reduce.bind(this);
//         this.use = this.use.bind(this);
//         this.update = this.update.bind(this);
//         this.subscribe = this.subscribe.bind(this);
//     }
//     name = '';
//     emitter = emitter_factory.local();
//     state() {
//         system_.notNull(arguments);
//         return get_store_object()[this.name];
//     }
//     dispatch(action, feedback_fn?: Function) {
//         system_.notNull(arguments);
//         assure_.required(action).string(action.type);
//         console.log('dispatch', this.name);
//         return dispatch_(this, action, feedback_fn);
//     }
//     reduce(type: string, callback_fn: Function) {
//         system_.notNull(arguments);
//         console.log('reduce', this.name);
//         return reduce_(this, update_state, type, callback_fn);
//     }
//     use(wares_) {
//         system_.notNull(arguments);
//         const wares = wares_.slice();
//         wares.reverse();
//         const store_calling = this;
//         const clone = Object.assign({}, store_calling);
//         clone.dispatch = wares.reduce((dispatch, ware) => { return ware(clone)(dispatch.bind(clone)); }, clone.dispatch);
//         return clone;
//     }
//     update(state, typename?: string) {
//         system_.notNull(arguments);
//         console.log('update', this.name);
//         const type = "update" + unique_prefix + (typename || '') + get_unique_id();
//         this.reduce(type, action => action);
//         this.dispatch({ ...state, ...{ type } });
//     }
//     subscribe(func: Function) {
//         system_.notNull(arguments);
//         stores_subscribers[this.name] = stores_subscribers[this.name] || [];
//         const subscribes = stores_subscribers[this.name];
//         subscribes.push(func);
//         function dispose() {
//             system_.notNull(arguments);
//             const ind = subscribes.indexOf(func);
//             if (ind > -1) {
//                 subscribes[this.name] = [...subscribes.slice(0, ind), ...subscribes.slice(ind + 1)];
//             }
//         }
//         return {
//             dispose
//         };
//     }
// }
