"use strict";
var __values = (this && this.__values) || function (o) {
    var m = typeof Symbol === "function" && o[Symbol.iterator], i = 0;
    if (m) return m.call(o);
    return {
        next: function () {
            if (o && i >= o.length) o = void 0;
            return { value: o && o[i++], done: !o };
        }
    };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.system_ = {
    notNull: function (args) {
        if (args === undefined) {
            throwError("notNull() will not work in lamda express!");
        }
        try {
            for (var args_1 = __values(args), args_1_1 = args_1.next(); !args_1_1.done; args_1_1 = args_1.next()) {
                var arg = args_1_1.value;
                checkProp(arg);
            }
        }
        catch (e_1_1) { e_1 = { error: e_1_1 }; }
        finally {
            try {
                if (args_1_1 && !args_1_1.done && (_a = args_1.return)) _a.call(args_1);
            }
            finally { if (e_1) throw e_1.error; }
        }
        return;
        function checkProp(obj) {
            if (obj === undefined || typeof obj !== "object")
                return;
            if (!obj) {
                throwError("null is not allowed");
            }
            for (var key in Object.getOwnPropertyNames(obj)) {
                checkProp(obj[key]);
            }
        }
        var e_1, _a;
    }
};
exports.assure_ = {
    class: function (theClass, errormsg) {
        if (!(typeof theClass === 'function' && /^\s*class\s+/.test(theClass.toString()))) {
            throwError(errormsg || theClass + " does not seems to be class! class is expected.");
        }
        return exports.assure_;
    },
    required: function (obj, errormsg) {
        if (obj === undefined) {
            throwError(errormsg || "required");
        }
        return exports.assure_;
    },
    array: function (obj, errormsg) {
        if (!Array.isArray(obj)) {
            throwError(errormsg || "array is expected");
        }
        return exports.assure_;
    },
    boolean: function (obj, errormsg) {
        if (typeof obj !== "boolean") {
            throwError(errormsg || "boolean is expected");
        }
        return exports.assure_;
    },
    string: function (obj, errormsg) {
        if (typeof obj !== "string") {
            throwError(errormsg || "string is expected");
        }
        return exports.assure_;
    },
    nonFunc: function (value, errormsg) {
        if (typeof value === "function") {
            throwError(errormsg || "must be non function");
        }
        return exports.assure_;
    },
    func: function (func, errormsg) {
        if (typeof func !== "function") {
            throwError(errormsg || "must be function");
        }
        return exports.assure_;
    }
};
//*********************************//
//******* local helpers ***********//
//*********************************//
function throwError(msg) {
    throw new Error(msg);
}
//# sourceMappingURL=assure.js.map