# Single store management for web modules.
Single store in a one-way observable pattern. Similar to Redux.

## `Store`(capital S)  
It is the collection of all stores, or the 'entire store'. It has four methods, `createStore()` creates a unique store, `subscribe()` observes state changes of the entire store, and `state()` returns snapshot of the entire store state, `reset_initial()` update the entire store to its initial state (trigger Store's subsriber handler).

## store instance
Usually, each web module should obtain a unique store. A store instance can `dispatch()` an action, `reduce()` its store state, `state()` returns snapshot of the store state, `diduce()` simplify dispatch/reduce cycle, `subscribe()` observes state changes of this store, `use()` apply middlewares to the `cloned store`.  A store will not affect other store.

## clone store instance
A clone store shares the same data, kind of the twins. It serves as a separate working space for applying middlewares.

```javascript
const store = Store.createStore('project1');
const clone_store = store.use(middlewares1);

// ignored by middlewares1
store.dispatch({type: 'call', name:'Tom'})
// intercepted by middlewares1
clone_store.dispatch({type:'call',name:'Mary'})
```

## disposable  
subscribe(), reduce(), and dispatch() return disposable. Disposing will stop further observing.  
<small>Starting from 0.2.36, Disposable will be passed to the feedback_fn.</small>

## Principles:
1. action and state are required to be JSON serializable.
2. never try to change store state directly, cause it will not take effect. use reducer to do the change.
3. there is no need to set an initial store state.
4. never try to pass null argument, because error will be thrown.
5. `this` is intentionally not being used. do not try to use `this`, as in other frameworks (i.e. jquery). using `this` to reference store or any reference will not be guaranteed.
6. Method and subscription are synchronous execution.

## Example
```javascript
import {Store} from "lodux";

//each store is unqiue
const store = Store.createStore();

//set up reducer before dispatch
store.reduce("add person", functiom(action){
    return {...store.state(),  ...action};
});

store.dispatch({type:'add person', name:'Sam'});
```

## middleware plugins
Following Redux's guidelines to middleware.  
store => next => ( action[,feedback_fn] ) => { return next(action[,feedback_fn]); }.  
```javascript
//feedback_fn is optional but recommended.
const log = store => next => (action, feedback_fn) => {
            //.. do somthing like logging the action
            return next(action, feedback_fn);
        };
```

# npm installation
```javascript
npm install --save lodux
```

# notes
ES6 compilation (e.g. webpack ES6 configuration).  
No dependencies.  


# Others

## [API](Readme.API.md)

## [Deprecated properties](Readme.deprecated.md)
