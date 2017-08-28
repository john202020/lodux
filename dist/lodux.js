(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory();
	else if(typeof define === 'function' && define.amd)
		define([], factory);
	else {
		var a = factory();
		for(var i in a) (typeof exports === 'object' ? exports : root)[i] = a[i];
	}
})(this, function() {
return /******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// identity function for calling harmony imports with the correct context
/******/ 	__webpack_require__.i = function(value) { return value; };
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 48);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

var __values = undefined && undefined.__values || function (o) {
    var m = typeof Symbol === "function" && o[Symbol.iterator],
        i = 0;
    if (m) return m.call(o);
    return {
        next: function next() {
            if (o && i >= o.length) o = void 0;
            return { value: o && o[i++], done: !o };
        }
    };
};
Object.defineProperty(exports, "__esModule", { value: true });
var system_ = {
    notNull: function notNull(args) {
        if (args === undefined) {
            throwError("notNull() will not work in lamda express!");
        }
        try {
            for (var args_1 = __values(args), args_1_1 = args_1.next(); !args_1_1.done; args_1_1 = args_1.next()) {
                var arg = args_1_1.value;
                checkProp(arg);
            }
        } catch (e_1_1) {
            e_1 = { error: e_1_1 };
        } finally {
            try {
                if (args_1_1 && !args_1_1.done && (_a = args_1.return)) _a.call(args_1);
            } finally {
                if (e_1) throw e_1.error;
            }
        }
        return;
        function checkProp(obj) {
            if (obj === undefined) return;
            var type = typeof obj === "undefined" ? "undefined" : _typeof(obj);
            if (type === "object") {
                if (!obj) {
                    throwError("null is not allowed");
                }
                for (var key in obj) {
                    checkProp(obj[key]);
                }
            }
        }
        var e_1, _a;
    }
};
exports.system_ = system_;
var assure_ = {
    class: function _class(theClass, errormsg) {
        if (!(typeof theClass === 'function' && /^\s*class\s+/.test(theClass.toString()))) {
            throwError(errormsg || theClass + " does not seems to be class! class is expected.");
        }
        return assure_;
    },
    required: function required(obj, errormsg) {
        if (obj === undefined) {
            throwError(errormsg || "required");
        }
        return assure_;
    },
    array: function array(obj, errormsg) {
        if (!Array.isArray(obj)) {
            throwError(errormsg || "array is expected");
        }
        return assure_;
    },
    boolean: function boolean(obj, errormsg) {
        if (typeof obj !== "boolean") {
            throwError(errormsg || "boolean is expected");
        }
        return assure_;
    },
    string: function string(obj, errormsg) {
        if (typeof obj !== "string") {
            throwError(errormsg || "string is expected");
        }
        return assure_;
    },
    nonFunc: function nonFunc(value, errormsg) {
        if (typeof value === "function") {
            throwError(errormsg || "must be non function");
        }
        return assure_;
    },
    func: function func(_func, errormsg) {
        if (typeof _func !== "function") {
            throwError(errormsg || "must be function");
        }
        return assure_;
    }
};
exports.assure_ = assure_;
function throwError(msg) {
    throw new Error(msg);
}

/***/ }),
/* 1 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var __assign = undefined && undefined.__assign || Object.assign || function (t) {
    for (var s, i = 1, n = arguments.length; i < n; i++) {
        s = arguments[i];
        for (var p in s) {
            if (Object.prototype.hasOwnProperty.call(s, p)) t[p] = s[p];
        }
    }
    return t;
};
var __read = undefined && undefined.__read || function (o, n) {
    var m = typeof Symbol === "function" && o[Symbol.iterator];
    if (!m) return o;
    var i = m.call(o),
        r,
        ar = [],
        e;
    try {
        while ((n === void 0 || n-- > 0) && !(r = i.next()).done) {
            ar.push(r.value);
        }
    } catch (error) {
        e = { error: error };
    } finally {
        try {
            if (r && !r.done && (m = i["return"])) m.call(i);
        } finally {
            if (e) throw e.error;
        }
    }
    return ar;
};
var __spread = undefined && undefined.__spread || function () {
    for (var ar = [], i = 0; i < arguments.length; i++) {
        ar = ar.concat(__read(arguments[i]));
    }return ar;
};
Object.defineProperty(exports, "__esModule", { value: true });
__webpack_require__(17);
var assure_1 = __webpack_require__(0);
var Dispatcher_1 = __webpack_require__(16);
var emitter_1 = __webpack_require__(15);
var Entire_store_1 = __webpack_require__(7);
var Store_subscribers = [];
var stores_subscribers = {};
var config_default = { isHMR: false, configurable: false };
var config_ = __assign({}, config_default);
var store_ = function () {
    function func(store_key, isConfigurable) {
        if (Entire_store_1.exist(store_key)) {
            if (config_['isHMR'] === true) console.warn(store_key + " is already exist in store!");else throw new Error(store_key + " is already exist in store!");
        }
        Object.defineProperty(this, 'state', {
            configurable: isConfigurable,
            get: function get() {
                return Entire_store_1.entire_store()[store_key];
            }
        });
        Object.defineProperty(this, 'store_key', {
            enumerable: true,
            configurable: false,
            writable: false,
            value: store_key
        });
        Object.defineProperty(this, 'emitter', {
            enumerable: true,
            configurable: false,
            writable: false,
            value: emitter_1.default.local()
        });
        this.dispatch = this.dispatch.bind(this);
        this.reduce = this.reduce.bind(this);
        this.use = this.use.bind(this);
        this.diduce = this.diduce.bind(this);
        this.subscribe = this.subscribe.bind(this);
    }
    func.prototype.dispatch = function (action, feedback_fn) {
        assure_1.system_.notNull(arguments);
        assure_1.assure_.string(action.type);
        if (action.type === 'update') {
            throw new Error("action type 'update' is reserved. Please use a more specific action type.");
        }
        return Dispatcher_1.dispatch_(this, action, feedback_fn);
    };
    func.prototype.reduce = function (type, callback_fn) {
        assure_1.system_.notNull(arguments);
        return Dispatcher_1.reduce_(this, update_state, type, callback_fn);
    };
    func.prototype.use = function (wares) {
        assure_1.system_.notNull(arguments);
        var clone = exports.Store.clone(this);
        var reversed_wares = wares.reduce(function (acc, ware) {
            acc.unshift(ware);
            return acc;
        }, []);
        clone.dispatch = reversed_wares.reduce(function (dispatch, ware) {
            return ware(clone)(dispatch.bind(clone));
        }, clone.dispatch);
        return clone;
    };
    func.prototype.diduce = function (action) {
        var _this = this;
        assure_1.system_.notNull(arguments);
        assure_1.assure_.string(action.type);
        var subs = this.reduce(action.type, function (action) {
            subs.dispose();
            var new_state = pouch(action);
            return __assign({}, _this.state, new_state);
        });
        this.dispatch(action);
    };
    func.prototype.subscribe = function (func) {
        assure_1.system_.notNull(arguments);
        stores_subscribers[this.store_key] = stores_subscribers[this.store_key] || [];
        var subscribes = stores_subscribers[this.store_key];
        subscribes.push(func);
        return {
            dispose: function dispose() {
                assure_1.system_.notNull(arguments);
                var ind = subscribes.indexOf(func);
                if (ind > -1) {
                    subscribes[this.store_key] = __spread(subscribes.slice(0, ind), subscribes.slice(ind + 1));
                }
            }
        };
    };
    return func;
    function pouch(action) {
        return Object.entries(action).reduce(function (acc, val) {
            return val[0] !== 'type' ? (acc[val[0]] = val[1], acc) : acc;
        }, {});
    }
}();
function createConfigurableStore(name) {
    assure_1.system_.notNull(arguments);
    var store_key = Entire_store_1.get_unique_id(name);
    return new store_(store_key, true);
}
exports.createConfigurableStore = createConfigurableStore;
;
exports.Store = new function () {
    Object.defineProperty(this, 'state', {
        get: function get() {
            return Entire_store_1.entire_store();
        }
    });
    this.createStore = function (name) {
        assure_1.system_.notNull(arguments);
        var store_key = Entire_store_1.get_unique_id(name);
        return new store_(store_key, false);
    };
    this.clone = function (store, properties) {
        assure_1.system_.notNull(arguments);
        var isConfigurable = Object.getOwnPropertyDescriptor(store, 'state').configurable || false;
        var s = new store_(store.store_key, isConfigurable);
        return Object.assign.apply(Object, __spread([s], properties || {}));
    };
    this.config = function (custom_config) {
        assure_1.system_.notNull(arguments);
        config_ = __assign({}, config_, custom_config);
    };
    this.reset_config = function () {
        assure_1.system_.notNull(arguments);
        config_ = __assign({}, config_default);
    };
    this.subscribe = function (func) {
        assure_1.system_.notNull(arguments);
        Store_subscribers.push(func);
        return {
            dispose: function dispose() {
                assure_1.system_.notNull(arguments);
                var ind = Store_subscribers.indexOf(func);
                if (ind > -1) {
                    Store_subscribers = __spread(Store_subscribers.slice(0, ind), Store_subscribers.slice(ind + 1));
                }
            }
        };
    };
    this.reset_initial = function () {
        assure_1.system_.notNull(arguments);
        Object.entries(Entire_store_1.entire_store_initial()).forEach(function (_a) {
            var _b = __read(_a, 2),
                key = _b[0],
                value = _b[1];
            update_state(key, value);
        });
    };
}();
function update_state(store_key, new_state) {
    assure_1.system_.notNull(arguments);
    Entire_store_1.entire_store({
        new_state_of_the_comp: (_a = {}, _a[store_key] = new_state, _a),
        subscribers: Store_subscribers.concat(stores_subscribers[store_key] || [])
    });
    var _a;
}

/***/ }),
/* 2 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


// https://github.com/zloirock/core-js/issues/86#issuecomment-115759028
var global = module.exports = typeof window != 'undefined' && window.Math == Math ? window : typeof self != 'undefined' && self.Math == Math ? self : Function('return this')();
if (typeof __g == 'number') __g = global; // eslint-disable-line no-undef

/***/ }),
/* 3 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var core = module.exports = { version: '2.4.0' };
if (typeof __e == 'number') __e = core; // eslint-disable-line no-undef

/***/ }),
/* 4 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


// Thank's IE8 for his funny defineProperty
module.exports = !__webpack_require__(8)(function () {
  return Object.defineProperty({}, 'a', { get: function get() {
      return 7;
    } }).a != 7;
});

/***/ }),
/* 5 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

module.exports = function (it) {
  return (typeof it === 'undefined' ? 'undefined' : _typeof(it)) === 'object' ? it !== null : typeof it === 'function';
};

/***/ }),
/* 6 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


// to indexed object, toObject with fallback for non-array-like ES3 strings
var IObject = __webpack_require__(28),
    defined = __webpack_require__(23);
module.exports = function (it) {
  return IObject(defined(it));
};

/***/ }),
/* 7 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var __assign = undefined && undefined.__assign || Object.assign || function (t) {
    for (var s, i = 1, n = arguments.length; i < n; i++) {
        s = arguments[i];
        for (var p in s) {
            if (Object.prototype.hasOwnProperty.call(s, p)) t[p] = s[p];
        }
    }
    return t;
};
Object.defineProperty(exports, "__esModule", { value: true });
var assure_1 = __webpack_require__(0);
var store_object = {};
var store_initial = {};
var _id = 1;
function get_unique_id(name) {
    assure_1.system_.notNull(arguments);
    return name || exist(++_id + "") ? ++_id + "" : _id + "";
}
exports.get_unique_id = get_unique_id;
;
function exist(name) {
    assure_1.system_.notNull(arguments);
    return entire_store()[name] !== undefined;
}
exports.exist = exist;
function entire_store_initial() {
    assure_1.system_.notNull(arguments);
    return __assign({}, store_initial);
}
exports.entire_store_initial = entire_store_initial;
function entire_store(argu) {
    assure_1.system_.notNull(arguments);
    if (arguments.length === 1) {
        var new_state_of_the_comp = argu.new_state_of_the_comp,
            subscribers = argu.subscribers;
        set_store_object(new_state_of_the_comp, subscribers);
    }
    return __assign({}, store_object);
}
exports.entire_store = entire_store;
function get_store_object() {
    assure_1.system_.notNull(arguments);
    return __assign({}, store_object);
}
function set_store_object(new_state_of_the_comp, subscribers) {
    assure_1.system_.notNull(arguments);
    assure_1.assure_.required(new_state_of_the_comp);
    var store_key = Object.keys(new_state_of_the_comp)[0];
    var isInitial = !store_object[store_key];
    if (isInitial) {
        store_initial = __assign({}, store_initial, new_state_of_the_comp);
    }
    var isNew = isInitial || JSON.stringify(store_object[store_key]) !== JSON.stringify(new_state_of_the_comp[store_key]);
    store_object = __assign({}, store_object, new_state_of_the_comp);
    if (isNew) {
        subscribers.forEach(function (handler) {
            if (typeof handler === "function") {
                handler.call({});
            }
        });
    }
}

/***/ }),
/* 8 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


module.exports = function (exec) {
  try {
    return !!exec();
  } catch (e) {
    return true;
  }
};

/***/ }),
/* 9 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var hasOwnProperty = {}.hasOwnProperty;
module.exports = function (it, key) {
  return hasOwnProperty.call(it, key);
};

/***/ }),
/* 10 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var dP = __webpack_require__(29),
    createDesc = __webpack_require__(34);
module.exports = __webpack_require__(4) ? function (object, key, value) {
  return dP.f(object, key, createDesc(1, value));
} : function (object, key, value) {
  object[key] = value;
  return object;
};

/***/ }),
/* 11 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


// 7.1.4 ToInteger
var ceil = Math.ceil,
    floor = Math.floor;
module.exports = function (it) {
  return isNaN(it = +it) ? 0 : (it > 0 ? floor : ceil)(it);
};

/***/ }),
/* 12 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var id = 0,
    px = Math.random();
module.exports = function (key) {
  return 'Symbol('.concat(key === undefined ? '' : key, ')_', (++id + px).toString(36));
};

/***/ }),
/* 13 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


module.exports = function (module) {
	if (!module.webpackPolyfill) {
		module.deprecate = function () {};
		module.paths = [];
		// module.parent = undefined by default
		if (!module.children) module.children = [];
		Object.defineProperty(module, "loaded", {
			enumerable: true,
			get: function get() {
				return module.l;
			}
		});
		Object.defineProperty(module, "id", {
			enumerable: true,
			get: function get() {
				return module.i;
			}
		});
		module.webpackPolyfill = 1;
	}
	return module;
};

/***/ }),
/* 14 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

var __assign = undefined && undefined.__assign || Object.assign || function (t) {
    for (var s, i = 1, n = arguments.length; i < n; i++) {
        s = arguments[i];
        for (var p in s) {
            if (Object.prototype.hasOwnProperty.call(s, p)) t[p] = s[p];
        }
    }
    return t;
};
var assure_1 = __webpack_require__(0);
var Store_1 = __webpack_require__(1);
var vue_1 = __webpack_require__(46);
var react_1 = __webpack_require__(42);
var modules_ = {
    system_: assure_1.system_,
    assure_: assure_1.assure_,
    Store: Store_1.Store,
    vue: vue_1.default,
    react: react_1.default
};
var root = undefined || (0, eval)('this');
var isAMD = typeof root.define === "function" && root.define['amd'];
var isModule = _typeof(root.module) === "object" && root.module.exports;
if (!isAMD && !isModule) {
    var previous_lodux_1 = root['lodux'];
    var noConflict = function noConflict() {
        root['lodux'] = previous_lodux_1;
        return __assign({}, modules_, { noConflict: function noConflict() {} });
    };
    root['lodux'] = __assign({}, modules_, { noConflict: noConflict });
}
module.exports = modules_;

/***/ }),
/* 15 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var __values = undefined && undefined.__values || function (o) {
    var m = typeof Symbol === "function" && o[Symbol.iterator],
        i = 0;
    if (m) return m.call(o);
    return {
        next: function next() {
            if (o && i >= o.length) o = void 0;
            return { value: o && o[i++], done: !o };
        }
    };
};
var __read = undefined && undefined.__read || function (o, n) {
    var m = typeof Symbol === "function" && o[Symbol.iterator];
    if (!m) return o;
    var i = m.call(o),
        r,
        ar = [],
        e;
    try {
        while ((n === void 0 || n-- > 0) && !(r = i.next()).done) {
            ar.push(r.value);
        }
    } catch (error) {
        e = { error: error };
    } finally {
        try {
            if (r && !r.done && (m = i["return"])) m.call(i);
        } finally {
            if (e) throw e.error;
        }
    }
    return ar;
};
var __spread = undefined && undefined.__spread || function () {
    for (var ar = [], i = 0; i < arguments.length; i++) {
        ar = ar.concat(__read(arguments[i]));
    }return ar;
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
            } catch (e_1_1) {
                e_1 = { error: e_1_1 };
            } finally {
                try {
                    if (_b && !_b.done && (_c = _a.return)) _c.call(_a);
                } finally {
                    if (e_1) throw e_1.error;
                }
            }
        } catch (e) {
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
        dispose: function dispose() {
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

/***/ }),
/* 16 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var __assign = undefined && undefined.__assign || Object.assign || function (t) {
    for (var s, i = 1, n = arguments.length; i < n; i++) {
        s = arguments[i];
        for (var p in s) {
            if (Object.prototype.hasOwnProperty.call(s, p)) t[p] = s[p];
        }
    }
    return t;
};
Object.defineProperty(exports, "__esModule", { value: true });
var assure_1 = __webpack_require__(0);
var Entire_store_1 = __webpack_require__(7);
function dispatch_(module, action, feedback_fn) {
    assure_1.system_.notNull(arguments);
    assure_1.assure_.required(action).nonFunc(action).required(action.type).required(module.emitter);
    var feedback_type = Entire_store_1.get_unique_id();
    var subscription;
    if (feedback_fn !== undefined) {
        subscription = module.emitter.listen(feedback_type, function () {
            feedback_fn.call({}, subscription);
        });
    }
    module.emitter.emit(action.type, __assign({}, action, { feedback_type: feedback_type }));
    return;
}
exports.dispatch_ = dispatch_;
function reduce_(module, update_state, type, callback) {
    assure_1.system_.notNull(arguments);
    return module.emitter.listen(type, function (action) {
        assure_1.system_.notNull(arguments);
        var return_state = callback.call({}, pouch(action));
        if (return_state !== undefined) {
            update_state(module.store_key, return_state);
        }
        dispatch_(module, { type: action.feedback_type });
    });
    function pouch(action) {
        assure_1.system_.notNull(arguments);
        return Object.entries(action).reduce(function (acc, val) {
            return val[0] !== 'feedback_type' ? (acc[val[0]] = val[1], acc) : acc;
        }, {});
    }
}
exports.reduce_ = reduce_;

/***/ }),
/* 17 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


__webpack_require__(41);
module.exports = __webpack_require__(3).Object.entries;

/***/ }),
/* 18 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


module.exports = function (it) {
  if (typeof it != 'function') throw TypeError(it + ' is not a function!');
  return it;
};

/***/ }),
/* 19 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var isObject = __webpack_require__(5);
module.exports = function (it) {
  if (!isObject(it)) throw TypeError(it + ' is not an object!');
  return it;
};

/***/ }),
/* 20 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


// false -> Array#indexOf
// true  -> Array#includes
var toIObject = __webpack_require__(6),
    toLength = __webpack_require__(39),
    toIndex = __webpack_require__(38);
module.exports = function (IS_INCLUDES) {
  return function ($this, el, fromIndex) {
    var O = toIObject($this),
        length = toLength(O.length),
        index = toIndex(fromIndex, length),
        value;
    // Array#includes uses SameValueZero equality algorithm
    if (IS_INCLUDES && el != el) while (length > index) {
      value = O[index++];
      if (value != value) return true;
      // Array#toIndex ignores holes, Array#includes - not
    } else for (; length > index; index++) {
      if (IS_INCLUDES || index in O) {
        if (O[index] === el) return IS_INCLUDES || index || 0;
      }
    }return !IS_INCLUDES && -1;
  };
};

/***/ }),
/* 21 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var toString = {}.toString;

module.exports = function (it) {
  return toString.call(it).slice(8, -1);
};

/***/ }),
/* 22 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


// optional / simple context binding
var aFunction = __webpack_require__(18);
module.exports = function (fn, that, length) {
  aFunction(fn);
  if (that === undefined) return fn;
  switch (length) {
    case 1:
      return function (a) {
        return fn.call(that, a);
      };
    case 2:
      return function (a, b) {
        return fn.call(that, a, b);
      };
    case 3:
      return function (a, b, c) {
        return fn.call(that, a, b, c);
      };
  }
  return function () /* ...args */{
    return fn.apply(that, arguments);
  };
};

