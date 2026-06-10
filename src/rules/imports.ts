import importXPlugin from 'eslint-plugin-import-x';
import type { Linter } from 'eslint';

export const importConfig: Linter.Config[] = [
  importXPlugin.flatConfigs.recommended,
  {
    files: ['**/*.{js,jsx,ts,tsx,mjs,cjs}'],
    settings: {
      'import-x/resolver': {
        typescript: true,
        node: true,
      },
    },
    rules: {
      'import-x/order': [
        'error',
        {
          groups: ['builtin', 'external', 'internal', 'parent', 'sibling', 'index'],
          'newlines-between': 'never',
          alphabetize: { order: 'asc' },
        },
      ],
      'import-x/newline-after-import': ['error', { count: 1 }],
    },
  },
];
