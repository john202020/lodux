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
exports.CRoute = function (React, Route) {
    assure_1.system_.notNull(arguments);
    return (function (_super) {
        __extends(b, _super);
        function b() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        b.prototype.render = function () {
            var TheComponent = this.props.component;
            var TheLayout = this.props.layout;
            var props_ = pick(this.props);
            return React.createElement(Route, __assign({}, props_, { render: function (props) {
                    return React.createElement(TheLayout, __assign({}, props_),
                        React.createElement(TheComponent, __assign({}, props_)));
                } }));
        };
        return b;
    }(React.Component));
    function pick(props) {
        var props_ = Object.keys(props)
            .filter(function (key) { return key !== "component" && key !== "layout"; })
            .reduce(function (acc, key) {
            return (__assign({}, acc, (_a = {}, _a[key] = props[key], _a)));
            var _a;
        }, {});
        return props_;
    }
};
