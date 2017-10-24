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
var Store_1 = require("../modules/Store");
function connect(comp, action_creator_, initial) {
    assure_1.system_.notNull(arguments);
    var store = Store_1.Store.createStore(comp.name);
    var dispatchers = connect_creator(store, action_creator_);
    comp.methods = Object.keys(dispatchers).reduce(function (acc, k) {
        return __assign({}, acc, (_a = {}, _a[k] = dispatchers[k], _a));
        var _a;
    }, {});
    comp.created = function () {
        var vueThis = this;
        this.subscription = store.subscribe(function () {
            var state = store.state;
            Object.keys(state).forEach(function (key) {
                vueThis[key] = state[key];
            });
        });
    };
    comp.destroyed = function () {
        this.subscription.dispose();
    };
    comp.data = function () {
        return __assign({}, initial);
    };
    store.diduce(__assign({ type: 'initial' }, initial));
    comp.watch = watches(store, initial);
    return store;
}
exports.connect = connect;
function watches(store, state) {
    return Object.keys(state)
        .filter(function (k) { return k !== 'action'; })
        .reduce(function (acc, k) {
        return __assign({}, acc, (_a = {}, _a[k] = h(store, k), _a));
        var _a;
    }, {});
    function h(store, k) {
        return {
            handler: function (val) {
                var action = __assign({}, store.state, (_a = {}, _a[k] = val, _a.type = 'change', _a));
                store.diduce(action);
                var _a;
            },
            deep: true
        };
    }
}
function connect_creator(store, action_creator_) {
    var dispatchers = action_creator_(store);
    if (dispatchers !== undefined) {
        for (var key in dispatchers) {
            if (store[key]) {
                throw new Error("'" + key + "' is not allowed as method name of your store.");
            }
        }
        Object.assign(store, dispatchers);
    }
    return dispatchers;
}
//# sourceMappingURL=connect.js.map