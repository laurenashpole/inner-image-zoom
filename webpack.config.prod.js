const webpack = require('webpack');
const path = require('path');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const CssMinimizerPlugin = require('css-minimizer-webpack-plugin');
const RemoveEmptyScriptsPlugin = require('webpack-remove-empty-scripts');
const { VueLoaderPlugin } = require('vue-loader');

module.exports = ({ framework = 'vanilla' }) => {
  const directory = path.resolve(__dirname, `packages/${framework}`);

  return ['lib', 'umd'].map((target) => ({
    mode: 'production',
    entry: [...(framework !== 'vue' ? [`${directory}/src/styles.css`] : []), `${directory}/src`],
    output: {
      path: `${directory}/${target}`,
      filename: 'index.js',
      library: 'InnerImageZoom',
      libraryTarget: target === 'lib' ? 'var' : target,
      clean: true,
      ...(target === 'umd' && {
        libraryExport: 'default'
      })
    },
    module: {
      rules: [
        { test: /\.css$/, use: [MiniCssExtractPlugin.loader, 'css-loader'] },
        ...(framework === 'vue' ? [{ test: /\.vue$/, loader: 'vue-loader' }] : []),
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
