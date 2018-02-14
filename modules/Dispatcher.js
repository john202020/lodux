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
var Entire_store_1 = require("./Entire_store");
function dispatch_(module, action, feedback_fn) {
    assure_1.assure_
        .required(action)
        .nonEmptyString(action.type)
        .required(module.emitter);
    assure_1.assure_deep_
        .isPlainJSONSafe(action)
        .notReservedKeywords(['key'], action, 'action must not have "key" as property');
    var feedback_type = "update-default-" + Entire_store_1.get_unique_id();
    if (typeof feedback_fn !== "undefined") {
        var subsr_1;
        try {
            subsr_1 = module.emitter.listen(feedback_type, function () {
                feedback_fn.call({}, subsr_1);
            });
        }
        catch (err) {
            if (subsr_1) {
                subsr_1.dispose();
            }
            subsr_1 = undefined;
            throw err;
        }
    }
    var _action = JSON.stringify(__assign({}, action, { feedback_type: feedback_type }));
    module.emitter.emit(action.type, _action);
    return;
}
exports.dispatch_ = dispatch_;
function reduce_(module, update_state_fn, type, callback) {
    assure_1.assure_.nonEmptyString(type);
    return module.emitter.listen(type, function (action) {
        assure_1.assure_deep_.notNull(arguments);
        var _action = JSON.parse(action);
        var return_state = callback.call({}, _action);
        if (typeof return_state !== "undefined") {
            update_state_fn(module, return_state);
        }
        dispatch_(module, { type: _action.feedback_type });
    });
    //remove feedback_type
    function remove_feedback_type(action) {
        assure_1.assure_deep_.notNull(arguments);
        return Object.keys(action)
            .filter(function (key) { return key !== 'feedback_type'; })
            .reduce(function (acc, key) {
            return (__assign({}, acc, (_a = {}, _a[key] = action[key], _a)));
            var _a;
        }, {});
    }
}
exports.reduce_ = reduce_;
//# sourceMappingURL=Dispatcher.js.map