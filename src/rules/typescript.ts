import type { Linter } from 'eslint';

export const typescriptRules: Linter.Config = {
  files: ['**/*.{ts,tsx}'],
  rules: {
    '@typescript-eslint/explicit-module-boundary-types': 'error',
    '@typescript-eslint/no-explicit-any': 'error',
    '@typescript-eslint/no-non-null-assertion': 'error',
    '@typescript-eslint/no-empty-function': 'warn',
    '@typescript-eslint/explicit-function-return-type': 'error',
    '@typescript-eslint/consistent-type-imports': [
      'error',
      { prefer: 'type-imports', fixStyle: 'inline-type-imports' },
    ],
  },
};
