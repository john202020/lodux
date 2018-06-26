"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var assure_1 = require("../helpers/assure");
var helper_1 = require("../helpers/helper");
var proxy_state_deep_1 = require("./proxy_state_deep");
function shouldSkip(target, prop) {
    var desc = Object.getOwnPropertyDescriptor(target, prop);
    if (desc && !desc.configurable)
        return true;
    return false;
}
var watcher = new WeakMap();
var nonRecommendedFunctions = ['push', 'unshift', 'pop', 'shift', 'sort', 'reverse'];
//deep proxy
function proxy_state(store, value) {
    if (helper_1.isPrimitive(value))
        return value;
    if (watcher.has(value)) {
        return watcher.get(value);
    }
    var proxied = new Proxy(value, {
        get: function (target, prop) {
            var v = target[prop];
            if (typeof v === 'function') {
                if (nonRecommendedFunctions.indexOf(prop) > -1) {
                    throw new Error('"' + prop + '" is trying to mutate the state, which is not allowed!\nuse object spreading or Object.assign to manipulate instead.');
                }
            }
            return v;
        },
        set: function (target, prop, value) {
            if (value !== undefined) {
                assure_1.assure_deep_.notNull(value);
            }
            assure_1.assure_
                .nonEmptyString(prop, 'property must be non empty string!');
            assure_1.assure_deep_
                .notReservedKeywords([], prop)
                .isPlainJSONSafe(value)
                .notReservedKeywords([], value);
            if (!helper_1.isEqualContent(target[prop], value)) {
                store.update(proxy_state_deep_1.bubble(store.state, target, prop, value));
            }
            return true;
        }
    });
    watcher.set(value, proxied);
    proxy_state_deep_1.proxies_watcher.set(proxied, value);
    return proxied;
}
exports.proxy_state = proxy_state;
//# sourceMappingURL=proxy_state.js.map