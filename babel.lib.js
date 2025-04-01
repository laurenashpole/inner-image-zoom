module.exports = {
  targets: '>0.2%, not dead, not op_mini all',
  presets: [
    [
      '@babel/preset-env',
      {
        modules: 'commonjs',
        useBuiltIns: 'entry',
        corejs: '3.22'
      }
    ],
    '@babel/preset-react'
  ]
};
