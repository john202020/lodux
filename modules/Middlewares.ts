
import { assure_, system_ } from "../helpers/assure";
import { Store } from "./Store.js";

export default function (store, wares_) {

    system_.notNull(arguments);
    console.warn("@deprecated since version 0.2.62. Use store.use() instead.");

    return store.use(wares_);

}
