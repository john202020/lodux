"use strict";
var __assign = (this && this.__assign) || Object.assign || function(t) {
    for (var s, i = 1, n = arguments.length; i < n; i++) {
        s = arguments[i];
        for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
            t[p] = s[p];
    }
    return t;
};
Object.defineProperty(exports, "__esModule", { value: true });
var assure_1 = require("./helpers/assure");
var Store_1 = require("./modules/Store");
var vue_1 = require("./vue");
var react_1 = require("./react");
var root = (0, eval)('this');
var previous_lodux = root['lodux'];
var noConflict = function () {
    root['lodux'] = previous_lodux;
    return modules_;
};
var modules_ = {
    system_: assure_1.system_,
    assure_: assure_1.assure_,
    Store: Store_1.Store,
    vue: vue_1.default,
    react: react_1.default,
    noConflict: noConflict
};
var isAMD = typeof define === "function" && define.amd;
var isModule = typeof module === "object" && module.exports;
if (isAMD) {
    define(function () {
        return modules_;
    });
}
if (isModule) {
    module.exports = __assign({}, modules_);
    module.exports.default = __assign({}, modules_);
}
if (!isAMD && !isModule) {
    root['lodux'] = modules_;
}
