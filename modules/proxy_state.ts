import { assure_, assure_deep_ } from "../helpers/assure";
import { isPrimitive, isEqualContent } from "../helpers/helper";
import { proxy_state_deep, bubble } from "./proxy_state_deep";
declare const WeakMap;
declare const Proxy;


function shouldSkip(target, prop) {

  const desc = Object.getOwnPropertyDescriptor(target, prop);
  if (desc && !desc.configurable) {
    return true;
  }
  return false;

}

const watcher = new WeakMap();

//deep proxy
export function proxy_state(store, value) {

  if (isPrimitive(value))
    return value;

  if (watcher.has(value)) {
    return watcher.get(value);
  }

  watcher.set(value, new Proxy(value, {

    get: function (target, prop) {

      if (prop === 'it') {
        return value;
      }
      return target[prop];

    },

    set: function (target, prop: string, value) {

      assure_deep_.notNull(value);

      assure_
        .nonPrimitive(target, 'assignment to primitive type is not allowed!')
        .nonPrimitive(value, `directly assign primitive to store.state is not allowed! 
       target:${JSON.stringify(target)}  prop:${prop}  value:${value}`)
        .nonEmptyString(prop, 'property must be non empty string!');

      if (prop === 'it') {
        throw new Error("[it] is a reserved keyword. Please use other as object key!");
      }

      assure_deep_
        .isPlainJSONSafe(value);

      if (!isEqualContent(target[prop], value)) {
        store.update(bubble(store.state, target, prop, value));
      }

      return true;
    }
  }));

  return watcher.get(value);
}

