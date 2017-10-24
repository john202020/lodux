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
Object.defineProperty(exports, "__esModule", { value: true });
var _port = 3000;
exports.default = {
    get seo_port() {
        return _port;
    },
    isDevelopment: (typeof ISOMORPHIC_WEBPACK === 'undefined' && 'development' === process.env.NODE_ENV)
};
function getUrl(router_instance) {
    var children = router_instance.props.children.props.children;
    var urls = assert_urls(children.map ?
        children.filter(function (c) { return c.props && typeof c.props.path !== "undefined"; }).map(function (c) { return c.props.path; }) :
        (children.props) ? [children.props.path] : []);
    function assert_urls(urls) {
        try {
            for (var urls_1 = __values(urls), urls_1_1 = urls_1.next(); !urls_1_1.done; urls_1_1 = urls_1.next()) {
                var url = urls_1_1.value;
                if (url.indexOf("/") !== 0) {
                    throw new Error("path must have leading slash.");
                }
            }
        }
        catch (e_1_1) { e_1 = { error: e_1_1 }; }
        finally {
            try {
                if (urls_1_1 && !urls_1_1.done && (_a = urls_1.return)) _a.call(urls_1);
            }
            finally { if (e_1) throw e_1.error; }
        }
        return urls;
        var e_1, _a;
    }
}
function post(port) {
    var _obj = {};
    var options = {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json'
        },
        body: JSON.stringify(_obj)
    };
    return fetch("http://localhost:" + port + "/save", options);
}
//# sourceMappingURL=config.js.map