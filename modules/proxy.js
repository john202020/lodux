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
function proxy(store) {
    var handler = {
        get: function (target, name) {
            return name in target ? target[name] : target.state[name];
        },
        set: function (obj, prop, value) {
            if (typeof value === "function") {
                throw new TypeError('it is not intented for defining function');
            }
            obj.update(__assign({}, obj.state, (_a = {}, _a[prop] = value, _a)));
            // Indicate success
            return true;
            var _a;
        }
    };
    return new Proxy(store, handler);
}
exports.proxy = proxy;
//# sourceMappingURL=proxy.js.map