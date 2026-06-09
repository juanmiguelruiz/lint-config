import tseslint from 'typescript-eslint';
import jestPlugin from 'eslint-plugin-jest';
import testingLibraryPlugin from 'eslint-plugin-testing-library';
import { testingRules } from './rules/testing';

export default tseslint.config(
  jestPlugin.configs['flat/recommended'],
  testingLibraryPlugin.configs['flat/react'],
  testingRules,
);
