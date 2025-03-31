const webpack = require('webpack');
const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const { VueLoaderPlugin } = require('vue-loader');

module.exports = ({ framework = 'vanilla' }) => {
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
        ...(framework === 'vue' ? [{ test: /\.vue$/, loader: 'vue-loader' }] : []),
        ...(framework === 'react'
          ? [
              {
                test: /\.(js|jsx|ts|tsx)$/,
                exclude: /node_modules/,
                use: {
                  loader: 'babel-loader',
                  options: {
                    presets: ['@babel/preset-env', '@babel/preset-react']
                  }
                }
              }
            ]
          : [])
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
              __VUE_OPTIONS_API__: true
            })
          ]
        : [])
    ],
    devtool: 'inline-source-map',
    stats: 'minimal'
  };
};
