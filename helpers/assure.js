"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var helper_1 = require("./helper");
var assure_deep_1 = require("./assure_deep");
exports.assure_deep_ = assure_deep_1.assure_deep_;
var assure_ = Object.freeze({
    compatible: function () {
        if (arguments.length > 0) {
            helper_1.throwError("does not accept any argument!");
        }
        var root = (0, eval)('this');
        var compatible = !!root['Proxy'] && !!root["WeakSet"] && !!root['Object']['is'];
        if (!compatible) {
            throw new Error("'Proxy', 'Object.is', or 'WeakSet' isare not supported. Please check whether your system support es2015!");
        }
    },
    defined: function (argu, errormsg) {
        if (argu === undefined) {
            helper_1.throwError(errormsg || "does not accept undefined as the argument!");
        }
    },
    empty: function (argu, errormsg) {
        if (argu.length > 0) {
            helper_1.throwError(errormsg || "does not accept any argument!");
        }
    },
    class: function (theClass, errormsg) {
        if (!(typeof theClass === 'function' && /^\s*class\s+/.test(theClass.toString()))) {
            helper_1.throwError(errormsg || theClass + " does not seems to be class! class is expected.");
        }
        return assure_;
    },
    required: function (obj, errormsg) {
        if (typeof obj === "undefined") {
            helper_1.throwError(errormsg || "required");
        }
        return assure_;
    },
    array: function (obj, errormsg) {
        if (!Array.isArray(obj)) {
            helper_1.throwError(errormsg || "array is expected");
        }
        return assure_;
    },
    boolean: function (obj, errormsg) {
        if (typeof obj !== "boolean") {
            helper_1.throwError(errormsg || "boolean is expected");
        }
        return assure_;
    },
    string: function (obj, errormsg) {
        if (typeof obj !== "string") {
            helper_1.throwError(errormsg || "string is expected");
        }
        return assure_;
    },
    nonEmptyString: function (obj, errormsg) {
        if (typeof obj !== "string" || obj === '') {
            helper_1.throwError(errormsg || "non empty string is expected");
        }
        return assure_;
    },
    number: function (obj, errormsg) {
        if (typeof obj !== "number") {
            helper_1.throwError(errormsg || "number is expected");
        }
        return assure_;
    },
    primitive: function (obj, errormsg) {
        if (!helper_1.isPrimitive(obj)) {
            helper_1.throwError(errormsg || "primitive is expected");
        }
        return assure_;
    },
    nonPrimitive: function (obj, errormsg) {
        if (helper_1.isPrimitive(obj)) {
            helper_1.throwError(errormsg || "non primitive is expected");
        }
        return assure_;
    },
    func: function (obj, errormsg) {
        if (typeof obj !== "function") {
            helper_1.throwError(errormsg || "must be function");
        }
        return assure_;
    },
    nonFunc: function (obj, errormsg) {
        if (typeof obj === "function") {
            helper_1.throwError(errormsg || "must be non function");
        }
        return assure_;
    },
});
exports.assure_ = assure_;
//# sourceMappingURL=assure.js.map