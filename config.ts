declare const process, ISOMORPHIC_WEBPACK;


const _port = 3000;

export default {
  get seo_port() {
    return _port;
  },
  isDevelopment: (typeof ISOMORPHIC_WEBPACK === 'undefined' && 'development' === process.env.NODE_ENV)
}


function getUrl(router_instance) {
  const children = router_instance.props.children.props.children;

  const urls = assert_urls(children.map ?
    children.filter(c => c.props && typeof c.props.path !== "undefined").map(c => c.props.path) :
    (children.props) ? [children.props.path] : []);

  function assert_urls(urls) {
    for (let url of urls) {
      if (url.indexOf("/") !== 0) {
        throw new Error("path must have leading slash.")
      }
    }
    return urls;
  }
}


function post(port){
    const _obj = {};

    const options = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      },
      body: JSON.stringify(_obj)
    };
  
    return fetch(`http://localhost:${port}/save`, options);
}