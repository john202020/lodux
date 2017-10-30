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
    const subscriptions: Array<{ dispose: Function }> = [];

    return function ({ store, Comp, options }) {
        system_.notNull(arguments);
        assure_.required(store).required(Comp);
        const ops = {
            ...(options || {}),

            componentWillMount: function () {

                subscriptions.push(store.subscribe(() => {
                    this.setState(store.state);
                }));

                if (options && options.componentWillMount) {
                    options.componentWillMount();
                }
            },
            componentWillUnmount: () => {
                subscriptions.map(s => s).forEach(s => {
                    if (s.dispose) {
                        s.dispose();
                    }
                });
                subscriptions.length = 0;
                
                if (options && options.componentWillUnmount) {
                    options.componentWillUnmount();
                }
            },
            componentDidMount: function () {
                if (options && options.componentDidMount) {
                    options.componentDidMount();
                }
            }
        };

        return lifecycle(ops)(Comp);
    };
};


export { state };