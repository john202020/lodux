declare const module;

import {Store} from "../modules/Store";
import {connect} from "./modules/Connect";
import {CRoute} from "./modules/CRoute";

const modules_ = {
    Store,
    connect,
    CRoute
};
module.exports = { ...modules_};
module.exports.default = {...modules_};
export default modules_;

