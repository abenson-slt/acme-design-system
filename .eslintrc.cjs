const path = require('path');

module.exports = {
  root: true,
  parser: '@typescript-eslint/parser',
  parserOptions: {
    ecmaVersion: 2020,
    sourceType: 'module',
    ecmaFeatures: { jsx: true },
  },
  plugins: ['@typescript-eslint', 'react', 'react-hooks', 'tailwindcss'],
  extends: [
    'eslint:recommended',
    'plugin:@typescript-eslint/recommended',
    'plugin:react/recommended',
    'plugin:react-hooks/recommended',
    'plugin:tailwindcss/recommended',
  ],
  settings: {
    react: { version: 'detect' },
    tailwindcss: {
      config: path.join(__dirname, 'tailwind.config.js'),
      callees: ['cn', 'cva', 'clsx'],
    },
  },
  rules: {
    'react/react-in-jsx-scope': 'off',
    'react/prop-types': 'off',
    'tailwindcss/no-arbitrary-value': 'error',
    'tailwindcss/classnames-order': 'error',
  },
  env: {
    browser: true,
    es2021: true,
    node: true,
  },
};
