# Single store management for web modules.
Single store in a one-way observable pattern. Similar to Redux.

This is the first stable `version 1`.

## `Store`(capital S)  
It is the collection of the 'entire store' (all stores).  

It has `createStore()` creates a unique store, `subscribe()` observes state changes of the entire store, and `reset_initial()` update the entire store to its initial state (trigger Store's subsriber handler). One property, `state` returns snapshot of the entire store state.

## store instance
Each web module should have a unique store. A store instance has `dispatch()` an action, `reduce()` returns new store state, `diduce()` simplifies dispatch/reduce cycle, `subscribe()` observes state changes of this store, and `use()` applies middlewares to the `cloned store`. It has one property, `state` returns snapshot of this store state.  

Store instances will not affect each other. 

## cloned store instance
A store and its cloned store share the same store state. Cloned store serves as a separate working space for applying middlewares.

```javascript
const store = Store.createStore('project1');
const cloned_store = store.use(middlewares1);

// ignored by middlewares1
store.dispatch({type: 'call', name:'Tom'});

// intercepted by middlewares1
cloned_store.dispatch({type:'call',name:'Mary'});
```

## disposable  
subscribe(), reduce(), and dispatch() return disposable.

## Principles:
1. action and state are required to be JSON serializable.
2. use reducer to update the store state. directly update store state will not take effect. 
3. there is no need to set an initial store state.
4. never try to pass null argument, because error will be thrown.
5. using `this` will not be guaranteed.
6. method and subscription are synchronously executed.

## Example
```javascript
import {Store} from "lodux";

const store = Store.createStore();

store.reduce("add person", action => {

    let new_state;// do something to get the new state  
    return {...store.state,  ...new_state, action};

});

store.dispatch({type:'add person', name:'Sam', age: 10});
```

## middleware plugins
Following Redux's guidelines to middleware.  
store => next => ( action[, (subscription)=>{}] ) => { return next(action[, (subscription)=>{}]); }.  
```javascript
//(subscription)=>{} as feedback_fn, is optional but recommended.
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

## [Obseleted properties](Readme.obseleted.md)
