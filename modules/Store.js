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
// import 'core-js/fn/object/entries';
var assure_1 = require("../helpers/assure");
var Store_instance_1 = require("./Store_instance");
var Entire_store_1 = require("./Entire_store");
var proxy_store_1 = require("./proxy_store");
if (!Proxy) {
    console.warn('Proxy not exist in this environment!');
}
var Store_subscribers = [];
var config_default = { isHMR: false };
function get_Store_subscribers() {
    assure_1.assure_deep_.notNull(arguments);
    return __spread(Store_subscribers);
}
exports.get_Store_subscribers = get_Store_subscribers;
exports.Store = Object.freeze({
    createStore: function (name, config) {
        assure_1.assure_deep_.notNull(arguments);
        return proxy_store_1.proxy_store(new Store_instance_1.default(Entire_store_1.get_unique_id(name), __assign({}, config_default, (config !== undefined ? config : {}), { isConfigurable: false })));
    },
    subscribe: function (func) {
        assure_1.assure_deep_.notNull(arguments);
        assure_1.assure_.func(func);
        Store_subscribers = __spread(Store_subscribers, [func]);
        return {
            dispose: function () {
                assure_1.assure_.empty(arguments);
                var ind = Store_subscribers.indexOf(func);
                if (ind > -1) {
                    Store_subscribers = __spread(Store_subscribers.slice(0, ind), Store_subscribers.slice(ind + 1));
                }
            }
        };
    }
});
//# sourceMappingURL=Store.js.map