
import { assure_, system_ } from "./helpers/assure";
import { Store } from "./modules/Store";
import { dispatch_ } from "./modules/Dispatcher";
import vue from './vue';
import react from './react';

const modules_ = {
    system_,
    assure_,
    Store,
    vue,
    react
};

export = modules_;

const root = this || (0, eval)('this');

let isAMD = typeof root.define === "function" && root.define['amd'];
let isModule = typeof root.module === "object" && root.module.exports;

if (!isAMD && !isModule) {

    const previous_lodux = root['lodux'];

    const noConflict = () => {
        root['lodux'] = previous_lodux;
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
