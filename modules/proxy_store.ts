import { assure_, assure_deep_ } from "../helpers/assure";
import { get_store_object } from "./Entire_store";
import { isPrimitive, isEqualContent } from "../helpers/helper";
import { proxy_state } from "./proxy_state";
declare const Proxy;

//shallow proxy
export function proxy_store(store) {

  assure_deep_.notNull(arguments);

  assure_.required(store);

  let proxy_store = new Proxy(store, {

    get(target, prop, receiver) {

      assure_deep_.notNull(prop);

      if (prop === 'state') {
        return proxy_state(store, get_store_object()[store.store_key]);
      }

      return target[prop];

    },

    set(target, prop: string, value) {

      if (prop !== 'state') {
        throw new Error("the store manipulation can only be on state (i.e. store.state)!");
      }

      assure_deep_.notNull(value);

      assure_
        .nonPrimitive(value, 'store.state must be non primitive type!');

      if (!isEqualContent(store.state, value)) {
        store.update(value);
      }

      return true;
    }
  });

  return proxy_store;
}
