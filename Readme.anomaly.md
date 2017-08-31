# Single store management for web modules.
Following usage is not recommended for normal application

## Anomaly
When there is multiple reducers corresponding a dispatcher.  
```javascript
const store = Store.createStore();

store.diduce({ type: 'initial', count: 0 });

store.reduce('add', action => ({ ...store.state, index: 1, count: store.state.count + action.amount }));
store.reduce('add', action => ({ ...store.state, index: 2, count: store.state.count + action.amount }));
store.reduce('add', action => ({ ...store.state, index: 3, count: store.state.count + action.amount }));

store.dispatch({ type: 'add', amount: 1 }, d => {
    if (store.state.index === 1) 
        console.log('count', store.state.count);//count 1
    if (store.state.index === 2)
        console.log('count', store.state);//count 2
    if (store.state.index === 3) {     
        //stop further observing reducers' return.
        d.dispose();
        console.log('count', store.state);//count 3
    }
});
```

