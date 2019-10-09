module.exports = {
  root: true,
  env: {
    node: true,
    browser: true,
  },
  extends: [
    'plugin:vue/essential',
    '@vue/airbnb',
  ],
  rules: {
    'no-console': process.env.NODE_ENV === 'production' ? 'error' : 'off',
    'no-debugger': process.env.NODE_ENV === 'production' ? 'error' : 'off',
    'no-underscore-dangle': 'off',
    'import-extensions': 'off',
    'no-multi-assign': 'off',
  },
  parserOptions: {
    parser: 'babel-eslint',
  },
  globals: {
    _: 'readonly',
    webSettings: 'readonly',
  },
};
