# Single store management for react component.
Connects [`lodux`]( https://www.npmjs.com/package/lodux) store and [`react`](https://facebook.github.io/react/) component.

To start, 
1. write a 'creator':  
A 'creator' is a function of dispatchers and reducers, similar to `redux`. Then `connect(the react class, creator)`.

2. within the `constructor()` of React component:  
set the state as `this.state = store.state`. Here the `store.state` is the value of initial store state. 

3. And within the `render()` of React component:  
reading the state is the ordinary react `this.state.someproperty`. 

4. For activities (updating state):  
properties of the dispatchers will be the core of state activities. Use `store['any one of the dispatchers property']` to trigger the corresponding dispatcher, then `lodux/react` will trigger react's `setState()` to update the `react` renderer.

__summary__  
trigger a dispatcher -> reducer responses  and update store state -> `lodux/react` trigger `react`'s `setState()` -> `react` renderer refresh

### Example
```javascript
import React, { Component } from 'react';
import { Store, connect } from "lodux/react";

class Counter extends Component {
    constructor() {
        super();
        this.state = store.state;
    }

    public render() {
        return <div>
            <p>Current count: {this.state.count}</p> &nbsp;
            <a href="#" onClick={()=>store.add(10)}>add</a>
        </div>
    }
}

const creator = store => {
    const dispatchers = {
        add: amount => { store.dispatch({ type: 'add', amount }); }
    };
    
    store.reduce('add', action => ({ count: store.state.count + action.amount }));
   
    return dispatchers;
};

const initialState = { count: 13 };

const store = connect(Counter, creator).done();
store.diduce({type:'initial', ...initialState});
```

## API

__creator__  
'creator' is a collection of dispatchers and reducers. 

```javascript
const creator = store => {
    const dispatchers = {
        add: amount => { store.dispatch({ type: 'add', amount }); }
    };
    
    store.reduce('add', action => ({ ...store.state, count: store.state.count + action.amount} })); 

    return dispatchers;
};

//An alternative is by using the store.diduce(). Using this alternative free you from writing reducers. 
const creator = store => {
    const dispatchers = {
        add: count => {
            store.diduce({type:'add', count: store.state.count + action.count});
        }
    };
    
    return dispatchers;
};
```

### Binder
It binds `lodux` to `React` component. Binder invocation is chainable and communtative (order is irrelevant). 

__connect(class, creator): binder__  
```javascript
const binder = connect(Counter, creator);
```

__applyUndoable(): binder__  
This will add additional methods (undo, redo) to the store, and `applyUndoable()` internally rearranges the store state into {stack[state], future:[]}.  
```javascript
public render() {    
    return <div>
        <p>Current count: {this.state.count}</p> &nbsp;
        <a onClick={() => store.add(10)}>add</a> &nbsp;

        <a onClick={()=>store.undo()}>undo</a> &nbsp;
        <a onClick={()=>store.redo()}>redo</a>
    </div>
}

binder = binder.applyUndoable();

//additional properties will be attached to the store
const { state, raw_state /**stack and future**/, undo, redo, add } = store
```

__applyMiddleware(): binder__  
```javascript
const log = store => next => (action, func) => {
            console.log('log dispatches action', action);
            return next(action, func);
        };

const binder = binder.applyMiddleware([log]);
```

__done: store__  
done() should be the last call because it will break the chain and return a store.
```javascript
//communtative chain invocation
binder = binder.applyUndoable().applyMiddleware([log]);
//same as 
binder = binder.applyMiddleware([log]).applyUndoable();

const store = binder.done();
```

__store.setState(new_state)__  
Property 'type' is not allowed in new_state.
```javascript
const store = binder.done();

store.setState({count: 1});
```

## testing with HMR
When testing with [`react-hot-loader`](https://github.com/gaearon/react-hot-loader), you might find the whole page being reloaded rather than modular refresh.   

It is because `react-hot-loader` needs to set up duplicate modules. Duplicate modules leads to duplicate stores. The problem is that `lodux` will throw error when there are duplicate stores. When `react-hot-loader` encounters exception, it reloaded the whole page.   

To enable modular refresh, set the Store configuration to recognize HMR before doing any `lodux/react` binding.
```javascript
Store.config({ isHMR: true });
```

## Download from script tag
&lt;script src="where /dist/lodux.js is located">&lt;/script>
```javascript
//if in conflict
var lodux = lodux.noConflict();

var react_lodux = lodux.react;
var Store = lodux.react.Store;
var connect = lodux.react.connect;
```