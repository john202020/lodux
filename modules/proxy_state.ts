import { assure_, assure_deep_ } from "../helpers/assure";
import { get_store_object } from "./Entire_store";
import { isPrimitive, isEqualContent } from "../helpers/helper";
declare const Proxy;
declare const WeakSet;

const proxy_watcher = new WeakSet();

function shouldPass(target, prop) {
  const val = target[prop];

  if (isPrimitive(val)) {
    return true;
  }

  const desc = Object.getOwnPropertyDescriptor(target, prop);
  if (desc && !desc.configurable) {
    return true;
  }
  return false;

}

//deep proxy
export function proxy_state(store, value) {

  if (isPrimitive(value)) {
    return value;
  }

  proxy_watcher.add(value);

  return new Proxy(value, {

    get: function (target, prop) {

      const val = target[prop];

      if (shouldPass(target, prop) || proxy_watcher.has(val)) {
        return val;
      }

      return proxy_state(store, val);

    },

    set: function (target, prop: string, value) {

      assure_deep_.notNull([prop, value]);

      assure_.nonEmptyString(prop, 'property must be non empty string!');
     
      if (prop === 'key') {
        throw new Error("key is reserved keyword. Please use other as object key!");
      }

      assure_deep_
        .isPlainJSONSafe(value)
        .notReservedKeywords(['key'], value);

      if (!isEqualContent(target[prop], value)) {

        const the_state = get_store_object()[store.store_key];

        const acc = bubble_spread(
          the_state,
          levels(the_state, target, prop),
          prop,
          value
        );

        store.update(acc);

      }

      return true;
    }
  });
}


function bubble_spread(the_state, level, prop, value) {

  const acc = bubble_(
    level,
    {
      ...level[level.length - 1],
      [prop]: value
    }
  );

  return {
    ...the_state,
    ...remove_reserve('key', acc)
  };


  function bubble_(level, acc) {

    if (level.length < 2) {
      return acc;
    }

    return bubble_(
      level.slice(0, level.length - 1),
      {
        ...level[level.length - 2],
        [level[level.length - 1]['key']]: acc
      });

  }

  function remove_reserve(reservedKey, value) {

    if (isPrimitive(value) || Array.isArray(value)) {
      return value;
    }

    return Object.keys(value).reduce(
      (acc, k) => reservedKey===k ? acc : {
        ...acc, [k]: remove_reserve(reservedKey, value[k])
      },
      {}
    );
  }

}


function levels(the_state, target, prop) {

  return trace(the_state, [], '') || [];

  function trace(obj, track, key: string) {

    if (isPrimitive(obj)) {
      return undefined;
    }

    track.push({ ...obj, key });

    if ((obj === target)) {
      return track;
    }

    for (let k in obj) {
      const result = trace(obj[k], [...track], k);
      if (result)
        return result;
    }

    return undefined;
  }
}
