
import { assure_, assure_deep_ } from "../helpers/assure";
import { get_unique_id } from "./Entire_store";

export function dispatch_(module, action, feedback_fn?: Function) {

    assure_
        .required(action)
        .nonEmptyString(action.type);

    assure_deep_
        .isPlainJSONSafe(action)
        .notReservedKeywords([], action, 'action must not have "key" as property');

    if (feedback_fn) {
        assure_.func(feedback_fn);
    }


    const feedback_type = "update-default-feedback-" + get_unique_id();

    if (typeof feedback_fn !== "undefined") {
        let subsr;
        try {
            subsr = module.emitter.listen(feedback_type, () => {
                feedback_fn.call({}, subsr);
            });
        } catch (err) {
            if (subsr) {
                subsr.dispose();
            }
            subsr = undefined;
            throw err;
        }
    }

    const _action = JSON.stringify({ ...action, feedback_type });

    module.emitter.emit(action.type, _action);

    return;
}


export function reduce_(module, update_state_fn, type: string, callback: Function) {

    assure_.nonEmptyString(type);

    return module.emitter.listen(type, function (actionString) {

        const _action = JSON.parse(actionString);

        assure_deep_
            .isPlainJSONSafe(_action)
            .notReservedKeywords([], _action);
            
        const return_state = callback.call({}, _action);

        if (typeof return_state !== "undefined") {
            update_state_fn(module, return_state);
        }

        dispatch_(module, { type: _action.feedback_type });
    });


    //remove feedback_type
    function remove_feedback_type(action) {

        // assure_deep_.notNull(arguments);

        return Object.keys(action)
            .filter(key => key !== 'feedback_type')
            .reduce((acc, key) =>
                ({ ...acc, [key]: action[key] }),
                {});
    }
}

