
import { assure_, assure_deep_ } from "../helpers/assure";
import { isPrimitive } from "../helpers/helper";
import { get_store_object } from "./Entire_store";
import store_ from "./store_instance";
declare const Proxy;

// collection of all stores' history
const stores_history = {};

export function historyFactory(store_key) {

    if (stores_history[store_key]) {
        return stores_history[store_key];
    }

    let store_history: Array<Object> = [];
    let point_index = -1;
    let isContinue = false;

    stores_history[store_key] = Object.freeze({

        get index() {
            return point_index;
        },

        get state() {
            return store_history[point_index];
        },
        list(max) {
            
            assure_deep_.notNull(arguments);

            assure_.number(max);

            return store_history.slice(max * -1);
        },
        start() {
            assure_.empty(arguments);

            isContinue = true;
        },

        stop() {
            assure_.empty(arguments);

            isContinue = false;
        },

        push() {
            assure_.empty(arguments);

            if (isContinue) {
                store_history = [
                    ...store_history,
                    setDeepProxy(get_store_object(store_key))
                ];

                point_index = store_history.length - 1;
            }
        },

        get(index: number) {

            assure_deep_.notNull(arguments);

            assure_.number(index);

            if (index < 0 || index >= store_history.length) {
                return undefined;
            }

            return store_history[index];
        },

        to(index: number) {

            assure_deep_.notNull(arguments);

            assure_.number(index);

            if (index < 0 || index >= store_history.length) {
                return undefined;
            }

            point_index = index;

            return store_history[point_index];
        },

        back() {

            assure_.empty(arguments);

            if (point_index > 0) {
                point_index--;
            }

            return store_history[point_index];
        },

        next() {
            
            assure_.empty(arguments);

            if (point_index < store_history.length - 1) {
                point_index++;
            }

            return store_history[point_index];
        }
    });

    return stores_history[store_key];
}


function setDeepProxy(obj) {

    if (isPrimitive(obj))
        return obj;

    return new Proxy(
        Array.isArray(obj) ? [...obj] : { ...obj },
        {
            get(target, prop) {
                return setDeepProxy(target[prop]);
            },
            set(target, prop, value) {
                throw new Error('changing history is not allowed!');
            }
        }
    );
}
