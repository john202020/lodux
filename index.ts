
declare const define;
declare const module;

import { assure_, system_ } from "./helpers/assure";
import { Store } from "./modules/Store";
import { dispatch_ } from "./modules/Dispatcher";


const root = (0, eval)('this');

const previous_lodux = root.lodux;

const noConflict = () => {
    root.lodux = previous_lodux;
    return lodux;
};

const lodux = {
    system_,
    assure_,
    Store,
    noConflict
};

if (typeof define === "function" && define.amd) {
    define(function () {
        return lodux;
    });
}
else if (typeof module === "object" && module.exports) {
    module.exports = lodux;
    module.exports.default = lodux;
}

root.lodux = lodux;
