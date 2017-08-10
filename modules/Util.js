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
var unique_prefix = "___";
exports.unique_prefix = unique_prefix;
//psuedo method
//set up reducer, and dispatch the state to the reducer,
//reducer will update exactly as the 'state' is passed in.
//note that the action type will be remove when update store
/**
 *
 * @deprecated since version 0.1.34. Use store_instance.update() instead
 */
function update(store, state, type) {
    assure_1.system_.notNull(arguments);
    assure_1.assure_.required(store).required(state).nonFunc(state);
    console.warn("This util.update() is deprecated! Please use store instance store.diduce() instead.");
    var typename = "update" + unique_prefix + (type || '');
    var subscription = store.reduce(typename, function (action) {
        subscription.dispose();
        return action;
    });
    store.dispatch(__assign({}, state, { type: typename }));
}
exports.update = update;
function get_without_type(action) {
    assure_1.system_.notNull(arguments);
    return Object.keys(action)
        .filter(function (key) { return key !== 'type'; })
        .reduce(function (acc, key) {
        return __assign({}, acc, (_a = {}, _a[key] = action[key], _a));
        var _a;
    }, {});
}
exports.get_without_type = get_without_type;
var get_unique_id = (function () {
    var _id = 1;
    return function () {
        assure_1.system_.notNull(arguments);
        return "[" + _id++ + "]";
    };
}());
exports.get_unique_id = get_unique_id;
