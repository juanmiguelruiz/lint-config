# @jmrp/lint-config

Shareable ESLint, Prettier, and Biome configurations for TypeScript projects. Uses ESLint Flat Config and supports React, React Native, Jest, and Testing Library out of the box.

## Installation

```bash
npm install --save-dev @jmrp/lint-config eslint typescript
```

The package requires Node.js >= 22.0.0 and ESLint >= 9.0.0.

## Entry Points

| Import | Includes |
|--------|----------|
| `@jmrp/lint-config` | Base JS/TS + import rules |
| `@jmrp/lint-config/react` | Base + ESLint React + Hooks + JSX a11y |
| `@jmrp/lint-config/jest` | Base + Jest + Testing Library |
| `@jmrp/lint-config/testing` | Testing Library only |
| `@jmrp/lint-config/react-native` | Base + renderer-agnostic React + RN + Expo |
| `@jmrp/lint-config/prettier-eslint` | Base + Prettier as ESLint rule |
| `@jmrp/lint-config/prettier` | Prettier config object |
| `@jmrp/lint-config/biome` | Biome configuration |

## Usage

### Base TypeScript project

```js
// eslint.config.js
import config from '@jmrp/lint-config';

export default [...config];
```

### React

```js
// eslint.config.js
import config from '@jmrp/lint-config/react';

export default [...config];
```

### Jest (includes Testing Library)

```js
// eslint.config.js
import config from '@jmrp/lint-config/jest';

export default [...config];
```

### Testing Library (standalone)

Combine with the base config or any other entry point:

```js
// eslint.config.js
import base from '@jmrp/lint-config';
import testing from '@jmrp/lint-config/testing';

export default [...base, ...testing];
```

### React Native (Expo)

```js
// eslint.config.js
import config from '@jmrp/lint-config/react-native';

export default [...config];
```

### Prettier integrated with ESLint

```js
// eslint.config.js
import config from '@jmrp/lint-config/prettier-eslint';

export default [...config];
```

### Prettier standalone

```js
// prettier.config.js
import config from '@jmrp/lint-config/prettier';

export default config;
```

### Biome

```jsonc
// biome.json
{
  "extends": ["@jmrp/lint-config/biome"]
}
```

## Key Rules

- `eqeqeq`: always
- `no-console`: error
- `prefer-const`: error
- `prefer-template`: error
- `@typescript-eslint/explicit-function-return-type`: error
- `@typescript-eslint/consistent-type-imports`: error
- `import-x/order`: alphabetical with groups
- `curly`: multi-line

React-specific rules include:

- `@eslint-react/no-missing-key`: error
- `@eslint-react/jsx-no-key-after-spread`: error
- `react-hooks/rules-of-hooks`: error
- `react-hooks/exhaustive-deps`: warning
- `@stylistic/jsx-curly-brace-presence`: error
- `@stylistic/jsx-self-closing-comp`: error
- `jmrp-react/no-jsx-literals`: error

`jmrp-react/no-jsx-literals` preserves the previous `jsx-no-literals` behavior for
JSX children while ignoring props. It is implemented locally because there is no
direct equivalent in ESLint React.

## Development

```bash
pnpm check       # typecheck, build and complete test suite
pnpm test        # build and run tests
pnpm test:unit   # run tests against the existing dist/ build
```

The React entry point uses `@eslint-react/eslint-plugin` with its TypeScript preset.
The React Native entry point uses renderer-agnostic React and JSX rules, together
with `eslint-plugin-react-native` and `eslint-plugin-expo`; DOM-specific rules are
not enabled there. Stylistic JSX rules are provided by `@stylistic/eslint-plugin`.

## License

MIT
