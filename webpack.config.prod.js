const path = require('path');
const postcss = require('postcss');
const cssnano = require('cssnano');
const CopyPlugin = require('copy-webpack-plugin');

module.exports = ({ framework = 'vanilla' }) => {
  return ['lib', 'umd'].map((target) => {
    const directory = path.resolve(__dirname, `packages/${framework}`);
    const styles = path.resolve(__dirname, 'packages/styles.css');

    return {
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
          patterns: [
            {
              from: styles,
              to: `${directory}/${target}/styles.css`
            },
            {
              from: styles,
              to: `${directory}/${target}/styles.min.css`,
              transform: (content, path) => {
                return postcss([cssnano])
                  .process(content, {
                    from: path
                  })
                  .then((result) => {
                    return result.css;
                  });
              }
            }
          ]
        })
      ]
    };
  });
};
