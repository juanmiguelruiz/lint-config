import tseslint from 'typescript-eslint';
import reactPlugin from 'eslint-plugin-react';
import reactHooksPlugin from 'eslint-plugin-react-hooks';
import jsxA11yPlugin from 'eslint-plugin-jsx-a11y';
import reactNativePlugin from 'eslint-plugin-react-native';
import expoPlugin from 'eslint-plugin-expo';
import baseConfig from './index';
import { reactRules } from './rules/react';
import { reactNativeGlobals, reactNativeRules } from './rules/react-native';

const pluginConfigs = [
  reactPlugin.configs.flat.recommended,
  reactPlugin.configs.flat['jsx-runtime'],
  reactHooksPlugin.configs.flat.recommended,
].filter((config) => config != null);

export default tseslint.config(
  ...baseConfig,
  ...pluginConfigs,
  jsxA11yPlugin.flatConfigs.recommended,
  {
    settings: { react: { version: 'detect' } },
    plugins: {
      'react-native': reactNativePlugin,
      expo: expoPlugin,
    },
  },
  reactNativeGlobals,
  reactRules,
  reactNativeRules,
);
