import { defineConfig } from 'tsup';

export default defineConfig({
  entry: {
    index: 'src/index.ts',
    react: 'src/react.ts',
    testing: 'src/testing.ts',
    prettier: 'src/prettier.ts',
    'prettier-eslint': 'src/prettier-eslint.ts',
    biome: 'src/biome.ts',
  },
  format: ['esm'],
  dts: true,
  clean: true,
  external: ['eslint', 'typescript', 'prettier', '@biomejs/biome'],
});
