declare const process, require, ISOMORPHIC_WEBPACK, document;
import { system_ } from "../../helpers/assure";
import config from "../../config";

//typeof ISOMORPHIC_WEBPACK === 'undefined'
const isDevelopment = ('development' === process.env.NODE_ENV && typeof ISOMORPHIC_WEBPACK === 'undefined');
const port = config.seo_port;
const seo_url = 'http://localhost:' + port;


export function CRouter(React, Router) {

  system_.notNull(arguments);
  return props => {
    
    return <Router {...props} ref={r => { seos(r); }} />;
  };
}


function seos(comp) {
  
  if (comp && !isDevelopment &&  document.querySelectorAll("meta[name=static]").length === 0) {

    const children = comp.props.children.type().props.children;

    const urls = children.map(c => c.props.path);

    assert_urls(urls);

    fetch(seo_url, {
      method: "POST",
      headers: {
        'Content-Type': 'application/json',
        "Accept": "application/json"
      },
      body: JSON.stringify(urls)
    })
      .then(d => d.json())
      .then(() => {
        display_results(urls);
      })
      .catch(err => {
        display_error(err);
      });
  }
}

function display_error(err) {
  const div = document.createElement("div");
  const body = document.querySelector("body");
  //body.innerHTML = "";
  body.appendChild(div);
  const title = document.createElement("h1");
  title.style.color = "red";
  title.appendChild(document.createTextNode(err));
  div.appendChild(title);
}

function display_pre() {

  const div = document.createElement("div");
  const body = document.querySelector("body");
  body.innerHTML = "";
  body.appendChild(div);
  const title = document.createElement("h1");
  title.appendChild(document.createTextNode("Working on static site..."));
  div.appendChild(title);
}

function display_results(urls) {

  const div = document.createElement("div");
  const body = document.querySelector("body");
  body.innerHTML = "";
  body.appendChild(div);
  const title = document.createElement("h1");
  title.appendChild(document.createTextNode("Following has been added to the static site."));
  div.appendChild(title);
  const h2 = document.createElement("h2");

  const button = document.createElement("a");
  button.href = document.location.href;
  button.innerText = "refresh";
  h2.appendChild(button);

  div.appendChild(h2);
}
function assert_urls(urls) {
  for (let url of urls) {
    if (url.indexOf("/") !== 0) {
      throw new Error("path must have leading slash.")
    }
  }
  return urls;
}


