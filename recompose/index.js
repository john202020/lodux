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
var assure_1 = require("../helpers/assure");
// options: {
//     componentWillMount: function () {
//         store.subscribe(() => {
//             console.log(store.state);
//         });
//     }
// }
var state = function (lifecycle) {
    assure_1.system_.notNull(arguments);
    assure_1.assure_.required(lifecycle);
    return function (_a) {
        var store = _a.store, Comp = _a.Comp, options = _a.options;
        assure_1.system_.notNull(arguments);
        assure_1.assure_.required(store).required(Comp);
        var ops = __assign({}, (options || {}), { componentWillMount: function () {
                var _this = this;
                store.subscribe(function () {
                    _this.setState(store.state);
                });
                if (options && options.componentWillMount) {
                    options.componentWillMount();
                }
            } });
        return lifecycle(ops)(Comp);
    };
};
exports.state = state;
//# sourceMappingURL=index.js.map