import type { Linter } from 'eslint';

export const reactRules: Linter.Config = {
  files: ['**/*.{js,jsx,ts,tsx}'],
  rules: {
    'react/prop-types': 'off',
    'react/jsx-curly-brace-presence': ['error', { props: 'never', children: 'never' }],
    'react/react-in-jsx-scope': 'off',
    'react/self-closing-comp': ['error', { component: true, html: true }],
    'react/jsx-filename-extension': ['error', { extensions: ['.tsx', '.jsx'] }],
    'react-hooks/rules-of-hooks': 'error',
    'react-hooks/exhaustive-deps': 'warn',
    'react-hooks/react-compiler': 'off',
    'react-hooks/set-state-in-effect': 'off',
    'react-hooks/refs': 'off',
    'react-hooks/purity': 'off',
    'react-hooks/globals': 'off',
    'react-hooks/immutability': 'off',
    'react-hooks/static-components': 'off',
    'react-hooks/preserve-manual-memoization': 'off',
    'react-hooks/incompatible-library': 'off',
    'react/jsx-key': [
      'error',
      {
        checkFragmentShorthand: true,
        checkKeyMustBeforeSpread: true,
        warnOnDuplicates: true,
      },
    ],
    'react/jsx-no-literals': [
      'error',
      {
        noStrings: true,
        ignoreProps: true,
        noAttributeStrings: false,
        allowedStrings: [],
      },
    ],
    'react/jsx-newline': ['error', { prevent: true }],
  },
};
