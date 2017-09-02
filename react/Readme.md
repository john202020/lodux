# Single store management for react component.
Connects [`lodux`]( https://www.npmjs.com/package/lodux) store and [`react`](https://facebook.github.io/react/) component.

## Principles 
1. 'creator':  
A 'creator' is a function of dispatchers and reducers, similar to `redux`. Then `connect(the react class, creator)`.

2. activities:  
properties of the dispatchers will be the core of store activities. Use `store['a dispatcher property']` to trigger the corresponding dispatcher, then `lodux/react` will trigger react's `setState()` to update the `react` renderer.

__summary__  
trigger a dispatcher -> reducer -> `lodux/react` trigger `react`'s `setState()` -> `react` renderer refresh

## Example
```javascript
import React, { Component } from 'react';
import { Store, connect } from "lodux/react";

class Counter extends Component {
    
    public render() {
        return <div>
            <p>Current count: {this.state.count}</p> &nbsp;
            <a href="#" onClick={()=>store.add(10)}>add</a>
        </div>
    }
}

const creator = store => {    
    store.reduce('add', action => ({ count: store.state.count + action.amount }));
   
    //dispatchers
    return {
        add: amount => { store.dispatch({ type: 'add', amount }); }
    };
};

const initial_state = {count: 13};
const store = connect(Counter, creator, initial_state).done();
```

## API

__creator__ is a collection of dispatchers and reducers. 

```javascript
const creator = store => {
    store.reduce('add', action => ({ ...store.state, count: store.state.count + action.amount} })); 

    //dispatchers
    return {
        add: amount => { store.dispatch({ type: 'add', amount }); }
    };
};

//An alternative is by using the store.diduce(), it frees you from writing reducers. 
const creator = store => {
    //dispatchers
    return {
        add: amount => {
            store.diduce({type:'add', count: store.state.count + amount});
        }
    };
};
```

### Binder
It binds `lodux` to `React` component. Binder invocation is chainable and communtative (order is irrelevant). 

__connect(class, creator, initial_state): binder__  
<small>(starting from version 1.2.117, initial_state is compulsory)</small>  
```javascript
const initial_state = { count: 0 };
const binder = connect(Counter, creator, initial_state);
```

__applyUndoable(): binder__  
This will add additional methods (undo, redo) to the store, and `applyUndoable()` internally rearranges the store state into {stack[state], future:[]}.  
```javascript
public render() {    
    return <div>
        <p>Current count: {this.state.count}</p> &nbsp;
        <a onClick={() => store.add(10)}>add</a> <br/>
        <a onClick={store.undo}>undo</a> &nbsp;
        <a onClick={store.redo}>redo</a>
    </div>
}

binder = binder.applyUndoable();

const store = binder.done();

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
```

### {store}
```javascript
const store = binder.done();
```

__setState(new_state)__  
store.setState() is synchronous.  
<s>Property 'type' is not allowed in new_state.</s>  
<strong>Make sure not to mix lodux/react setState() and reactjs setState() in an application.</strong>  
Learn more about [React's State Updates May Be Asynchronous](https://facebook.github.io/react/docs/state-and-lifecycle.html)
```javascript
const store = binder.done();

store.setState({count: 1});
//or adding some value
store.setState({count: store.state.count + 1});

// Wrong mixing state managements
store.setState({count: this.state.count + 1});
```
### Custom Route
Handy method to composite Route with layout. Props (except {layout, component}) of CRoute will be passed to the component and layout.
```javascript
import React from 'react';
import { Switch, Route } from "react-router-dom";
import { CRoute } from "lodux/react";
import HomeLayout from "./HomeLayout";
import Home from "./Home";
import PageOne from "./Pageone";

export default function(props){
    const CustomRoute = CRoute( React, Route );

    return <Switch>
        <CustomRoute path="/" exact component={Home} layout={HomeLayout} />
        <CustomRoute path="/pageone" exact component={Pageone} />        
        <Route component={NotFound} status={404} />
    </Switch>
}
```
Pageone.jsx
```javascript
import React from 'react';

export default function(props) {
    return <div>This is page one!</div>;
  }
}
```
Home.jsx
```javascript
import React from 'react';

export default function(props) {
    return <div>Hello my friend, this is the home page!</div>;
  }
}
```
HomeLayout.jsx
```javascript
import React from 'react';

export default function(props) {
    return <div>
            <div>some heading</div>
            {props.children}
            <div>some footing</div>
    </div>;
  }
}
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
const lodux_othername = lodux.noConflict();

const {Store, connect, CRoute} = lodux_othername.react;
```

## [Deprecated](Deprecated.md)