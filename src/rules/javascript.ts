import type { Linter } from 'eslint';

export const javascriptRules: Linter.Config = {
  files: ['**/*.{js,jsx,ts,tsx,mjs,cjs}'],
  rules: {
    'no-console': 'error',
    eqeqeq: ['error', 'always'],
    'no-alert': 'error',
    'no-debugger': 'warn',
    'no-duplicate-imports': 'error',
    'no-var': 'error',
    'prefer-const': 'error',
    'prefer-template': 'error',
    'arrow-body-style': ['error', 'as-needed'],
    curly: ['error', 'multi-line'],
    'no-multiple-empty-lines': ['error', { max: 1, maxEOF: 1 }],
  },
};
