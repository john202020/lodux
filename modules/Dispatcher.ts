
import { assure_, system_ } from "../helpers/assure";
import { get_unique_id } from "./Util.js";

function dispatch_(module, action, feedback_fn?: Function) {

    system_.notNull(arguments);
    assure_.required(action)
        .nonFunc(action)
        .required(action.type)
        .required(module.emitter);

    let feedback_type = '';

    let subscription;
    if (feedback_fn !== undefined) {

        feedback_type = get_unique_id();

        subscription = module.emitter.listen(feedback_type, () => {
            feedback_fn.call({}, subscription);
        });
    }

    module.emitter.emit(action.type, { ...action, ...{ feedback_type } });

    return {
        dispose: () => {
            console.warn("Calling dispose here is not reliable. Instead, dispose the disposable that is passed to the callback_function!");
            if (subscription) {
                subscription.dispose();
            }
        }
    };
}


function reduce_(module, update_state, type: string, callback: Function) {

    system_.notNull(arguments);

    return module.emitter.listen(type, function (action) {

        system_.notNull(arguments);

        const return_state = callback.call({}, get_removed_feedback_type(action));

        if (return_state !== undefined) {
            update_state(module.name, return_state);
        }

        dispatch_(module, { type: action.feedback_type });
    });
}


function get_removed_feedback_type(action) {
    system_.notNull(arguments);

    return Object.entries(action).reduce((acc, val) => {
        return val[0] !== 'feedback_type' ? (acc[val[0]] = val[1], acc) : acc;
    }, {});

    // return Object.keys(action)
    //     .filter(function (key) { return key !== 'feedback_type'; })
    //     .reduce(function (acc, key) { return { ...acc, [key]: action[key] }; }, {});
}


export { dispatch_, reduce_ };