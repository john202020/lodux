"use strict";
var __assign = (this && this.__assign) || Object.assign || function(t) {
    for (var s, i = 1, n = arguments.length; i < n; i++) {
        s = arguments[i];
        for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
            t[p] = s[p];
    }
    return t;
};
var __values = (this && this.__values) || function (o) {
    var m = typeof Symbol === "function" && o[Symbol.iterator], i = 0;
    if (m) return m.call(o);
    return {
        next: function () {
            if (o && i >= o.length) o = void 0;
            return { value: o && o[i++], done: !o };
        }
    };
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
var emitter_1 = require("../helpers/emitter");
var history_1 = require("./history");
var Entire_store_1 = require("./Entire_store");
var Store_1 = require("./Store");
var proxy_store_1 = require("./proxy_store");
//(store_key: string, subscribes: Array)
var stores_subscribers = {};
function store_(store_key, config) {
    assure_1.assure_
        .nonEmptyString(store_key)
        .nonPrimitive(config);
    if (!config['isConfigurable'] && Entire_store_1.exist(store_key)) {
        if (config['isConfigurable']['isHMR'] === true)
            console.warn(store_key + " is already exist in store!");
        else
            throw new Error(store_key + " is already exist in store!");
    }
    Object.defineProperty(this, 'history', {
        enumerable: false,
        configurable: false,
        writable: false,
        value: history_1.historyFactory(store_key)
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
        value: emitter_1.default.local()
    });
    this.dispatch = this.dispatch.bind(this);
    this.reduce = this.reduce.bind(this);
    this.use = this.use.bind(this);
    this.clone = this.clone.bind(this);
    this.update = this.update.bind(this);
    this.subscribe = this.subscribe.bind(this);
}
store_.prototype.update = (function () {
    var counter = 0;
    return function (new_state) {
        counter++;
        assure_1.assure_deep_.notNull(arguments);
        assure_1.assure_
            .required(new_state);
        assure_1.assure_deep_
            .isPlainJSONSafe(new_state)
            .notReservedKeywords(['key'], new_state);
        var temp_action_type = "update-default-" + counter;
        var subs;
        try {
            subs =
                this.reduce(temp_action_type, function (action_ignore) {
                    if (subs) {
                        subs.dispose();
                    }
                    subs = undefined;
                    var type = new_state.type || '';
                    type = !type.startsWith("update-default-") ? type : temp_action_type;
                    return __assign({}, new_state, { type: type });
                });
        }
        catch (err) {
            if (subs) {
                subs.dispose();
            }
            subs = undefined;
            throw err;
        }
        Dispatcher_1.dispatch_(this, __assign({}, new_state, { type: temp_action_type }));
    };
}());
store_.prototype.dispatch = function (action, feedback_fn) {
    assure_1.assure_deep_.notNull(arguments);
    assure_1.assure_
        .required(action)
        .nonEmptyString(action.type);
    if (feedback_fn) {
        assure_1.assure_.func(feedback_fn);
    }
    if (action.type.startsWith('update')) {
        throw new Error("action type should not start with 'update'. Please use a more descriptive action type.");
    }
    return Dispatcher_1.dispatch_(this, action, feedback_fn);
};
store_.prototype.reduce = function (type, callback_fn) {
    assure_1.assure_deep_.notNull(arguments);
    assure_1.assure_
        .nonEmptyString(type)
        .func(callback_fn);
    return Dispatcher_1.reduce_(this, update_state_fn, type, callback_fn);
};
store_.prototype.use = function (wares) {
    assure_1.assure_deep_.notNull(arguments);
    assure_1.assure_.array(wares);
    try {
        for (var wares_1 = __values(wares), wares_1_1 = wares_1.next(); !wares_1_1.done; wares_1_1 = wares_1.next()) {
            var w = wares_1_1.value;
            assure_1.assure_.func(w);
        }
    }
    catch (e_1_1) { e_1 = { error: e_1_1 }; }
    finally {
        try {
            if (wares_1_1 && !wares_1_1.done && (_a = wares_1.return)) _a.call(wares_1);
        }
        finally { if (e_1) throw e_1.error; }
    }
    var clone = new store_(this.store_key, { isConfigurable: true, isHMR: false });
    var reversed_wares = wares.reduce(function (acc, ware) {
        return __spread([ware], acc);
    }, []);
    clone.dispatch = reversed_wares.reduce(function (dispatch, ware) {
        return ware(clone)(dispatch.bind(clone));
    }, clone.dispatch);
    return proxy_store_1.proxy_store(clone);
    var e_1, _a;
};
store_.prototype.clone = function () {
    assure_1.assure_.empty(arguments);
    var cloned = new store_(this.store_key, { isConfigurable: true, isHMR: false });
    return proxy_store_1.proxy_store(cloned);
};
store_.prototype.subscribe = function (func) {
    assure_1.assure_deep_.notNull(arguments);
    assure_1.assure_.func(func);
    var store_key = this.store_key;
    stores_subscribers[store_key] = __spread((stores_subscribers[store_key] || []), [
        func
    ]);
    return {
        dispose: function () {
            assure_1.assure_.empty(arguments);
            var ind = stores_subscribers[store_key].indexOf(func);
            if (ind > -1) {
                stores_subscribers[store_key] = __spread(stores_subscribers[store_key].slice(0, ind), stores_subscribers[store_key].slice(ind + 1));
            }
        }
    };
};
function update_state_fn(store, new_state) {
    assure_1.assure_deep_
        .notNull(arguments);
    assure_1.assure_
        .required(store).
        required(new_state);
    Entire_store_1.set_store_object((_a = {}, _a[store.store_key] = new_state, _a), __spread(Store_1.get_Store_subscribers(), (stores_subscribers[store.store_key] || [])));
    store.history.push();
    var _a;
}
exports.default = store_;
//# sourceMappingURL=Store_instance.js.map