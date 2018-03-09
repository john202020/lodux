"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var assure_1 = require("../helpers/assure");
var Entire_store_1 = require("./Entire_store");
var helper_1 = require("../helpers/helper");
var proxy_state_deep_1 = require("./proxy_state_deep");
var last_store_etag = -1;
var last_proxied_store = new WeakMap();
//shallow proxy
function proxy_store(store, forceNew) {
    assure_1.assure_deep_.notNull(arguments);
    assure_1.assure_.required(store);
    var proxied_store = new Proxy(store, {
        get: function (target, prop) {
            assure_1.assure_deep_.notNull(prop);
            if (prop === 'state') {
                var store_key = store.store_key;
                var hasChange = last_store_etag !== Entire_store_1.get_store_object_etag(store_key);
                last_store_etag = Entire_store_1.get_store_object_etag(store_key);
                if (!forceNew && !hasChange && last_proxied_store.get(store)) {
                    return last_proxied_store.get(store);
                }
                last_proxied_store.set(store, proxy_state_deep_1.proxy_state_deep(proxied_store, Entire_store_1.get_store_object(store_key)));
                return last_proxied_store.get(store);
            }
            return target[prop];
        },
        set: function (target, prop, value) {
            if (prop !== 'state') {
                throw new Error("the store manipulation can only be on state (i.e. store.state)!");
            }
            assure_1.assure_deep_
                .notNull(value)
                .isPlainJSONSafe(value)
                .notReservedKeywords(['it'], value);
            assure_1.assure_
                .nonPrimitive(value, 'store.state assignment must be non primitive type!');
            if (!helper_1.isEqualContent(store.state, value)) {
                store.update(value);
            }
            return true;
        }
    });
    return proxied_store;
}
exports.proxy_store = proxy_store;
//# sourceMappingURL=proxy_store.js.map