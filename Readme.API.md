# Single store management for web modules.
Single store in a one-way observable pattern.

This is the first stable `version 1`.

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
__state__  
Return snapshot of the entire store state
```javascript
const entire_store_state = Store.state;
```
__reset_initial()__  
Reset all the stores to their initial values
```javascript
Store.reset_initial();
```

## store instance

__state__  
Return snapshot of store instance state. 
```javascript
const {Store} from "lodux";

const store = Store.createStore();
const store_state = store.state;
```

__reduce(type: string, callback_fn):  disposable__  
```javascript
const subscription = store.reduce(type, action => { 
    // observes only once
    subscription.dispose();

    const new_state  = { count: store.state ? store.state.count + amount : amount };
    // includes action as a property of store state
    return {...store.state, ...new_state, action};
});

```
__dispatch(action[, (subscription)=>{}])__  
(subscription)=>{} is the function that observes the corresponding reducer's return.
```javascript
store.dispatch({type:'add person', name:'Sam'});

store.dispatch({type:'add person', name:'Sam'}, subscription => {
    // reducer has just returned
    ...    
    //stop observing reducer's return
    subscription.dispose();
});
```

__diduce(action)__  
Consider `diduce()` as `dispatch()` plus internal `reduce()`.  

Internally it invokes a full dispatch/reduce cycle. The internal reducer will return {...store.state, ...action}.  

Standard implementation of diduce()
```javascript
const type = 'add';
const amount = 1;

// prepare new state and wrap into action 
action = { type, count: store.state ? store.state.count + amount : amount };

// includes action as a property of store state
store.diduce({...action, action});
```

__subscribe(callback_fn): disposable__  
Subscribe to changes of this store state.
```javascript
const subscription = store.subscribe(() => {
     ...

     // stop observing
     subscription.dispose();
});
```

__use(array of middlewares): store (cloned)__  
Firstly, it clones the store, then applies the middleware to the `cloned store`.
```javascript
const middlewares = [...] // refer to middleware plugins
...
const cloned_store = store.use(middlewares);
```

## Download from script tag
&lt;script src="where /dist/lodux.js is located">&lt;/script>
```javascript
//if in conflict
const lodux = lodux.noConflict();

const Store = lodux.Store;
```
