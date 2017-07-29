
## Deprecated

### {applyMiddleware}

__applyMiddleware(store, array of middlewares): <s>new store instance</s> store (cloned)__  
First clone the store, then apply the middleware to the cloned store.  
<small>@deprecated since version 0.2.62. Use store.use() instead.</small>
```javascript
import { Store, applyMiddleware } from "lodux";

const log = function(store){ 
    return function(next){ 
        return function(action) {
            console.log('log', action);
            return next(action);
        }
    }
};

//applyMiddleware(store instance, array of middlewares)
const store = Store.createStore();
const cloned_store = applyMiddleware(store, [log]);
```

### {util}
Sometimes it is handy to have shortcuts to accomplish simple task.  

__<s>update(store, state[, type:string])</s>__  
<small>@deprecated since version 0.1.34. Use store.update() instead.</small>

Internally, it set up reducer first, then dispatch the state in the form of action. Reducer will update the store exactly as the state is provided. 
'type', if provided, will be the custom action type (system prefix will be prepended).
```javascript
import {util} from 'lodux';
...
util.update(store, state);

//prvoide custom action type
util.update(store, state, 'update user name');
```
