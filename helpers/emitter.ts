/**
    var subcription = emitter.listen('data', function (data) {
        console.log('data: ' + data);
    });

    emitter.emit('data', 'foo');   //  data: foo

    subscription.dispose();
**/

function Emitter() {
    this.subjects = {};
}

Emitter.prototype.emit = function (name, data) {

    const emitter = this;

    data = JSON.parse(JSON.stringify(data));

    emitter.subjects[name] = emitter.subjects[name] || [];

    const handlers = emitter.subjects[name];

    if (handlers) {

        try {
            for (let handler of handlers.slice()) {
                handler.call({}, data);
            }
        } catch (e) {
            console.error(e);
            throw e;
        }
    }
};

Emitter.prototype.listen = function (name, handler) {

    const emitter = this;

    emitter.subjects[name] = emitter.subjects[name] || [];

    emitter.subjects[name].push(handler);

    return {
        dispose: function () {

            const ind = emitter.subjects[name].indexOf(handler);

            emitter.subjects[name] = [
                ...emitter.subjects[name].slice(0, ind),
                ...emitter.subjects[name].slice(ind+1)
            ];

        }
    };
};

Emitter.prototype.dispose = function () {
    this.subjects = {};
};

Emitter.prototype.local = function () {
    return new Emitter();
};

export default new Emitter();

