
import { assure_, system_ } from "../helpers/assure";

let store_object = {};//entire store
let store_initial = {};//entire store

function get_store_object_initial() {
    system_.notNull(arguments);
    return { ...store_initial };
}

function get_store_object() {
    system_.notNull(arguments);
    return { ...store_object };
}

function set_store_object(new_state_of_the_comp, subscribers) {

    system_.notNull(arguments);
    assure_.required(new_state_of_the_comp);

    const store_key = Object.keys(new_state_of_the_comp)[0];

    const isInitial = !store_object[store_key];

    if (isInitial) {
        store_initial = { ...store_initial, ...new_state_of_the_comp };
    }

    const isNew = isInitial ||
        JSON.stringify(store_object[store_key]) !== JSON.stringify(new_state_of_the_comp[store_key]);

    store_object = { ...store_object, ...new_state_of_the_comp };

    if (isNew) {
        subscribers.forEach(function (handler) {
            if (typeof handler === "function") {
                handler.call({});
            }
        });
    }
}

export { get_store_object, get_store_object_initial, set_store_object };