const path = require('path');

module.exports = (config) => {
  config.set({
    basePath: path.resolve(__dirname, 'tests'),
    frameworks: [
      'mocha',
      'webpack',
      'chai'
    ],
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
      // module: {
      //   rules: [
      //     {
      //       test: /\.(js)$/,
      //       exclude: /node_modules/,
      //       use: 'babel-loader'
      //     }
      //   ]
      // }
    },
    reporters: ['progress'],
    port: 9876,
    colors: true,
    logLevel: config.LOG_INFO,
    autoWatch: false,
    browsers: [
      'ChromeHeadless',
      'Firefox'
    ],
    singleRun: true,
    concurrency: Infinity
  });
};
