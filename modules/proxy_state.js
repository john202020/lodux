"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var assure_1 = require("../helpers/assure");
var helper_1 = require("../helpers/helper");
var proxy_state_deep_1 = require("./proxy_state_deep");
function shouldSkip(target, prop) {
    var desc = Object.getOwnPropertyDescriptor(target, prop);
    if (desc && !desc.configurable) {
        return true;
    }
    return false;
}
var watcher = new WeakMap();
//deep proxy
function proxy_state(store, value) {
    if (helper_1.isPrimitive(value))
        return value;
    if (watcher.has(value)) {
        return watcher.get(value);
    }
    watcher.set(value, new Proxy(value, {
        get: function (target, prop) {
            if (prop === 'it') {
                return value;
            }
            return target[prop];
        },
        set: function (target, prop, value) {
            assure_1.assure_deep_.notNull(value);
            assure_1.assure_
                .nonPrimitive(target, 'assignment to primitive type is not allowed!')
                .nonEmptyString(prop, 'property must be non empty string!');
            if (prop === 'it') {
                throw new Error("[it] is a reserved keyword. Please use other as object key!");
            }
            assure_1.assure_deep_
                .isPlainJSONSafe(value)
                .notReservedKeywords(['it'], value);
            if (!helper_1.isEqualContent(target[prop], value)) {
                store.update(proxy_state_deep_1.bubble(store.state, target, prop, value));
            }
            return true;
        }
    }));
    return watcher.get(value);
}
exports.proxy_state = proxy_state;
//# sourceMappingURL=proxy_state.js.map