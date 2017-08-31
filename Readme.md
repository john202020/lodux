# Single store management for web modules.
Single store state management in a one-way observable pattern. Similar to Redux.

## [lodux/react](react)
Connects [`lodux`]( https://www.npmjs.com/package/lodux) store and [`react`](https://facebook.github.io/react/) component.

## [lodux/vue](vue)
Connects [`lodux`]( https://www.npmjs.com/package/lodux) store and [`vuejs`](https://vuejs.org/) component.

## [API](Readme.API.md)

## Store(capital S)  
It is the collection of all stores, the 'entire store'.  

It has `createStore()` creates a unique store, `subscribe()` observes state changes of the entire store, and `reset_initial()` update the entire store to its initial state. One property, `state` returns a snapshot of the entire store state.

## store instance
Each web module should have a unique store. A store instance has `dispatch()` an action, `reduce()` returns new store state, `diduce()` simplifies dispatch/reduce cycle, `subscribe()` observes state changes of this store, and `use()` applies middlewares to it's `cloned store`. One property, `state` returns a snapshot of this store state.  

Store instances will not affect each other.

## Principles:
1. action and state are required to be JSON serializable.
2. use reducer to update the store state. directly update store state will throw error.
3. there is no need to set an initial store state.
4. never try to pass null argument, because error will be thrown.
5. using `this` will not be guaranteed.
6. methods, subscriptions, and callbacks are synchronously executed.

## store instance vs cloned store instance
A store and its cloned store share the same store state. Cloned store serves as a separate working space for applying middlewares.

```javascript
const store = Store.createStore('project1');
const cloned_store = store.use(middlewares1);

// ignored by the middlewares1
store.dispatch({type : 'call', name : 'Tom'});

// intercepted by the middlewares1
cloned_store.dispatch({type : 'call', name : 'Mary'});
```

## Simple usage
```javascript
import { Store } from "lodux";

const store = Store.createStore();

store.reduce("add person", action => {
    let new_state;// do something to get the new state  
    return { ...store.state, ...new_state };
});

const action = {type : 'add person', name : 'Sam', age : 10};
store.dispatch(action);
```

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
