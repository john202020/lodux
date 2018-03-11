# Immutable single store state management.  
# lodux 2.0.0
lodux version 2.0.0 is a rewrite of the store management. 
It incorporates immutable state management. Directly assign store.state can be done and can be done on multiple level.
  
## [API](API.md)

## [Anomaly](Anomaly.md)

## Store(capital S)  
It is the collection of all stores, the 'entire store'.  

It has two methods, `createStore()`, and `subscribe()`.  

## store (lowercase s)
A store instance is the key of immutable state management.  

Two most important properites are `state`, `subscribe()`.
Plus six supplemental properties. `dispatch()`, `reduce()`, `update()`, `clone()`, `use()`, and `history`.  

## Principles:
1. action and state are required to be [JSON safe](JSONSafe.md). 
2. store.state assignment is immutable.
3. null argument is considered illegitimate, error will be thrown.
4. using `this` within callbacks will not be guaranteed.
5. methods, subscriptions, and callbacks are synchronously executed.
6. store instance will not affect other store instance, except cloned store.

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
