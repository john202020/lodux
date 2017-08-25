
declare const define, module;

import { assure_, system_ } from "./helpers/assure";
import { Store } from "./modules/Store";
import { dispatch_ } from "./modules/Dispatcher";

const root = (0, eval)('this');

const previous_lodux = root['lodux'];

const noConflict = () => {
    root['lodux'] = previous_lodux;
    return modules_;
};

const modules_ = {
    system_,
    assure_,
    Store,
    noConflict
};

const isAMD = typeof define === "function" && define.amd;
const isModule = typeof module === "object" && module.exports;

if (isAMD) {
    define(function () {
        return modules_;
    });
}

if (isModule) {
    module.exports = { ...modules_ };
}

if (!isAMD && !isModule) {
    root['lodux'] = modules_;
}
