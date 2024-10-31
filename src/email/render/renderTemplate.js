// renderTemplate.js
const React = require("react");
const ReactDOMServer = require("react-dom/server");

function renderTemplate(Component, props = {}) {
  return ReactDOMServer.renderToStaticMarkup(
    React.createElement(Component, props)
  );
}

module.exports = renderTemplate;
