import type { ESLint, Linter, Rule } from 'eslint';
import stylisticPlugin from '@stylistic/eslint-plugin';

type JsxNoLiteralsOptions = {
  noStrings?: boolean;
  ignoreProps?: boolean;
  noAttributeStrings?: boolean;
  allowedStrings?: string[];
};

type JsxFilenameExtensionOptions = {
  extensions?: string[];
};

const jsxNoLiteralsRule: Rule.RuleModule = {
  meta: {
    type: 'problem',
    docs: {
      description: 'Disallow hard-coded string literals in JSX children.',
    },
    schema: [
      {
        type: 'object',
        additionalProperties: false,
        properties: {
          noStrings: { type: 'boolean' },
          ignoreProps: { type: 'boolean' },
          noAttributeStrings: { type: 'boolean' },
          allowedStrings: {
            type: 'array',
            items: { type: 'string' },
            uniqueItems: true,
          },
        },
      },
    ],
    messages: {
      literal: 'Avoid hard-coded string literal{{value}} in JSX.',
    },
  },
  create(context) {
    const options = (context.options[0] ?? {}) as JsxNoLiteralsOptions;
    const noStrings = options.noStrings ?? false;
    const ignoreProps = options.ignoreProps ?? false;
    const noAttributeStrings = options.noAttributeStrings ?? false;
    const allowedStrings = new Set(options.allowedStrings ?? []);

    const reportLiteral = (node: any, value: unknown) => {
      if (typeof value !== 'string') return;

      const normalizedValue = value.trim();
      if (!normalizedValue || allowedStrings.has(normalizedValue)) return;

      context.report({
        node,
        messageId: 'literal',
        data: { value: ` "${normalizedValue}"` },
      });
    };

    return {
      JSXText(node: any) {
        if (noStrings) reportLiteral(node, node.value);
      },
      JSXExpressionContainer(node: any) {
        if (!noStrings || node.parent?.type === 'JSXAttribute') return;

        const expression = node.expression;
        if (expression?.type === 'Literal') {
          reportLiteral(expression, expression.value);
        }
      },
      JSXAttribute(node: any) {
        if (ignoreProps || !noAttributeStrings) return;

        if (node.value?.type === 'Literal') {
          reportLiteral(node.value, node.value.value);
        }
      },
    };
  },
};

const jsxFilenameExtensionRule: Rule.RuleModule = {
  meta: {
    type: 'problem',
    docs: {
      description: 'Enforce an allowed filename extension when JSX is present.',
    },
    schema: [
      {
        type: 'object',
        additionalProperties: false,
        properties: {
          extensions: {
            type: 'array',
            items: { type: 'string' },
            minItems: 1,
            uniqueItems: true,
          },
        },
      },
    ],
    messages: {
      extension: 'JSX files must use one of these extensions: {{extensions}}.',
    },
  },
  create(context) {
    const options = (context.options[0] ?? {}) as JsxFilenameExtensionOptions;
    const extensions = options.extensions ?? ['.jsx'];
    let containsJsx = false;

    return {
      JSXElement() {
        containsJsx = true;
      },
      JSXFragment() {
        containsJsx = true;
      },
      'Program:exit'(node: any) {
        if (!containsJsx) return;

        const ruleContext = context as Rule.RuleContext & {
          filename?: string;
          getFilename?: () => string;
        };
        const filename = ruleContext.getFilename?.() ?? ruleContext.filename ?? '<text>';
        if (filename.startsWith('<')) return;

        const extension = filename.slice(filename.lastIndexOf('.'));
        if (!extensions.includes(extension)) {
          context.report({
            node,
            messageId: 'extension',
            data: { extensions: extensions.join(', ') },
          });
        }
      },
    };
  },
};

const jmrpReactPlugin: ESLint.Plugin = {
  rules: {
    'no-jsx-literals': jsxNoLiteralsRule,
    'jsx-filename-extension': jsxFilenameExtensionRule,
  },
};

export const reactPlugins: Record<string, ESLint.Plugin> = {
  '@stylistic': stylisticPlugin,
  'jmrp-react': jmrpReactPlugin,
};

export const reactRules: Linter.Config = {
  files: ['**/*.{js,jsx,ts,tsx}'],
  rules: {
    '@eslint-react/rules-of-hooks': 'off',
    '@eslint-react/exhaustive-deps': 'off',
    '@eslint-react/refs': 'off',
    '@eslint-react/purity': 'off',
    '@eslint-react/globals': 'off',
    '@eslint-react/immutability': 'off',
    '@eslint-react/static-components': 'off',
    '@eslint-react/set-state-in-effect': 'off',
    '@eslint-react/use-memo': 'off',
    '@stylistic/jsx-curly-brace-presence': [
      'error',
      { props: 'never', children: 'never' },
    ],
    '@stylistic/jsx-self-closing-comp': ['error', { component: true, html: true }],
    'jmrp-react/jsx-filename-extension': [
      'error',
      { extensions: ['.tsx', '.jsx'] },
    ],
    'react-hooks/rules-of-hooks': 'error',
    'react-hooks/exhaustive-deps': 'warn',
    'react-hooks/react-compiler': 'off',
    'react-hooks/set-state-in-effect': 'off',
    'react-hooks/refs': 'off',
    'react-hooks/purity': 'off',
    'react-hooks/globals': 'off',
    'react-hooks/immutability': 'off',
    'react-hooks/static-components': 'off',
    'react-hooks/preserve-manual-memoization': 'off',
    'react-hooks/incompatible-library': 'off',
    '@eslint-react/no-duplicate-key': 'warn',
    '@eslint-react/jsx-no-key-after-spread': 'error',
    'jmrp-react/no-jsx-literals': [
      'error',
      {
        noStrings: true,
        ignoreProps: true,
        noAttributeStrings: false,
        allowedStrings: [],
      },
    ],
    '@stylistic/jsx-newline': ['error', { prevent: true }],
  },
};
