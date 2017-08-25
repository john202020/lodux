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
var Store_1 = require("../modules/Store");
var connect_1 = require("./connect");
var root = (0, eval)('this');
var modules_ = {
    Store: Store_1.Store,
    connect: connect_1.connect
};
if (typeof define === "function" && define.amd) {
    define(function () {
        return modules_;
    });
}
if (typeof module === "object" && module.exports) {
    module.exports = __assign({}, modules_);
    module.exports.default = __assign({}, modules_);
}
root['vue-lodux'] = modules_;