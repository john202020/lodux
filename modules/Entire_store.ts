
import { assure_, assure_deep_ } from "../helpers/assure";
import { isPrimitive } from "../helpers/helper";

/** 
 * Entire store 
*/
let store_object = {};

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


export function set_store_object(new_state_of_a_store, subscribers) {

    assure_deep_.notNull(arguments);

    assure_
        .required(new_state_of_a_store)
        .required(subscribers);

    store_object = { ...store_object, ...new_state_of_a_store };

    subscribers.forEach(handler => {
        handler.call({});
    });
}


export function get_store_object() {

    assure_deep_.notNull(arguments);

    return { ...store_object };
}

