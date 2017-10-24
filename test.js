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
Object.defineProperty(exports, "__esModule", { value: true });
var React = require("react");
var Component = React.Component;
var Cc = function (props) {
    return React.createElement("div", null, "cc");
};
var Bb = /** @class */ (function (_super) {
    __extends(Bb, _super);
    function Bb() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Bb.prototype.render = function () {
        return React.createElement("div", null,
            "Bb",
            React.createElement(Cc, null));
    };
    return Bb;
}(Component));
var aa = /** @class */ (function (_super) {
    __extends(aa, _super);
    function aa() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    aa.prototype.render = function () {
        return React.createElement("div", null,
            React.createElement(Cc, null),
            React.createElement(Bb, null));
    };
    return aa;
}(Component));
exports.default = aa;
//# sourceMappingURL=test.js.map