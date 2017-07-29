"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var assure_1 = require("./helpers/assure");
var Store_js_1 = require("./modules/Store.js");
var Middlewares_js_1 = require("./modules/Middlewares.js");
var Util_js_1 = require("./modules/Util.js");
var root = (0, eval)('this');
var previous_lodux = root.lodux;
var modules_ = {
    system_: assure_1.system_,
    assure_: assure_1.assure_,
    Store: Store_js_1.Store,
    applyMiddleware: Middlewares_js_1.default,
    util: { update: Util_js_1.update },
    noConflict: function () {
        root["lodux"] = previous_lodux;
        return modules_;
    }
};
(function () {
    if (typeof define === "function" && define.amd) {
        define(function () {
            return modules_;
        });
    }
    else if (typeof module === "object" && module.exports) {
        module.exports = modules_;
    }
    root['lodux'] = modules_;
}());
