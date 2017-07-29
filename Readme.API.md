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
A shortcut to accomplish simple task, and satisfy a full dispatch/reduce cycle.  
Internally, it joins the new_state with a custom or system created type (i.e. an action) , then dispatches this action.  
'type', if provided, will be the custom type (system prefix will be prepended), otherwise, system will create a type.  
Reducer will then update the store exactly as the new state is provided.  

'new state' is sometimes quite confusion. Here, don't have to worry about Object.assign() or spreading. update() will internally Object.assign() the 'new state' to the current state (i.e. store.state()). There is no harm, though, to duplicate Object.assign().  

<small>Just for easy to remember. Since the reducer is internally invoked, you don't have control over the manuplication of the action, therefore, it returns exactly what the action (i.e. the new_state) is provided.</small>
```javascript
//don't have to Object.assign() because update() will internally do it. Though no harm.
const new_state = {...store.state(), ...new_state};

//system will create an action type
store.update(new_state);

//prvoide custom action type
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
const middlewares = [...] // refer to applyMiddleware usage
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
