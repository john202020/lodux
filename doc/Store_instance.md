# Immutable single store state management.  
# lodux 2.0.0

## store instance

__state__  
Immutable state of the store instance. 
```javascript
store.state = {count : 0};

// state.count will always be 0 from now on
const state = store.state;

store.subscribe(()=>{
    // when store.state.count = 1;
    console.log(store.state.count);
});

// setting the current immutable state new state
store.state.count = 1;

const count = state.count; // still {count:0}

const store_state_count = store.state.count; // it has the new state {count:1}
```

__history__  
The READONLY [history](Store_instance_history.md) of states. 
```javascript
store.state = {
    c: {
        a: {
            b: 'b'
        }
    }
};

store.state.c.a.b = 'bb';

store.history.back(); // move history back one step and return that state
store.history.to(0); // move the history to initial state and return that state
store.history.get(0); // return the history state at index 0
store.history.state; // return the pointed history state (at index 0);
store.history.index; // reutrn the pointed index (at index 0);
```

__reduce(type: non empty string, callback_fn):  disposable__  
```javascript
const disposable = store.reduce(type, action => { 
    if(disposable)
    {     
        // stop further observation
        disposable.dispose();
    }
    disposable = undefined;

    const amount = action.amount;

    return {
            ...store.state, 
            count: store.state ? store.state.count + amount : amount,
            type
        };
});
```

__dispatch(action [, disposable => {}])__  
disposable=>{} is the function that observes the reducer's return.
action.type must be non empty string.  
```javascript
store.dispatch({type:'add person', name:'Sam'}, disposable => {
    // reducer has just returned
    if(disposable)
    {
        //stop observing reduce's feedback
        disposable.dispose();
    }
    ...    
});
```

__update(action)__   
Internally it invokes a full dispatch/reduce cycle.  

The action is in fact the new state (i.e. internal reducer will return this new state). action.type is optional.;

Standard usage of update()
```javascript
store.update({...store.state, count: 0});
```

__subscribe(callback_fn): disposable__  
Subscribe to changes of this store state.
```javascript
const disposable = store.subscribe(() => {
     ...
});

// stop observing
if(disposable){
    disposable.dispose();
}
disposable = undefined
```

__use(array of middlewares): store (cloned)__  
First, it clones the store, then applies the middleware to the `cloned store`.  
note: it applies only to the explicit dispatch (i.e. store.dispatch()), not to the internal implied dispatch (i.e. not to the store.update() nor store.state = {}).  

#### middleware plugins
Redux's style middleware.  
store => next => ( action [, subscription => {}] ) => { 
    return next(action[, subscription => {}]); 
}.  
```javascript
//subscription => {} is optional.
const log = store => next => (action, feedback_fn) => {
    //.. do somthing like logging the action
    return next(action, feedback_fn);
};
...
const cloned_store = store.use([log]);
```

__clone()__  
```javascript
const cloned_store = store.clone();
```