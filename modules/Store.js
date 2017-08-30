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
var Entire_store_1 = require("./Entire_store");
var Store_subscribers = [];
var stores_subscribers = {};
var config_default = { isHMR: false };
var config_ = __assign({}, config_default);
var store_ = (function () {
    function func(store_key, isConfigurable) {
        if (Entire_store_1.exist(store_key)) {
            if (config_['isHMR'] === true)
                console.warn(store_key + " is already exist in store!");
            else
                throw new Error(store_key + " is already exist in store!");
        }
        Object.defineProperty(this, 'state', {
            configurable: isConfigurable,
            get: function () { return Entire_store_1.entire_store()[store_key]; }
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
            value: emitter_1.default.local()
        });
        this.dispatch = this.dispatch.bind(this);
        this.reduce = this.reduce.bind(this);
        this.use = this.use.bind(this);
        this.diduce = this.diduce.bind(this);
        this.subscribe = this.subscribe.bind(this);
    }
    func.prototype.dispatch = function (action, feedback_fn) {
        assure_1.system_.notNull(arguments);
        assure_1.assure_.string(action.type);
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
        var store_key = this.store_key;
        stores_subscribers[store_key] = stores_subscribers[store_key] || [];
        var subscribes = stores_subscribers[store_key];
        subscribes.push(func);
        return {
            dispose: function () {
                assure_1.system_.notNull(arguments);
                var ind = stores_subscribers[store_key].indexOf(func);
                if (ind > -1) {
                    stores_subscribers[store_key] = __spread(stores_subscribers[store_key].slice(0, ind), stores_subscribers[store_key].slice(ind + 1));
                }
            }
        };
    };
    return func;
    function pouch(action) {
        return Object.entries(action).reduce(function (acc, val) {
            return val[0] !== 'type' ? (acc[val[0]] = val[1], acc) : acc;
        }, {});
    }
})();
function createConfigurableStore(name) {
    assure_1.system_.notNull(arguments);
    var store_key = Entire_store_1.get_unique_id(name);
    return new store_(store_key, true);
}
exports.createConfigurableStore = createConfigurableStore;
;
exports.Store = new (function () {
    Object.defineProperty(this, 'state', {
        get: function () {
            return Entire_store_1.entire_store();
        }
    });
    this.config = function (custom_config) {
        assure_1.system_.notNull(arguments);
        if (custom_config !== undefined) {
            config_ = __assign({}, config_, custom_config);
        }
        return __assign({}, config_);
    };
    this.createStore = function (name) {
        assure_1.system_.notNull(arguments);
        var store_key = Entire_store_1.get_unique_id(name);
        return new store_(store_key, false);
    };
    this.clone = function (store, properties) {
        assure_1.system_.notNull(arguments);
        var isConfigurable = Object.getOwnPropertyDescriptor(store, 'state').configurable || false;
        var s = new store_(store.store_key, isConfigurable);
        return Object.assign.apply(Object, __spread([s], (properties || {})));
    };
    this.reset_config = function () {
        assure_1.system_.notNull(arguments);
        config_ = __assign({}, config_default);
    };
    this.subscribe = function (func) {
        assure_1.system_.notNull(arguments);
        Store_subscribers.push(func);
        return {
            dispose: function () {
                assure_1.system_.notNull(arguments);
                var ind = Store_subscribers.indexOf(func);
                if (ind > -1) {
                    Store_subscribers = __spread(Store_subscribers.slice(0, ind), Store_subscribers.slice(ind + 1));
                }
            }
        };
    };
    this.reset_initial = function () {
        assure_1.system_.notNull(arguments);
        Object.entries(Entire_store_1.entire_store_initial()).forEach(function (_a) {
            var _b = __read(_a, 2), key = _b[0], value = _b[1];
            update_state(key, value);
        });
    };
})();
function update_state(store_key, new_state) {
    assure_1.system_.notNull(arguments);
    Entire_store_1.entire_store({
        new_state_of_the_comp: (_a = {}, _a[store_key] = new_state, _a),
        subscribers: Store_subscribers.concat(stores_subscribers[store_key] || [])
    });
    var _a;
}
