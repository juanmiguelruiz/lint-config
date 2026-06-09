import tseslint from 'typescript-eslint';
import prettierPlugin from 'eslint-plugin-prettier';
import prettierConfigDisabler from 'eslint-config-prettier';
import baseConfig from './index';

export default tseslint.config(
  ...baseConfig,
  prettierConfigDisabler,
  {
    plugins: { prettier: prettierPlugin },
    rules: { 'prettier/prettier': 'error' },
  },
);
