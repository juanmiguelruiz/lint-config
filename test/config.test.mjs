import assert from 'node:assert/strict';
import test from 'node:test';
import { ESLint as ESLint10 } from 'eslint-v10';
import reactConfig from '../dist/react.js';
import reactNativeConfig from '../dist/react-native.js';
import { calculatedConfig, severity } from './helpers.mjs';

test('React config resolves all migrated plugins and rules', async () => {
  const config = await calculatedConfig(reactConfig);

  assert.equal(config.plugins['@eslint-react'].meta.name, '@eslint-react/eslint-plugin');
  assert.equal(config.plugins['@stylistic'].meta.name, '@stylistic/eslint-plugin');
  assert.ok(config.plugins['jmrp-react'].rules['no-jsx-literals']);
  assert.ok(config.plugins['jmrp-react'].rules['jsx-filename-extension']);

  assert.equal(severity(config.rules['@eslint-react/dom-no-render']), 2);
  assert.equal(severity(config.rules['@stylistic/jsx-curly-brace-presence']), 2);
  assert.equal(severity(config.rules['@stylistic/jsx-self-closing-comp']), 2);
  assert.equal(severity(config.rules['@stylistic/jsx-newline']), 2);
  assert.equal(severity(config.rules['jmrp-react/no-jsx-literals']), 2);
  assert.equal(severity(config.rules['jmrp-react/jsx-filename-extension']), 2);
  assert.equal(severity(config.rules['react-hooks/rules-of-hooks']), 2);
  assert.equal(severity(config.rules['react-hooks/exhaustive-deps']), 1);

  const oldReactRules = Object.keys(config.rules).filter((ruleId) => ruleId.startsWith('react/'));
  assert.deepEqual(oldReactRules, []);
});

test('React Native config keeps Native/Expo rules and excludes web-only React rules', async () => {
  const config = await calculatedConfig(reactNativeConfig);

  assert.ok(config.plugins['react-native']);
  assert.ok(config.plugins.expo);
  assert.ok(config.plugins['@eslint-react']);
  assert.equal(severity(config.rules['react-native/no-raw-text']), 2);
  assert.equal(severity(config.rules['expo/no-dynamic-env-var']), 2);
  assert.equal(config.rules['@eslint-react/dom-no-render'], undefined);
  assert.equal(config.rules['@eslint-react/rsc-function-definition'], undefined);
  assert.equal(config.rules['@eslint-react/web-api-no-leaked-fetch'], undefined);

  const oldReactRules = Object.keys(config.rules).filter((ruleId) => ruleId.startsWith('react/'));
  assert.deepEqual(oldReactRules, []);
});

test('React config is compatible with ESLint 10', async () => {
  const eslint = new ESLint10({
    overrideConfigFile: true,
    overrideConfig: reactConfig,
  });
  const [result] = await eslint.lintText('export const Component = () => <div />;', {
    filePath: 'Component.jsx',
  });

  assert.equal(result.messages.some((message) => message.ruleId?.startsWith('react/')), false);
  assert.equal(result.messages.some((message) => message.ruleId === 'jmrp-react/jsx-filename-extension'), false);
});
