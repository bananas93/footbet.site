module.exports = {
  env: {
    browser: true,
    es2021: true,
  },
  extends: [
    'eslint:recommended',
    'plugin:node/recommended',
    'airbnb',
  ],
  parserOptions: {
    ecmaVersion: 2018,
  },
  settings: {
    'import/resolver': {
      node: {
        paths: ['.'],
      },
    },
  },
  rules: {
    'node/exports-style': ['error', 'module.exports'],
    'node/prefer-global/buffer': ['error', 'always'],
    'node/prefer-global/console': ['error', 'always'],
    'node/prefer-global/process': ['error', 'always'],
    'node/prefer-global/url-search-params': ['error', 'always'],
    'node/prefer-global/url': ['error', 'always'],
    'node/prefer-promises/dns': 'error',
    'node/prefer-promises/fs': 'error',
    'node/no-unsupported-features/es-syntax': [
      'warn',
      {
        version: '>=13.0.0',
        ignores: ['modules'],
      },
    ],
    'import/extensions': [
      'error',
      {
        js: 'ignorePackages',
      },
    ],
  },
};
