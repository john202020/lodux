
import { assure_, system_ } from "../helpers/assure";
import { Store } from "../modules/Store";

export function connect(comp, action_creator_, initial) {
    system_.notNull(arguments);
    var store = Store.createStore(comp.name);
    var dispatchers = connect_creator(store, action_creator_);

    comp.methods = Object.keys(dispatchers).reduce(function (acc, k) {
        return { ...acc, [k]: dispatchers[k] };
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
        return {...initial};
    };

    store.diduce({ type: 'initial' , ...initial});
    
    comp.watch = watches(store, initial);
    return store;
}


function watches(store, state) {

    // return Object.keys(state)
    // .filter(function (k) { return k !== 'action'; })
    // .reduce(function (acc, k) {
    //     return __assign({}, acc, (_a = {}, _a[k] = {
    //         handler: function (val) {
    //             var action = __assign({}, store.state, (_a = {}, _a[k] = val, _a.type = 'change', _a));
    //             store.diduce(action);
    //             var _a;
    //         },
    //         deep: true
    //     }, _a));
    //     var _a;
    // }, {});



    return Object.keys(state)
        .filter(function (k) { return k !== 'action'; })
        .reduce(function (acc, k) {
            return { ...acc, [k] : h(store,k)};
        }, {});

        function h(store, k){
            return {
                handler: function (val) {
                    var action = { ...store.state, [k] : val, type : 'change'};
                    store.diduce(action);
                },
                deep: true
            }
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
