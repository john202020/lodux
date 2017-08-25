"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var assure_1 = require("../../helpers/assure");
var Store_1 = require("../../modules/Store");
var Undoable_js_1 = require("./sub_modules/Undoable.js");
function connect(theClass, creator_) {
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
            var final_store = Store_1.Store.createConfigurableStore(theClass.name);
            var final_creator = creator_;
            if (hasApplyMiddlewares && logs) {
                final_store = final_store.use(logs);
            }
            if (hasApplyUndoable) {
                var final = Undoable_js_1.applyUndoable(final_store, creator_);
                final_store = final.store;
                final_creator = final.creator;
            }
            connect_creator(final_store, final_creator);
            connect_setState(Store_1.Store, final_store, theClass);
            return final_store;
        }
    };
    return binder;
}
exports.connect = connect;
function connect_creator(store, creator_) {
    var dispatchers = creator_(store);
    if (dispatchers !== undefined) {
        for (var key in dispatchers) {
            if (store[key]) {
                throw new Error("'" + key + "' is not allowed as method name of your store.");
            }
        }
        Object.assign(store, dispatchers);
    }
    return;
}
function connect_setState(Store, store, theClass) {
    var initial_mount = theClass.prototype.componentDidMount || function () { };
    var initial_unmount = theClass.prototype.componentWillUnmount || function () { };
    var subscriptions = [];
    theClass.prototype.componentDidMount = function () {
        var component = this;
        subscriptions.push(Store.subscribe(function () {
            component.setState(store.state);
        }));
        initial_mount.call(component);
    };
    theClass.prototype.componentWillUnmount = function () {
        var component = this;
        subscriptions.slice().forEach(function (subscription) {
            if (subscription) {
                subscription.dispose();
            }
            subscription = undefined;
        });
        subscriptions = [];
        initial_unmount.call(component);
    };
    return;
}
