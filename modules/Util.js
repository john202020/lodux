"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var assure_1 = require("../helpers/assure");
var _id = 1;
function get_unique_id(name) {
    assure_1.system_.notNull(arguments);
    return name || _id++;
}
exports.get_unique_id = get_unique_id;
;
