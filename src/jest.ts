import tseslint from 'typescript-eslint';
import jestPlugin from 'eslint-plugin-jest';
import testingLibraryPlugin from 'eslint-plugin-testing-library';
import baseConfig from './index';
import { testingRules } from './rules/testing';

export default tseslint.config(
  ...baseConfig,
  jestPlugin.configs['flat/recommended'],
  testingLibraryPlugin.configs['flat/react'],
  testingRules,
);
