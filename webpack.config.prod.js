const webpack = require('webpack');
const path = require('path');
const CopyPlugin = require('copy-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const CssMinimizerPlugin = require('css-minimizer-webpack-plugin');
const RemoveEmptyScriptsPlugin = require('webpack-remove-empty-scripts');
const { VueLoaderPlugin } = require('vue-loader');

module.exports = ({ framework = 'vanilla' }) => {
  const directory = path.resolve(__dirname, `packages/${framework}`);

  return ['lib', ...(framework === 'react' ? ['es'] : ['umd'])].map((target) => ({
    mode: 'production',
    entry: [
      ...(framework !== 'vue' ? [`${directory}/src/styles.css`] : []),
      ...(framework !== 'react' ? [`${directory}/src`] : [])
    ],
    output: {
      path: `${directory}/${target}`,
      clean: true,
      ...(framework !== 'react' && {
        filename: 'index.js',
        library: 'InnerImageZoom',
        libraryTarget: target === 'lib' ? 'var' : target,
        ...(target === 'umd' && {
          libraryExport: 'default'
        })
      })
    },
    module: {
      rules: [
        { test: /\.css$/, use: [MiniCssExtractPlugin.loader, 'css-loader'] },
        ...(framework === 'vue' ? [{ test: /\.vue$/, use: 'vue-loader' }] : []),
        {
          test: /\.js$/,
          exclude: /node_modules/,
          use: {
            loader: 'babel-loader',
            options: {
              presets: ['@babel/preset-env']
            }
          }
        }
      ]
    },
    plugins: [
      new CopyPlugin({
        patterns: [`${directory}/src/index.d.ts`]
      }),
      new MiniCssExtractPlugin({
        filename: 'styles.min.css'
      }),
      ...(framework === 'vue'
        ? [
            new VueLoaderPlugin(),
            new webpack.DefinePlugin({
              __VUE_OPTIONS_API__: false
            })
          ]
        : [])
    ],
    optimization: {
      minimizer: [
        `...`,
        new RemoveEmptyScriptsPlugin(),
        new CssMinimizerPlugin({
          test: /\.min.css$/
        })
      ]
    }
  }));
};
