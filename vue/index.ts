declare const module;

import { Store } from "../modules/Store";
import { connect } from "./connect";
const modules_ = {
    Store,
    connect
};
module.exports = { ...modules_};
module.exports.default = {...modules_};
export default modules_;

