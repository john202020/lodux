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
var Entire_store_1 = require("./Entire_store");
var helper_1 = require("../helpers/helper");
var proxy_watcher = new WeakSet();
function shouldPass(target, prop) {
    var val = target[prop];
    if (helper_1.isPrimitive(val)) {
        return true;
    }
    var desc = Object.getOwnPropertyDescriptor(target, prop);
    if (desc && !desc.configurable) {
        return true;
    }
    return false;
}
//deep proxy
function proxy_state(store, value) {
    if (helper_1.isPrimitive(value)) {
        return value;
    }
    proxy_watcher.add(value);
    return new Proxy(value, {
        get: function (target, prop) {
            var val = target[prop];
            if (shouldPass(target, prop) || proxy_watcher.has(val)) {
                return val;
            }
            return proxy_state(store, val);
        },
        set: function (target, prop, value) {
            assure_1.assure_deep_.notNull([prop, value]);
            assure_1.assure_.nonEmptyString(prop, 'property must be non empty string!');
            if (prop === 'key') {
                throw new Error("key is reserved keyword. Please use other as object key!");
            }
            assure_1.assure_deep_
                .isPlainJSONSafe(value)
                .notReservedKeywords(['key'], value);
            if (!helper_1.isEqualContent(target[prop], value)) {
                var the_state = Entire_store_1.get_store_object()[store.store_key];
                var acc = bubble_spread(the_state, levels(the_state, target, prop), prop, value);
                store.update(__assign({}, acc, { type: acc.type || 'update-proxy' }));
            }
            return true;
        }
    });
}
exports.proxy_state = proxy_state;
function bubble_spread(the_state, level, prop, value) {
    var acc = bubble_(level, __assign({}, level[level.length - 1], (_a = {}, _a[prop] = value, _a)));
    return __assign({}, the_state, remove_reserve(['key'], acc));
    function bubble_(level, acc) {
        if (level.length < 2) {
            return acc;
        }
        return bubble_(level.slice(0, level.length - 1), __assign({}, level[level.length - 2], (_a = {}, _a[level[level.length - 1]['key']] = acc, _a)));
        var _a;
    }
    function remove_reserve(keys, value) {
        if (helper_1.isPrimitive(value) || Array.isArray(value)) {
            return value;
        }
        return Object.keys(value).reduce(function (acc, k) {
            return keys.includes(k) ? acc : __assign({}, acc, (_a = {}, _a[k] = remove_reserve(keys, value[k]), _a));
            var _a;
        }, {});
    }
    var _a;
}
function levels(the_state, target, prop) {
    return trace(the_state, [], '') || [];
    function trace(obj, track, key) {
        if (helper_1.isPrimitive(obj)) {
            return undefined;
        }
        track.push(__assign({}, obj, { key: key }));
        if ((obj === target)) {
            return track;
        }
        for (var k in obj) {
            var result = trace(obj[k], __spread(track), k);
            if (result)
                return result;
        }
        return undefined;
    }
}
//# sourceMappingURL=proxy_state.js.map