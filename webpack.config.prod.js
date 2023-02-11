const path = require('path');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const CssMinimizerPlugin = require('css-minimizer-webpack-plugin');
const RemoveEmptyScriptsPlugin = require('webpack-remove-empty-scripts');
const CopyPlugin = require('copy-webpack-plugin');

module.exports = ({ framework = 'vanilla' }) => {
  const directory = path.resolve(__dirname, `packages/${framework}`);

  return [
    {
      mode: 'production',
      entry: path.resolve(__dirname, 'packages/styles.css'),
      output: {
        path: `${directory}/src`
      },
      module: {
        rules: [{ test: /\.css$/, use: [MiniCssExtractPlugin.loader, 'css-loader'] }]
      },
      plugins: [
        new MiniCssExtractPlugin({
          filename: 'styles.css'
        }),
        new MiniCssExtractPlugin({
          filename: 'styles.min.css'
        })
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
    },
    ...['lib', 'umd'].map((target) => ({
      mode: 'production',
      entry: `${directory}/src`,
      output: {
        path: `${directory}/${target}`,
        filename: 'index.js',
        library: 'InnerImageZoom',
        libraryTarget: target === 'lib' ? 'var' : target,
        clean: true
      },
      plugins: [
        new CopyPlugin({
          patterns: [{ from: `/${directory}/src/*.css`, to: '[name][ext]' }]
        })
      ]
    }))
  ];
};
