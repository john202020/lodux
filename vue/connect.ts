
import { assure_, system_ } from "../helpers/assure";
import { Store } from "../modules/Store";

export function connect(comp, action_creator_, initial) {
    system_.notNull(arguments);
    const store = Store.createStore(comp.name);
    const dispatchers = connect_creator(store, action_creator_);

    comp.methods = Object.keys(dispatchers).reduce(function (acc, k) {
        return { ...acc, [k]: dispatchers[k] };
    }, {});

    comp.created = function () {
        const vueThis = this;
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
    return Object.keys(state)
        .filter(function (k) { return k !== 'action'; })
        .reduce(function (acc, k) {
            return { ...acc, [k] : h(store,k)};
        }, {});

        function h(store, k){
            return {
                handler: function (val) {
                    const action = { ...store.state, [k] : val, type : 'change'};
                    store.diduce(action);
                },
                deep: true
            }
        }
}

function connect_creator(store, action_creator_) {
    const dispatchers = action_creator_(store);
    if (dispatchers !== undefined) {
        for (let key in dispatchers) {
            if (store[key]) {
                throw new Error("'" + key + "' is not allowed as method name of your store.");
            }
        }
        Object.assign(store, dispatchers);
    }
    return dispatchers;
}
