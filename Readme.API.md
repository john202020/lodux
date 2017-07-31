# Single store management for web modules.
Single store in a one-way observable pattern.

# API

## {Store}
__subscribe(callback_fn): disposable__  
Subscribe to changes of the entire store state
```javascript
const {Store} from "lodux";

Store.subscribe(function(){ 
    //entire store state has some change(s)
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
__reduce(type: string, callback_fn):  disposable__  
```javascript
const {Store} from "lodux";

const store = Store.createStore();

store.reduce(type, function(action){ 
    return {...store.state(), ...action};
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
    subscription.dispose();
});
```
__update(new_state[, type])__  
<small>since version 0.1.34</small>  
Consider update() as just dispatch(), with 'type' is optional.  

Internally it invokes a full dispatch/reduce cycle. The reducer will return {...store.state(), ...new_state}.  

The 'new state' is just an 'action' without explicit type.    

```javascript
//this is redundant, though no harm.
//const new_state = {...store.state(), ...new_state};

//new_state as action without type
store.update(new_state);

//prvoide custom type
store.update(new_state, 'update user name');
```

__state()__  
Return snapshot of store instance state
```javascript
const store_state = store.state();
```

__subscribe(callback_fn): disposable__  
Subscribe to changes of this store state. Each store can have multiple subscriptions
```javascript
const subscription_0 = store.subscribe(()=>{
     ...
     subscription_0.dispose();
});

const subscription_1 = store.subscribe(()=>{
     ...
     subscription_1.dispose();
});
```

__use(array of middlewares): <s>new store instance</s> store (cloned)__  
<small>starting from 0.2.54.</small>
Firstly, it clones the store, then applies the middleware to the cloned store.
```javascript
const store = Store.createStore();
...
const middlewares = [...] // refer to middleware plugins
...
const cloned_store = store.use(middlewares);
```


## {lodux}
_noConflict()_

&lt;script src="where /dist/lodux.js is located">&lt;/script>
```javascript
//if in conflict
const lodux = lodux.noConflict();

const Store = lodux.Store;
```
