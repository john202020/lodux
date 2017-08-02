
import { Store } from '../../index.js';
const stringify = JSON.stringify;

test("expected dispatch_reduce()", function () {

    var action = { type: 'test middle', ok: 1 };
    var store = Store.createStore();
    
    store.reduce(action.type, function (action) { return action; });
    store.dispatch(action);
    var S = Store.state()[store.name];
    var s = store.state();
    expect(S).toBe(s);
    expect(stringify({...s, ...action})).toBe(stringify(s));

});
