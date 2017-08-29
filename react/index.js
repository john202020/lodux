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
var Connect_1 = require("./modules/Connect");
var modules_ = {
    Store: Store_1.Store,
    connect: Connect_1.connect
};
module.exports = __assign({}, modules_);
module.exports.default = __assign({}, modules_);
exports.default = module;
