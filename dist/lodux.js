!function(t,e){if("object"==typeof exports&&"object"==typeof module)module.exports=e();else if("function"==typeof define&&define.amd)define([],e);else{var n=e();for(var r in n)("object"==typeof exports?exports:t)[r]=n[r]}}(this,function(){return function(t){function e(r){if(n[r])return n[r].exports;var o=n[r]={i:r,l:!1,exports:{}};return t[r].call(o.exports,o,o.exports,e),o.l=!0,o.exports}var n={};return e.m=t,e.c=n,e.i=function(t){return t},e.d=function(t,n,r){e.o(t,n)||Object.defineProperty(t,n,{configurable:!1,enumerable:!0,get:r})},e.n=function(t){var n=t&&t.__esModule?function(){return t.default}:function(){return t};return e.d(n,"a",n),n},e.o=function(t,e){return Object.prototype.hasOwnProperty.call(t,e)},e.p="",e(e.s=48)}([function(t,e,n){"use strict";function r(t){throw new Error(t)}var o="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(t){return typeof t}:function(t){return t&&"function"==typeof Symbol&&t.constructor===Symbol&&t!==Symbol.prototype?"symbol":typeof t},i=function(t){var e="function"==typeof Symbol&&t[Symbol.iterator],n=0;return e?e.call(t):{next:function(){return t&&n>=t.length&&(t=void 0),{value:t&&t[n++],done:!t}}}};Object.defineProperty(e,"__esModule",{value:!0});var u={notNull:function(t){function e(t){if(void 0!==t){if("object"===(void 0===t?"undefined":o(t))){t||r("null is not allowed");for(var n in t)e(t[n])}}}void 0===t&&r("notNull() will not work in lamda express!");try{for(var n=i(t),u=n.next();!u.done;u=n.next()){e(u.value)}}catch(t){c={error:t}}finally{try{u&&!u.done&&(s=n.return)&&s.call(n)}finally{if(c)throw c.error}}return;var c,s}};e.system_=u;var c={class:function(t,e){return"function"==typeof t&&/^\s*class\s+/.test(t.toString())||r(e||t+" does not seems to be class! class is expected."),c},required:function(t,e){return void 0===t&&r(e||"required"),c},array:function(t,e){return Array.isArray(t)||r(e||"array is expected"),c},boolean:function(t,e){return"boolean"!=typeof t&&r(e||"boolean is expected"),c},string:function(t,e){return"string"!=typeof t&&r(e||"string is expected"),c},nonFunc:function(t,e){return"function"==typeof t&&r(e||"must be non function"),c},func:function(t,e){return"function"!=typeof t&&r(e||"must be function"),c}};e.assure_=c},function(t,e,n){"use strict";function r(t){s.system_.notNull(arguments);var e=l.get_unique_id(t);return new b(e,!0)}function o(t,e){s.system_.notNull(arguments),l.entire_store({new_state_of_the_comp:(n={},n[t]=e,n),subscribers:p.concat(y[t]||[])});var n}var i=Object.assign||function(t){for(var e,n=1,r=arguments.length;n<r;n++){e=arguments[n];for(var o in e)Object.prototype.hasOwnProperty.call(e,o)&&(t[o]=e[o])}return t},u=function(t,e){var n="function"==typeof Symbol&&t[Symbol.iterator];if(!n)return t;var r,o,i=n.call(t),u=[];try{for(;(void 0===e||e-- >0)&&!(r=i.next()).done;)u.push(r.value)}catch(t){o={error:t}}finally{try{r&&!r.done&&(n=i.return)&&n.call(i)}finally{if(o)throw o.error}}return u},c=function(){for(var t=[],e=0;e<arguments.length;e++)t=t.concat(u(arguments[e]));return t};Object.defineProperty(e,"__esModule",{value:!0}),n(17);var s=n(0),f=n(16),a=n(15),l=n(7),p=[],y={},d={isHMR:!1,configurable:!1},v=i({},d),b=function(){function t(t,e){if(l.exist(t)){if(!0!==v.isHMR)throw new Error(t+" is already exist in store!");console.warn(t+" is already exist in store!")}Object.defineProperty(this,"state",{configurable:e,get:function(){return l.entire_store()[t]}}),Object.defineProperty(this,"store_key",{enumerable:!0,configurable:!1,writable:!1,value:t}),Object.defineProperty(this,"emitter",{enumerable:!0,configurable:!1,writable:!1,value:a.default.local()}),this.dispatch=this.dispatch.bind(this),this.reduce=this.reduce.bind(this),this.use=this.use.bind(this),this.diduce=this.diduce.bind(this),this.subscribe=this.subscribe.bind(this)}function n(t){return Object.entries(t).reduce(function(t,e){return"type"!==e[0]?(t[e[0]]=e[1],t):t},{})}return t.prototype.dispatch=function(t,e){if(s.system_.notNull(arguments),s.assure_.string(t.type),"update"===t.type)throw new Error("action type 'update' is reserved. Please use a more specific action type.");return f.dispatch_(this,t,e)},t.prototype.reduce=function(t,e){return s.system_.notNull(arguments),f.reduce_(this,o,t,e)},t.prototype.use=function(t){s.system_.notNull(arguments);var n=e.Store.clone(this),r=t.reduce(function(t,e){return t.unshift(e),t},[]);return n.dispatch=r.reduce(function(t,e){return e(n)(t.bind(n))},n.dispatch),n},t.prototype.diduce=function(t){var e=this;s.system_.notNull(arguments),s.assure_.string(t.type);var r=this.reduce(t.type,function(t){r.dispose();var o=n(t);return i({},e.state,o)});this.dispatch(t)},t.prototype.subscribe=function(t){s.system_.notNull(arguments),y[this.store_key]=y[this.store_key]||[];var e=y[this.store_key];return e.push(t),{dispose:function(){s.system_.notNull(arguments);var n=e.indexOf(t);n>-1&&(e[this.store_key]=c(e.slice(0,n),e.slice(n+1)))}}},t}();e.createConfigurableStore=r,e.Store=new function(){Object.defineProperty(this,"state",{get:function(){return l.entire_store()}}),this.createStore=function(t){s.system_.notNull(arguments);var e=l.get_unique_id(t);return new b(e,!1)},this.clone=function(t,e){s.system_.notNull(arguments);var n=Object.getOwnPropertyDescriptor(t,"state").configurable||!1,r=new b(t.store_key,n);return Object.assign.apply(Object,c([r],e||{}))},this.config=function(t){s.system_.notNull(arguments),v=i({},v,t)},this.reset_config=function(){s.system_.notNull(arguments),v=i({},d)},this.subscribe=function(t){return s.system_.notNull(arguments),p.push(t),{dispose:function(){s.system_.notNull(arguments);var e=p.indexOf(t);e>-1&&(p=c(p.slice(0,e),p.slice(e+1)))}}},this.reset_initial=function(){s.system_.notNull(arguments),Object.entries(l.entire_store_initial()).forEach(function(t){var e=u(t,2);o(e[0],e[1])})}}},function(t,e,n){"use strict";var r=t.exports="undefined"!=typeof window&&window.Math==Math?window:"undefined"!=typeof self&&self.Math==Math?self:Function("return this")();"number"==typeof __g&&(__g=r)},function(t,e,n){"use strict";var r=t.exports={version:"2.4.0"};"number"==typeof __e&&(__e=r)},function(t,e,n){"use strict";t.exports=!n(8)(function(){return 7!=Object.defineProperty({},"a",{get:function(){return 7}}).a})},function(t,e,n){"use strict";var r="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(t){return typeof t}:function(t){return t&&"function"==typeof Symbol&&t.constructor===Symbol&&t!==Symbol.prototype?"symbol":typeof t};t.exports=function(t){return"object"===(void 0===t?"undefined":r(t))?null!==t:"function"==typeof t}},function(t,e,n){"use strict";var r=n(28),o=n(23);t.exports=function(t){return r(o(t))}},function(t,e,n){"use strict";function r(t){return f.system_.notNull(arguments),t||o(++p+"")?++p+"":p+""}function o(t){return f.system_.notNull(arguments),void 0!==u()[t]}function i(){return f.system_.notNull(arguments),s({},l)}function u(t){if(f.system_.notNull(arguments),1===arguments.length){c(t.new_state_of_the_comp,t.subscribers)}return s({},a)}function c(t,e){f.system_.notNull(arguments),f.assure_.required(t);var n=Object.keys(t)[0],r=!a[n];r&&(l=s({},l,t));var o=r||JSON.stringify(a[n])!==JSON.stringify(t[n]);a=s({},a,t),o&&e.forEach(function(t){"function"==typeof t&&t.call({})})}var s=Object.assign||function(t){for(var e,n=1,r=arguments.length;n<r;n++){e=arguments[n];for(var o in e)Object.prototype.hasOwnProperty.call(e,o)&&(t[o]=e[o])}return t};Object.defineProperty(e,"__esModule",{value:!0});var f=n(0),a={},l={},p=1;e.get_unique_id=r,e.exist=o,e.entire_store_initial=i,e.entire_store=u},function(t,e,n){"use strict";t.exports=function(t){try{return!!t()}catch(t){return!0}}},function(t,e,n){"use strict";var r={}.hasOwnProperty;t.exports=function(t,e){return r.call(t,e)}},function(t,e,n){"use strict";var r=n(29),o=n(34);t.exports=n(4)?function(t,e,n){return r.f(t,e,o(1,n))}:function(t,e,n){return t[e]=n,t}},function(t,e,n){"use strict";var r=Math.ceil,o=Math.floor;t.exports=function(t){return isNaN(t=+t)?0:(t>0?o:r)(t)}},function(t,e,n){"use strict";var r=0,o=Math.random();t.exports=function(t){return"Symbol(".concat(void 0===t?"":t,")_",(++r+o).toString(36))}},function(t,e,n){"use strict";t.exports=function(t){return t.webpackPolyfill||(t.deprecate=function(){},t.paths=[],t.children||(t.children=[]),Object.defineProperty(t,"loaded",{enumerable:!0,get:function(){return t.l}}),Object.defineProperty(t,"id",{enumerable:!0,get:function(){return t.i}}),t.webpackPolyfill=1),t}},function(t,e,n){"use strict";var r="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(t){return typeof t}:function(t){return t&&"function"==typeof Symbol&&t.constructor===Symbol&&t!==Symbol.prototype?"symbol":typeof t},o=Object.assign||function(t){for(var e,n=1,r=arguments.length;n<r;n++){e=arguments[n];for(var o in e)Object.prototype.hasOwnProperty.call(e,o)&&(t[o]=e[o])}return t},i=n(0),u=n(1),c=n(46),s=n(42),f={system_:i.system_,assure_:i.assure_,Store:u.Store,vue:c.default,react:s.default},a=(0,eval)("this"),l="function"==typeof a.define&&a.define.amd,p="object"===r(a.module)&&a.module.exports;if(!l&&!p){var y=a.lodux,d=function(){return a.lodux=y,o({},f,{noConflict:function(){}})};a.lodux=o({},f,{noConflict:d})}t.exports=f},function(t,e,n){"use strict";function r(){this.subjects={}}var o=function(t){var e="function"==typeof Symbol&&t[Symbol.iterator],n=0;return e?e.call(t):{next:function(){return t&&n>=t.length&&(t=void 0),{value:t&&t[n++],done:!t}}}},i=function(t,e){var n="function"==typeof Symbol&&t[Symbol.iterator];if(!n)return t;var r,o,i=n.call(t),u=[];try{for(;(void 0===e||e-- >0)&&!(r=i.next()).done;)u.push(r.value)}catch(t){o={error:t}}finally{try{r&&!r.done&&(n=i.return)&&n.call(i)}finally{if(o)throw o.error}}return u},u=function(){for(var t=[],e=0;e<arguments.length;e++)t=t.concat(i(arguments[e]));return t};Object.defineProperty(e,"__esModule",{value:!0}),r.prototype.emit=function(t,e){var n=this;e=JSON.parse(JSON.stringify(e)),n.subjects[t]=n.subjects[t]||[];var r=n.subjects[t];if(r)try{try{for(var i=o(r.slice()),u=i.next();!u.done;u=i.next()){u.value.call({},e)}}catch(t){c={error:t}}finally{try{u&&!u.done&&(s=i.return)&&s.call(i)}finally{if(c)throw c.error}}}catch(t){throw console.error(t),t}var c,s},r.prototype.listen=function(t,e){var n=this;return n.subjects[t]=n.subjects[t]||[],n.subjects[t].push(e),{dispose:function(){var r=n.subjects[t].indexOf(e);n.subjects[t]=u(n.subjects[t].slice(0,r),n.subjects[t].slice(r+1))}}},r.prototype.dispose=function(){this.subjects={}},r.prototype.local=function(){return new r},e.default=new r},function(t,e,n){"use strict";function r(t,e,n){u.system_.notNull(arguments),u.assure_.required(e).nonFunc(e).required(e.type).required(t.emitter);var r,o=c.get_unique_id();void 0!==n&&(r=t.emitter.listen(o,function(){n.call({},r)})),t.emitter.emit(e.type,i({},e,{feedback_type:o}))}function o(t,e,n,o){function i(t){return u.system_.notNull(arguments),Object.entries(t).reduce(function(t,e){return"feedback_type"!==e[0]?(t[e[0]]=e[1],t):t},{})}return u.system_.notNull(arguments),t.emitter.listen(n,function(n){u.system_.notNull(arguments);var c=o.call({},i(n));void 0!==c&&e(t.store_key,c),r(t,{type:n.feedback_type})})}var i=Object.assign||function(t){for(var e,n=1,r=arguments.length;n<r;n++){e=arguments[n];for(var o in e)Object.prototype.hasOwnProperty.call(e,o)&&(t[o]=e[o])}return t};Object.defineProperty(e,"__esModule",{value:!0});var u=n(0),c=n(7);e.dispatch_=r,e.reduce_=o},function(t,e,n){"use strict";n(41),t.exports=n(3).Object.entries},function(t,e,n){"use strict";t.exports=function(t){if("function"!=typeof t)throw TypeError(t+" is not a function!");return t}},function(t,e,n){"use strict";var r=n(5);t.exports=function(t){if(!r(t))throw TypeError(t+" is not an object!");return t}},function(t,e,n){"use strict";var r=n(6),o=n(39),i=n(38);t.exports=function(t){return function(e,n,u){var c,s=r(e),f=o(s.length),a=i(u,f);if(t&&n!=n){for(;f>a;)if((c=s[a++])!=c)return!0}else for(;f>a;a++)if((t||a in s)&&s[a]===n)return t||a||0;return!t&&-1}}},function(t,e,n){"use strict";var r={}.toString;t.exports=function(t){return r.call(t).slice(8,-1)}},function(t,e,n){"use strict";var r=n(18);t.exports=function(t,e,n){if(r(t),void 0===e)return t;switch(n){case 1:return function(n){return t.call(e,n)};case 2:return function(n,r){return t.call(e,n,r)};case 3:return function(n,r,o){return t.call(e,n,r,o)}}return function(){return t.apply(e,arguments)}}},function(t,e,n){"use strict";t.exports=function(t){if(void 0==t)throw TypeError("Can't call method on  "+t);return t}},function(t,e,n){"use strict";var r=n(5),o=n(2).document,i=r(o)&&r(o.createElement);t.exports=function(t){return i?o.createElement(t):{}}},function(t,e,n){"use strict";t.exports="constructor,hasOwnProperty,isPrototypeOf,propertyIsEnumerable,toLocaleString,toString,valueOf".split(",")},function(t,e,n){"use strict";var r=n(2),o=n(3),i=n(10),u=n(35),c=n(22),s=function t(e,n,s){var f,a,l,p,y=e&t.F,d=e&t.G,v=e&t.S,b=e&t.P,h=e&t.B,m=d?r:v?r[n]||(r[n]={}):(r[n]||{}).prototype,_=d?o:o[n]||(o[n]={}),g=_.prototype||(_.prototype={});d&&(s=n);for(f in s)a=!y&&m&&void 0!==m[f],l=(a?m:s)[f],p=h&&a?c(l,r):b&&"function"==typeof l?c(Function.call,l):l,m&&u(m,f,l,e&t.U),_[f]!=l&&i(_,f,p),b&&g[f]!=l&&(g[f]=l)};r.core=o,s.F=1,s.G=2,s.S=4,s.P=8,s.B=16,s.W=32,s.U=64,s.R=128,t.exports=s},function(t,e,n){"use strict";t.exports=!n(4)&&!n(8)(function(){return 7!=Object.defineProperty(n(24)("div"),"a",{get:function(){return 7}}).a})},function(t,e,n){"use strict";var r=n(21);t.exports=Object("z").propertyIsEnumerable(0)?Object:function(t){return"String"==r(t)?t.split(""):Object(t)}},function(t,e,n){"use strict";var r=n(19),o=n(27),i=n(40),u=Object.defineProperty;e.f=n(4)?Object.defineProperty:function(t,e,n){if(r(t),e=i(e,!0),r(n),o)try{return u(t,e,n)}catch(t){}if("get"in n||"set"in n)throw TypeError("Accessors not supported!");return"value"in n&&(t[e]=n.value),t}},function(t,e,n){"use strict";var r=n(9),o=n(6),i=n(20)(!1),u=n(36)("IE_PROTO");t.exports=function(t,e){var n,c=o(t),s=0,f=[];for(n in c)n!=u&&r(c,n)&&f.push(n);for(;e.length>s;)r(c,n=e[s++])&&(~i(f,n)||f.push(n));return f}},function(t,e,n){"use strict";var r=n(30),o=n(25);t.exports=Object.keys||function(t){return r(t,o)}},function(t,e,n){"use strict";e.f={}.propertyIsEnumerable},function(t,e,n){"use strict";var r=n(31),o=n(6),i=n(32).f;t.exports=function(t){return function(e){for(var n,u=o(e),c=r(u),s=c.length,f=0,a=[];s>f;)i.call(u,n=c[f++])&&a.push(t?[n,u[n]]:u[n]);return a}}},function(t,e,n){"use strict";t.exports=function(t,e){return{enumerable:!(1&t),configurable:!(2&t),writable:!(4&t),value:e}}},function(t,e,n){"use strict";var r=n(2),o=n(10),i=n(9),u=n(12)("src"),c=Function.toString,s=(""+c).split("toString");n(3).inspectSource=function(t){return c.call(t)},(t.exports=function(t,e,n,c){var f="function"==typeof n;f&&(i(n,"name")||o(n,"name",e)),t[e]!==n&&(f&&(i(n,u)||o(n,u,t[e]?""+t[e]:s.join(String(e)))),t===r?t[e]=n:c?t[e]?t[e]=n:o(t,e,n):(delete t[e],o(t,e,n)))})(Function.prototype,"toString",function(){return"function"==typeof this&&this[u]||c.call(this)})},function(t,e,n){"use strict";var r=n(37)("keys"),o=n(12);t.exports=function(t){return r[t]||(r[t]=o(t))}},function(t,e,n){"use strict";var r=n(2),o=r["__core-js_shared__"]||(r["__core-js_shared__"]={});t.exports=function(t){return o[t]||(o[t]={})}},function(t,e,n){"use strict";var r=n(11),o=Math.max,i=Math.min;t.exports=function(t,e){return t=r(t),t<0?o(t+e,0):i(t,e)}},function(t,e,n){"use strict";var r=n(11),o=Math.min;t.exports=function(t){return t>0?o(r(t),9007199254740991):0}},function(t,e,n){"use strict";var r=n(5);t.exports=function(t,e){if(!r(t))return t;var n,o;if(e&&"function"==typeof(n=t.toString)&&!r(o=n.call(t)))return o;if("function"==typeof(n=t.valueOf)&&!r(o=n.call(t)))return o;if(!e&&"function"==typeof(n=t.toString)&&!r(o=n.call(t)))return o;throw TypeError("Can't convert object to primitive value")}},function(t,e,n){"use strict";var r=n(26),o=n(33)(!0);r(r.S,"Object",{entries:function(t){return o(t)}})},function(t,e,n){"use strict";(function(t){var r,o="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(t){return typeof t}:function(t){return t&&"function"==typeof Symbol&&t.constructor===Symbol&&t!==Symbol.prototype?"symbol":typeof t},i=Object.assign||function(t){for(var e,n=1,r=arguments.length;n<r;n++){e=arguments[n];for(var o in e)Object.prototype.hasOwnProperty.call(e,o)&&(t[o]=e[o])}return t};Object.defineProperty(e,"__esModule",{value:!0});var u=n(1),c=n(43),s={Store:u.Store,connect:c.connect},f=n(47),a="object"===o(t)&&t.exports;f&&void 0!==(r=function(){return s}.call(e,n,e,t))&&(t.exports=r),a&&(t.exports=i({},s),t.exports.default=i({},s))}).call(e,n(13)(t))},function(t,e,n){"use strict";function r(t,e){c.system_.notNull(arguments),c.assure_.func(t).required(e);var n=!1,r=!1,u=void 0,a={applyUndoable:function(){if(c.system_.notNull(arguments),n)throw new Error("Multiple application not allowed!");return n=!0,a},applyMiddleware:function(t){if(c.system_.notNull(arguments),r)throw new Error("Multiple application not allowed!");return c.assure_.array(t),r=!0,u=t,a},done:function(){c.system_.notNull(arguments);var a=s.createConfigurableStore(t.name),l=e;if(r&&u&&(a=a.use(u)),n){var p=f.applyUndoable(a,e);a=p.store,l=p.creator}return o(a,l),i(a,t),a}};return a}function o(t,e){var n=function(e){if(c.system_.notNull(arguments),void 0!==e.type)throw new Error("Property 'type' is not allowed!");t.diduce(u({type:"setState"},e))},r=e(t);if(void 0!==r){for(var o in r)if(t[o])throw new Error("'"+o+"' is not allowed as method name of your store.");Object.assign(t,r)}Object.assign(t,{setState:n})}function i(t,e){var n=e.prototype.componentDidMount||function(){},r=e.prototype.componentWillUnmount||function(){},o=[];e.prototype.componentDidMount=function(){var e=this;o.push(t.subscribe(function(){e.setState(t.state)})),n.call(e)},e.prototype.componentWillUnmount=function(){var t=this;o.slice().forEach(function(t){t&&t.dispose(),t=void 0}),o=[],r.call(t)}}var u=Object.assign||function(t){for(var e,n=1,r=arguments.length;n<r;n++){e=arguments[n];for(var o in e)Object.prototype.hasOwnProperty.call(e,o)&&(t[o]=e[o])}return t};Object.defineProperty(e,"__esModule",{value:!0});var c=n(0),s=n(1),f=n(44);e.connect=r},function(t,e,n){"use strict";function r(t,e){return f.system_.notNull(arguments),{store:o(t),creator:i(e)}}function o(t){Object.defineProperty(t,"raw_state",{get:function(){return a.Store.state[t.store_key]}}),Object.defineProperty(t,"state",{configurable:!1,get:function(){var e=t.raw_state;return e&&void 0!==e.stack?e.stack[e.stack.length-1]:e}});var e=t.reduce;return t.reduce=function(n,r){return f.system_.notNull(arguments),e(n,function(e){if(e.undoable)return e;var n=t.raw_state,o=c(n),i=o.stack,u=o.future;return i=i.concat(u),i.push(r(e)),{stack:i,future:[]}})},t}function i(t){return function(e){f.system_.notNull(arguments);var n=t(e);return s({},n,n.dispatchers,u(e))}}function u(t){return{undo:function(){arguments.length>0&&console.warn("\"undo()\" will ignore all arguments provided! Please double check your intention.For example, if you are writing onClick='{store.redo}', rewrite it to onClick='{() => store.undo()}'");var e=t.raw_state;if(!(void 0===e||void 0===e.stack||e.stack.length<=1)){var n=c(e),r=n.stack,o=n.future;o.unshift(r.pop());var i={stack:r,future:o,type:"undo",undoable:"undo"};t.diduce(i)}},redo:function(){arguments.length>0&&console.warn("\"redo()\" will ignore all arguments provided! Please double check your intention.For example, if you are writing onClick='{store.redo}', rewrite it to onClick='{() => store.redo()}'");var e=t.raw_state;if(0!==e.future.length){var n=c(e),r=n.stack,o=n.future;r.push(o.shift()),t.diduce({stack:r,future:o,type:"redo",undoable:"redo"})}}}}function c(t){var e,n;return void 0===t?(e=[],n=[]):(e=t.stack.slice(),n=t.future.slice()),{stack:e,future:n}}var s=Object.assign||function(t){for(var e,n=1,r=arguments.length;n<r;n++){e=arguments[n];for(var o in e)Object.prototype.hasOwnProperty.call(e,o)&&(t[o]=e[o])}return t};Object.defineProperty(e,"__esModule",{value:!0});var f=n(0),a=n(1);e.applyUndoable=r},function(t,e,n){"use strict";function r(t,e,n){c.system_.notNull(arguments);var r=s.Store.createStore(t.name),f=i(r,e);return t.methods=Object.keys(f).reduce(function(t,e){return u({},t,(n={},n[e]=f[e],n));var n},{}),t.created=function(){var t=this;this.subscription=r.subscribe(function(){var e=r.state;Object.keys(e).forEach(function(n){t[n]=e[n]})})},t.destroyed=function(){this.subscription.dispose()},t.data=function(){return u({},n)},r.diduce(u({type:"initial"},n)),t.watch=o(r,n),r}function o(t,e){return Object.keys(e).filter(function(t){return"action"!==t}).reduce(function(e,n){return u({},e,(r={},r[n]={handler:function(e){var r=u({},t.state,(o={},o[n]=e,o.type="change",o));t.diduce(r);var o},deep:!0},r));var r},{})}function i(t,e){var n=e(t);if(void 0!==n){for(var r in n)if(t[r])throw new Error("'"+r+"' is not allowed as method name of your store.");Object.assign(t,n)}return n}var u=Object.assign||function(t){for(var e,n=1,r=arguments.length;n<r;n++){e=arguments[n];for(var o in e)Object.prototype.hasOwnProperty.call(e,o)&&(t[o]=e[o])}return t};Object.defineProperty(e,"__esModule",{value:!0});var c=n(0),s=n(1);e.connect=r},function(t,e,n){"use strict";(function(t){var r,o="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(t){return typeof t}:function(t){return t&&"function"==typeof Symbol&&t.constructor===Symbol&&t!==Symbol.prototype?"symbol":typeof t},i=Object.assign||function(t){for(var e,n=1,r=arguments.length;n<r;n++){e=arguments[n];for(var o in e)Object.prototype.hasOwnProperty.call(e,o)&&(t[o]=e[o])}return t};Object.defineProperty(e,"__esModule",{value:!0});var u=n(1),c=n(45),s={Store:u.Store,connect:c.connect};void 0!==(r=function(){return s}.call(e,n,e,t))&&(t.exports=r),"object"===o(t)&&t.exports&&(t.exports=i({},s),t.exports.default=i({},s))}).call(e,n(13)(t))},function(t,e){(function(e){t.exports=e}).call(e,{})},function(t,e,n){t.exports=n(14)}])});