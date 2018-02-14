# Immutable single store state management.  
# lodux 2.0.0

## store instance history
Provides readonly history of states.


## Principles:
1. history store successful updated state.  

__start()__  
Start recording state history.
```javascript
store.history.start();
```
__stop()__  
Stop recording state history.
```javascript
store.history.start();
```
__back()__  
Moves history pointer one step back and return the pointed history state. If history pointer was on initial index, no action and return the initial state.
```javascript
let history = store.history.back();
```
__next()__  
Moves history pointer one step forward and return the pointed history state. If history pointer was on the last index, no action and return the last state.
```javascript
let history = store.history.next();
```
__to(index)__  
Moves history pointer to the specified index and return the pointed history state. 
If index out of bound, do not move history pointer and return undefined. 
```javascript
let history = store.history.to(0); 
```
__get(index)__  
Returns the pointed history state without moving the history pointer. 
If index out of bound, return undefined.
```javascript
let history = store.history.get(0); 
```
__state__  
Returns the pointed history state. 
```javascript
let history = store.history.state;
```
__index__  
Returns the pointed index. 
```javascript
let index = store.history.index;
```