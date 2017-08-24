
declare const define, module;

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

root.lodux = lodux;

if (typeof define === "function" && define.amd) {
    define(function () {
        return lodux;
    });
}

if (typeof module === "object" && module.exports) {
    module.exports.default = { ...lodux };
    module.exports = { ...lodux };
}