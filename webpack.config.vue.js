const path = require('path');
const { VueLoaderPlugin } = require('vue-loader');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = (env, argv) => {
  if (argv.mode === 'development') {
    return {
      entry: path.resolve(__dirname, 'sandbox/vue'),
      devServer: {
        static: {
          directory: path.resolve(__dirname, 'sandbox/vue')
        },
        host: process.env.HOST || 'localhost',
        port: 3000
      },
      module: {
        rules: [
          { test: /\.css$/, use: ['style-loader', 'css-loader'] },
          { test: /\.vue$/, loader: 'vue-loader' }
        ]
      },
      plugins: [
        new VueLoaderPlugin(),
        new HtmlWebpackPlugin({
          inject: true,
          template: path.resolve(__dirname, 'sandbox/vue/index.html')
        })
      ],
      devtool: 'inline-source-map',
      stats: 'minimal'
    };
  }
};
