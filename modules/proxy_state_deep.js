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
    var _loop_1 = function (k) {
        var rr = bubble_(state[k], target, prop, value);
        if (rr) {
            if (Array.isArray(state[k])) {
                var keyof_rr = Object.keys(rr)[0];
                if (state[k][keyof_rr]) {
                    return { value: (_a = {},
                            _a[k] = state[k].map(function (s, i) { return rr[i] || s; }),
                            _a) };
                }
                return { value: (_b = {},
                        _b[k] = __spread(state[k], [rr[keyof_rr]]),
                        _b) };
            }
            return { value: (_c = {},
                    _c[k] = __assign({}, state[k], rr),
                    _c) };
        }
        var _a, _b, _c;
    };
    for (var k in state) {
        var state_1 = _loop_1(k);
        if (typeof state_1 === "object")
            return state_1.value;
    }
    return undefined;
    var _a;
}
//# sourceMappingURL=proxy_state_deep.js.map