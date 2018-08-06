import { isPrimitive } from "../helpers/helper";
import { proxy_state } from "./proxy_state";
declare const WeakMap;

export const proxies_watcher = new WeakMap();

export function proxy_state_deep(store, value) {

  if (isPrimitive(value)) {
    return value;
  }

  return proxy_state(store, Array.isArray(value) ?
    value.map(v => proxy_state_deep(store, v)) :
    Object.keys(value).reduce((acc, k) => {
      return { ...acc, [k]: proxy_state_deep(store, value[k]) };
    }, {})
  )
}


export function bubble(the_state, target, prop, value) {
  return { ...the_state, ...bubble_(the_state, target, prop, value) };
}


function bubble_(state, target, prop, value) {

  if (isPrimitive(state)) {
    return undefined;
  }

  if (proxies_watcher.get(state) === target) {
    return { [prop]: value };
  }

  for (let k in state) {
    const rr = bubble_(state[k], target, prop, value);

    if (rr) {
      if (Array.isArray(state[k])) {
        const keyof_rr = Object.keys(rr)[0];
        if (state[k][keyof_rr]) {
          return {
            [k]: state[k].map((s, i) => rr[i] || s)
          };
        }
        return {
          [k]: [...state[k], rr[keyof_rr]]
        }
      }

      return {
        [k]: { ...state[k], ...rr }
      };

    }
  }

  return undefined;
}