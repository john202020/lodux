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
/**
 * Entire store
*/
var store_object = {};
exports.get_unique_id = (function () {
    var _id = 1;
    return function (name) {
        assure_1.assure_deep_.notNull(arguments);
        if (typeof name !== 'undefined') {
            assure_1.assure_.nonEmptyString(name, "If name if provided, it must be non empty string!");
        }
        if (name && exist(name)) {
            throw new Error("detected requesting duplicated store id!");
        }
        return name || ((exist(++_id + "") ? ++_id : _id) + "");
    };
}());
function exist(name) {
    assure_1.assure_deep_.notNull(arguments);
    return store_object[name] !== undefined;
}
exports.exist = exist;
function set_store_object(new_state_of_a_store, subscribers) {
    assure_1.assure_deep_.notNull(arguments);
    assure_1.assure_
        .required(new_state_of_a_store)
        .required(subscribers);
    store_object = __assign({}, store_object, new_state_of_a_store);
    subscribers.forEach(function (handler) {
        handler.call({});
    });
}
exports.set_store_object = set_store_object;
function get_store_object() {
    assure_1.assure_deep_.notNull(arguments);
    return __assign({}, store_object);
}
exports.get_store_object = get_store_object;
//# sourceMappingURL=Entire_store.js.map