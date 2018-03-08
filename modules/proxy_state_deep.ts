import { assure_, assure_deep_ } from "../helpers/assure";
import { isPrimitive, isEqualContent } from "../helpers/helper";
import { proxy_state } from "./proxy_state";

export function proxy_state_deep(store, value) {

  return psd(store, value);

  function psd(store, value) {

    if (isPrimitive(value)) {
      return value;
    }

    return proxy_state(store, traverse(value, psd));
  }

  function traverse(value, transformation) {
    if (Array.isArray(value)) {
      return value.map(v => transformation(store, v));
    }
    else {
      return Object.keys(value).reduce((acc, k) => {
        return { ...acc, [k]: transformation(store, value[k]) };
      }, {});
    }
  }
}

export function bubble(the_state, target, prop, value) {

  if (typeof target !== 'undefined' && isPrimitive(target)) {
    throw new Error("not able to assign to primitive target");
  }

  return { ...the_state, ...bubble_(the_state, '') };

  function bubble_(state, prop_) {

    if (isPrimitive(state)) {
      return undefined;
    }

    //need to optimize
    if (isEqualContent(state, target)) {
      return { [prop]: value };
    }

    if (!isPrimitive(state)) {
      for (let k in state) {
        const rr = bubble_(state[k], k);
        if (rr) {
          return { [k]: { ...state[k], ...rr } };
        }
      }
    }
    else {
      return state;
    }

    return undefined;
  }
}