const fs = require('fs');
const { resolve } = require('path');
const Mustache = require('mustache');
const Prism = require('prismjs');

const template = `<!DOCTYPE html>
<html>
	<head>
    <meta charset="utf-8" />
		<title>Index</title>
    {{#styles}}
    <style type="text/css">{{{.}}}</style>
    {{/styles}}
	</head>
	<body>
    <pre>{{{code}}}</pre>
	</body>
</html>`;

const loadFiles = paths => paths.map(p => fs.readFileSync(p, 'utf8'));

module.exports = ({ code }) => {
  const styles = loadFiles([
    'css/default.css',
    'node_modules/prismjs/themes/prism-okaidia.css',
  ].map(p => resolve(__dirname, `../${p}`)));

  return Mustache.render(template, {
    code: Prism.highlight(code, Prism.languages.javascript),
    styles,
  });
};
