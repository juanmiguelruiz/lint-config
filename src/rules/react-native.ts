import type { Linter } from 'eslint';

export const reactNativeRules: Linter.Config = {
  files: ['**/*.{js,jsx,ts,tsx}'],
  rules: {
    'react-native/no-unused-styles': 'error',
    'react-native/no-inline-styles': 'error',
    'react-native/no-color-literals': 'error',
    'react-native/no-raw-text': ['error', { skip: ['Trans'] }],
    'react-native/no-single-element-style-arrays': 'error',
    'react-native/split-platform-components': 'error',
    'react-native/sort-styles': 'off',

    'expo/no-dynamic-env-var': 'error',
    'expo/no-env-var-destructuring': 'error',
    'expo/use-dom-exports': 'warn',
  },
};

export const reactNativeGlobals: Linter.Config = {
  languageOptions: {
    globals: {
      __DEV__: 'readonly',
    },
  },
};
