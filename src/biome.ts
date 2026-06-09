interface BiomeConfig {
  files?: { ignore?: string[] };
  organizeImports?: { enabled?: boolean };
  formatter?: {
    enabled?: boolean;
    formatWithErrors?: boolean;
    indentStyle?: 'space' | 'tab' | 'infer';
    indentWidth?: number;
    lineEnding?: 'lf' | 'crlf' | 'cr' | 'infer';
    lineWidth?: number;
  };
  javascript?: {
    formatter?: {
      arrowParentheses?: 'always' | 'asNeeded';
      quoteStyle?: 'single' | 'double' | 'auto';
      jsxQuoteStyle?: 'single' | 'double' | 'auto';
      trailingCommas?: 'none' | 'all' | 'es5';
    };
  };
  linter?: {
    enabled?: boolean;
    rules?: {
      recommended?: boolean;
      correctness?: Record<string, 'error' | 'warn' | 'off' | 'info' | 'hint' | 'verbose'>;
      style?: Record<string, 'error' | 'warn' | 'off' | 'info' | 'hint' | 'verbose'>;
      suspicious?: Record<string, 'error' | 'warn' | 'off' | 'info' | 'hint' | 'verbose'>;
    };
  };
}

const biomeConfig: BiomeConfig = {
  files: {
    ignore: [
      'node_modules/**',
      '.next/**',
      '.astro/**',
      'out/**',
      'dist/**',
      'build/**',
      'public/**',
      'coverage/**',
      '**/*.d.ts',
      '**/*.d.mts',
    ],
  },
  organizeImports: {
    enabled: true,
  },
  formatter: {
    enabled: true,
    formatWithErrors: false,
    indentStyle: 'space',
    indentWidth: 2,
    lineEnding: 'lf',
    lineWidth: 100,
  },
  javascript: {
    formatter: {
      arrowParentheses: 'asNeeded',
      quoteStyle: 'single',
      jsxQuoteStyle: 'double',
      trailingCommas: 'es5',
    },
  },
  linter: {
    enabled: true,
    rules: {
      recommended: true,
      correctness: {
        useExhaustiveDependencies: 'warn',
        useHookAtTopLevel: 'error',
        useJsxKeyInIterable: 'error',
      },
      style: {
        noVar: 'error',
        useConst: 'error',
        useTemplate: 'error',
        noNonNullAssertion: 'error',
        useImportType: 'error',
        useSelfClosingElements: 'error',
      },
      suspicious: {
        noConsole: 'error',
        noDebugger: 'warn',
        noDoubleEquals: 'error',
        noExplicitAny: 'error',
        noEmptyBlockStatements: 'warn',
      },
    },
  },
};

export default biomeConfig;
