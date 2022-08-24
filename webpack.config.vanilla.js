const path = require('path');
const postcss = require('postcss');
const cssnano = require('cssnano');
const CopyPlugin = require('copy-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = (env, argv) => {
  if (argv.mode === 'production') {
    return [
      {
        mode: 'production',
        entry: path.resolve(__dirname, 'src/vanilla'),
        output: {
          path: path.resolve(__dirname, 'src/vanilla/umd'),
          filename: 'index.js',
          library: 'InnerImageZoom',
          libraryTarget: 'umd',
          clean: true
        },
        plugins: [
          new CopyPlugin({
            patterns: [
              {
                from: path.resolve(__dirname, 'src/styles.css'),
                to: path.resolve(__dirname, 'src/vanilla/umd/styles.css')
              },
              {
                from: path.resolve(__dirname, 'src/styles.css'),
                to: path.resolve(__dirname, 'src/vanilla/umd/styles.min.css'),
                transform: (content, path) => {
                  return postcss([cssnano]).process(content, {
                    from: path,
                  })
                  .then((result) => {
                    return result.css;
                  });
                }
              }
            ]
          })
        ]
      },
      {
        mode: 'production',
        entry: path.resolve(__dirname, 'src/vanilla'),
        output: {
          path: path.resolve(__dirname, 'src/vanilla/lib'),
          filename: 'index.js',
          library: 'InnerImageZoom',
          libraryTarget: 'var',
          clean: true
        },
        plugins: [
          new CopyPlugin({
            patterns: [
              {
                from: path.resolve(__dirname, 'src/styles.css'),
                to: path.resolve(__dirname, 'src/vanilla/lib/styles.css')
              },
              {
                from: path.resolve(__dirname, 'src/styles.css'),
                to: path.resolve(__dirname, 'src/vanilla/lib/styles.min.css'),
                transform: (content, path) => {
                  return postcss([cssnano]).process(content, {
                    from: path,
                  })
                  .then((result) => {
                    return result.css;
                  });
                }
              }
            ]
          })
        ]
      }
    ];
  }

  if (argv.mode === 'development') {
    return {
      entry: path.resolve(__dirname, 'sandbox/vanilla'),
      devServer: {
        static: {
          directory: path.resolve(__dirname, 'sandbox/vanilla'),
        },
        host: process.env.HOST || 'localhost',
        port: 3000
      },
      module: {
        rules: [
          { test: /\.css$/, use: ['style-loader' , 'css-loader'] }
        ]
      },
      plugins: [
        new HtmlWebpackPlugin({
          inject: true,
          template: path.resolve(__dirname, 'sandbox/vanilla/index.html')
        })
      ],
      stats: 'minimal'
    };
  }
};
