
import lodux, { Store } from "lodux";

import React, { Component } from 'react';
import { connect } from "react-lodux";

const creator = store => {
  const dispatchers = {
    add: count => store.diduce({ type: 'add', count: store.state().count + count }),
    minus: count => store.diduce({ type: 'minus', count: store.state().count - count }),
    reset: () => {
      Store.reset_initial();
    }
  };

  return { dispatchers };
};

function log(store) {
  return function (next) {
    return function (action, func) {
      //  console.log('log dispatches action', action);
      return next(action, func);
    };
  };
}

const comp = class comp extends Component { render() { return '<p></p>' } };
const initialState = { ok: 1, count: 0 };

const store = connect.bind(lodux)(comp, creator)
  .applyMiddleware([log])
  .applyUndoable()
  .done();

store.diduce({ type: 'initial', ...initialState });
//count = 0;

test("after add(1), store.state().count === 1", () => {
  store.add(1);
  expect(store.state().count).toBe(1);
  expect(store.state().type).toBe('add');
});

test("after undo()", () => {
  store.undo();
  expect(store.state().count).toBe(0);
  expect(store.state().type).toBe('initial');
});

test("after minus(3), store.state().count === -3", () => {
  store.minus(3);+
  expect(store.state().count).toBe(-3);
  expect(store.state().type).toBe('minus');

});

test("after undo()", () => {
  store.undo();
  expect(store.state().count).toBe(1);
  expect(store.state().type).toBe('add');
});
