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
var store_object = {}; //entire store
var store_initial = {}; //entire store
function get_store_object_initial() {
    return __assign({}, store_initial);
}
exports.get_store_object_initial = get_store_object_initial;
function get_store_object() {
    assure_1.system_.notNull(arguments);
    return __assign({}, store_object);
}
exports.get_store_object = get_store_object;
function set_store_object(new_state_of_the_comp, subscribers) {
    assure_1.system_.notNull(arguments);
    assure_1.assure_.required(new_state_of_the_comp);
    var store_key = Object.keys(new_state_of_the_comp)[0];
    var isInitial = !store_object[store_key];
    if (isInitial) {
        store_initial = __assign({}, store_initial, new_state_of_the_comp);
    }
    var isNew = isInitial || JSON.stringify(store_object[store_key]) !== JSON.stringify(new_state_of_the_comp[store_key]);
    store_object = __assign({}, store_object, new_state_of_the_comp);
    if (isNew) {
        subscribers.forEach(function (handler) {
            if (typeof handler === "function") {
                handler.call({});
            }
        });
    }
}
exports.set_store_object = set_store_object;
