module.exports = {
  env: {
    commonjs: true,
    es2020: true,
    node: true,
    browser: true,
    jest: true,
  },
  extends: 'eslint:recommended',
  parserOptions: {
    ecmaVersion: 11,
    sourceType: 'module',
  },
  rules: {
    curly: ['error', 'all'],
    'brace-style': ['error', '1tbs'],
  },
};
