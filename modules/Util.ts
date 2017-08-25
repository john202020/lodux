
import { assure_, system_ } from "../helpers/assure";

let _id = 1;

export function get_unique_id(name: string | undefined) {
    system_.notNull(arguments);
    return name || _id++;
};


