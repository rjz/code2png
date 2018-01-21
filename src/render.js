const fs = require('fs');
const { resolve } = require('path');
const Mustache = require('mustache');
const Prism = require('prismjs');
const PrismLanguages = require('prismjs/components').languages;

const template = `<!DOCTYPE html>
<!-- Generated by code2png; do not edit directly.
   - See: https://github.com/rjz/code2png
   -->
<html>
  <head>
    <meta charset="utf-8" />
    <title>code2png</title>
    {{#styles}}
    <style type="text/css">{{{.}}}</style>
    {{/styles}}

    {{#scripts}}
    <script>{{{.}}}</script>
    {{/scripts}}
  </head>
  <body>
    <pre><code class="language-{{language}}">{{{code}}}</code></pre>
  </body>
</html>`;

const loadFiles = paths => paths.map(p =>
  fs.readFileSync(resolve(__dirname, p), 'utf8'));

const languageFile = language =>
  resolve(__dirname, `../node_modules/prismjs/components/prism-${language}.js`);

module.exports = ({
  code,
  language,
  theme,
}) => {
  const styles = loadFiles([
    '../css/default.css',
    `../node_modules/prismjs/themes/prism-${theme}.css`,
  ]);

  const scripts = loadFiles([
    '../node_modules/prismjs/prism.js',
    languageFile(language),
  ]);

  return Mustache.render(template, {
    styles,
    scripts,
    language,

    // Phantom truncates box-model whitespace; pad the EOL with cdata instead.
    code: code.split('\n').join(' \n'),
  });
};

module.exports.languageFile = languageFile;
