"use strict";
var __assign = (this && this.__assign) || Object.assign || function(t) {
    for (var s, i = 1, n = arguments.length; i < n; i++) {
        s = arguments[i];
        for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
            t[p] = s[p];
    }
    return t;
};
var assure_1 = require("./helpers/assure");
var Store_1 = require("./modules/Store");
var vue = require("./vue");
var react = require("./react");
var recompose = require("./recompose");
var modules_ = {
    system_: assure_1.system_,
    assure_: assure_1.assure_,
    Store: Store_1.Store,
    vue: vue,
    react: react,
    recompose: recompose
};
var isAMD = typeof define === "function" && define['amd'];
var isModule = typeof module === "object" && module.exports;
if (!isAMD && !isModule) {
    var root_1 = this || (0, eval)('this');
    var previous_lodux_1 = root_1['lodux'];
    var noConflict = function () {
        root_1['lodux'] = previous_lodux_1;
        return __assign({}, modules_, { noConflict: function () { } });
    };
    root_1['lodux'] = __assign({}, modules_, { noConflict: noConflict });
}
module.exports = __assign({}, modules_);
//# sourceMappingURL=index_prod.js.map