const path = require('path');

module.exports = (config) => {
  config.set({
    basePath: path.resolve(__dirname, 'tests'),
    frameworks: ['mocha', 'webpack', 'chai'],
    files: ['*.spec.js'],
    exclude: [],
    preprocessors: {
      '*.spec.js': ['webpack']
    },
    webpack: {
      module: {
        rules: [
          ...[{ test: /\.css$/, use: ['style-loader', 'css-loader'] }],
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
      }
    },
    reporters: [...['mocha'], ...(config.coverage ? ['coverage-istanbul'] : [])],
    port: 9876,
    colors: true,
    logLevel: config.LOG_INFO,
    autoWatch: false,
    browsers: [...['ChromeHeadless'], ...(!config.coverage ? ['FirefoxHeadless'] : [])],
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
