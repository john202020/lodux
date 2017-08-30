
export const system_ = {
    notNull: function (args) {

        if (args === undefined) {
            throwError("notNull() will not work in lamda express!");
        }

        for (let arg of args) {
            checkProp(arg);
        }

        return;

        function checkProp(obj) {
            if (obj === undefined || typeof obj !== "object")
                return;

            if (!obj) {
                throwError("null is not allowed");
            }

            for (let key in Object.getOwnPropertyNames(obj)) {
                checkProp(obj[key]);
            }
        }
    }
};

export const assure_ = {
    class: function (theClass, errormsg?: any) {
        if (!(typeof theClass === 'function' && /^\s*class\s+/.test(theClass.toString()))) {
            throwError(errormsg || theClass + " does not seems to be class! class is expected.");
        }
        return assure_;
    },

    required: function (obj, errormsg?: any) {
        if (obj === undefined) {
            throwError(errormsg || "required");
        }
        return assure_;
    },

    array: function (obj, errormsg?: any) {
        if (!Array.isArray(obj)) {
            throwError(errormsg || "array is expected");
        }
        return assure_;
    },

    boolean: function (obj, errormsg) {
        if (typeof obj !== "boolean") {
            throwError(errormsg || "boolean is expected");
        }
        return assure_;
    },

    string: function (obj, errormsg?: any) {
        if (typeof obj !== "string") {
            throwError(errormsg || "string is expected");
        }
        return assure_;
    },

    nonFunc: function (value, errormsg?: any) {
        if (typeof value === "function") {
            throwError(errormsg || "must be non function");
        }
        return assure_;
    },

    func: function (func, errormsg?: any) {
        if (typeof func !== "function") {
            throwError(errormsg || "must be function");
        }
        return assure_;
    }
};


//*********************************//
//******* local helpers ***********//
//*********************************//

function throwError(msg) {
    throw new Error(msg);
}
