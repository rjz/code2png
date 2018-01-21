#!/usr/bin/env node

const fs = require('fs');

const render = require('./src/render');
const capture = require('./src/capture');

const DEFAULT_LANGUAGE = 'javascript';
const DEFAULT_THEME = 'okaidia';

module.exports = function code2png (code, opts) {

  const theme = opts.theme || DEFAULT_THEME;
  const language = opts.language || DEFAULT_LANGUAGE;

  if (!fs.existsSync(render.languageFile(language))) {
    throw new Error(`Unknown language '${language}'`);
  }

  const content = render({ code, theme, language });

  return capture(content);
};
