import { assure_, assure_deep_ } from "../helpers/assure";
import { get_store_object } from "./Entire_store";
import { isPrimitive, isEqualContent } from "../helpers/helper";
declare const Proxy;

//deep proxy
export function proxy_state(store, value) {

  assure_deep_.notNull(arguments);
  assure_.required(store);

  if (isPrimitive(value)) {
    return value;
  }


  return new Proxy(value, {

    get: function (target, prop) {

      const value = target[prop];

      if (isPrimitive(value)) {
        return value;
      }

      const desc = Object.getOwnPropertyDescriptor(target, prop);
      if (desc && !desc.configurable) {
        return value;
      }

      return proxy_state(store, value);

    },

    set: function (target, prop: string, value) {

      assure_deep_
        .notNull([target, prop, value]);

      assure_
        .nonEmptyString(prop, 'property must be non empty string!');

      assure_deep_
        .isPlainJSONSafe(value)
        .notReservedKeywords(['key'], [prop, value]);

      if (!isEqualContent(target[prop], value)) {

        const acc = remove_reserve(['key'],
          bubble_object_spread(
            levels(get_store_object()[store.store_key], target, prop) || [],
            prop,
            value
          )
        );

        store.update({
          ...get_store_object()[store.store_key],
          ...acc,
          type: acc.type || 'update-proxy'
        });
      }

      return true;
    }
  });
}


function remove_reserve(keys, value) {

  if (isPrimitive(value) || Array.isArray(value)) {
    return value;
  }

  return Object.keys(value).reduce(
    (acc, k) => keys.includes(k) ? acc : {
      ...acc, [k]: remove_reserve(keys, value[k])
    },
    {}
  );
}


function bubble_object_spread(level, prop, value) {

  return bubble_(
    level,
    {
      ...level[level.length - 1],
      [prop]: value
    }
  );

  function bubble_(level, acc) {

    if (level.length < 2) {
      return Array.isArray(acc) ? [...acc] : { ...acc };
    }

    level = [...level];

    const key = level.pop()['key'];

    return bubble_(level, {
      ...level[level.length - 1],
      [key]: acc
    });
  }

}

function levels(the_state, target, prop) {

  return trace(the_state, [], '');

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