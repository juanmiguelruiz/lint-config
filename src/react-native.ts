import tseslint from 'typescript-eslint';
import eslintReactPlugin from '@eslint-react/eslint-plugin';
import reactHooksPlugin from 'eslint-plugin-react-hooks';
import jsxA11yPlugin from 'eslint-plugin-jsx-a11y';
import reactNativePlugin from 'eslint-plugin-react-native';
import expoPlugin from 'eslint-plugin-expo';
import baseConfig from './index';
import { reactPlugins, reactRules } from './rules/react';
import { reactNativeGlobals, reactNativeRules } from './rules/react-native';

const pluginConfigs = [
  {
    files: ['**/*.{js,jsx,ts,tsx}'],
    ...eslintReactPlugin.configs.x,
  },
  {
    files: ['**/*.{js,jsx,ts,tsx}'],
    ...eslintReactPlugin.configs.jsx,
  },
  {
    files: ['**/*.{js,jsx,ts,tsx}'],
    ...eslintReactPlugin.configs['naming-convention'],
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
    settings: { react: { version: 'detect' } },
    plugins: {
      ...reactPlugins,
      'react-native': reactNativePlugin,
      expo: expoPlugin,
    },
  },
  reactNativeGlobals,
  reactRules,
  reactNativeRules,
);
