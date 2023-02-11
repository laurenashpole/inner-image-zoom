const webpack = require('webpack');
const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const { VueLoaderPlugin } = require('vue-loader');

module.exports = ({ framework = 'vanilla' }) => {
  console.log(framework);
  const directory = path.resolve(__dirname, `sandbox/${framework}`);

  return {
    mode: 'development',
    entry: directory,
    devServer: {
      static: {
        directory
      },
      host: process.env.HOST || 'localhost',
      port: 3000
    },
    resolve: {
      extensions: ['.ts', '.js']
    },
    module: {
      rules: [
        { test: /\.css$/, use: ['style-loader', 'css-loader'] },
        ...(framework === 'vue' ? [{ test: /\.vue$/, loader: 'vue-loader' }] : [])
      ]
    },
    plugins: [
      new HtmlWebpackPlugin({
        inject: true,
        template: `${directory}/index.html`
      }),
      ...(framework === 'vue'
        ? [
            new VueLoaderPlugin(),
            new webpack.DefinePlugin({
              __VUE_OPTIONS_API__: false,
              __VUE_PROD_DEVTOOLS__: false
            })
          ]
        : [])
    ],
    devtool: 'inline-source-map',
    stats: 'minimal'
  };
};
