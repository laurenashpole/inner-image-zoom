const path = require('path');
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
        }
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
        }
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
