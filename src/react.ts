import tseslint from 'typescript-eslint';
import eslintReactPlugin from '@eslint-react/eslint-plugin';
import reactHooksPlugin from 'eslint-plugin-react-hooks';
import jsxA11yPlugin from 'eslint-plugin-jsx-a11y';
import baseConfig from './index';
import { reactPlugins, reactRules } from './rules/react';

const pluginConfigs = [
  {
    files: ['**/*.{js,jsx,ts,tsx}'],
    ...eslintReactPlugin.configs['recommended-typescript'],
  },
  reactHooksPlugin.configs.flat.recommended,
].filter((config) => config != null);

export default tseslint.config(
  ...baseConfig,
  ...pluginConfigs,
  jsxA11yPlugin.flatConfigs.recommended,
  {
    files: ['**/*.{js,jsx,ts,tsx}'],
    languageOptions: { parserOptions: { ecmaFeatures: { jsx: true } } },
    plugins: reactPlugins,
    settings: { react: { version: 'detect' } },
  },
  reactRules,
);
