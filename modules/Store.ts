
import { assure_, assure_deep_ } from "../helpers/assure";
import store_ from "./Store_instance";
import { exist, get_unique_id } from "./Entire_store";
import { proxy_store } from "./proxy_store";
declare const Proxy;

if (!Proxy) {
    console.warn('Proxy not exist in this environment!');
}


let Store_subscribers: Array<Function> = [];
const config_default = { isHMR: false };


export function get_Store_subscribers() {
    assure_deep_.notNull(arguments);
    return [...Store_subscribers];
}


export const Store = Object.freeze({

    createStore(name?: string, config?) {

        assure_deep_.notNull(arguments);

        return proxy_store(
            new store_(get_unique_id(name),
                {
                    ...config_default,
                    ...(config !== undefined ? config : {}),
                    isConfigurable: false
                }
            ),
            false
        );
    },

    subscribe(func: Function) {

        assure_deep_.notNull(arguments);

        assure_.func(func);

        Store_subscribers = [...Store_subscribers, func];

        return {
            dispose: function () {
                assure_.empty(arguments);

                const ind = Store_subscribers.indexOf(func);
                if (ind > -1) {
                    Store_subscribers = [
                        ...Store_subscribers.slice(0, ind),
                        ...Store_subscribers.slice(ind + 1)
                    ];
                }
            }
        };
    }
});
