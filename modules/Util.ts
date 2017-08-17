
import { assure_, system_ } from "../helpers/assure";

const unique_prefix = "_";

let _id = 1;

function get_unique_id(){
    system_.notNull(arguments);
    return "[" + _id++ + "]";
};

export {
    get_unique_id,
    unique_prefix
};

