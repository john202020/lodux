import { Store } from '../../index.js';
const stringify = JSON.stringify;

test("expected diduce()", () => {

  const action = { type: 'test middle', ok: 1 };
  const store = Store.createStore();

  store.diduce(action);
  const S = Store.state()[store.name];
  const s = store.state();
  expect(S).toBe(s);
  expect(stringify({...s, ...action})).toBe(stringify(s));
  
});
