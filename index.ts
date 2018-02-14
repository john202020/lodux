declare const define, module;

import { assure_, assure_deep_ } from "./helpers/assure";
import { Store } from "./modules/Store";

assure_.compatible();

const modules_ = {
    Store
};

export = { ...modules_ };


const isAMD = typeof define === "function" && define['amd'];
const isModule = typeof module === "object" && module.exports;

if (!isAMD && !isModule) {

    const root = (0, eval)('this');

    const previous_modux = root['lodux'];

    const noConflict = () => {
        root['lodux'] = previous_modux;
        return {
            ...modules_,
            noConflict: () => { }
        };
    };

    root['lodux'] = {
        ...modules_,
        noConflict
    };
}
