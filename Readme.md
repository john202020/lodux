# Immutable state management.  
# lodux 2.0.0

lodux version 2.0.0 is a rewrite of the store management. 
It incorporates immutable state management. store.state assignment can be done and can be done on multiple level.


## Store(capital S)  

It is the collection of all stores, the 'entire store'.  

It has two methods, `createStore()`, and `subscribe()`.  

## store (lowercase s)
A store instance is the core of the immutable state management.  

Two most important properites are `state`, `subscribe()`.
Plus six supplemental properties. `dispatch()`, `reduce()`, `update()`, `clone()`, `use()`, and `history`.  

## Principles:
1. action and state are required to be [JSON safe](JSONSafe.md). 
2. store.state (and deep down level) assignment is immutable.
3. null argument is considered illegitimate, error will be thrown.
4. using `this` within callbacks will not be guaranteed.
5. methods, subscriptions, and callbacks are synchronously executed.
6. store instances will not affect each other, except its cloned store.

## Simple usage
```javascript
store.state = {type: 'add person', name: 'Sam', age :10};
//{ type: 'add person', name: 'Sam', age :10}

store.state.status = 'boss';
//{ status: 'boss', name: 'Sam', age :10}

store.state.report = {sales: 'Singapore'};
//{ report:{sales:'Singapore'}, status: 'boss', name: 'Sam', age :10}

store.state.report.sales = 'Singapore and Malaysia';
//{ report:{sales:'Singapore and Malaysia'}, status: 'boss', name: 'Sam', age :10}
```


## {Store}

__createStore([name: non empty string]): store__  
name, if it is provided, it must be non empty string
```javascript
const {Store} from "lodux";
const store = Store.createStore();
```
__subscribe(callback_fn): disposable__  
Subscribe to any changes of the entire store state
```javascript
const disposable = Store.subscribe(() => { 
    //entire store state has some change(s)
    ...
});
//unsubscribe
disposable.dispose();
```


## store instance

__state__  
Immutable state of the store instance.   
The store.state assignment must be a non-primitive type.
```javascript
store.state = {
    count : 0, 
    patients:{'James':{name:'James', age:30}}
};

// state.count will always be 0 from now on
const state = store.state;

let sub = store.subscribe(()=>{
    sub.dispose();
    sub = undefined;
    // when store.state.count = 1;
    console.log(store.state.count);
});

// setting the current immutable state new state
store.state = {...store.state, count: 1};

store.state.patients = {
    ...store.state.patients, 
    'Peter':{name:'Peter', age:28}
}

sub = store.subscribe(()=>{
    sub.dispose();
    sub = undefined;
    // when store.state.count = 2;
    console.log(store.state.count);
});

store.state = {...store.state, count: 2};

console.log(state.count); // still count=0

console.log(store.state.count); // count=2
```

__history__  
The READONLY [HISTORY](doc/Store_instance_history.md) of the store. 
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


## store instance and its clone
A cloned store shares the same state to its store. A cloned store serves as a separate working space for middlewares and explicit dispatch().

```javascript
import { Store } from "lodux";

const store = Store.createStore();

const middlewares1;
// ... create the middlewares1

const cloned_store = store.use(middlewares1);

// is ignored by the middlewares1
store.dispatch({type : 'call', name : 'Tom'});

// will be intercepted by the middlewares1
cloned_store.dispatch({type : 'call', name : 'Mary'});
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




## [Anomaly](doc/Anomaly.md)


## Attention
1. state management uses es6 functionalities (e.g. Proxy). 
2. special attention to the value -0 (literal negative zero). 
error will be thrown when passing -0 to the state.  

## Removed
React, Vue and Recompose modules are removed. To use those modules, use version 1.5.11.


# installation
```javascript
npm install --save lodux
```

# load from script tag
&lt;script src="where /dist/lodux.js is located">&lt;/script>
```javascript
//if in conflict
const {Store} = lodux.noConflict();
```

Versions
2.0.19 - 
1. fixed undefined assignment to sub level of store.state is allowed.
