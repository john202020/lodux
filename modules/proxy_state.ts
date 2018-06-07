import { assure_, assure_deep_ } from "../helpers/assure";
import { isPrimitive, isEqualContent } from "../helpers/helper";
import { proxy_state_deep, bubble, proxies_watcher } from "./proxy_state_deep";
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

  const proxied = new Proxy(value, {

    set: function (target, prop: string, value) {
      
      if (value !== undefined) {
        assure_deep_.notNull(value);
      }

      assure_
        .nonEmptyString(prop, 'property must be non empty string!');

      assure_deep_
        .notReservedKeywords([], prop)
        .isPlainJSONSafe(value)
        .notReservedKeywords([], value);

      if (!isEqualContent(target[prop], value)) {
        store.update(bubble(store.state, target, prop, value));
      }

      return true;
    }
  });

  watcher.set(value, proxied);
  proxies_watcher.set(proxied, value);

  return proxied;
}
