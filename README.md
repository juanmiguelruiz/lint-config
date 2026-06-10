# @jmrp/lint-config

Shareable ESLint, Prettier, and Biome configurations for TypeScript projects. Uses flat config and supports React, Jest, and Testing Library out of the box.

## Installation

```bash
npm install @jmrp/lint-config eslint typescript
```

## Entry Points

| Import | Includes |
|--------|----------|
| `@jmrp/lint-config` | Base JS/TS + import rules |
| `@jmrp/lint-config/react` | Base + React + Hooks + JSX a11y |
| `@jmrp/lint-config/jest` | Base + Jest + Testing Library |
| `@jmrp/lint-config/testing` | Testing Library only |
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

## Peer Dependencies

- `eslint` >= 9.0.0
- `typescript` >= 5.0.0 (optional)

## License

MIT
