"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var assure_1 = require("./helpers/assure");
var Store_1 = require("./modules/Store");
var Util_1 = require("./modules/Util");
var root = (0, eval)('this');
var previous_lodux = root.lodux;
var util = { update: Util_1.update };
var noConflict = function () {
    root.lodux = previous_lodux;
    return lodux;
};
var lodux = {
    system_: assure_1.system_,
    assure_: assure_1.assure_,
    Store: Store_1.Store,
    util: util,
    noConflict: noConflict
};
if (typeof define === "function" && define.amd) {
    define(function () {
        return lodux;
    });
}
else if (typeof module === "object" && module.exports) {
    module.exports = lodux;
    module.exports.default = lodux;
}
root.lodux = lodux;
