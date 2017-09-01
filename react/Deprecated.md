# Single store management for react component.

### Deprecated Principles 
1. within the `constructor()` of React component:  
<small>(starting from version 1.2.118, constructor() implementation of this.state will be overrided by connect())</small>  
2. set state as `this.state = store.state`. Here the `store.state` is the value of initial store state.  