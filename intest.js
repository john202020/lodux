var React = require("react");
var Test = require("./test.js").default;
var chalk = require("chalk");
var _a = require("react-dom/server"), renderToString = _a.renderToString, renderToStaticMarkup = _a.renderToStaticMarkup;
dive(Test);
function dive(comp) {
    var paths = [];
    console.log(new comp());
    // if (comp.props && comp.props.path) {
    //   paths.push(comp.props.path);
    // }
    // const children = extractChildren(comp);
    // if (children) {
    //   return paths.concat(
    //     (Array.isArray(children) ? children : [children])
    //       .map(c => dive(c))
    //       .reduce((acc, ps) => (acc || []).concat(ps || []), [])
    //   );
    // }
}
function extractChildren(comp) {
    try {
        // return comp.props.children; 
        return comp.type().props.children;
    }
    catch (e) {
        if (e instanceof TypeError) {
            console.log(chalk.red(e));
            return [];
        }
        throw e;
    }
}
//# sourceMappingURL=intest.js.map