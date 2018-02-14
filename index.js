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
assure_1.assure_.compatible();
var modules_ = {
    Store: Store_1.Store
};
var isAMD = typeof define === "function" && define['amd'];
var isModule = typeof module === "object" && module.exports;
if (!isAMD && !isModule) {
    var root_1 = (0, eval)('this');
    var previous_modux_1 = root_1['lodux'];
    var noConflict = function () {
        root_1['lodux'] = previous_modux_1;
        return __assign({}, modules_, { noConflict: function () { } });
    };
    root_1['lodux'] = __assign({}, modules_, { noConflict: noConflict });
}
module.exports = __assign({}, modules_);
//# sourceMappingURL=index.js.map