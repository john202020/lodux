"use strict";
var __assign = (this && this.__assign) || Object.assign || function(t) {
    for (var s, i = 1, n = arguments.length; i < n; i++) {
        s = arguments[i];
        for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
            t[p] = s[p];
    }
    return t;
};
var __read = (this && this.__read) || function (o, n) {
    var m = typeof Symbol === "function" && o[Symbol.iterator];
    if (!m) return o;
    var i = m.call(o), r, ar = [], e;
    try {
        while ((n === void 0 || n-- > 0) && !(r = i.next()).done) ar.push(r.value);
    }
    catch (error) { e = { error: error }; }
    finally {
        try {
            if (r && !r.done && (m = i["return"])) m.call(i);
        }
        finally { if (e) throw e.error; }
    }
    return ar;
};
var __spread = (this && this.__spread) || function () {
    for (var ar = [], i = 0; i < arguments.length; i++) ar = ar.concat(__read(arguments[i]));
    return ar;
};
Object.defineProperty(exports, "__esModule", { value: true });
var assure_1 = require("../helpers/assure");
var helper_1 = require("../helpers/helper");
var Entire_store_1 = require("./Entire_store");
// collection of all stores' history
var stores_history = {};
function historyFactory(store_key) {
    if (stores_history[store_key]) {
        return stores_history[store_key];
    }
    var store_history = [];
    var point_index = -1;
    var isContinue = false;
    stores_history[store_key] = Object.freeze({
        get index() {
            return point_index;
        },
        get state() {
            return store_history[point_index];
        },
        start: function () {
            assure_1.assure_.empty(arguments);
            isContinue = true;
        },
        stop: function () {
            assure_1.assure_.empty(arguments);
            isContinue = false;
        },
        push: function () {
            assure_1.assure_deep_.notNull(arguments);
            if (isContinue) {
                store_history = __spread(store_history, [
                    setDeepProxy(Entire_store_1.get_store_object()[store_key])
                ]);
                point_index = store_history.length - 1;
            }
        },
        get: function (index) {
            assure_1.assure_deep_.notNull(arguments);
            assure_1.assure_.number(index);
            if (index < 0 || index >= store_history.length) {
                return undefined;
            }
            return store_history[index];
        },
        to: function (index) {
            assure_1.assure_deep_.notNull(arguments);
            assure_1.assure_.number(index);
            if (index < 0 || index >= store_history.length) {
                return undefined;
            }
            point_index = index;
            return store_history[point_index];
        },
        back: function () {
            assure_1.assure_.empty(arguments);
            if (point_index > 0) {
                point_index--;
            }
            return store_history[point_index];
        },
        next: function () {
            assure_1.assure_.empty(arguments);
            if (point_index < store_history.length - 1) {
                point_index++;
            }
            return store_history[point_index];
        }
    });
    return stores_history[store_key];
}
exports.historyFactory = historyFactory;
function setDeepProxy(obj) {
    if (helper_1.isPrimitive(obj))
        return obj;
    return new Proxy(Array.isArray(obj) ? __spread(obj) : __assign({}, obj), {
        get: function (target, prop) {
            return setDeepProxy(target[prop]);
        },
        set: function (target, prop, value) {
            throw new Error('changing history is not allowed!');
            return false;
        }
    });
}
//# sourceMappingURL=history.js.map