/***/ }),
/* 23 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


// 7.2.1 RequireObjectCoercible(argument)
module.exports = function (it) {
  if (it == undefined) throw TypeError("Can't call method on  " + it);
  return it;
};

/***/ }),
/* 24 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var isObject = __webpack_require__(5),
    document = __webpack_require__(2).document
// in old IE typeof document.createElement is 'object'
,
    is = isObject(document) && isObject(document.createElement);
module.exports = function (it) {
  return is ? document.createElement(it) : {};
};

/***/ }),
/* 25 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


// IE 8- don't enum bug keys
module.exports = 'constructor,hasOwnProperty,isPrototypeOf,propertyIsEnumerable,toLocaleString,toString,valueOf'.split(',');

/***/ }),
/* 26 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var global = __webpack_require__(2),
    core = __webpack_require__(3),
    hide = __webpack_require__(10),
    redefine = __webpack_require__(35),
    ctx = __webpack_require__(22),
    PROTOTYPE = 'prototype';

var $export = function $export(type, name, source) {
  var IS_FORCED = type & $export.F,
      IS_GLOBAL = type & $export.G,
      IS_STATIC = type & $export.S,
      IS_PROTO = type & $export.P,
      IS_BIND = type & $export.B,
      target = IS_GLOBAL ? global : IS_STATIC ? global[name] || (global[name] = {}) : (global[name] || {})[PROTOTYPE],
      exports = IS_GLOBAL ? core : core[name] || (core[name] = {}),
      expProto = exports[PROTOTYPE] || (exports[PROTOTYPE] = {}),
      key,
      own,
      out,
      exp;
  if (IS_GLOBAL) source = name;
  for (key in source) {
    // contains in native
    own = !IS_FORCED && target && target[key] !== undefined;
    // export native or passed
    out = (own ? target : source)[key];
    // bind timers to global for call from export context
    exp = IS_BIND && own ? ctx(out, global) : IS_PROTO && typeof out == 'function' ? ctx(Function.call, out) : out;
    // extend global
    if (target) redefine(target, key, out, type & $export.U);
    // export
    if (exports[key] != out) hide(exports, key, exp);
    if (IS_PROTO && expProto[key] != out) expProto[key] = out;
  }
};
global.core = core;
// type bitmap
$export.F = 1; // forced
$export.G = 2; // global
$export.S = 4; // static
$export.P = 8; // proto
$export.B = 16; // bind
$export.W = 32; // wrap
$export.U = 64; // safe
$export.R = 128; // real proto method for `library` 
module.exports = $export;

/***/ }),
/* 27 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


module.exports = !__webpack_require__(4) && !__webpack_require__(8)(function () {
  return Object.defineProperty(__webpack_require__(24)('div'), 'a', { get: function get() {
      return 7;
    } }).a != 7;
});

/***/ }),
/* 28 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


// fallback for non-array-like ES3 and non-enumerable old V8 strings
var cof = __webpack_require__(21);
module.exports = Object('z').propertyIsEnumerable(0) ? Object : function (it) {
  return cof(it) == 'String' ? it.split('') : Object(it);
};

/***/ }),
/* 29 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var anObject = __webpack_require__(19),
    IE8_DOM_DEFINE = __webpack_require__(27),
    toPrimitive = __webpack_require__(40),
    dP = Object.defineProperty;

exports.f = __webpack_require__(4) ? Object.defineProperty : function defineProperty(O, P, Attributes) {
  anObject(O);
  P = toPrimitive(P, true);
  anObject(Attributes);
  if (IE8_DOM_DEFINE) try {
    return dP(O, P, Attributes);
  } catch (e) {/* empty */}
  if ('get' in Attributes || 'set' in Attributes) throw TypeError('Accessors not supported!');
  if ('value' in Attributes) O[P] = Attributes.value;
  return O;
};

