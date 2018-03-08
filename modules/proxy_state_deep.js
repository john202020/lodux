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
function proxy_state_deep(store, value) {
    return psd(store, value);
    function psd(store, value) {
        if (helper_1.isPrimitive(value)) {
            return value;
        }
        return proxy_state_1.proxy_state(store, traverse(value, psd));
    }
    function traverse(value, transformation) {
        if (Array.isArray(value)) {
            return value.map(function (v) { return transformation(store, v); });
        }
        else {
            return Object.keys(value).reduce(function (acc, k) {
                return __assign({}, acc, (_a = {}, _a[k] = transformation(store, value[k]), _a));
                var _a;
            }, {});
        }
    }
}
exports.proxy_state_deep = proxy_state_deep;
function bubble(the_state, target, prop, value) {
    if (typeof target !== 'undefined' && helper_1.isPrimitive(target)) {
        throw new Error("not able to assign to primitive target");
    }
    return __assign({}, the_state, bubble_(the_state, ''));
    function bubble_(state, prop_) {
        if (helper_1.isPrimitive(state)) {
            return undefined;
        }
        //need to optimize
        if (helper_1.isEqualContent(state, target)) {
            return _a = {}, _a[prop] = value, _a;
        }
        if (!helper_1.isPrimitive(state)) {
            for (var k in state) {
                var rr = bubble_(state[k], k);
                if (rr) {
                    return _b = {}, _b[k] = __assign({}, state[k], rr), _b;
                }
            }
        }
        else {
            return state;
        }
        return undefined;
        var _a, _b;
    }
}
exports.bubble = bubble;
//# sourceMappingURL=proxy_state_deep.js.map