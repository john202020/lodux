# Connects store to react functional component using recompose.

Turns react functional component to 'stateful' component. Whenever store is updated, the comopnent will be updated. 


## Usage
```javascript
import { lifecycle } from 'recompose';
import { Store, recompose } from "lodux";

const store = Store.createStore('news');

const News = recompose.state(lifecycle)({
    store,
    Comp: props=><div>{store.state.count}</div>
});

```

## componentWillMount
If prerender is needed, place an options object as below.
```javascript
const News = recomposeState({
    store,
    Comp: ListNews,
    options: {
        componentWillMount: () => {
            // do some preparation
        }
    }
});
```
