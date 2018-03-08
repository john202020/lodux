"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function throwError(msg) {
    throw new Error(msg);
}
exports.throwError = throwError;
function isPrimitive(value) {
    return typeof value !== "object" || value === null;
}
exports.isPrimitive = isPrimitive;
exports.isJSONSafe = (function () {
    return function check(value) {
        var type = typeof value;
        if (type === "function" || type === 'symbol') {
            return false;
        }
        if (value instanceof Map || value instanceof Set) {
            return false;
        }
        // JSON.stringify convert NaN to null
        if (Object.is(value, NaN))
            return false;
        // -0 not allow
        try {
            if (Object.is(1 / value, -Infinity))
                return false;
        }
        catch (err) { }
        if (type === "object") {
            if (!isSimpleObject(value))
                return false;
        }
        if (!isPrimitive(value)) {
            if (Object.getOwnPropertySymbols(value).length > 0) {
                return false;
            }
            for (var k in value) {
                if (typeof k !== 'string' && typeof k !== 'number')
                    return false;
                if (!check(value[k]))
                    return false;
            }
        }
        return true;
    };
}());
exports.WHAT_IS_JSON_SAFE = "\n1. is simple key,value pair object.  \n2. key must be string.  \n3. key,value pair do not include Map, Set, Symbol, literal NaN, function, literal NaN, literal -0.\n\ne.g. correct \n    {a:'10'} \ne.g. in correct\n    {a: new Map()}\n    {a: NaN}    \n";
function isEqualContent(value1, value2) {
    if (isPrimitive(value1) && isPrimitive(value2)) {
        return value1 === value2 || Object.is(value1, value2);
    }
    return JSON.stringify(value1) === JSON.stringify(value2);
}
exports.isEqualContent = isEqualContent;
function isSimpleObject(value) {
    if (typeof value === 'undefined')
        return false;
    if (isPrimitive(value) || Array.isArray(value))
        return true;
    if (typeof value !== 'object')
        return false;
    // for (let k in value) {
    //     const val = value[k];
    //     if (typeof val === 'object') {
    //         if (!isSimpleObject(val)) {
    //             return false;
    //         }
    //     }
    //     if (typeof val !== 'string') {
    //         return false;
    //     }
    // }
    return true;
}
exports.NOT_FOUND_ERROR = {};
//# sourceMappingURL=helper.js.map