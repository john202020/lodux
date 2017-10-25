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
