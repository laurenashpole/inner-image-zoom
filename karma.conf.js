const webpack = require('webpack');
const path = require('path');
const { VueLoaderPlugin } = require('vue-loader');

module.exports = (config) => {
  config.set({
    basePath: path.resolve(__dirname, 'tests'),
    frameworks: ['mocha', 'webpack', 'chai'],
    plugins: [
      'karma-chai',
      'karma-chrome-launcher',
      'karma-firefox-launcher',
      'karma-mocha',
      'karma-mocha-reporter',
      'karma-webpack'
    ],
    files: ['*.spec.js'],
    exclude: [],
    preprocessors: {
      '*.spec.js': ['webpack']
    },
    webpack: {
      module: {
        rules: [
          { test: /\.css$/, use: ['style-loader', 'css-loader'] },
          { test: /\.vue$/, loader: 'vue-loader' }
        ]
      },
      plugins: [
        new VueLoaderPlugin(),
        new webpack.DefinePlugin({
          __VUE_OPTIONS_API__: true,
          __VUE_PROD_DEVTOOLS__: false
        })
      ]
    },
    reporters: ['mocha'],
    port: 9876,
    colors: true,
    logLevel: config.LOG_INFO,
    autoWatch: false,
    browsers: ['ChromeHeadless', 'Firefox'],
    singleRun: true,
    concurrency: Infinity
  });
};
