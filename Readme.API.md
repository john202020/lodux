# Single store management for web modules.
Single store in a one-way observable pattern.

# API

## {Store}
__subscribe(callback_fn): disposable__  
Subscribe to changes of the entire store state
```javascript
const {Store} from "lodux";

const d = Store.subscribe(() => { 
    //entire store state has some change(s)
    ...
    //observe only once
    d.dispose();
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
const d = store.reduce(type, action => { 
    // observes only once
    d.dispose();

    const new_state  = { count: store.state ? store.state.count + action.amount : action.amount };

    // includes action as a property of store state
    // return {...store.state, ...new_state, action};

    return {...store.state, ...new_state};
});

```
__dispatch(action[, (disposable)=>{}])__  
(disposable)=>{} is the function that observes the reducer's return.
```javascript
store.dispatch({type:'add person', name:'Sam'});

store.dispatch({type:'add person', name:'Sam'}, d => {
    // reducer has just returned
    ...    
    //stop observing reducer's return
    d.dispose();
});
```
##### (Anomaly)
When there is multiple reducers corresponding a dispatcher.  
<small>(This style of usage is not recommended for normal application)</small>
```javascript
const store = Store.createStore();

store.diduce({ type: 'initial', count: 0 });

store.reduce('add', action => ({ ...store.state, index: 1, count: store.state.count + action.amount }));
store.reduce('add', action => ({ ...store.state, index: 2, count: store.state.count + action.amount }));
store.reduce('add', action => ({ ...store.state, index: 3, count: store.state.count + action.amount }));

store.dispatch({ type: 'add', amount: 1 }, d => {
    if (store.state.index === 1) 
        console.log('count', store.state.count);//count 1
    if (store.state.index === 2)
        console.log('count', store.state);//count 2
    if (store.state.index === 3) {     
        //stop further observing reducers' return.
        d.dispose();
        console.log('count', store.state);//count 3
    }
});
```

__diduce(action)__  
Consider `diduce()` as `dispatch()` plus internal `reduce()`.  

Internally it invokes a full dispatch/reduce cycle. The internal reducer will first remove the property 'type' of the action and then return {...store.state, ...new_state}.  

Standard usage of diduce()
```javascript
store.diduce({type: 'initial', count: 0});

let type = 'add';
// prepare new state (internal reducer)
let new_state = { count: store.state.count + 1 };
store.diduce({type, ...new_state});

type = 'minus';
// prepare new state (internal reducer)
new_state = { count: store.state.count - 1 };
store.diduce({type, ...new_state});
```

__subscribe(callback_fn): disposable__  
Subscribe to changes of this store state.
```javascript
const d = store.subscribe(() => {
     ...
     // stop observing
     d.dispose();
});
```

__use(array of middlewares): store (cloned)__  
Firstly, it clones the store, then applies the middleware to the `cloned store`.  

### middleware plugins
Following Redux's guidelines to middleware.  
store => next => ( action[, subscription => {}] ) => { 
    return next(action[, subscription => {}]); 
}.  
```javascript
//subscription => {} as feedback_fn, is optional but recommended.
const log = store => next => (action, feedback_fn) => {
            //.. do somthing like logging the action
            return next(action, feedback_fn);
        };

const middlewares = [log];
...
const cloned_store = store.use(middlewares);
```

