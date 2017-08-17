"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var assure_1 = require("../helpers/assure");
var unique_prefix = "_";
exports.unique_prefix = unique_prefix;
var _id = 1;
function get_unique_id() {
    assure_1.system_.notNull(arguments);
    return "[" + _id++ + "]";
}
exports.get_unique_id = get_unique_id;
;
