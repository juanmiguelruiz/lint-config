import tseslint from 'typescript-eslint';
import reactPlugin from 'eslint-plugin-react';
import reactHooksPlugin from 'eslint-plugin-react-hooks';
import jsxA11yPlugin from 'eslint-plugin-jsx-a11y';
import baseConfig from './index';
import { reactRules } from './rules/react';

export default tseslint.config(
  ...baseConfig,
  // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
  reactPlugin.configs.flat.recommended!,
  // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
  reactPlugin.configs.flat['jsx-runtime']!,
  // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
  reactHooksPlugin.configs.flat.recommended!,
  jsxA11yPlugin.flatConfigs.recommended,
  {
    settings: { react: { version: 'detect' } },
  },
  reactRules,
);
