
import { assure_, assure_deep_ } from "../helpers/assure";
import { isPrimitive } from "../helpers/helper";
import { proxy_state_deep } from "./proxy_state_deep";
import { proxy_state } from "./proxy_state";
/** 
 * Entire store 
*/
let store_object = {};
const store_object_etag = {};


export const get_unique_id = (function () {

    let _id: number = 1;

    return function (name?: string) {

        assure_deep_.notNull(arguments);

        if (typeof name !== 'undefined') {
            assure_.nonEmptyString(name, "If name if provided, it must be non empty string!");
        }

        if (name && exist(name)) {
            throw new Error("detected requesting duplicated store id!");
        }

        return name || ((exist(++_id + "") ? ++_id : _id) + "");
    }
}());


export function exist(name: string) {

    assure_deep_.notNull(arguments);

    return store_object[name] !== undefined;
}


export function set_store_object(store, new_state_of_a_store, subscribers) {

    assure_deep_.notNull(arguments);

    assure_
        .required(new_state_of_a_store)
        .required(subscribers);

    store_object[store.store_key] = new_state_of_a_store;

    if (typeof store_object_etag[store.store_key] === "undefined") {
        store_object_etag[store.store_key] = 0;
    }

    store_object_etag[store.store_key] = 1 + store_object_etag[store.store_key];

    subscribers.forEach(handler => {
        try {
            handler.call({});
        } catch (err) {
            console.error(err.message);
        }
    });
}


export function get_store_object_etag(store_key) {
    return store_object_etag[store_key];
}

export function get_store_object(store_key) {

    assure_deep_.notNull(arguments);

    // return { ...store_object };
    return store_object[store_key];
}

