

export function throwError(msg: string) {
    throw new Error(msg);
}

export function isPrimitive(value) {
    return typeof value !== "object" || value === null;
}

export const isJSONSafe = (function () {

    return function check(value) {

        const type = typeof value;

        if (type === "function" || type === 'symbol')
            return false;

        if (value instanceof Map || value instanceof Set) {
            return false;
        }

        // JSON.stringify convert NaN to null
        if (Object.is(value, NaN))
            return false;

        // -0 not allow
        if (Object.is(1 / value, -Infinity))
            return false;

        if (type !== 'undefined') {
            const prototype = value.prototype;
            if (
                prototype !== Object.prototype &&
                prototype !== null &&
                prototype !== undefined
            ) {
                return false;
            }
        }

        if (!isPrimitive(value)) {

            if (Object.getOwnPropertySymbols(value).length > 0) {
                return false;
            }

            for (let k in value) {
                if (typeof k !== 'string')
                    return false;
                if (!check(value[k]))
                    return false;
            }
        }

        return true;
    }
}());

export const WHAT_IS_JSON_SAFE =`
1. is simple key,value pair object.  
2. key must be string.  
3. key,value pair do not include Map, Set, Symbol, literal NaN, function, literal NaN, literal -0.

e.g. correct 
    {a:'10'} 
e.g. in correct
    {a: new Map()}
    {a: NaN}    
`;

export function isEqualContent(value1, value2) {

    if (isPrimitive(value1) && isPrimitive(value2)) {
        return value1 === value2 || Object.is(value1, value2);
    }

    return JSON.stringify(value1) === JSON.stringify(value2);

}


export const NOT_FOUND_ERROR = {};


