"use strict";
var __assign = (this && this.__assign) || Object.assign || function(t) {
    for (var s, i = 1, n = arguments.length; i < n; i++) {
        s = arguments[i];
        for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
            t[p] = s[p];
    }
    return t;
};
Object.defineProperty(exports, "__esModule", { value: true });
var helper_1 = require("../helpers/helper");
var proxy_state_1 = require("./proxy_state");
exports.proxies_watcher = new WeakMap();
function proxy_state_deep(store, value) {
    if (helper_1.isPrimitive(value)) {
        return value;
    }
    return proxy_state_1.proxy_state(store, Array.isArray(value) ?
        value.map(function (v) { return proxy_state_deep(store, v); }) :
        Object.keys(value).reduce(function (acc, k) {
            return __assign({}, acc, (_a = {}, _a[k] = proxy_state_deep(store, value[k]), _a));
            var _a;
        }, {}));
}
exports.proxy_state_deep = proxy_state_deep;
function bubble(the_state, target, prop, value) {
    return __assign({}, the_state, bubble_(the_state, target, prop, value));
}
exports.bubble = bubble;
function bubble_(state, target, prop, value) {
    if (helper_1.isPrimitive(state)) {
        return undefined;
    }
    if (exports.proxies_watcher.get(state) === target) {
        return _a = {}, _a[prop] = value, _a;
    }
    for (var k in state) {
        var rr = bubble_(state[k], target, prop, value);
        if (rr) {
            return _b = {}, _b[k] = __assign({}, state[k], rr), _b;
        }
    }
    return undefined;
    var _a, _b;
}
//# sourceMappingURL=proxy_state_deep.js.map