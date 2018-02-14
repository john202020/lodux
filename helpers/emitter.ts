import { assure_ } from "./assure";

/**
    let subcription = emitter.listen('data', function (data) {
        console.log('data: ' + data);
    });

    emitter.emit('data', 'foo');   //  data: foo

    subscription.dispose();
**/

function Emitter() {

    this.subjects = {};

    this.emit = this.emit.bind(this);
    this.listen = this.listen.bind(this);
    this.dispose = this.dispose.bind(this);
    this.local = this.local.bind(this);
}

Emitter.prototype.emit = function (name, action_data_json_string: string) {

    assure_
        .nonEmptyString(name, "Emitter must only emit with non empty string name!")
        .nonEmptyString(action_data_json_string, "Emitter must only emit string action. Please check whether the system is emitting non string action!");

    const emitter = this;

    emitter.subjects[name] = emitter.subjects[name] || [];

    const handlers = emitter.subjects[name];

    if (handlers) {
        for (let handler of [...handlers]) {
            handler.call({}, action_data_json_string);
        }
    }
};

Emitter.prototype.listen = function (name, handler) {

    const emitter = this;

    emitter.subjects[name] = [...(emitter.subjects[name] || []), handler];

    return {
        dispose: () => {

            const ind = emitter.subjects[name].indexOf(handler);

            emitter.subjects[name] = [
                ...emitter.subjects[name].slice(0, ind),
                ...emitter.subjects[name].slice(ind + 1)
            ];

        }
    };
};

Emitter.prototype.dispose = function () {
    this.subjects = {};
};

Emitter.prototype.local = function () {
    return Object.freeze(new Emitter());
};

export default Object.freeze(new Emitter());

