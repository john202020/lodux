
import { assure_, system_ } from "../helpers/assure";
import { get_unique_id } from "./Util.js";

function dispatch_(module, action, feedback_fn?: Function) {

    system_.notNull(arguments);
    assure_.required(action)
        .nonFunc(action)
        .required(action.type)
        .required(module.emitter);

    const feedback_type = get_unique_id();

    let subscription;
    if (feedback_fn !== undefined) {

        subscription = module.emitter.listen(feedback_type, () => {
            feedback_fn.call({}, subscription);
        });
    }

    module.emitter.emit(action.type, { ...action, ...{ feedback_type } });

    return;
}


function reduce_(module, update_state, type: string, callback: Function) {

    system_.notNull(arguments);

    return module.emitter.listen(type, function (action) {

        system_.notNull(arguments);

        const return_state = callback.call({}, pouch(action));

        if (return_state !== undefined) {
            update_state(module.store_key, return_state);
        }

        dispatch_(module, { type: action.feedback_type });
    });


    //remove feedback_type
    function pouch(action) {
        system_.notNull(arguments);

        return Object.entries(action).reduce((acc, val) => {
            return val[0] !== 'feedback_type' ? (acc[val[0]] = val[1], acc) : acc;
        }, {});

    }

}


export { dispatch_, reduce_ };