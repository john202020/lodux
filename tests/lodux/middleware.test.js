
import { Store } from '../../index.js';

const stringify = JSON.stringify;

diduce_middleware();
dispatch_reduce_middleware();

function diduce_middleware() {

  test("diduce should not affect store", () => {
    const { store, wares, clone_store, action } = material();
    
    const expectedMiddlewareTrace =0;
    
    store.diduce(action);
    const S = Store.state()[store.name];
    const s = store.state();
    expect(S).toBe(s);
    expect(stringify({...s, type:'test middle', ok:1})).toBe(stringify(s));

    expect(wares.middletrace.length).toBe(expectedMiddlewareTrace);

  });

  test("diduce should affect clone_store", () => {
    const { store, wares, clone_store, action } = material();
    
    const expectedMiddlewareTrace =2;

    clone_store.diduce(action);
    const S = Store.state()[clone_store.name];
    const s = clone_store.state();
    expect(S).toBe(s);
    expect(stringify({...s, type:'test middle', ok:1})).toBe(stringify(s));
    expect(wares.middletrace.length).toBe(expectedMiddlewareTrace);

  });

}

function dispatch_reduce_middleware() {

  test("dispatch_reduce should not affect store", () => {
    const { store, wares, clone_store, action } = material();

    store.diduce(action);
    store.reduce(action.type, action => action);
    store.dispatch(action);
    const S = Store.state()[store.name];
    const s = store.state();
    expect(S).toBe(s);
    expect(stringify({...s, type:'test middle', ok:1})).toBe(stringify(s));

    expect(wares.middletrace.length).toBe(0);

  });


  test("dispatch_reduce should affect clone_store", () => {
    const { store, wares, clone_store, action } = material();

    clone_store.reduce(action.type, action => action);
    clone_store.dispatch(action);
    const S = Store.state()[clone_store.name];
    const s = clone_store.state();
    expect(S).toBe(s);
    expect(stringify({...s, type:'test middle', ok:1})).toBe(stringify(s));

    expect(wares.middletrace.length).toBe(2);

  });
}


function material() {
  const store = Store.createStore();
  const wares = middletracer();
  const clone_store = store.use(wares.ware1.concat(wares.ware2));
  const action = { type: 'test middle', ok: 1 };

  return { store, wares, clone_store, action };


  function middletracer() {

    const middletrace = [];

    const ware1 = [store => next => (action, feedback_fn) => {

      middletrace.push("middleware1");
      return next(action, feedback_fn);

    }];

    const ware2 = [store => next => (action, feedback_fn) => {

      middletrace.push("middleware2");
      return next(action, feedback_fn);

    }];

    return { ware1, ware2, middletrace };
  }

}