module.exports = {
  root: true,
  env: {
    browser: true,
    node: true
  },
  parserOptions: {
    ecmaVersion: 2020,
    sourceType: 'module'
  },
  extends: ['eslint:recommended', 'plugin:prettier/recommended'],
  rules: {
    'prettier/prettier': [
      'error',
      {
        singleQuote: true,
        jsxBracketSameLine: false,
        trailingComma: 'none',
        printWidth: 120,
        endOfLine: 'auto'
      }
    ]
  },
  ignorePatterns: ['**/es/**', '**/lib/**', '**/umd/**'],
  overrides: [
    {
      files: ['*.spec.js'],
      env: {
        mocha: true
      }
    }
  ]
};
