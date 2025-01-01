module.exports = {
  env: {
    browser: true,
    amd: true,
    node: true,
    es2021: true,
  },
  extends: [
    'eslint:recommended',
    'plugin:react/recommended',
    'plugin:@typescript-eslint/recommended',
  ],
  parser: '@typescript-eslint/parser',
  parserOptions: {
    ecmaFeatures: {
      jsx: true,
    },
    ecmaVersion: 'latest',
    sourceType: 'module',
  },
  plugins: ['react', '@typescript-eslint'],
  ignorePatterns: ['webpack.config.js'],
  rules: {
    '@typescript-eslint/no-explicit-any': ['off'],
    'react/display-name': ['off'],
    'indent': ['error', 2],
    'linebreak-style': ['error', 'unix'],
    'quotes': ['error', 'single'],
    'semi': ['error', 'always'],
    //SPACES ==============
    '@typescript-eslint/object-curly-spacing': ['error', 'always'],
    'arrow-spacing': ['error', { 'before': true, 'after': true }],
    'key-spacing': ['error', { 'afterColon': true }],
    'space-infix-ops': ['error', { 'int32Hint': false }],
    'comma-spacing': ['error', { 'before': false, 'after': true }],
    'brace-style': ['error', '1tbs', { 'allowSingleLine': true }],
    'space-before-blocks': 'error',
    '@typescript-eslint/keyword-spacing': 'error',
    'no-multi-spaces': ['error', { 'ignoreEOLComments': true }],
    //======================
    'no-empty-pattern': 'off',
    'react/prop-types': 'off',
  },
};
  