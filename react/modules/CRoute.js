"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var __assign = (this && this.__assign) || Object.assign || function(t) {
    for (var s, i = 1, n = arguments.length; i < n; i++) {
        s = arguments[i];
        for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
            t[p] = s[p];
    }
    return t;
};
Object.defineProperty(exports, "__esModule", { value: true });
var assure_1 = require("../../helpers/assure");
function CRoute(React, Route) {
    assure_1.system_.notNull(arguments);
    return /** @class */ (function (_super) {
        __extends(cRoute, _super);
        function cRoute() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        cRoute.prototype.render = function () {
            var props = this.props;
            var path = props.location.pathname;
            if (path.indexOf("..") > -1) {
                throw new Error("path must not include double dots.");
            }
            if (path.indexOf("/") !== 0) {
                throw new Error("path must have leading slash.");
            }
            var Lay = props.layout;
            var Comp = props.component;
            if (Lay) {
                return React.createElement(Lay, null, Comp ? React.createElement(Comp, __assign({}, props)) : _super.prototype.render.call(this));
            }
            return _super.prototype.render.call(this);
        };
        return cRoute;
    }(Route));
}
exports.CRoute = CRoute;
;
//# sourceMappingURL=CRoute.js.map