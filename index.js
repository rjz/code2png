#!/usr/bin/env node

const render = require('./src/render');
const capture = require('./src/capture');

const DEFAULT_LANGUAGE = 'javascript';
const DEFAULT_THEME = 'okaidia';

module.exports = function code2png (code, opts) {
  const content = render({
    code,
    theme: opts.theme || DEFAULT_THEME,
    language: opts.language || DEFAULT_LANGUAGE,
  });

  return capture(content);
};
