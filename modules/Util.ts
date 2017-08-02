
import { assure_, system_ } from "../helpers/assure";

const unique_prefix = "___";

//psuedo method
//set up reducer, and dispatch the state to the reducer,
//reducer will update exactly as the 'state' is passed in.
//note that the action type will be remove when update store
/**
 * 
 * @deprecated since version 0.1.34. Use store_instance.update() instead 
 */
function update(store, state, type?: string) {

    system_.notNull(arguments);
    assure_.required(store).required(state).nonFunc(state);

    console.warn("This util.update() is deprecated! Please use store instance store.diduce() instead.");

    const typename = "update" + unique_prefix + (type || '');

    const subscription = store.reduce(typename, action => {
        subscription.dispose();
        return action;
    });

    store.dispatch({ ...state, type: typename });
}


function get_without_type(action) {
    system_.notNull(arguments);

    return Object.keys(action)
        .filter((key) => { return key !== 'type'; })
        .reduce((acc, key) => {
            return { ...acc, [key]: action[key] };
        }, {});
}


const get_unique_id = (function () {

    let _id = 1;

    return function () {
        system_.notNull(arguments);
        return unique_prefix + "[" + _id++ + "]_";
    };

}());


export {
    update,
    get_unique_id,
    unique_prefix,
    get_without_type
};

