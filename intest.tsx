declare const require;
const React = require("react");
const Test = require("./test.js").default;
const chalk = require("chalk");
const { renderToString, renderToStaticMarkup } = require("react-dom/server");

dive(Test);

function dive(comp) {

  const paths: Array<string> = [];

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