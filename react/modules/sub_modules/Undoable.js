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
var assure_1 = require("../../../helpers/assure");
var Store_1 = require("../../../modules/Store");
function applyUndoable(store_, creator_) {
    assure_1.system_.notNull(arguments);
    return {
        store: manipulate_store(store_),
        creator: creator(creator_)
    };
}
exports.applyUndoable = applyUndoable;
function manipulate_store(store) {
    Object.defineProperty(store, 'raw_state', {
        get: function () {
            return Store_1.Store.state[store.name];
        }
    });
    Object.defineProperty(store, 'state', {
        configurable: false,
        get: function () {
            var state = store.raw_state;
            return state && state.stack !== undefined ? state.stack[state.stack.length - 1] : state;
        }
    });
    var proxy_reduce = store.reduce;
    store.reduce = function (type, func) {
        assure_1.system_.notNull(arguments);
        return proxy_reduce(type, function (action) {
            if (action.undoable) {
                return action;
            }
            else {
                var raw_state = store.raw_state;
                var _a = slice(raw_state), stack = _a.stack, future = _a.future;
                stack = stack.concat(future);
                stack.push(func(action));
                return { stack: stack, future: [] };
            }
        });
    };
    return store;
}
function creator(creator_) {
    return function (store) {
        assure_1.system_.notNull(arguments);
        var creator_obj = creator_(store);
        return __assign({}, creator_obj, creator_obj.dispatchers, additional_dispatchers(store));
    };
}
function additional_dispatchers(store) {
    return {
        undo: function () {
            if (arguments.length > 0) {
                console.warn('"undo()" will ignore all arguments provided! Please double check your intention.' +
                    "For example, if you are writing onClick='{store.redo}', rewrite it to onClick='{() => store.undo()}'");
            }
            var state = store.raw_state;
            if (state === undefined || state.stack === undefined || state.stack.length <= 1) {
                return;
            }
            else {
                var _a = slice(state), stack = _a.stack, future = _a.future;
                future.unshift(stack.pop());
                var action = { stack: stack, future: future, type: 'undo', undoable: 'undo' };
                store.diduce(action);
            }
        },
        redo: function () {
            if (arguments.length > 0) {
                console.warn('"redo()" will ignore all arguments provided! Please double check your intention.' +
                    "For example, if you are writing onClick='{store.redo}', rewrite it to onClick='{() => store.redo()}'");
            }
            var state = store.raw_state;
            if (state.future.length === 0) {
                return;
            }
            var _a = slice(state), stack = _a.stack, future = _a.future;
            stack.push(future.shift());
            store.diduce({ stack: stack, future: future, type: 'redo', undoable: "redo" });
        }
    };
}
function slice(raw_state) {
    var stack, future;
    if (raw_state === undefined) {
        stack = [];
        future = [];
    }
    else {
        stack = raw_state.stack.slice();
        future = raw_state.future.slice();
    }
    return { stack: stack, future: future };
}
