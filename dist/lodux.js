!function(t){function e(r){if(n[r])return n[r].exports;var o=n[r]={i:r,l:!1,exports:{}};return t[r].call(o.exports,o,o.exports,e),o.l=!0,o.exports}var n={};e.m=t,e.c=n,e.i=function(t){return t},e.d=function(t,n,r){e.o(t,n)||Object.defineProperty(t,n,{configurable:!1,enumerable:!0,get:r})},e.n=function(t){var n=t&&t.__esModule?function(){return t.default}:function(){return t};return e.d(n,"a",n),n},e.o=function(t,e){return Object.prototype.hasOwnProperty.call(t,e)},e.p="",e(e.s=8)}([function(t,e,n){"use strict";function r(t){throw new Error(t)}var o="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(t){return typeof t}:function(t){return t&&"function"==typeof Symbol&&t.constructor===Symbol&&t!==Symbol.prototype?"symbol":typeof t},i=function(t){var e="function"==typeof Symbol&&t[Symbol.iterator],n=0;return e?e.call(t):{next:function(){return t&&n>=t.length&&(t=void 0),{value:t&&t[n++],done:!t}}}};Object.defineProperty(e,"__esModule",{value:!0});var u={notNull:function(t){function e(t){if(void 0!==t){if("object"===(void 0===t?"undefined":o(t))){t||r("null is not allowed");for(var n in t)e(t[n])}}}void 0===t&&r("notNull() will not work in lamda express!");try{for(var n=i(t),u=n.next();!u.done;u=n.next()){e(u.value)}}catch(t){s={error:t}}finally{try{u&&!u.done&&(c=n.return)&&c.call(n)}finally{if(s)throw s.error}}return;var s,c}};e.system_=u;var s={class:function(t,e){return"function"==typeof t&&/^\s*class\s+/.test(t.toString())||r(e||t+" does not seems to be class! class is expected."),s},required:function(t,e){return void 0===t&&r(e||"required"),s},array:function(t,e){return Array.isArray(t)||r(e||"array is expected"),s},boolean:function(t,e){return"boolean"!=typeof t&&r(e||"boolean is expected"),s},string:function(t,e){return"string"!=typeof t&&r(e||"string is expected"),s},nonFunc:function(t,e){return"function"==typeof t&&r(e||"must be non function"),s},func:function(t,e){return"function"!=typeof t&&r(e||"must be function"),s}};e.assure_=s},function(t,e,n){"use strict";function r(t,e,n){u.system_.notNull(arguments),u.assure_.required(t).required(e).nonFunc(e),console.warn("This util.update() is deprecated! Please use store instance store.diduce() instead.");var r="update"+s+(n||""),o=t.reduce(r,function(t){return o.dispose(),t});t.dispatch(i({},e,{type:r}))}function o(t){return u.system_.notNull(arguments),Object.keys(t).filter(function(t){return"type"!==t}).reduce(function(e,n){return i({},e,(r={},r[n]=t[n],r));var r},{})}var i=Object.assign||function(t){for(var e,n=1,r=arguments.length;n<r;n++){e=arguments[n];for(var o in e)Object.prototype.hasOwnProperty.call(e,o)&&(t[o]=e[o])}return t};Object.defineProperty(e,"__esModule",{value:!0});var u=n(0),s="___";e.unique_prefix=s,e.update=r,e.get_without_type=o;var c=function(){var t=1;return function(){return u.system_.notNull(arguments),s+"["+t+++"]_"}}();e.get_unique_id=c},function(t,e,n){"use strict";var r;"function"==typeof Symbol&&Symbol.iterator;Object.defineProperty(e,"__esModule",{value:!0});var o=n(0),i=n(7),u=n(6),s=n(1),c=(0,eval)("this"),a=c.lodux,l={update:s.update},f=function(){return c.lodux=a,d},d={system_:o.system_,assure_:o.assure_,Store:i.Store,applyMiddleware:u.default,util:l,noConflict:f};void 0!==(r=function(){return d}.call(e,n,e,t))&&(t.exports=r),c.lodux=d},function(t,e,n){"use strict";function r(){this.subjects={}}var o=function(t){var e="function"==typeof Symbol&&t[Symbol.iterator],n=0;return e?e.call(t):{next:function(){return t&&n>=t.length&&(t=void 0),{value:t&&t[n++],done:!t}}}},i=function(t,e){var n="function"==typeof Symbol&&t[Symbol.iterator];if(!n)return t;var r,o,i=n.call(t),u=[];try{for(;(void 0===e||e-- >0)&&!(r=i.next()).done;)u.push(r.value)}catch(t){o={error:t}}finally{try{r&&!r.done&&(n=i.return)&&n.call(i)}finally{if(o)throw o.error}}return u},u=function(){for(var t=[],e=0;e<arguments.length;e++)t=t.concat(i(arguments[e]));return t};Object.defineProperty(e,"__esModule",{value:!0}),r.prototype.emit=function(t,e){var n=this;e=JSON.parse(JSON.stringify(e)),n.subjects[t]=n.subjects[t]||[];var r=n.subjects[t];if(r)try{try{for(var i=o(r.slice()),u=i.next();!u.done;u=i.next()){u.value.call({},e)}}catch(t){s={error:t}}finally{try{u&&!u.done&&(c=i.return)&&c.call(i)}finally{if(s)throw s.error}}}catch(t){throw console.error(t),t}var s,c},r.prototype.listen=function(t,e){var n=this;n.subjects[t]=n.subjects[t]||[];var r=n.subjects[t].length;return n.subjects[t][r]=e,{dispose:function(){var e=n.subjects[t].indexOf(r);n.subjects[t]=u(n.subjects[t].slice(0,e),n.subjects[t].slice(e))}}},r.prototype.dispose=function(){this.subjects={}},r.prototype.local=function(){return new r},e.default=new r},function(t,e,n){"use strict";function r(t,e,n){s.system_.notNull(arguments),s.assure_.required(e).nonFunc(e).required(e.type).required(t.emitter);var r,o="";return void 0!==n&&(o=c.get_unique_id(),r=t.emitter.listen(o,function(){n.call({},r)})),t.emitter.emit(e.type,u({},e,{feedback_type:o})),{dispose:function(){console.warn("Calling dispose here is not reliable. Instead, dispose the disposable that is passed to the callback_function!"),r&&r.dispose()}}}function o(t,e,n,o){return s.system_.notNull(arguments),t.emitter.listen(n,function(n){s.system_.notNull(arguments);var u=o.call({},i(n));void 0!==u&&e(t.name,u),r(t,{type:n.feedback_type})})}function i(t){return s.system_.notNull(arguments),Object.keys(t).filter(function(t){return"feedback_type"!==t}).reduce(function(e,n){return u({},e,(r={},r[n]=t[n],r));var r},{})}var u=Object.assign||function(t){for(var e,n=1,r=arguments.length;n<r;n++){e=arguments[n];for(var o in e)Object.prototype.hasOwnProperty.call(e,o)&&(t[o]=e[o])}return t};Object.defineProperty(e,"__esModule",{value:!0});var s=n(0),c=n(1);e.dispatch_=r,e.reduce_=o},function(t,e,n){"use strict";function r(){return u({},a)}function o(){return s.system_.notNull(arguments),u({},c)}function i(t,e){s.system_.notNull(arguments),s.assure_.required(t);var n=Object.keys(t)[0],r=!c[n];r&&(a=u({},a,t));var o=r||JSON.stringify(c[n])!==JSON.stringify(t[n]);c=u({},c,t),o&&e.forEach(function(t){"function"==typeof t&&t.call({})})}var u=Object.assign||function(t){for(var e,n=1,r=arguments.length;n<r;n++){e=arguments[n];for(var o in e)Object.prototype.hasOwnProperty.call(e,o)&&(t[o]=e[o])}return t};Object.defineProperty(e,"__esModule",{value:!0});var s=n(0),c={},a={};e.get_store_object_initial=r,e.get_store_object=o,e.set_store_object=i},function(t,e,n){"use strict";function r(t,e){return o.system_.notNull(arguments),console.warn("@deprecated since version 0.2.62. Use store.use() instead."),t.use(e)}Object.defineProperty(e,"__esModule",{value:!0});var o=n(0);e.default=r},function(t,e,n){"use strict";function r(t){void 0===t&&(t=f.get_unique_id()),c.system_.notNull(arguments);var e=t;if(d.get_store_object()[e])throw new Error(e+" duplicated!");return new b(e)}function o(t,e){c.system_.notNull(arguments),d.set_store_object((n={},n[t]=e,n),p.concat(y[t]||[]));var n}var i=Object.assign||function(t){for(var e,n=1,r=arguments.length;n<r;n++){e=arguments[n];for(var o in e)Object.prototype.hasOwnProperty.call(e,o)&&(t[o]=e[o])}return t},u=function(t,e){var n="function"==typeof Symbol&&t[Symbol.iterator];if(!n)return t;var r,o,i=n.call(t),u=[];try{for(;(void 0===e||e-- >0)&&!(r=i.next()).done;)u.push(r.value)}catch(t){o={error:t}}finally{try{r&&!r.done&&(n=i.return)&&n.call(i)}finally{if(o)throw o.error}}return u},s=function(){for(var t=[],e=0;e<arguments.length;e++)t=t.concat(u(arguments[e]));return t};Object.defineProperty(e,"__esModule",{value:!0});var c=n(0),a=n(4),l=n(3),f=n(1),d=n(5),p=[],y={},b=function(){function t(t){Object.defineProperty(this,"name",{enumerable:!0,configurable:!1,writable:!1,value:t}),Object.defineProperty(this,"emitter",{enumerable:!0,configurable:!1,writable:!1,value:l.default.local()}),this.state=this.state.bind(this),this.dispatch=this.dispatch.bind(this),this.reduce=this.reduce.bind(this),this.use=this.use.bind(this),this.diduce=this.diduce.bind(this),this.subscribe=this.subscribe.bind(this),this.update=this.update.bind(this)}return t.prototype.state=function(){return c.system_.notNull(arguments),d.get_store_object()[this.name]},t.prototype.dispatch=function(t,e){return c.system_.notNull(arguments),c.assure_.required(t).string(t.type),a.dispatch_(this,t,e)},t.prototype.reduce=function(t,e){return c.system_.notNull(arguments),a.reduce_(this,o,t,e)},t.prototype.use=function(t){c.system_.notNull(arguments);var n=e.Store.clone(this);return n.dispatch=t.reduce(function(t,e){return t.unshift(e),t},[]).reduce(function(t,e){return e(n)(t.bind(n))},n.dispatch),n},t.prototype.diduce=function(t){var e=this;c.system_.notNull(arguments),c.assure_.string(t.type),this.reduce(t.type,function(t){return i({},e.state(),t)}),this.dispatch(t)},t.prototype.subscribe=function(t){function e(){c.system_.notNull(arguments);var e=n.indexOf(t);e>-1&&(n[this.name]=s(n.slice(0,e),n.slice(e+1)))}c.system_.notNull(arguments),y[this.name]=y[this.name]||[];var n=y[this.name];return n.push(t),{dispose:e}},t.prototype.update=function(t,e){var n=this;c.system_.notNull(arguments),console.warn("store.update() is deprecated. Use store.diduce() instead.");var r="update"+f.unique_prefix+(e||"")+f.get_unique_id();this.reduce(r,function(t){return i({},n.state(),t)}),this.dispatch(i({},t,{type:r}))},t}();e.Store={createStore:r,clone:function(t,e){return c.system_.notNull(arguments),Object.assign.apply(Object,s([new b(t.name)],e||{}))},subscribe:function(t){function e(){c.system_.notNull(arguments);var e=p.indexOf(t);e>-1&&(p=s(p.slice(0,e),p.slice(e+1)))}return c.system_.notNull(arguments),p.push(t),{dispose:e}},reset_initial:function(){c.system_.notNull(arguments),Object.entries(d.get_store_object_initial()).forEach(function(t){var e=u(t,2);o(e[0],e[1])})},state:function(){return c.system_.notNull(arguments),d.get_store_object()}}},function(t,e,n){t.exports=n(2)}]);