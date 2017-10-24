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
var hmrstate = (function () {
    var state = undefined;
    return function (store) {
        store.subscribe(function () {
            state = store.state;
        });
        if (state)
            store.setState(state);
    };
}());
function connect(theClass, creator_, initial_state) {
    assure_1.system_.notNull(arguments);
    assure_1.assure_.func(theClass)
        .required(creator_)
        .required(initial_state);
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
            final_store.setState(initial_state);
            if (Store_1.Store.config().isHMR) {
                hmrstate(final_store);
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
        assure_1.assure_.nonFunc(new_state);
        var t = new_state.type;
        if (t && typeof t !== "string")
            throw new Error("type of new_state can only be string if provided!");
        var type = new_state.type || 'setState';
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
    var willMount = pro.componentWillMount || function () { };
    var willUnmount = pro.componentWillUnmount || function () { };
    var render = pro.render || function () { };
    var componentWillReceiveProps = pro.componentWillReceiveProps || function () { };
    var shouldComponentUpdate = pro.shouldComponentUpdate || function () { };
    var componentDidUpdate = pro.componentDidUpdate || function () { };
    var subscriptions = [];
    // pro.componentDidUpdate = function () {
    //     const component = this;
    //     componentDidUpdate.call(component);
    // };
    // pro.shouldComponentUpdate = function () {
    //     const component = this;
    //     return shouldComponentUpdate.call(component) || true;
    // };
    // pro.componentWillReceiveProps = function (nextProps) {
    //     const component = this;
    //     // if (nextProps.location !== this.props.location) {
    //     //     // navigated!
    //     //     console.log('navigated!');
    //     // }
    //     componentWillReceiveProps.call(component, nextProps);
    // };
    pro.render = function () {
        var component = this;
        unsubscribe();
        subscribe(component, store);
        component.state = component.state || store.state;
        return render.call(component);
    };
    pro.componentWillMount = function () {
        var component = this;
        willMount.call(component);
    };
    pro.componentWillUnmount = function () {
        var component = this;
        unsubscribe();
        willUnmount.call(component);
    };
    function subscribe(component, store) {
        subscriptions.push(store.subscribe(function () {
            component.setState(store.state);
        }));
    }
    function unsubscribe() {
        var _subscriptions = subscriptions.slice();
        subscriptions.length = 0;
        _subscriptions.forEach(function (d) {
            d ? d.dispose() : undefined;
        });
    }
}
//# sourceMappingURL=Connect.js.map