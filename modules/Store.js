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
require("core-js/fn/object/entries");
var assure_1 = require("../helpers/assure");
var Dispatcher_1 = require("./Dispatcher");
var emitter_1 = require("../helpers/emitter");
var Util_1 = require("./Util");
var Entire_store_1 = require("./Entire_store");
var Store_subscribers = [];
var stores_subscribers = {};
var config_ = { isHMR: false };
var store_ = (function () {
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
            value: emitter_1.default.local()
        });
        Object.defineProperty(this, 'state', {
            configurable: true,
            get: function () { return Entire_store_1.get_store_object()[store_key]; }
        });
        this.dispatch = this.dispatch.bind(this);
        this.reduce = this.reduce.bind(this);
        this.use = this.use.bind(this);
        this.diduce = this.diduce.bind(this);
        this.subscribe = this.subscribe.bind(this);
    }
    func.prototype.dispatch = function (action, feedback_fn) {
        assure_1.system_.notNull(arguments);
        assure_1.assure_.required(action).string(action.type);
        if (action.type === 'update') {
            throw new Error("action type 'update' is reserved. Please use a more specific action type.");
        }
        return Dispatcher_1.dispatch_(this, action, feedback_fn);
    };
    func.prototype.reduce = function (type, callback_fn) {
        assure_1.system_.notNull(arguments);
        return Dispatcher_1.reduce_(this, update_state, type, callback_fn);
    };
    func.prototype.use = function (wares) {
        assure_1.system_.notNull(arguments);
        var clone = exports.Store.clone(this);
        var reversed_wares = wares
            .reduce(function (acc, ware) {
            acc.unshift(ware);
            return acc;
        }, []);
        clone.dispatch = reversed_wares.reduce(function (dispatch, ware) {
            return ware(clone)(dispatch.bind(clone));
        }, clone.dispatch);
        return clone;
    };
    func.prototype.diduce = function (action) {
        var _this = this;
        assure_1.system_.notNull(arguments);
        assure_1.assure_.string(action.type);
        var subs = this.reduce(action.type, function (action) {
            subs.dispose();
            var new_state = pouch(action);
            return __assign({}, _this.state, new_state);
        });
        this.dispatch(action);
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
    //remove type
    function pouch(action) {
        return Object.entries(action).reduce(function (acc, val) {
            return val[0] !== 'type' ? (acc[val[0]] = val[1], acc) : acc;
        }, {});
    }
})();
function exist(name) {
    assure_1.system_.notNull(arguments);
    return Entire_store_1.get_store_object()[name] !== undefined;
}
exports.Store = (function () {
    function Store_() {
        Object.defineProperty(this, 'state', {
            get: function () {
                return Entire_store_1.get_store_object();
            }
        });
        /*
         *
         * const store = Store.createStore('name');
           store.reduce('test', function(action){
                return {...store.state, top:false, time : action.test.time};
            });
         */
        //function 
        this.createStore = function (name) {
            assure_1.system_.notNull(arguments);
            var store_key = name || Util_1.get_unique_id();
            if (exist(store_key)) {
                if (config_['isHMR'] === true)
                    console.warn(name + " is already exist in store!");
                else
                    throw new Error(name + " is already exist in store!");
            }
            return new store_(store_key);
        };
        this.clone = function (store, properties) {
            assure_1.system_.notNull(arguments);
            return Object.assign.apply(Object, __spread([new store_(store.name)], (properties || {})));
        };
        this.config = function (custom_config) {
            config_ = __assign({}, config_, custom_config);
        };
        // this.exist = exist;
        this.subscribe = function (func) {
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
        };
        this.reset_initial = function () {
            assure_1.system_.notNull(arguments);
            Object.entries(Entire_store_1.get_store_object_initial()).forEach(function (_a) {
                var _b = __read(_a, 2), key = _b[0], value = _b[1];
                update_state(key, value);
            });
        };
    }
    ;
    return new Store_();
}());
/**
 * The only place to update state
 * @param {*} name
 * @param {*} new_state
 */
function update_state(store_name, new_state) {
    assure_1.system_.notNull(arguments);
    Entire_store_1.set_store_object((_a = {}, _a[store_name] = new_state, _a), Store_subscribers.concat(stores_subscribers[store_name] || []));
    var _a;
}
