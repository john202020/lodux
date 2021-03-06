import { assure_, assure_deep_ } from "../helpers/assure";
import { isPrimitive, isEqualContent } from "../helpers/helper";
import { get_store_object, get_store_object_etag } from "./Entire_store";
import { proxy_state_deep } from "./proxy_state_deep";
import { proxy_state } from "./proxy_state";
declare const Proxy;
declare const WeakMap;


let last_store_etag = -1;
const proxied_stores = new WeakMap();
//shallow proxy
export function proxy_store(store, forceNew) {

  assure_deep_.notNull(arguments);

  assure_.required(store);

  const proxied_store = new Proxy(store, {

    get(target, prop: string) {

      assure_deep_.notNull(prop);

      if (prop === 'state') {
        const store_key = store.store_key;
        const hasChange = last_store_etag !== get_store_object_etag(store_key);

        last_store_etag = get_store_object_etag(store_key);
        if (!forceNew && !hasChange && proxied_stores.get(store)) {
          return proxied_stores.get(store);
        }

        proxied_stores.set(store,
          proxy_state_deep(proxied_store, get_store_object(store_key)));

        return proxied_stores.get(store);
      }

      return target[prop];

    },

    set(target, prop: string, value) {

      if (prop !== 'state') {
        throw new Error("the store manipulation can only be on state (i.e. store.state)!");
      }

      assure_.defined(value, 'not allow to set undefined to store.state');
      
      if (value !== undefined) {
        assure_deep_
          .notNull(value)
          .isPlainJSONSafe(value)
          .notReservedKeywords([], value);
      }

      assure_
        .nonPrimitive(value, 'store.state assignment must be non primitive type!');

      if (!isEqualContent(store.state, value)) {
        store.update(value);
      }

      return true;
    }
  });

  return proxied_store;

}

