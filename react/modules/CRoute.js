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
var assure_1 = require("../../helpers/assure");
exports.CRoute = function (React, Route) {
    assure_1.system_.notNull(arguments);
    return function (props) {
        var TheLayout = props.layout;
        var TheComponent = props.component;
        var props_ = filter(props);
        return React.createElement(Route, __assign({}, props_, { render: function (props) {
                return (React.createElement(TheLayout, __assign({}, props_),
                    React.createElement(TheComponent, __assign({}, props_))));
            } }));
    };
};
function filter(props) {
    return Object.keys(props)
        .filter(function (key) { return key !== "component" && key !== "layout"; })
        .reduce(function (acc, key) {
        return (__assign({}, acc, (_a = {}, _a[key] = props[key], _a)));
        var _a;
    }, {});
}
