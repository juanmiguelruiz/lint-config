import tseslint from 'typescript-eslint';
import js from '@eslint/js';
import globals from 'globals';
import { javascriptRules } from './rules/javascript';
import { typescriptRules } from './rules/typescript';
import { importConfig } from './rules/imports';
import { ignores } from './rules/ignores';

export default tseslint.config(
  js.configs.recommended,
  ...tseslint.configs.recommended,
  {
    languageOptions: {
      globals: { ...globals.browser, ...globals.node },
    },
  },
  javascriptRules,
  typescriptRules,
  ...importConfig,
  ignores,
);
