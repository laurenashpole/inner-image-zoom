const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

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
    module: {
      rules: [{ test: /\.css$/, use: ['style-loader', 'css-loader'] }]
    },
    plugins: [
      new HtmlWebpackPlugin({
        inject: true,
        template: `${directory}/index.html`
      })
    ],
    devtool: 'inline-source-map',
    stats: 'minimal'
  };
};
