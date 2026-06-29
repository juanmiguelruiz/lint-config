import type { Linter } from 'eslint';

export const ignores: Linter.Config = {
  ignores: [
    'node_modules/**',
    '.next/**',
    '.astro/**',
    '.expo/**',
    'android/**',
    'ios/**',
    'out/**',
    'dist/**',
    'build/**',
    'public/**',
    'coverage/**',
    '**/*.d.ts',
    '**/*.d.mts',
  ],
};
