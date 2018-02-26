"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var assure_1 = require("../helpers/assure");
var Entire_store_1 = require("./Entire_store");
var helper_1 = require("../helpers/helper");
var proxy_state_1 = require("./proxy_state");
//shallow proxy
function proxy_store(store) {
    assure_1.assure_deep_.notNull(arguments);
    assure_1.assure_.required(store);
    var proxy_store = new Proxy(store, {
        get: function (target, prop, receiver) {
            assure_1.assure_deep_.notNull(prop);
            if (prop === 'state') {
                return proxy_state_1.proxy_state(store, Entire_store_1.get_store_object()[store.store_key]);
            }
            return target[prop];
        },
        set: function (target, prop, value) {
            if (prop !== 'state') {
                throw new Error("the store manipulation can only be on state (i.e. store.state)!");
            }
            assure_1.assure_deep_.notNull(value);
            assure_1.assure_
                .nonPrimitive(value, 'store.state must be non primitive type!');
            if (!helper_1.isEqualContent(store.state, value)) {
                store.update(value);
            }
            return true;
        }
    });
    return proxy_store;
}
exports.proxy_store = proxy_store;
//# sourceMappingURL=proxy_store.js.map