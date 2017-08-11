# Single store management for web modules.
Single store in a one-way observable pattern.

# API

## {Store}
__subscribe(callback_fn): disposable__  
Subscribe to changes of the entire store state
```javascript
const {Store} from "lodux";

const subscription = Store.subscribe(() => { 
    //entire store state has some change(s)
    ...
    subscription.dispose();
});
```
__state()__  
Return snapshot of the entire store state
```javascript
const entire_store_state = Store.state();
```
__reset_initial()__  
Reset all the stores to their initial values
<small>starting from 0.2.46</small>
```javascript
Store.reset_initial();
```

## store instance

__state()__  
Return snapshot of store instance state. 
```javascript
const {Store} from "lodux";

const store = Store.createStore();
const store_state = store.state();
```

__reduce(type: string, callback_fn):  disposable__  
```javascript
const subscription = store.reduce(type, action => { 
    subscription.dispose();
    
    return {...store.state(), ...action};
    // includes action as a property of store state
    return {...store.state(), ...action, action};
});

```
__dispatch(action[, feedback_fn]):  disposable__  
<small>starting from 0.2.36, disposable will be passed to the feedback_fn.</small>
```javascript
//does not observe reducer's return
store.dispatch({type:'add person', name:'Sam'});

//feedback_fn observes reducer's return
store.dispatch({type:'add person', name:'Sam'}, subscription => {
    // reducer has just returned
    ...    
    //stop subscription to reduce return
    subscription.dispose();
});
```

__diduce(action)__  
Consider diduce() as dispatch() plus internal reduce().  

Internally it invokes a full dispatch/reduce cycle. The internal reducer will return {...store.state(), ...action}.  

Standard implementation of diduce()
```javascript
let type = 'initial';
let count = 0;
let action = { type, count };
store.diduce(action);
// includes action as a property of store state
store.diduce({ ...action, action });

type = 'add';
amount = 1;
// change state 
action = { type, count: store.state().count + amount };

store.diduce(action);
// includes action as a property of store state
store.diduce({...action, action});
```

__subscribe(callback_fn): disposable__  
Subscribe to changes of this store state.
```javascript
const subscription = store.subscribe(() => {
     ...
     subscription.dispose();
});
```

__use(array of middlewares): <s>new store instance</s> store (clone)__  
<small>starting from 0.2.54.</small>
Firstly, it clones the store, then applies the middleware to the `clone store`.
```javascript
const middlewares = [...] // refer to middleware plugins
...
const clone_store = store.use(middlewares);
```

## {lodux}
_noConflict()_

&lt;script src="where /dist/lodux.js is located">&lt;/script>
```javascript
//if in conflict
const lodux = lodux.noConflict();

const Store = lodux.Store;
```
