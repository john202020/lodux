"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var helper_1 = require("./helper");
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
            console.warn(obj, 'is not JSON safe!');
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