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
  extends: ['eslint:recommended', 'plugin:prettier/recommended', 'plugin:react/recommended'],
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
    ],
    'react/prop-types': 'off'
  },
  ignorePatterns: ['**/lib/**', '**/umd/**'],
  overrides: [
    {
      files: ['*.test.js'],
      env: {
        mocha: true
      }
    }
  ],
  settings: {
    react: {
      version: 'detect'
    }
  }
};
