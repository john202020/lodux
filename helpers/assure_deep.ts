import { isPrimitive, isJSONSafe, WHAT_IS_JSON_SAFE, throwError } from "./helper";

export const assure_deep_ = Object.freeze({
    notNull(args, errormsg?: string) {

        if (args === undefined) {
            throwError("Not able to determine lamda express!");
        }

        deep_check(
            args,
            obj => obj === null,
            errormsg || "null is not allowed"
        );

        return assure_deep_;
    },
    notSymbolProperty(obj, errormsg?: string) {

        deep_check(
            obj,
            obj => !isPrimitive(obj) && Object.getOwnPropertySymbols(obj).length > 0,
            errormsg || 'Symbol property is not allowed. JSON.stringify not compatible.'
        );

        return assure_deep_;
    },
    notSymbol(obj, errormsg?: string) {

        deep_check(
            obj,
            obj => typeof obj === 'symbol',
            errormsg || 'Symbol is not allowed'
        );

        return assure_deep_;
    },
    notReservedKeywords(reservedKeys, args, errormsg?: string) {

        deep_check(
            args,
            obj => {
                if (reservedKeys.includes(obj))
                    return true;
                return !isPrimitive(obj) && Object.keys(obj)
                    .filter(k => reservedKeys.includes(k)).length > 0
            },
            errormsg || `reserved words (${reservedKeys}) are not allowed as key!`
        );

        return assure_deep_;
    },
    notNaN(args, errormsg?: string) {
        deep_check(
            args,
            // not using isNaN(obj) here!
            // not using NaN === obj
            obj => Object.is(NaN, obj),
            errormsg || `NaN is not allowed!`
        );

        return assure_deep_;
    },
    notFunction(args, errormsg?: string) {
        deep_check(
            args,
            obj => typeof obj === "function",
            errormsg || `function is not allowed!`
        );

        return assure_deep_;
    },
    isPlainJSONSafe(obj, errormsg?: string) {

        if (!isJSONSafe(obj)) {
            console.warn(obj, 'is not JSON safe!');

            if (errormsg)
                throw new Error(errormsg);
            else
                throw new Error(`non JSON safe is not allowed. ${WHAT_IS_JSON_SAFE}`);
        }
        return assure_deep_;
    }
});

function deep_check(obj, falsyLamda: Function, errormsg: string) {

    if (falsyLamda(obj)) {
        throwError(errormsg);
    }

    if (isPrimitive(obj)) {
        return;
    }

    for (let key in obj) {
        deep_check(obj[key], falsyLamda, errormsg);
    }
}
