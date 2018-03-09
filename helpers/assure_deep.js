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
var helper_1 = require("./helper");
var SYSTEM_reservedKeys = Object.freeze(['it', 'key']);
exports.assure_deep_ = Object.freeze({
    notNull: function (args, errormsg) {
        if (args === undefined) {
            helper_1.throwError("Not able to determine lamda express!");
        }
        deep_check(args, function (obj) { return obj === null; }, errormsg || "null is not allowed");
        return exports.assure_deep_;
    },
    notSymbolProperty: function (obj, errormsg) {
        deep_check(obj, function (obj) { return !helper_1.isPrimitive(obj) && Object.getOwnPropertySymbols(obj).length > 0; }, errormsg || 'Symbol property is not allowed. JSON.stringify not compatible.');
        return exports.assure_deep_;
    },
    notSymbol: function (obj, errormsg) {
        deep_check(obj, function (obj) { return typeof obj === 'symbol'; }, errormsg || 'Symbol is not allowed');
        return exports.assure_deep_;
    },
    notReservedKeywords: function (reservedKeys, args, errormsg) {
        reservedKeys = mergeArrayAndOverride_shallow(reservedKeys, SYSTEM_reservedKeys);
        function mergeArrayAndOverride_shallow(arr1, arr2) {
            var obj1 = arr1.reduce(function (acc, a) {
                return (__assign({}, acc, (_a = {}, _a[a] = a, _a)));
                var _a;
            }, {});
            var obj2 = arr2.reduce(function (acc, a) {
                return (__assign({}, acc, (_a = {}, _a[a] = a, _a)));
                var _a;
            }, {});
            var obj = __assign({}, obj1, obj2);
            return Object.keys(obj).reduce(function (acc, k) { return __spread(acc, [obj[k]]); }, []);
        }
        deep_check(args, function (obj) {
            if (reservedKeys.includes(obj))
                return true;
            return !helper_1.isPrimitive(obj) && Object.keys(obj)
                .filter(function (k) { return reservedKeys.includes(k); }).length > 0;
        }, errormsg || "reserved words (" + reservedKeys + ") are not allowed as key!");
        return exports.assure_deep_;
    },
    notNaN: function (args, errormsg) {
        deep_check(args, 
        // not using isNaN(obj) here!
        // not using NaN === obj
        function (obj) { return Object.is(NaN, obj); }, errormsg || "NaN is not allowed!");
        return exports.assure_deep_;
    },
    notFunction: function (args, errormsg) {
        deep_check(args, function (obj) { return typeof obj === "function"; }, errormsg || "function is not allowed!");
        return exports.assure_deep_;
    },
    isPlainJSONSafe: function (obj, errormsg) {
        if (!helper_1.isJSONSafe(obj)) {
            // console.warn(obj, 'is not JSON safe!');
            if (errormsg)
                throw new Error(errormsg);
            else
                throw new Error("non JSON safe is not allowed. " + helper_1.WHAT_IS_JSON_SAFE);
        }
        return exports.assure_deep_;
    }
});
function deep_check(obj, falsyLamda, errormsg) {
    if (falsyLamda(obj)) {
        helper_1.throwError(errormsg);
    }
    if (helper_1.isPrimitive(obj)) {
        return;
    }
    for (var key in obj) {
        deep_check(obj[key], falsyLamda, errormsg);
    }
}
//# sourceMappingURL=assure_deep.js.map