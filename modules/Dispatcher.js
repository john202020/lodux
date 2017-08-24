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
var Util_js_1 = require("./Util.js");
function dispatch_(module, action, feedback_fn) {
    assure_1.system_.notNull(arguments);
    assure_1.assure_.required(action)
        .nonFunc(action)
        .required(action.type)
        .required(module.emitter);
    var feedback_type = Util_js_1.get_unique_id();
    var subscription;
    if (feedback_fn !== undefined) {
        subscription = module.emitter.listen(feedback_type, function () {
            feedback_fn.call({}, subscription);
        });
    }
    module.emitter.emit(action.type, __assign({}, action, { feedback_type: feedback_type }));
    return;
}
exports.dispatch_ = dispatch_;
function reduce_(module, update_state, type, callback) {
    assure_1.system_.notNull(arguments);
    return module.emitter.listen(type, function (action) {
        assure_1.system_.notNull(arguments);
        var return_state = callback.call({}, pouch(action));
        if (return_state !== undefined) {
            update_state(module.name, return_state);
        }
        dispatch_(module, { type: action.feedback_type });
    });
    function pouch(action) {
        assure_1.system_.notNull(arguments);
        return Object.entries(action).reduce(function (acc, val) {
            return val[0] !== 'feedback_type' ? (acc[val[0]] = val[1], acc) : acc;
        }, {});
    }
}
exports.reduce_ = reduce_;
