"use strict";
var __assign = (this && this.__assign) || Object.assign || function(t) {
    for (var s, i = 1, n = arguments.length; i < n; i++) {
        s = arguments[i];
        for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
            t[p] = s[p];
    }
    return t;
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
var assure_1 = require("../../helpers/assure");
var config_1 = require("../../config");
//typeof ISOMORPHIC_WEBPACK === 'undefined'
var isDevelopment = ('development' === process.env.NODE_ENV && typeof ISOMORPHIC_WEBPACK === 'undefined');
var port = config_1.default.seo_port;
var seo_url = 'http://localhost:' + port;
function CRouter(React, Router) {
    assure_1.system_.notNull(arguments);
    return function (props) {
        return React.createElement(Router, __assign({}, props, { ref: function (r) { seos(r); } }));
    };
}
exports.CRouter = CRouter;
function seos(comp) {
    if (comp && !isDevelopment && document.querySelectorAll("meta[name=static]").length === 0) {
        var children = comp.props.children.type().props.children;
        var urls_1 = children.map(function (c) { return c.props.path; });
        assert_urls(urls_1);
        fetch(seo_url, {
            method: "POST",
            headers: {
                'Content-Type': 'application/json',
                "Accept": "application/json"
            },
            body: JSON.stringify(urls_1)
        })
            .then(function (d) { return d.json(); })
            .then(function () {
            display_results(urls_1);
        })
            .catch(function (err) {
            display_error(err);
        });
    }
}
function display_error(err) {
    var div = document.createElement("div");
    var body = document.querySelector("body");
    //body.innerHTML = "";
    body.appendChild(div);
    var title = document.createElement("h1");
    title.style.color = "red";
    title.appendChild(document.createTextNode(err));
    div.appendChild(title);
}
function display_pre() {
    var div = document.createElement("div");
    var body = document.querySelector("body");
    body.innerHTML = "";
    body.appendChild(div);
    var title = document.createElement("h1");
    title.appendChild(document.createTextNode("Working on static site..."));
    div.appendChild(title);
}
function display_results(urls) {
    var div = document.createElement("div");
    var body = document.querySelector("body");
    body.innerHTML = "";
    body.appendChild(div);
    var title = document.createElement("h1");
    title.appendChild(document.createTextNode("Following has been added to the static site."));
    div.appendChild(title);
    var h2 = document.createElement("h2");
    var button = document.createElement("a");
    button.href = document.location.href;
    button.innerText = "refresh";
    h2.appendChild(button);
    div.appendChild(h2);
}
function assert_urls(urls) {
    try {
        for (var urls_2 = __values(urls), urls_2_1 = urls_2.next(); !urls_2_1.done; urls_2_1 = urls_2.next()) {
            var url = urls_2_1.value;
            if (url.indexOf("/") !== 0) {
                throw new Error("path must have leading slash.");
            }
        }
    }
    catch (e_1_1) { e_1 = { error: e_1_1 }; }
    finally {
        try {
            if (urls_2_1 && !urls_2_1.done && (_a = urls_2.return)) _a.call(urls_2);
        }
        finally { if (e_1) throw e_1.error; }
    }
    return urls;
    var e_1, _a;
}
//# sourceMappingURL=CRouter.js.map