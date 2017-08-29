import {assure_, system_} from "../../../helpers/assure";
import {Store} from "../../../modules/Store";

export function applyUndoable(store_, creator_) {
    system_.notNull(arguments);
    return {
        store: manipulate_store(store_),
        creator: creator(creator_)
    };
}

function manipulate_store(store) {
    Object.defineProperty(store, 'raw_state', {
        get: function () {
            return Store.state[store.store_key];
        }
    });
    Object.defineProperty(store, 'state', {
        configurable: false,
        get: function () {
            const state = store.raw_state;
            return state && state.stack !== undefined ? state.stack[state.stack.length - 1] : state;
        }
    });
    const proxy_reduce = store.reduce;
    store.reduce = function (type, func) {
        system_.notNull(arguments);
        return proxy_reduce(type, function (action) {
            if (action.undoable) {
                return action;
            }
            else {
                const raw_state = store.raw_state;
                const _a = slice(raw_state);
                let stack = _a.stack;
                const future = _a.future;
                stack = stack.concat(future);
                stack.push(func(action));
                return { stack, future: [] };
            }
        });
    };
    return store;
}
function creator(creator_) {
    return function (store) {
        system_.notNull(arguments);
        const dispatchers = creator_(store);
        return { ...dispatchers, ...additional_dispatchers(store)};
    };
}
function additional_dispatchers(store) {
    return {
        undo: function () {
            if (arguments.length > 0) {
                console.warn('"undo()" will ignore all arguments provided! Please double check your intention.' +
                    "For example, if you are writing onClick='{store.redo}', rewrite it to onClick='{() => store.undo()}'");
            }
            const state = store.raw_state;
            if (state === undefined || state.stack === undefined || state.stack.length <= 1) {
                return;
            }
            else {
                const {stack, future} = slice(state);
                future.unshift(stack.pop());
                store.diduce({type: 'undo', stack, future,  undoable: 'undo' });
            }
        },
        redo: function () {
            if (arguments.length > 0) {
                console.warn('"redo()" will ignore all arguments provided! Please double check your intention.' +
                    "For example, if you are writing onClick='{store.redo}', rewrite it to onClick='{() => store.redo()}'");
            }
            const state = store.raw_state;
            if (state.future.length === 0) {
                return;
            }
            const {stack, future} = slice(state);
            stack.push(future.shift());
            store.diduce({ type: 'redo', stack, future, undoable: "redo" });
        }
    };
}
function slice(raw_state) {
    let stack, future;
    if (raw_state === undefined) {
        stack = [];
        future = [];
    }
    else {
        stack = raw_state.stack.slice();
        future = raw_state.future.slice();
    }
    return { stack, future };
}
