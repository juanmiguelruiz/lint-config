import { defineConfig } from 'tsup';

export default defineConfig({
  entry: {
    index: 'src/index.ts',
    react: 'src/react.ts',
    jest: 'src/jest.ts',
    testing: 'src/testing.ts',
    prettier: 'src/prettier.ts',
    'prettier-eslint': 'src/prettier-eslint.ts',
    biome: 'src/biome.ts',
    'react-native': 'src/react-native.ts',
  },
  format: ['esm'],
  dts: true,
  clean: true,
  external: ['eslint', 'typescript', 'prettier', '@biomejs/biome'],
});
