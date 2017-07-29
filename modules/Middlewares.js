"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var assure_1 = require("../helpers/assure");
function default_1(store, wares_) {
    assure_1.system_.notNull(arguments);
    console.warn("@deprecated since version 0.2.62. Use store.use() instead.");
    return store.use(wares_);
}
exports.default = default_1;