/***/ }),
/* 30 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var has = __webpack_require__(9),
    toIObject = __webpack_require__(6),
    arrayIndexOf = __webpack_require__(20)(false),
    IE_PROTO = __webpack_require__(36)('IE_PROTO');

module.exports = function (object, names) {
  var O = toIObject(object),
      i = 0,
      result = [],
      key;
  for (key in O) {
    if (key != IE_PROTO) has(O, key) && result.push(key);
  } // Don't enum bug & hidden keys
  while (names.length > i) {
    if (has(O, key = names[i++])) {
      ~arrayIndexOf(result, key) || result.push(key);
    }
  }return result;
};

/***/ }),
/* 31 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


// 19.1.2.14 / 15.2.3.14 Object.keys(O)
var $keys = __webpack_require__(30),
    enumBugKeys = __webpack_require__(25);

module.exports = Object.keys || function keys(O) {
  return $keys(O, enumBugKeys);
};

/***/ }),
/* 32 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


exports.f = {}.propertyIsEnumerable;

/***/ }),
/* 33 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var getKeys = __webpack_require__(31),
    toIObject = __webpack_require__(6),
    isEnum = __webpack_require__(32).f;
module.exports = function (isEntries) {
  return function (it) {
    var O = toIObject(it),
        keys = getKeys(O),
        length = keys.length,
        i = 0,
        result = [],
        key;
    while (length > i) {
      if (isEnum.call(O, key = keys[i++])) {
        result.push(isEntries ? [key, O[key]] : O[key]);
      }
    }return result;
  };
};

/***/ }),
/* 34 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


module.exports = function (bitmap, value) {
  return {
    enumerable: !(bitmap & 1),
    configurable: !(bitmap & 2),
    writable: !(bitmap & 4),
    value: value
  };
};

/***/ }),
/* 35 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var global = __webpack_require__(2),
    hide = __webpack_require__(10),
    has = __webpack_require__(9),
    SRC = __webpack_require__(12)('src'),
    TO_STRING = 'toString',
    $toString = Function[TO_STRING],
    TPL = ('' + $toString).split(TO_STRING);

__webpack_require__(3).inspectSource = function (it) {
  return $toString.call(it);
};

(module.exports = function (O, key, val, safe) {
  var isFunction = typeof val == 'function';
  if (isFunction) has(val, 'name') || hide(val, 'name', key);
  if (O[key] === val) return;
  if (isFunction) has(val, SRC) || hide(val, SRC, O[key] ? '' + O[key] : TPL.join(String(key)));
  if (O === global) {
    O[key] = val;
  } else {
    if (!safe) {
      delete O[key];
      hide(O, key, val);
    } else {
      if (O[key]) O[key] = val;else hide(O, key, val);
    }
  }
  // add fake Function#toString for correct work wrapped methods / constructors with methods like LoDash isNative
})(Function.prototype, TO_STRING, function toString() {
  return typeof this == 'function' && this[SRC] || $toString.call(this);
});

/***/ }),
/* 36 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var shared = __webpack_require__(37)('keys'),
    uid = __webpack_require__(12);
module.exports = function (key) {
  return shared[key] || (shared[key] = uid(key));
};

/***/ }),
/* 37 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var global = __webpack_require__(2),
    SHARED = '__core-js_shared__',
    store = global[SHARED] || (global[SHARED] = {});
module.exports = function (key) {
  return store[key] || (store[key] = {});
};

/***/ }),
/* 38 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var toInteger = __webpack_require__(11),
    max = Math.max,
    min = Math.min;
module.exports = function (index, length) {
  index = toInteger(index);
  return index < 0 ? max(index + length, 0) : min(index, length);
};

/***/ }),
/* 39 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


// 7.1.15 ToLength
var toInteger = __webpack_require__(11),
    min = Math.min;
module.exports = function (it) {
  return it > 0 ? min(toInteger(it), 0x1fffffffffffff) : 0; // pow(2, 53) - 1 == 9007199254740991
};

/***/ }),
/* 40 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


// 7.1.1 ToPrimitive(input [, PreferredType])
var isObject = __webpack_require__(5);
// instead of the ES6 spec version, we didn't implement @@toPrimitive case
// and the second argument - flag - preferred type is a string
module.exports = function (it, S) {
  if (!isObject(it)) return it;
  var fn, val;
  if (S && typeof (fn = it.toString) == 'function' && !isObject(val = fn.call(it))) return val;
  if (typeof (fn = it.valueOf) == 'function' && !isObject(val = fn.call(it))) return val;
  if (!S && typeof (fn = it.toString) == 'function' && !isObject(val = fn.call(it))) return val;
  throw TypeError("Can't convert object to primitive value");
};

/***/ }),
/* 41 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


// https://github.com/tc39/proposal-object-values-entries
var $export = __webpack_require__(26),
    $entries = __webpack_require__(33)(true);

$export($export.S, 'Object', {
  entries: function entries(it) {
    return $entries(it);
  }
});

/***/ }),
/* 42 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(module) {var __WEBPACK_AMD_DEFINE_RESULT__;

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

var __assign = undefined && undefined.__assign || Object.assign || function (t) {
    for (var s, i = 1, n = arguments.length; i < n; i++) {
        s = arguments[i];
        for (var p in s) {
            if (Object.prototype.hasOwnProperty.call(s, p)) t[p] = s[p];
        }
    }
    return t;
};
Object.defineProperty(exports, "__esModule", { value: true });
var Store_1 = __webpack_require__(1);
var Connect_1 = __webpack_require__(43);
var modules_ = {
    Store: Store_1.Store,
    connect: Connect_1.connect
};
var isAMD = "function" === "function" && __webpack_require__(47);
var isModule = ( false ? "undefined" : _typeof(module)) === "object" && module.exports;
if (isAMD) {
    !(__WEBPACK_AMD_DEFINE_RESULT__ = function () {
        return modules_;
    }.call(exports, __webpack_require__, exports, module),
				__WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));
}
if (isModule) {
    module.exports = __assign({}, modules_);
    module.exports.default = __assign({}, modules_);
}
/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(13)(module)))

/***/ }),
/* 43 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var __assign = undefined && undefined.__assign || Object.assign || function (t) {
    for (var s, i = 1, n = arguments.length; i < n; i++) {
        s = arguments[i];
        for (var p in s) {
            if (Object.prototype.hasOwnProperty.call(s, p)) t[p] = s[p];
        }
    }
    return t;
};
Object.defineProperty(exports, "__esModule", { value: true });
var assure_1 = __webpack_require__(0);
var Store_1 = __webpack_require__(1);
var Undoable_js_1 = __webpack_require__(44);
function connect(theClass, creator_) {
    assure_1.system_.notNull(arguments);
    assure_1.assure_.func(theClass).required(creator_);
    var hasApplyUndoable = false;
    var hasApplyMiddlewares = false;
    var logs = undefined;
    var binder = {
        applyUndoable: function applyUndoable() {
            assure_1.system_.notNull(arguments);
            if (hasApplyUndoable) {
                throw new Error("Multiple application not allowed!");
            }
            hasApplyUndoable = true;
            return binder;
        },
        applyMiddleware: function applyMiddleware(logs_) {
            assure_1.system_.notNull(arguments);
            if (hasApplyMiddlewares) {
                throw new Error("Multiple application not allowed!");
            }
            assure_1.assure_.array(logs_);
            hasApplyMiddlewares = true;
            logs = logs_;
            return binder;
        },
        done: function done() {
            assure_1.system_.notNull(arguments);
            var final_store = Store_1.createConfigurableStore(theClass.name);
            var final_creator = creator_;
            if (hasApplyMiddlewares && logs) {
                final_store = final_store.use(logs);
            }
            if (hasApplyUndoable) {
                var final = Undoable_js_1.applyUndoable(final_store, creator_);
                final_store = final.store;
                final_creator = final.creator;
            }
            connect_setState_dispatchers(final_store, final_creator);
            connect_setState(final_store, theClass);
            return final_store;
        }
    };
    return binder;
}
exports.connect = connect;
function connect_setState_dispatchers(store, creator_) {
    var setState = function setState(new_state) {
        assure_1.system_.notNull(arguments);
        if (new_state.type !== undefined) {
            throw new Error("Property 'type' is not allowed!");
        }
        store.diduce(__assign({ type: 'setState' }, new_state));
    };
    var dispatchers = creator_(store);
    if (dispatchers !== undefined) {
        for (var key in dispatchers) {
            if (store[key]) {
                throw new Error("'" + key + "' is not allowed as method name of your store.");
            }
        }
        Object.assign(store, dispatchers);
    }
    Object.assign(store, { setState: setState });
    return;
}
function connect_setState(store, theClass) {
    var initial_mount = theClass.prototype.componentDidMount || function () {};
    var initial_unmount = theClass.prototype.componentWillUnmount || function () {};
    var subscriptions = [];
    theClass.prototype.componentDidMount = function () {
        var component = this;
        subscriptions.push(store.subscribe(function () {
            component.setState(store.state);
        }));
        initial_mount.call(component);
    };
    theClass.prototype.componentWillUnmount = function () {
        var component = this;
        subscriptions.slice().forEach(function (subscription) {
            if (subscription) {
                subscription.dispose();
            }
            subscription = undefined;
        });
        subscriptions = [];
        initial_unmount.call(component);
    };
    return;
}

/***/ }),
/* 44 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var __assign = undefined && undefined.__assign || Object.assign || function (t) {
    for (var s, i = 1, n = arguments.length; i < n; i++) {
        s = arguments[i];
        for (var p in s) {
            if (Object.prototype.hasOwnProperty.call(s, p)) t[p] = s[p];
        }
    }
    return t;
};
Object.defineProperty(exports, "__esModule", { value: true });
var assure_1 = __webpack_require__(0);
var Store_1 = __webpack_require__(1);
function applyUndoable(store_, creator_) {
    assure_1.system_.notNull(arguments);
    return {
        store: manipulate_store(store_),
        creator: creator(creator_)
    };
}
exports.applyUndoable = applyUndoable;
function manipulate_store(store) {
    Object.defineProperty(store, 'raw_state', {
        get: function get() {
            return Store_1.Store.state[store.store_key];
        }
    });
    Object.defineProperty(store, 'state', {
        configurable: false,
        get: function get() {
            var state = store.raw_state;
            return state && state.stack !== undefined ? state.stack[state.stack.length - 1] : state;
        }
    });
    var proxy_reduce = store.reduce;
    store.reduce = function (type, func) {
        assure_1.system_.notNull(arguments);
        return proxy_reduce(type, function (action) {
            if (action.undoable) {
                return action;
            } else {
                var raw_state = store.raw_state;
                var _a = slice(raw_state),
                    stack = _a.stack,
                    future = _a.future;
                stack = stack.concat(future);
                stack.push(func(action));
                return { stack: stack, future: [] };
            }
        });
    };
    return store;
}
function creator(creator_) {
    return function (store) {
        assure_1.system_.notNull(arguments);
        var creator_obj = creator_(store);
        return __assign({}, creator_obj, creator_obj.dispatchers, additional_dispatchers(store));
    };
}
function additional_dispatchers(store) {
    return {
        undo: function undo() {
            if (arguments.length > 0) {
                console.warn('"undo()" will ignore all arguments provided! Please double check your intention.' + "For example, if you are writing onClick='{store.redo}', rewrite it to onClick='{() => store.undo()}'");
            }
            var state = store.raw_state;
            if (state === undefined || state.stack === undefined || state.stack.length <= 1) {
                return;
            } else {
                var _a = slice(state),
                    stack = _a.stack,
                    future = _a.future;
                future.unshift(stack.pop());
                var action = { stack: stack, future: future, type: 'undo', undoable: 'undo' };
                store.diduce(action);
            }
        },
        redo: function redo() {
            if (arguments.length > 0) {
                console.warn('"redo()" will ignore all arguments provided! Please double check your intention.' + "For example, if you are writing onClick='{store.redo}', rewrite it to onClick='{() => store.redo()}'");
            }
            var state = store.raw_state;
            if (state.future.length === 0) {
                return;
            }
            var _a = slice(state),
                stack = _a.stack,
                future = _a.future;
            stack.push(future.shift());
            store.diduce({ stack: stack, future: future, type: 'redo', undoable: "redo" });
        }
    };
}
function slice(raw_state) {
    var stack, future;
    if (raw_state === undefined) {
        stack = [];
        future = [];
    } else {
        stack = raw_state.stack.slice();
        future = raw_state.future.slice();
    }
    return { stack: stack, future: future };
}

/***/ }),
/* 45 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var __assign = undefined && undefined.__assign || Object.assign || function (t) {
    for (var s, i = 1, n = arguments.length; i < n; i++) {
        s = arguments[i];
        for (var p in s) {
            if (Object.prototype.hasOwnProperty.call(s, p)) t[p] = s[p];
        }
    }
    return t;
};
Object.defineProperty(exports, "__esModule", { value: true });
var assure_1 = __webpack_require__(0);
var Store_1 = __webpack_require__(1);
function connect(comp, action_creator_, initial) {
    assure_1.system_.notNull(arguments);
    var store = Store_1.Store.createStore(comp.name);
    var dispatchers = connect_creator(store, action_creator_);
    comp.methods = Object.keys(dispatchers).reduce(function (acc, k) {
        return __assign({}, acc, (_a = {}, _a[k] = dispatchers[k], _a));
        var _a;
    }, {});
    comp.created = function () {
        var vueThis = this;
        this.subscription = store.subscribe(function () {
            var state = store.state;
            Object.keys(state).forEach(function (key) {
                vueThis[key] = state[key];
            });
        });
    };
    comp.destroyed = function () {
        this.subscription.dispose();
    };
    comp.data = function () {
        return __assign({}, initial);
    };
    store.diduce(__assign({ type: 'initial' }, initial));
    comp.watch = watches(store, initial);
    return store;
}
exports.connect = connect;
function watches(store, state) {
    return Object.keys(state).filter(function (k) {
        return k !== 'action';
    }).reduce(function (acc, k) {
        return __assign({}, acc, (_a = {}, _a[k] = {
            handler: function handler(val) {
                var action = __assign({}, store.state, (_a = {}, _a[k] = val, _a.type = 'change', _a));
                store.diduce(action);
                var _a;
            },
            deep: true
        }, _a));
        var _a;
    }, {});
}
function connect_creator(store, action_creator_) {
    var dispatchers = action_creator_(store);
    if (dispatchers !== undefined) {
        for (var key in dispatchers) {
            if (store[key]) {
                throw new Error("'" + key + "' is not allowed as method name of your store.");
            }
        }
        Object.assign(store, dispatchers);
    }
    return dispatchers;
}

/***/ }),
/* 46 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(module) {var __WEBPACK_AMD_DEFINE_RESULT__;

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

var __assign = undefined && undefined.__assign || Object.assign || function (t) {
    for (var s, i = 1, n = arguments.length; i < n; i++) {
        s = arguments[i];
        for (var p in s) {
            if (Object.prototype.hasOwnProperty.call(s, p)) t[p] = s[p];
        }
    }
    return t;
};
Object.defineProperty(exports, "__esModule", { value: true });
var Store_1 = __webpack_require__(1);
var connect_1 = __webpack_require__(45);
var modules_ = {
    Store: Store_1.Store,
    connect: connect_1.connect
};
if (true) {
    !(__WEBPACK_AMD_DEFINE_RESULT__ = function () {
        return modules_;
    }.call(exports, __webpack_require__, exports, module),
				__WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));
}
if (( false ? "undefined" : _typeof(module)) === "object" && module.exports) {
    module.exports = __assign({}, modules_);
    module.exports.default = __assign({}, modules_);
}
/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(13)(module)))

/***/ }),
/* 47 */
/***/ (function(module, exports) {

/* WEBPACK VAR INJECTION */(function(__webpack_amd_options__) {/* globals __webpack_amd_options__ */
module.exports = __webpack_amd_options__;

/* WEBPACK VAR INJECTION */}.call(exports, {}))

/***/ }),
/* 48 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__(14);


/***/ })
/******/ ]);
});