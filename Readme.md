# Single store management for web modules.
Single store in a one-way observable pattern.

## `Store`(capital S)  
It is the collection of all stores, or the 'entire store'. It has four methods, `createStore()` creates a unique store, `subscribe()` observes state changes of the entire store, and `state()` returns the entire store state, `reset_initial()` update the entire store to its initial state (trigger Store's subsriber handler).

## store instance
Usually, each web module should obtain a unique store. Similar to Redux, a store can `dispatch()` an action, `reduce()` its store state, `state()` returns its store state, `update()` mimic dispatch/reduce updating the store state, `subscribe()` observes state changes of this store, `use()` apply middlewares to the `cloned store`.  A store will not affect other store.

## cloned store instance
A cloned store shares the same data under the hood, kind of the twins. It serves as a separate working space for applying middlewares.

```javascript
const store = Store.createStore('project1');
const cloned_store = store.use([middleware1, ...]);

store.dispatch({type: 'call', name:'Tom'}) // ignored by middleware1, ...
clone_store.dispatch({type:'call',name:'Mary'}) // intercepted by middleware1, ...
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
store => next => action => { return next(action); }.  
```javascript
//to not include feedback_fn
const log = store => next => action => {
            //.. do somthing like logging the action
            return next(action);
        };

//to include feedback_fn
//since middleware intercept dispatch, manually indicating feedback_fn as the second argument is required
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
Lightweight.  
No dependencies.  


# Others

## [API](Readme.API.md)

## [Deprecated properties](Readme.deprecated.md)
