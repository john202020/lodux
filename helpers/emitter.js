"use strict";
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
Object.defineProperty(exports, "__esModule", { value: true });
function Emitter() {
    this.subjects = {};
}
Emitter.prototype.emit = function (name, data) {
    var emitter = this;
    data = JSON.parse(JSON.stringify(data));
    emitter.subjects[name] = emitter.subjects[name] || [];
    var handlers = emitter.subjects[name];
    if (handlers) {
        try {
            try {
                for (var _a = __values(handlers.slice()), _b = _a.next(); !_b.done; _b = _a.next()) {
                    var handler = _b.value;
                    handler.call({}, data);
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
        catch (e) {
            console.error(e);
            throw e;
        }
    }
    var e_1, _c;
};
Emitter.prototype.listen = function (name, handler) {
    var emitter = this;
    emitter.subjects[name] = emitter.subjects[name] || [];
    emitter.subjects[name].push(handler);
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
    return new Emitter();
};
exports.default = new Emitter();
