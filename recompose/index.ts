declare const define, module;

import { assure_, system_ } from "../helpers/assure";


// options: {
//     componentWillMount: function () {
//         store.subscribe(() => {
//             console.log(store.state);
//         });
//     }
// }
const state = function (lifecycle) {
    system_.notNull(arguments);
    assure_.required(lifecycle);
    
    return function ({ store, Comp, options }) {
        system_.notNull(arguments);
        assure_.required(store).required(Comp);

        return lifecycle(
            {
                ...(options || {}),

                componentWillMount: function () {
                    store.subscribe(() => {
                        this.setState(store.state);
                    });
                    if (options && options.componentWillMount) {
                        options.componentWillMount();
                    }
                },
            }
        )(Comp);
    };
};

export { state };