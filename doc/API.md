# Immutable single store state management.  
# lodux 2.0.0

## {Store}

__createStore([name: non empty string]): store__  
name, if it is provided, it must be non empty string
```javascript
const {Store} from "lodux";
const store = Store.createStore();
```
__subscribe(callback_fn): disposable__  
Subscribe to any changes of the entire store state
```javascript

const disposable = Store.subscribe(() => { 
    //entire store state has some change(s)
    ...
    //unsubscribe
    disposable.dispose();
});
```

## store instance
## [API](Store_instance.md)