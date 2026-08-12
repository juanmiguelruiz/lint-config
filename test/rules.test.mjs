import assert from 'node:assert/strict';
import test from 'node:test';
import reactConfig from '../dist/react.js';
import reactNativeConfig from '../dist/react-native.js';
import { lint, messagesFor } from './helpers.mjs';

test('jsx-no-literals reports JSX text and string expressions but ignores props', async () => {
  const result = await lint(
    reactConfig,
    'export const Component = () => <Button title="Save">Save {"Cancel"}</Button>;',
  );

  assert.equal(messagesFor(result, 'jmrp-react/no-jsx-literals').length, 2);
  assert.equal(messagesFor(result, 'jmrp-react/no-jsx-literals')[0].message.includes('Save'), true);
  assert.equal(messagesFor(result, 'jmrp-react/no-jsx-literals')[1].message.includes('Cancel'), true);
});

test('stylistic JSX rules preserve curly-brace, self-closing and newline checks', async () => {
  const curly = await lint(reactConfig, 'export const Component = () => <div>{"value"}</div>;');
  assert.equal(messagesFor(curly, '@stylistic/jsx-curly-brace-presence').length, 1);

  const selfClosing = await lint(reactConfig, 'export const Component = () => <div></div>;');
  assert.equal(messagesFor(selfClosing, '@stylistic/jsx-self-closing-comp').length, 1);

  const newline = await lint(
    reactConfig,
    'export const Component = () => <div><span />\n\n<span /></div>;',
  );
  assert.equal(messagesFor(newline, '@stylistic/jsx-newline').length, 1);
});

test('jsx filename extension requires JSX files to use jsx or tsx', async () => {
  const invalid = await lint(reactConfig, 'export const Component = () => <div />;', 'Component.js');
  assert.equal(messagesFor(invalid, 'jmrp-react/jsx-filename-extension').length, 1);

  const valid = await lint(reactConfig, 'export const Component = () => <div />;', 'Component.jsx');
  assert.equal(messagesFor(valid, 'jmrp-react/jsx-filename-extension').length, 0);
});

test('jsx-key is split into missing, duplicate and key-before-spread rules', async () => {
  const missing = await lint(
    reactConfig,
    'const items = [1]; export const Component = () => items.map((item) => <li>{item}</li>);',
  );
  assert.equal(messagesFor(missing, '@eslint-react/no-missing-key').length, 1);

  const duplicate = await lint(
    reactConfig,
    'export const Component = () => <><Item key="same" /><Item key="same" /></>',
  );
  assert.equal(messagesFor(duplicate, '@eslint-react/no-duplicate-key').length, 2);
  assert.ok(messagesFor(duplicate, '@eslint-react/no-duplicate-key').every(({ severity }) => severity === 1));

  const afterSpread = await lint(
    reactConfig,
    'const props = {}; export const Component = () => <Item {...props} key="id" />;',
  );
  assert.equal(messagesFor(afterSpread, '@eslint-react/jsx-no-key-after-spread').length, 1);
});

test('React Hooks keeps the existing rule severities', async () => {
  const result = await lint(
    reactConfig,
    'import { useEffect } from "react";\n\nexport const Component = ({ value }) => { useEffect(() => console.log(value), []); return <div />; };',
  );

  assert.equal(messagesFor(result, 'react-hooks/exhaustive-deps').length, 1);
  assert.equal(messagesFor(result, 'react-hooks/exhaustive-deps')[0].severity, 1);
});

test('React Native rules remain active on the Native entry point', async () => {
  const result = await lint(
    reactNativeConfig,
    'export const Component = () => <View style={{ color: "red" }}>hello</View>;',
  );

  assert.equal(messagesFor(result, 'react-native/no-inline-styles').length, 1);
  assert.equal(messagesFor(result, 'react-native/no-color-literals').length, 1);
  assert.equal(messagesFor(result, 'react-native/no-raw-text').length, 1);
  assert.equal(messagesFor(result, '@eslint-react/dom-no-render').length, 0);
});
