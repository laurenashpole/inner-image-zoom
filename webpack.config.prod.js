const webpack = require('webpack');
const path = require('path');
const CopyPlugin = require('copy-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const CssMinimizerPlugin = require('css-minimizer-webpack-plugin');
const RemoveEmptyScriptsPlugin = require('webpack-remove-empty-scripts');
const { VueLoaderPlugin } = require('vue-loader');

const getTargets = (framework) => {
  if (framework === 'react') {
    return ['lib', 'es'];
  }

  if (framework === 'vue') {
    return ['lib', 'es', 'umd'];
  }

  return ['lib', 'umd'];
};

const getExtendedConfig = (framework, target, config) => {
  if (framework !== 'vue' && framework !== 'react') {
    return {
      ...config,
      output: {
        ...config.output,
        library: 'InnerImageZoom',
        libraryTarget: target === 'lib' ? 'var' : target,
        ...(target === 'umd' && {
          libraryExport: 'default'
        })
      }
    };
  }

  if (target === 'umd') {
    return {
      ...config,
      output: {
        ...config.output,
        library: {
          name: 'InnerImageZoom',
          type: 'umd',
          export: 'default'
        }
      }
    };
  }

  if (target === 'lib') {
    return {
      ...config,
      output: {
        ...config.output,
        library: {
          type: 'commonjs2',
          export: 'default'
        }
      },
      externals: framework === 'react' ? ['react', 'react-dom'] : ['vue']
    };
  }

  return {
    ...config,
    experiments: { outputModule: true },
    output: {
      ...config.output,
      library: { type: 'module' },
      chunkFormat: 'module',
      environment: { module: true }
    },
    externals: framework === 'react' ? ['react', 'react-dom'] : ['vue'],
    externalsType: 'module-import'
  };
};

module.exports = ({ framework = 'vanilla' }) => {
  const directory = path.resolve(__dirname, `packages/${framework}`);

  return getTargets(framework).map((target) => {
    const isVue = framework === 'vue';
    const isReact = framework === 'react';

    const config = {
      mode: 'production',
      entry: [`${directory}/src/styles.css`, `${directory}/src`],
      output: {
        path: `${directory}/${target}`,
        filename: 'index.js',
        clean: true
      },
      module: {
        rules: [
          { test: /\.css$/, use: [MiniCssExtractPlugin.loader, 'css-loader'] },
          ...(isVue ? [{ test: /\.vue$/, use: 'vue-loader' }] : []),
          {
            test: /\.js$/,
            exclude: /node_modules/,
            use: {
              loader: 'babel-loader',
              options: {
                presets: ['@babel/preset-env', ...(isReact ? ['@babel/preset-react'] : [])]
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
        ...(isVue
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
          '...',
          new RemoveEmptyScriptsPlugin(),
          new CssMinimizerPlugin({
            test: /\.min.css$/
          })
        ]
      }
    };

    return getExtendedConfig(framework, target, config);
  });
};
