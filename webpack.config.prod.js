const path = require('path');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const CssMinimizerPlugin = require('css-minimizer-webpack-plugin');

module.exports = ({ framework = 'vanilla' }) => {
  return ['lib', 'umd'].map((target) => {
    const directory = path.resolve(__dirname, `packages/${framework}`);
    const styles = path.resolve(__dirname, 'packages/styles.css');

    return {
      mode: 'production',
      entry: [`${directory}/src`, styles],
      output: {
        path: `${directory}/${target}`,
        filename: 'index.js',
        library: 'InnerImageZoom',
        libraryTarget: target === 'lib' ? 'var' : target,
        clean: true
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
          new CssMinimizerPlugin({
            test: /\.min.css$/
          })
        ]
      }
    };
  });
};
