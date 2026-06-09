import type { Config } from 'prettier';

const prettierConfig: Config = {
  arrowParens: 'avoid',
  printWidth: 100,
  singleQuote: true,
  tabWidth: 2,
  trailingComma: 'es5',
  endOfLine: 'lf',
};

export default prettierConfig;
