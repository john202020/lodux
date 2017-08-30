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
var assure_1 = require("../../helpers/assure");
var Store_1 = require("../../modules/Store");
var Undoable = require("./sub_modules/Undoable");
function connect(theClass, creator_, initial_state) {
    assure_1.system_.notNull(arguments);
    assure_1.assure_.func(theClass).required(creator_);
    var hasApplyUndoable = false;
    var hasApplyMiddlewares = false;
    var logs = undefined;
    var binder = {
        applyUndoable: function () {
            assure_1.system_.notNull(arguments);
            if (hasApplyUndoable) {
                throw new Error("Multiple application not allowed!");
            }
            hasApplyUndoable = true;
            return binder;
        },
        applyMiddleware: function (logs_) {
            assure_1.system_.notNull(arguments);
            if (hasApplyMiddlewares) {
                throw new Error("Multiple application not allowed!");
            }
            assure_1.assure_.array(logs_);
            hasApplyMiddlewares = true;
            logs = logs_;
            return binder;
        },
        done: function () {
            assure_1.system_.notNull(arguments);
            var final_store = Store_1.createConfigurableStore(theClass.name);
            var final_creator = creator_;
            if (hasApplyMiddlewares && logs) {
                final_store = final_store.use(logs);
            }
            if (hasApplyUndoable) {
                var final = Undoable.applyUndoable(final_store, creator_);
                final_store = final.store;
                final_creator = final.creator;
            }
            connect_custom_methods(final_store, final_creator);
            connect_setState(final_store, theClass);
            if (initial_state !== undefined) {
                final_store.setState(initial_state);
            }
            return final_store;
        }
    };
    return binder;
}
exports.connect = connect;
function connect_custom_methods(store, creator_) {
    var setState = function (new_state) {
        assure_1.system_.notNull(arguments);
        var t = typeof new_state.type;
        if (t !== "undefined" && t !== "string")
            throw new Error("type of new_state can only be string type if provided!");
        var type = new_state.type !== undefined ? new_state.type : 'setState';
        store.diduce(__assign({}, new_state, { type: type }));
    };
    var dispatchers = creator_(store);
    if (dispatchers !== undefined) {
        for (var key in dispatchers) {
            if (store[key] !== undefined) {
                throw new Error("[" + key + "] duplicates a property of your store! Please choose other method name.");
            }
        }
        Object.assign(store, dispatchers);
    }
    Object.assign(store, { setState: setState });
    return;
}
function connect_setState(store, theClass) {
    var pro = theClass.prototype;
    var initial_WillMount = pro.componentWillMount || function () { };
    var initial_WillUnmount = pro.componentWillUnmount || function () { };
    var subscriptions = [];
    pro.componentWillMount = function () {
        var component = this;
        unsubscribe(subscriptions);
        subscribe(component, subscriptions, store);
        component.state = component.state || store.state;
        return initial_WillMount.call(component);
    };
    pro.componentWillUnmount = function () {
        var component = this;
        unsubscribe(subscriptions);
        console.log('unmount');
        initial_WillUnmount.call(component);
    };
}
function subscribe(component, subscriptions, store) {
    subscriptions.push(store.subscribe(function () {
        component.setState(store.state);
    }));
}
function unsubscribe(subscriptions) {
    var _subscriptions = subscriptions.slice();
    subscriptions.length = 0;
    _subscriptions.forEach(function (d) {
        d ? d.dispose() : undefined;
    });
}
