import { isPrimitive, throwError } from "./helper";
import { assure_deep_ } from "./assure_deep";

const assure_ = Object.freeze({
    compatible() {
        if (arguments.length > 0) {
            throwError("does not accept any argument!");
        }

        const root = (0, eval)('this');
        const compatible = !!root['Proxy'] && !!root["WeakSet"] && !!root['Object']['is'];

        if (!compatible) {
            throw new Error("'Proxy', 'Object.is', or 'WeakSet' isare not supported. Please check whether your system support es2015!")
        }
    },
    empty(argu){
        if (argu.length > 0) {
            throwError("does not accept any argument!");
        }
    },
    class(theClass, errormsg?: string) {
        if (!(typeof theClass === 'function' && /^\s*class\s+/.test(theClass.toString()))) {
            throwError(errormsg || theClass + " does not seems to be class! class is expected.");
        }
        return assure_;
    },
    required(obj, errormsg?: string) {
        if (typeof obj === "undefined") {
            throwError(errormsg || "required");
        }
        return assure_;
    },
    array(obj, errormsg?: string) {
        if (!Array.isArray(obj)) {
            throwError(errormsg || "array is expected");
        }
        return assure_;
    },
    boolean(obj, errormsg?: string) {
        if (typeof obj !== "boolean") {
            throwError(errormsg || "boolean is expected");
        }
        return assure_;
    },
    string(obj, errormsg?: string) {
        if (typeof obj !== "string") {
            throwError(errormsg || "string is expected");
        }
        return assure_;
    },
    nonEmptyString(obj, errormsg?: string) {
        if (typeof obj !== "string" || obj === '') {
            throwError(errormsg || "non empty string is expected");
        }
        return assure_;
    },
    number(obj, errormsg?: string) {
        if (typeof obj !== "number") {
            throwError(errormsg || "number is expected");
        }
        return assure_;
    },
    primitive(obj, errormsg?: string) {
        if (!isPrimitive(obj)) {
            throwError(errormsg || "primitive is expected");
        }
        return assure_;
    },
    nonPrimitive(obj, errormsg?: string) {
        if (isPrimitive(obj)) {
            throwError(errormsg || "non primitive is expected");
        }
        return assure_;
    },
    func(obj, errormsg?: string) {
        if (typeof obj !== "function") {
            throwError(errormsg || "must be function");
        }
        return assure_;
    },
    nonFunc(obj, errormsg?: string) {
        if (typeof obj === "function") {
            throwError(errormsg || "must be non function");
        }
        return assure_;
    },
});

export {
    assure_deep_,
    assure_
};

