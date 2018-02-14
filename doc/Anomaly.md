# Single store management for web modules.
Following usage is not recommended for normal application

## Anomaly
When there are multiple reducers to a dispatcher.  
```javascript
const store = Store.createStore();

store.update({ type: 'initial', count: 0 });

store.reduce('add', action => ({ type:'add', index: 1, count: store.state.count + action.amount }));
store.reduce('add', action => ({ type:'add', index: 2, count: store.state.count + action.amount }));
store.reduce('add', action => ({ type:'add', index: 3, count: store.state.count + action.amount }));

store.dispatch({ type: 'add', amount: 1 }, d => {
    if (store.state.index === 1) 
        console.log('count', store.state.count);//count 1
    if (store.state.index === 2)
        console.log('count', store.state);//count 2
    if (store.state.index === 3) {     
        if(d)
        {
            //stop observing reducers' return.
            d.dispose();
        }
        console.log('count', store.state);//count 3
        console.log('done');
    }

    // ouput for one dispatch invocation
    // count 1
    // count 2
    // count 3
    // done

});
```

