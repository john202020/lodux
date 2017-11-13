# Single store management for react component.
Connects [`store` instance]( https://www.npmjs.com/package/lodux) and [`es6 proxy`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Proxy).

### Usage
```javascript
import {Store} from "lodux;

const store = Store.createStore().proxy();
store.subscribe(()=>{
  console.log(store.state);
});

//internally store.update({ ...store.state, count:0 }) be invoked
store.count = 0;

//internally store.update({ ...store.state, name:0 }) be invoked
store.name = 'testing';

//internally store.state.name will be returned
const name = store.name;

```
