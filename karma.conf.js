const webpack = require('webpack');
const path = require('path');
const { VueLoaderPlugin } = require('vue-loader');

module.exports = (config) => {
  config.set({
    basePath: path.resolve(__dirname, 'tests'),
    frameworks: ['mocha', 'webpack', 'chai'],
    files: ['*.test.js'],
    exclude: [],
    preprocessors: {
      '*.test.js': ['webpack']
    },
    webpack: {
      module: {
        rules: [
          ...[
            { test: /\.css$/, use: ['style-loader', 'css-loader'] },
            { test: /\.vue$/, loader: 'vue-loader' }
          ],
          ...(config.coverage
            ? [
                {
                  test: /\.js/,
                  include: /src/,
                  exclude: /node_modules|tests/,
                  use: '@jsdevtools/coverage-istanbul-loader'
                }
              ]
            : [])
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
    reporters: [...['mocha'], ...(config.coverage ? ['coverage-istanbul'] : [])],
    port: 9876,
    colors: true,
    logLevel: config.LOG_INFO,
    autoWatch: false,
    browsers: ['ChromeHeadless'],
    singleRun: true,
    concurrency: Infinity,
    ...(config.coverage && {
      coverageIstanbulReporter: {
        dir: 'coverage/',
        reports: ['text-summary', 'html']
      }
    })
  });
};
