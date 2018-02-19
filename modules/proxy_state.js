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
//deep proxy
function proxy_state(store, value) {
    assure_1.assure_deep_.notNull(arguments);
    assure_1.assure_.required(store);
    if (helper_1.isPrimitive(value)) {
        return value;
    }
    return new Proxy(value, {
        get: function (target, prop) {
            var value = target[prop];
            return value;
            // if (isPrimitive(value)) {
            //   return value;
            // }
            // const desc = Object.getOwnPropertyDescriptor(target, prop);
            // if (desc && !desc.configurable) {
            //   return value;
            // }
            // return proxy_state(store, value);
        },
        set: function (target, prop, value) {
            assure_1.assure_deep_
                .notNull([target, prop, value]);
            assure_1.assure_
                .nonEmptyString(prop, 'property must be non empty string!');
            assure_1.assure_deep_
                .isPlainJSONSafe(value)
                .notReservedKeywords(['key'], [prop, value]);
            if (!helper_1.isEqualContent(target[prop], value)) {
                var level = levels(Entire_store_1.get_store_object()[store.store_key], target, prop);
                if (level)
                    console.log('level.length', level.length);
                console.log(prop);
                if (level && level.length > 1)
                    throw new Error("deep assignment is not allowed");
                var acc = remove_reserve(['key'], bubble_object_spread(level || [], prop, deep_(store, value)));
                store.update(__assign({}, Entire_store_1.get_store_object()[store.store_key], acc, { type: acc.type || 'update-proxy' }));
            }
            return true;
        }
    });
}
exports.proxy_state = proxy_state;
function remove_reserve(keys, value) {
    if (helper_1.isPrimitive(value) || Array.isArray(value)) {
        return value;
    }
    return Object.keys(value).reduce(function (acc, k) {
        return keys.includes(k) ? acc : __assign({}, acc, (_a = {}, _a[k] = remove_reserve(keys, value[k]), _a));
        var _a;
    }, {});
}
function bubble_object_spread(level, prop, value) {
    return bubble_(level, __assign({}, level[level.length - 1], (_a = {}, _a[prop] = value, _a)));
    function bubble_(level, acc) {
        if (level.length < 2) {
            return Array.isArray(acc) ? __spread(acc) : __assign({}, acc);
        }
        level = __spread(level);
        var key = level.pop()['key'];
        return bubble_(level, __assign({}, level[level.length - 1], (_a = {}, _a[key] = acc, _a)));
        var _a;
    }
    var _a;
}
function levels(the_state, target, prop) {
    return trace(the_state, [], '');
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
function deep_(store, value) {
    if (helper_1.isPrimitive(value))
        return value;
    if (Array.isArray(value)) {
        return proxy_state(store, Object.keys(value).reduce(function (acc, k) {
            return __spread(acc, [deep_(store, value[k])]);
        }, []));
    }
    return proxy_state(store, Object.keys(value).reduce(function (acc, k) {
        return (__assign({}, acc, (_a = {}, _a[k] = deep_(store, value[k]), _a)));
        var _a;
    }, {}));
}
//# sourceMappingURL=proxy_state.js.map