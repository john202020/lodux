"use strict";
var __read = (this && this.__read) || function (o, n) {
    var m = typeof Symbol === "function" && o[Symbol.iterator];
    if (!m) return o;
    var i = m.call(o), r, ar = [], e;
    try {
        while ((n === void 0 || n-- > 0) && !(r = i.next()).done) ar.push(r.value);
    }
    catch (error) { e = { error: error }; }
    finally {
        try {
            if (r && !r.done && (m = i["return"])) m.call(i);
        }
        finally { if (e) throw e.error; }
    }
    return ar;
};
var __spread = (this && this.__spread) || function () {
    for (var ar = [], i = 0; i < arguments.length; i++) ar = ar.concat(__read(arguments[i]));
    return ar;
};
var __values = (this && this.__values) || function (o) {
    var m = typeof Symbol === "function" && o[Symbol.iterator], i = 0;
    if (m) return m.call(o);
    return {
        next: function () {
            if (o && i >= o.length) o = void 0;
            return { value: o && o[i++], done: !o };
        }
    };
};
Object.defineProperty(exports, "__esModule", { value: true });
var assure_1 = require("./assure");
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
Emitter.prototype.emit = function (name, action_data_json_string) {
    assure_1.assure_
        .nonEmptyString(name, "Emitter must only emit with non empty string name!")
        .nonEmptyString(action_data_json_string, "Emitter must only emit string action. Please check whether the system is emitting non string action!");
    var emitter = this;
    emitter.subjects[name] = emitter.subjects[name] || [];
    var handlers = emitter.subjects[name];
    if (handlers) {
        try {
            for (var _a = __values(__spread(handlers)), _b = _a.next(); !_b.done; _b = _a.next()) {
                var handler = _b.value;
                handler.call({}, action_data_json_string);
            }
        }
        catch (e_1_1) { e_1 = { error: e_1_1 }; }
        finally {
            try {
                if (_b && !_b.done && (_c = _a.return)) _c.call(_a);
            }
            finally { if (e_1) throw e_1.error; }
        }
    }
    var e_1, _c;
};
Emitter.prototype.listen = function (name, handler) {
    var emitter = this;
    emitter.subjects[name] = __spread((emitter.subjects[name] || []), [handler]);
    return {
        dispose: function () {
            var ind = emitter.subjects[name].indexOf(handler);
            emitter.subjects[name] = __spread(emitter.subjects[name].slice(0, ind), emitter.subjects[name].slice(ind + 1));
        }
    };
};
Emitter.prototype.dispose = function () {
    this.subjects = {};
};
Emitter.prototype.local = function () {
    return Object.freeze(new Emitter());
};
exports.default = Object.freeze(new Emitter());
//# sourceMappingURL=emitter.js.map