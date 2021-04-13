module.exports = {
  root: true,
  env: {
    browser: true,
    es2021: true,
  },
  extends: [
    'plugin:react/recommended',
    'airbnb',
  ],
  parserOptions: {
    ecmaFeatures: {
      jsx: true,
    },
    ecmaVersion: 12,
    sourceType: 'module',
  },
  plugins: [
    'react',
  ],
  settings: {
    'import/resolver': {
      node: {
        paths: ['.'],
      },
    },
  },
  rules: {
    indent: 0,
    'eol-last': 0,
    'react/react-in-jsx-scope': 0,
    'react/jsx-filename-extension': 0,
    'react/require-default-props': 0,
    'react/forbid-prop-types': 0,
    'react/jsx-props-no-spreading': 0,
    'jsx-a11y/anchor-is-valid': 0,
    'import/prefer-default-export': 0,
    'implicit-arrow-linebreak': 0,
    'no-return-await': 0,
    'no-plusplus': 0,
    'nonblock-statement-body-position': 0,
    'jsx-a11y/label-has-associated-control': 0,
    'no-unused-expressions': 0,
    'no-param-reassign': 0,
    camelcase: 0,
    'prefer-promise-reject-errors': 0,
  },
};
