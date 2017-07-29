
declare const define;
declare const module;

import { assure_, system_ }  from "./helpers/assure";
import { Store } from  "./modules/Store.js";
import applyMiddleware from "./modules/Middlewares.js";
import {update} from "./modules/Util.js";
import {dispatch_} from "./modules/Dispatcher.js";


const root = (0, eval)('this');

const previous_lodux = root.lodux;

const modules_ = {
    system_,
    assure_,
    Store,
    applyMiddleware,
    util: { update },
    noConflict: () => {
        root["lodux"] = previous_lodux;
        return modules_;
    }
};


(function () {

    if (typeof define === "function" && define.amd) {
        define(function () {
            return modules_;
        });
    }
    else if (typeof module === "object" && module.exports) {
        module.exports = modules_;
    }

    root['lodux'] = modules_;


}());
