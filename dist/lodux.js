!function(t,e){if("object"==typeof exports&&"object"==typeof module)module.exports=e();else if("function"==typeof define&&define.amd)define([],e);else{var n=e();for(var r in n)("object"==typeof exports?exports:t)[r]=n[r]}}(this,function(){return function(t){function e(r){if(n[r])return n[r].exports;var o=n[r]={i:r,l:!1,exports:{}};return t[r].call(o.exports,o,o.exports,e),o.l=!0,o.exports}var n={};return e.m=t,e.c=n,e.d=function(t,n,r){e.o(t,n)||Object.defineProperty(t,n,{configurable:!1,enumerable:!0,get:r})},e.n=function(t){var n=t&&t.__esModule?function(){return t.default}:function(){return t};return e.d(n,"a",n),n},e.o=function(t,e){return Object.prototype.hasOwnProperty.call(t,e)},e.p="",e(e.s=13)}([function(t,e,n){"use strict";function r(t){throw new Error(t)}var o="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(t){return typeof t}:function(t){return t&&"function"==typeof Symbol&&t.constructor===Symbol&&t!==Symbol.prototype?"symbol":typeof t},i=function(t){var e="function"==typeof Symbol&&t[Symbol.iterator],n=0;return e?e.call(t):{next:function(){return t&&n>=t.length&&(t=void 0),{value:t&&t[n++],done:!t}}}};Object.defineProperty(e,"__esModule",{value:!0}),e.system_={notNull:function(t){function e(t){if(void 0!==t&&"object"===(void 0===t?"undefined":o(t))){t||r("null is not allowed");for(var n in Object.getOwnPropertyNames(t))e(t[n])}}void 0===t&&r("notNull() will not work in lamda express!");try{for(var n=i(t),u=n.next();!u.done;u=n.next()){e(u.value)}}catch(t){c={error:t}}finally{try{u&&!u.done&&(s=n.return)&&s.call(n)}finally{if(c)throw c.error}}return;var c,s}},e.assure_={class:function(t,n){return"function"==typeof t&&/^\s*class\s+/.test(t.toString())||r(n||t+" does not seems to be class! class is expected."),e.assure_},required:function(t,n){return void 0===t&&r(n||"required"),e.assure_},array:function(t,n){return Array.isArray(t)||r(n||"array is expected"),e.assure_},boolean:function(t,n){return"boolean"!=typeof t&&r(n||"boolean is expected"),e.assure_},string:function(t,n){return"string"!=typeof t&&r(n||"string is expected"),e.assure_},nonFunc:function(t,n){return"function"==typeof t&&r(n||"must be non function"),e.assure_},func:function(t,n){return"function"!=typeof t&&r(n||"must be function"),e.assure_}}},function(t,e,n){"use strict";function r(t){s.system_.notNull(arguments);var e=l.get_unique_id(t);return new b(e,!0)}function o(t,e){s.system_.notNull(arguments),l.entire_store({new_state_of_the_comp:(n={},n[t]=e,n),subscribers:y.concat(d[t]||[])});var n}var i=Object.assign||function(t){for(var e,n=1,r=arguments.length;n<r;n++){e=arguments[n];for(var o in e)Object.prototype.hasOwnProperty.call(e,o)&&(t[o]=e[o])}return t},u=function(t,e){var n="function"==typeof Symbol&&t[Symbol.iterator];if(!n)return t;var r,o,i=n.call(t),u=[];try{for(;(void 0===e||e-- >0)&&!(r=i.next()).done;)u.push(r.value)}catch(t){o={error:t}}finally{try{r&&!r.done&&(n=i.return)&&n.call(i)}finally{if(o)throw o.error}}return u},c=function(){for(var t=[],e=0;e<arguments.length;e++)t=t.concat(u(arguments[e]));return t};Object.defineProperty(e,"__esModule",{value:!0}),n(16);var s=n(0),a=n(41),f=n(42),l=n(12),p=n(43),y=[],d={},v={isHMR:!1},h=i({},v),b=function(){function t(t,e){if(l.exist(t)){if(!0!==h.isHMR)throw new Error(t+" is already exist in store!");console.warn(t+" is already exist in store!")}Object.defineProperty(this,"state",{configurable:e,get:function(){var e=l.entire_store()[t];if(void 0===e)return e;var n=JSON.stringify(e);return JSON.parse(n)}}),Object.defineProperty(this,"store_key",{enumerable:!0,configurable:!1,writable:!1,value:t}),Object.defineProperty(this,"emitter",{enumerable:!0,configurable:!1,writable:!1,value:f.default.local()}),this.dispatch=this.dispatch.bind(this),this.reduce=this.reduce.bind(this),this.use=this.use.bind(this),this.diduce=this.diduce.bind(this),this.subscribe=this.subscribe.bind(this)}return t.prototype.proxy=function(){return p.proxy(this)},t.prototype.dispatch=function(t,e){if(s.system_.notNull(arguments),s.assure_.string(t.type),"update"===t.type)throw new Error("action type 'update' is reserved. Please use a more specific action type.");return a.dispatch_(this,t,e)},t.prototype.reduce=function(t,e){return s.system_.notNull(arguments),a.reduce_(this,o,t,e)},t.prototype.use=function(t){s.system_.notNull(arguments);var n=e.Store.clone(this),r=t.reduce(function(t,e){return t.unshift(e),t},[]);return n.dispatch=r.reduce(function(t,e){return e(n)(t.bind(n))},n.dispatch),n},t.prototype.update=function(){var t=0;return function(e){s.system_.notNull(arguments);var n="update-"+Date.now()+"-"+t++,r=this.reduce(n,function(t){return r.dispose(),i({},e,{type:"udpate"})});this.dispatch(i({},e,{type:n}))}}(),t.prototype.diduce=function(){var t=0;return function(e){var n=this;console.warn("diduce is deprecated! Please use update() instead."),s.system_.notNull(arguments),s.assure_.string(e.type);var r=e.type+t++,o=this.reduce(r,function(t){return o.dispose(),i({},n.state,e)});this.dispatch(i({},e,{type:r}))}}(),t.prototype.subscribe=function(t){s.system_.notNull(arguments);var e=this.store_key;return d[e]=d[e]||[],d[e].push(t),{dispose:function(){s.system_.notNull(arguments);var n=d[e].indexOf(t);n>-1&&(d[e]=c(d[e].slice(0,n),d[e].slice(n+1)))}}},t}();e.createConfigurableStore=r,e.Store=new function(){Object.defineProperty(this,"state",{get:function(){return l.entire_store()}}),this.config=function(t){return s.system_.notNull(arguments),void 0!==t&&(h=i({},h,t)),i({},h)},this.createStore=function(t){s.system_.notNull(arguments);var e=l.get_unique_id(t);return new b(e,!1)},this.clone=function(t,e){s.system_.notNull(arguments);var n=Object.getOwnPropertyDescriptor(t,"state").configurable||!1,r=new b(t.store_key,n);return Object.assign.apply(Object,c([r],e||{}))},this.reset_config=function(){s.system_.notNull(arguments),h=i({},v)},this.subscribe=function(t){return s.system_.notNull(arguments),y.push(t),{dispose:function(){s.system_.notNull(arguments);var e=y.indexOf(t);e>-1&&(y=c(y.slice(0,e),y.slice(e+1)))}}},this.reset_initial=function(){s.system_.notNull(arguments),Object.entries(l.entire_store_initial()).forEach(function(t){var e=u(t,2);o(e[0],e[1])})}}},function(t,e){var n=t.exports="undefined"!=typeof window&&window.Math==Math?window:"undefined"!=typeof self&&self.Math==Math?self:Function("return this")();"number"==typeof __g&&(__g=n)},function(t,e){var n=t.exports={version:"2.5.1"};"number"==typeof __e&&(__e=n)},function(t,e){t.exports=function(t){return"object"==typeof t?null!==t:"function"==typeof t}},function(t,e,n){t.exports=!n(8)(function(){return 7!=Object.defineProperty({},"a",{get:function(){return 7}}).a})},function(t,e,n){var r=n(31),o=n(33);t.exports=function(t){return r(o(t))}},function(t,e,n){var r=n(19),o=n(24);t.exports=n(5)?function(t,e,n){return r.f(t,e,o(1,n))}:function(t,e,n){return t[e]=n,t}},function(t,e){t.exports=function(t){try{return!!t()}catch(t){return!0}}},function(t,e){var n={}.hasOwnProperty;t.exports=function(t,e){return n.call(t,e)}},function(t,e){var n=0,r=Math.random();t.exports=function(t){return"Symbol(".concat(void 0===t?"":t,")_",(++n+r).toString(36))}},function(t,e){var n=Math.ceil,r=Math.floor;t.exports=function(t){return isNaN(t=+t)?0:(t>0?r:n)(t)}},function(t,e,n){"use strict";function r(t){return a.system_.notNull(arguments),t||o(++p+"")?++p+"":p+""}function o(t){return a.system_.notNull(arguments),void 0!==u()[t]}function i(){return a.system_.notNull(arguments),s({},l)}function u(t){if(a.system_.notNull(arguments),1===arguments.length){c(t.new_state_of_the_comp,t.subscribers)}return s({},f)}function c(t,e){a.system_.notNull(arguments),a.assure_.required(t);var n=Object.keys(t)[0],r=!f[n];r&&(l=s({},l,t));var o=r||JSON.stringify(f[n])!==JSON.stringify(t[n]);f=s({},f,t),o&&e.forEach(function(t){"function"==typeof t&&t.call({})})}var s=Object.assign||function(t){for(var e,n=1,r=arguments.length;n<r;n++){e=arguments[n];for(var o in e)Object.prototype.hasOwnProperty.call(e,o)&&(t[o]=e[o])}return t};Object.defineProperty(e,"__esModule",{value:!0});var a=n(0),f={},l={},p=1;e.get_unique_id=r,e.exist=o,e.entire_store_initial=i,e.entire_store=u},function(t,e,n){t.exports=n(14)},function(t,e,n){"use strict";(function(t){var e="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(t){return typeof t}:function(t){return t&&"function"==typeof Symbol&&t.constructor===Symbol&&t!==Symbol.prototype?"symbol":typeof t},r=Object.assign||function(t){for(var e,n=1,r=arguments.length;n<r;n++){e=arguments[n];for(var o in e)Object.prototype.hasOwnProperty.call(e,o)&&(t[o]=e[o])}return t},o=n(0),i=n(1),u=n(44),c=n(46),s=n(50),a={system_:o.system_,assure_:o.assure_,Store:i.Store,vue:u,react:c,recompose:s},f=n(51),l="object"===e(t)&&t.exports;if(!f&&!l){var p=(0,eval)("this"),y=p.lodux,d=function(){return p.lodux=y,r({},a,{noConflict:function(){}})};p.lodux=r({},a,{noConflict:d})}t.exports=r({},a)}).call(e,n(15)(t))},function(t,e){t.exports=function(t){return t.webpackPolyfill||(t.deprecate=function(){},t.paths=[],t.children||(t.children=[]),Object.defineProperty(t,"loaded",{enumerable:!0,get:function(){return t.l}}),Object.defineProperty(t,"id",{enumerable:!0,get:function(){return t.i}}),t.webpackPolyfill=1),t}},function(t,e,n){n(17),t.exports=n(3).Object.entries},function(t,e,n){var r=n(18),o=n(28)(!0);r(r.S,"Object",{entries:function(t){return o(t)}})},function(t,e,n){var r=n(2),o=n(3),i=n(7),u=n(25),c=n(26),s=function(t,e,n){var a,f,l,p,y=t&s.F,d=t&s.G,v=t&s.S,h=t&s.P,b=t&s.B,_=d?r:v?r[e]||(r[e]={}):(r[e]||{}).prototype,m=d?o:o[e]||(o[e]={}),g=m.prototype||(m.prototype={});d&&(n=e);for(a in n)f=!y&&_&&void 0!==_[a],l=(f?_:n)[a],p=b&&f?c(l,r):h&&"function"==typeof l?c(Function.call,l):l,_&&u(_,a,l,t&s.U),m[a]!=l&&i(m,a,p),h&&g[a]!=l&&(g[a]=l)};r.core=o,s.F=1,s.G=2,s.S=4,s.P=8,s.B=16,s.W=32,s.U=64,s.R=128,t.exports=s},function(t,e,n){var r=n(20),o=n(21),i=n(23),u=Object.defineProperty;e.f=n(5)?Object.defineProperty:function(t,e,n){if(r(t),e=i(e,!0),r(n),o)try{return u(t,e,n)}catch(t){}if("get"in n||"set"in n)throw TypeError("Accessors not supported!");return"value"in n&&(t[e]=n.value),t}},function(t,e,n){var r=n(4);t.exports=function(t){if(!r(t))throw TypeError(t+" is not an object!");return t}},function(t,e,n){t.exports=!n(5)&&!n(8)(function(){return 7!=Object.defineProperty(n(22)("div"),"a",{get:function(){return 7}}).a})},function(t,e,n){var r=n(4),o=n(2).document,i=r(o)&&r(o.createElement);t.exports=function(t){return i?o.createElement(t):{}}},function(t,e,n){var r=n(4);t.exports=function(t,e){if(!r(t))return t;var n,o;if(e&&"function"==typeof(n=t.toString)&&!r(o=n.call(t)))return o;if("function"==typeof(n=t.valueOf)&&!r(o=n.call(t)))return o;if(!e&&"function"==typeof(n=t.toString)&&!r(o=n.call(t)))return o;throw TypeError("Can't convert object to primitive value")}},function(t,e){t.exports=function(t,e){return{enumerable:!(1&t),configurable:!(2&t),writable:!(4&t),value:e}}},function(t,e,n){var r=n(2),o=n(7),i=n(9),u=n(10)("src"),c=Function.toString,s=(""+c).split("toString");n(3).inspectSource=function(t){return c.call(t)},(t.exports=function(t,e,n,c){var a="function"==typeof n;a&&(i(n,"name")||o(n,"name",e)),t[e]!==n&&(a&&(i(n,u)||o(n,u,t[e]?""+t[e]:s.join(String(e)))),t===r?t[e]=n:c?t[e]?t[e]=n:o(t,e,n):(delete t[e],o(t,e,n)))})(Function.prototype,"toString",function(){return"function"==typeof this&&this[u]||c.call(this)})},function(t,e,n){var r=n(27);t.exports=function(t,e,n){if(r(t),void 0===e)return t;switch(n){case 1:return function(n){return t.call(e,n)};case 2:return function(n,r){return t.call(e,n,r)};case 3:return function(n,r,o){return t.call(e,n,r,o)}}return function(){return t.apply(e,arguments)}}},function(t,e){t.exports=function(t){if("function"!=typeof t)throw TypeError(t+" is not a function!");return t}},function(t,e,n){var r=n(29),o=n(6),i=n(40).f;t.exports=function(t){return function(e){for(var n,u=o(e),c=r(u),s=c.length,a=0,f=[];s>a;)i.call(u,n=c[a++])&&f.push(t?[n,u[n]]:u[n]);return f}}},function(t,e,n){var r=n(30),o=n(39);t.exports=Object.keys||function(t){return r(t,o)}},function(t,e,n){var r=n(9),o=n(6),i=n(34)(!1),u=n(37)("IE_PROTO");t.exports=function(t,e){var n,c=o(t),s=0,a=[];for(n in c)n!=u&&r(c,n)&&a.push(n);for(;e.length>s;)r(c,n=e[s++])&&(~i(a,n)||a.push(n));return a}},function(t,e,n){var r=n(32);t.exports=Object("z").propertyIsEnumerable(0)?Object:function(t){return"String"==r(t)?t.split(""):Object(t)}},function(t,e){var n={}.toString;t.exports=function(t){return n.call(t).slice(8,-1)}},function(t,e){t.exports=function(t){if(void 0==t)throw TypeError("Can't call method on  "+t);return t}},function(t,e,n){var r=n(6),o=n(35),i=n(36);t.exports=function(t){return function(e,n,u){var c,s=r(e),a=o(s.length),f=i(u,a);if(t&&n!=n){for(;a>f;)if((c=s[f++])!=c)return!0}else for(;a>f;f++)if((t||f in s)&&s[f]===n)return t||f||0;return!t&&-1}}},function(t,e,n){var r=n(11),o=Math.min;t.exports=function(t){return t>0?o(r(t),9007199254740991):0}},function(t,e,n){var r=n(11),o=Math.max,i=Math.min;t.exports=function(t,e){return t=r(t),t<0?o(t+e,0):i(t,e)}},function(t,e,n){var r=n(38)("keys"),o=n(10);t.exports=function(t){return r[t]||(r[t]=o(t))}},function(t,e,n){var r=n(2),o=r["__core-js_shared__"]||(r["__core-js_shared__"]={});t.exports=function(t){return o[t]||(o[t]={})}},function(t,e){t.exports="constructor,hasOwnProperty,isPrototypeOf,propertyIsEnumerable,toLocaleString,toString,valueOf".split(",")},function(t,e){e.f={}.propertyIsEnumerable},function(t,e,n){"use strict";function r(t,e,n){u.system_.notNull(arguments),u.assure_.required(e).nonFunc(e).required(e.type).required(t.emitter);var r,o=c.get_unique_id();void 0!==n&&(r=t.emitter.listen(o,function(){n.call({},r)})),t.emitter.emit(e.type,i({},e,{feedback_type:o}))}function o(t,e,n,o){function i(t){return u.system_.notNull(arguments),Object.entries(t).reduce(function(t,e){return"feedback_type"!==e[0]?(t[e[0]]=e[1],t):t},{})}return u.system_.notNull(arguments),t.emitter.listen(n,function(n){u.system_.notNull(arguments);var c=o.call({},i(n));void 0!==c&&e(t.store_key,c),r(t,{type:n.feedback_type})})}var i=Object.assign||function(t){for(var e,n=1,r=arguments.length;n<r;n++){e=arguments[n];for(var o in e)Object.prototype.hasOwnProperty.call(e,o)&&(t[o]=e[o])}return t};Object.defineProperty(e,"__esModule",{value:!0});var u=n(0),c=n(12);e.dispatch_=r,e.reduce_=o},function(t,e,n){"use strict";function r(){this.subjects={}}var o=function(t){var e="function"==typeof Symbol&&t[Symbol.iterator],n=0;return e?e.call(t):{next:function(){return t&&n>=t.length&&(t=void 0),{value:t&&t[n++],done:!t}}}},i=function(t,e){var n="function"==typeof Symbol&&t[Symbol.iterator];if(!n)return t;var r,o,i=n.call(t),u=[];try{for(;(void 0===e||e-- >0)&&!(r=i.next()).done;)u.push(r.value)}catch(t){o={error:t}}finally{try{r&&!r.done&&(n=i.return)&&n.call(i)}finally{if(o)throw o.error}}return u},u=function(){for(var t=[],e=0;e<arguments.length;e++)t=t.concat(i(arguments[e]));return t};Object.defineProperty(e,"__esModule",{value:!0}),r.prototype.emit=function(t,e){var n=this;e=JSON.parse(JSON.stringify(e)),n.subjects[t]=n.subjects[t]||[];var r=n.subjects[t];if(r)try{try{for(var i=o(r.slice()),u=i.next();!u.done;u=i.next()){u.value.call({},e)}}catch(t){c={error:t}}finally{try{u&&!u.done&&(s=i.return)&&s.call(i)}finally{if(c)throw c.error}}}catch(t){throw console.error(t),t}var c,s},r.prototype.listen=function(t,e){var n=this;return n.subjects[t]=n.subjects[t]||[],n.subjects[t].push(e),{dispose:function(){var r=n.subjects[t].indexOf(e);n.subjects[t]=u(n.subjects[t].slice(0,r),n.subjects[t].slice(r+1))}}},r.prototype.dispose=function(){this.subjects={}},r.prototype.local=function(){return new r},e.default=new r},function(t,e,n){"use strict";function r(t){var e={get:function(t,e){return e in t?t[e]:t.state[e]},set:function(t,e,n){if("function"==typeof n)throw new TypeError("it is not intented for defining function");return t.update(o({},t.state,(r={},r[e]=n,r))),!0;var r}};return new Proxy(t,e)}var o=Object.assign||function(t){for(var e,n=1,r=arguments.length;n<r;n++){e=arguments[n];for(var o in e)Object.prototype.hasOwnProperty.call(e,o)&&(t[o]=e[o])}return t};Object.defineProperty(e,"__esModule",{value:!0}),e.proxy=r},function(t,e,n){"use strict";Object.defineProperty(e,"__esModule",{value:!0});var r=n(1);e.Store=r.Store;var o=n(45);e.connect=o.connect},function(t,e,n){"use strict";function r(t,e,n){c.system_.notNull(arguments);var r=s.Store.createStore(t.name),a=i(r,e);return t.methods=Object.keys(a).reduce(function(t,e){return u({},t,(n={},n[e]=a[e],n));var n},{}),t.created=function(){var t=this;this.subscription=r.subscribe(function(){var e=r.state;Object.keys(e).forEach(function(n){t[n]=e[n]})})},t.destroyed=function(){this.subscription.dispose()},t.data=function(){return u({},n)},r.diduce(u({type:"initial"},n)),t.watch=o(r,n),r}function o(t,e){function n(t,e){return{handler:function(n){var r=u({},t.state,(o={},o[e]=n,o.type="change",o));t.diduce(r);var o},deep:!0}}return Object.keys(e).filter(function(t){return"action"!==t}).reduce(function(e,r){return u({},e,(o={},o[r]=n(t,r),o));var o},{})}function i(t,e){var n=e(t);if(void 0!==n){for(var r in n)if(t[r])throw new Error("'"+r+"' is not allowed as method name of your store.");Object.assign(t,n)}return n}var u=Object.assign||function(t){for(var e,n=1,r=arguments.length;n<r;n++){e=arguments[n];for(var o in e)Object.prototype.hasOwnProperty.call(e,o)&&(t[o]=e[o])}return t};Object.defineProperty(e,"__esModule",{value:!0});var c=n(0),s=n(1);e.connect=r},function(t,e,n){"use strict";Object.defineProperty(e,"__esModule",{value:!0});var r=n(1);e.Store=r.Store;var o=n(47);e.connect=o.connect;var i=n(49);e.CRoute=i.CRoute},function(t,e,n){"use strict";function r(t,e,n){c.system_.notNull(arguments),c.assure_.func(t).required(e).required(n);var r=!1,u=!1,l=void 0,p={applyUndoable:function(){if(c.system_.notNull(arguments),r)throw new Error("Multiple application not allowed!");return r=!0,p},applyMiddleware:function(t){if(c.system_.notNull(arguments),u)throw new Error("Multiple application not allowed!");return c.assure_.array(t),u=!0,l=t,p},done:function(){c.system_.notNull(arguments);var p=s.createConfigurableStore(t.name),y=e;if(u&&l&&(p=p.use(l)),r){var d=a.applyUndoable(p,e);p=d.store,y=d.creator}return o(p,y),i(p,t),p.setState(n),s.Store.config().isHMR&&f(p),p}};return p}function o(t,e){var n=function(e){c.system_.notNull(arguments),c.assure_.nonFunc(e);var n=e.type;if(n&&"string"!=typeof n)throw new Error("type of new_state can only be string if provided!");var r=e.type||"setState";t.diduce(u({},e,{type:r}))},r=e(t);if(void 0!==r){for(var o in r)if(void 0!==t[o])throw new Error("["+o+"] duplicates a property of your store! Please choose other method name.");Object.assign(t,r)}Object.assign(t,{setState:n})}function i(t,e){function n(t,e){s.push(e.subscribe(function(){t.setState(e.state)}))}function r(){var t=s.slice();s.length=0,t.forEach(function(t){t&&t.dispose()})}var o=e.prototype,i=o.componentWillMount||function(){},u=o.componentWillUnmount||function(){},c=o.render||function(){},s=(o.componentWillReceiveProps,o.shouldComponentUpdate,o.componentDidUpdate,[]);o.render=function(){var e=this;return r(),n(e,t),e.state=e.state||t.state,c.call(e)},o.componentWillMount=function(){var t=this;i.call(t)},o.componentWillUnmount=function(){var t=this;r(),u.call(t)}}var u=Object.assign||function(t){for(var e,n=1,r=arguments.length;n<r;n++){e=arguments[n];for(var o in e)Object.prototype.hasOwnProperty.call(e,o)&&(t[o]=e[o])}return t};Object.defineProperty(e,"__esModule",{value:!0});var c=n(0),s=n(1),a=n(48),f=function(){var t=void 0;return function(e){e.subscribe(function(){t=e.state}),t&&e.setState(t)}}();e.connect=r},function(t,e,n){"use strict";function r(t,e){return a.system_.notNull(arguments),{store:o(t),creator:i(e)}}function o(t){Object.defineProperty(t,"raw_state",{get:function(){return f.Store.state[t.store_key]}}),Object.defineProperty(t,"state",{configurable:!1,get:function(){var e=t.raw_state;return e&&void 0!==e.stack?e.stack[e.stack.length-1]:e}});var e=t.reduce;return t.reduce=function(n,r){return a.system_.notNull(arguments),e(n,function(e){if(e.undoable)return e.undoable=void 0,s({},e);var n=t.raw_state,o=c(n),i=o.stack,u=o.future,a=i.concat(u);return a.push(r(e)),{stack:a,future:[]}})},t}function i(t){return function(e){a.system_.notNull(arguments);var n=t(e);return s({},n,u(e))}}function u(t){return{undo:function(){arguments.length>0&&console.warn("\"undo()\" will ignore all arguments provided! Please double check your intention.For example, if you are writing onClick='{store.redo}', rewrite it to onClick='{() => store.undo()}'");var e=t.raw_state;if(!(void 0===e||void 0===e.stack||e.stack.length<=1)){var n=c(e),r=n.stack,o=n.future;o.unshift(r.pop()),t.diduce({type:"undo",stack:r,future:o,undoable:"undo"})}},redo:function(){arguments.length>0&&console.warn("\"redo()\" will ignore all arguments provided! Please double check your intention.For example, if you are writing onClick='{store.redo}', rewrite it to onClick='{() => store.redo()}'");var e=t.raw_state;if(0!==e.future.length){var n=c(e),r=n.stack,o=n.future;r.push(o.shift()),t.diduce({type:"redo",stack:r,future:o,undoable:"redo"})}}}}function c(t){var e,n;return void 0===t?(e=[],n=[]):(e=t.stack.slice(),n=t.future.slice()),{stack:e,future:n}}var s=Object.assign||function(t){for(var e,n=1,r=arguments.length;n<r;n++){e=arguments[n];for(var o in e)Object.prototype.hasOwnProperty.call(e,o)&&(t[o]=e[o])}return t};Object.defineProperty(e,"__esModule",{value:!0});var a=n(0),f=n(1);e.applyUndoable=r},function(t,e,n){"use strict";function r(t,e){return u.system_.notNull(arguments),function(e){function n(){return null!==e&&e.apply(this,arguments)||this}return o(n,e),n.prototype.render=function(){var n=this.props,r=n.location.pathname;if(r.indexOf("..")>-1)throw new Error("path must not include double dots.");if(0!==r.indexOf("/"))throw new Error("path must have leading slash.");var o=n.layout,u=n.component;return o?t.createElement(o,null,u?t.createElement(u,i({},n)):e.prototype.render.call(this)):e.prototype.render.call(this)},n}(e)}var o=function(){var t=Object.setPrototypeOf||{__proto__:[]}instanceof Array&&function(t,e){t.__proto__=e}||function(t,e){for(var n in e)e.hasOwnProperty(n)&&(t[n]=e[n])};return function(e,n){function r(){this.constructor=e}t(e,n),e.prototype=null===n?Object.create(n):(r.prototype=n.prototype,new r)}}(),i=Object.assign||function(t){for(var e,n=1,r=arguments.length;n<r;n++){e=arguments[n];for(var o in e)Object.prototype.hasOwnProperty.call(e,o)&&(t[o]=e[o])}return t};Object.defineProperty(e,"__esModule",{value:!0});var u=n(0);e.CRoute=r},function(t,e,n){"use strict";var r=Object.assign||function(t){for(var e,n=1,r=arguments.length;n<r;n++){e=arguments[n];for(var o in e)Object.prototype.hasOwnProperty.call(e,o)&&(t[o]=e[o])}return t};Object.defineProperty(e,"__esModule",{value:!0});var o=n(0),i=function(t){o.system_.notNull(arguments),o.assure_.required(t);var e=[];return function(n){var i=n.store,u=n.Comp,c=n.options;o.system_.notNull(arguments),o.assure_.required(i).required(u);var s=r({},c||{},{componentWillMount:function(){var t=this;e.push(i.subscribe(function(){t.setState(i.state)})),c&&c.componentWillMount&&c.componentWillMount()},componentWillUnmount:function(){e.map(function(t){return t}).forEach(function(t){t.dispose&&t.dispose()}),e.length=0,c&&c.componentWillUnmount&&c.componentWillUnmount()},componentDidMount:function(){c&&c.componentDidMount&&c.componentDidMount()}});return t(s)(u)}};e.state=i},function(t,e){(function(e){t.exports=e}).call(e,{})}])});