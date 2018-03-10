"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var assure_1 = require("../helpers/assure");
/**
 * Entire store
*/
var store_object = {};
var store_object_etag = {};
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
function set_store_object(store, new_state_of_a_store, subscribers) {
    assure_1.assure_
        .required(new_state_of_a_store)
        .required(subscribers);
    store_object[store.store_key] = new_state_of_a_store;
    if (typeof store_object_etag[store.store_key] === "undefined") {
        store_object_etag[store.store_key] = 0;
    }
    store_object_etag[store.store_key] = 1 + store_object_etag[store.store_key];
    subscribers.forEach(function (handler) {
        try {
            handler.call({});
        }
        catch (err) {
            console.error(err.message);
        }
    });
}
exports.set_store_object = set_store_object;
function get_store_object_etag(store_key) {
    return store_object_etag[store_key];
}
exports.get_store_object_etag = get_store_object_etag;
function get_store_object(store_key) {
    return store_object[store_key];
}
exports.get_store_object = get_store_object;
//# sourceMappingURL=Entire_store.js.map