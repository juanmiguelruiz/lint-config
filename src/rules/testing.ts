import type { Linter } from 'eslint';

export const testingRules: Linter.Config = {
  files: ['**/*.{spec,test}.{ts,tsx,js,jsx}', '**/__tests__/**/*.{ts,tsx,js,jsx}'],
  rules: {
    '@typescript-eslint/no-empty-function': 'off',
  },
};
