declare module 'eslint-plugin-jsx-a11y' {
  import type { Linter } from 'eslint';

  const plugin: {
    flatConfigs: {
      recommended: Linter.Config;
      strict: Linter.Config;
    };
    configs: Record<string, Linter.Config | Linter.Config[]>;
  };

  export default plugin;
}

declare module 'eslint-plugin-react-native' {
  import type { ESLint } from 'eslint';

  const plugin: ESLint.Plugin & {
    environments: {
      'react-native': {
        globals: Record<string, boolean>;
      };
    };
  };

  export default plugin;
}

declare module 'eslint-plugin-expo' {
  import type { ESLint } from 'eslint';

  const plugin: ESLint.Plugin;

  export default plugin;
}
