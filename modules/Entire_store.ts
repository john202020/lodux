
import { assure_, system_ } from "../helpers/assure";

let store_object = {};//entire store
let store_initial = {};//entire store

let _id = 1;

export function get_unique_id(name?: string) {
    system_.notNull(arguments);
    //check exist again 
    return name || exist(++_id + "") ? (++_id + "") : (_id + "");
};

export function exist(name: string) {
    system_.notNull(arguments);
    return entire_store()[name] !== undefined;
}

export function entire_store_initial() {
    system_.notNull(arguments);
    return { ...store_initial };
}

export function entire_store(argu ?: any) {
    system_.notNull(arguments);
    
    if (arguments.length === 1) {
        const { new_state_of_the_comp, subscribers } = argu;

        set_store_object(new_state_of_the_comp, subscribers);

    }
    return { ...store_object };

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
