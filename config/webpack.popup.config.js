'use strict';

const fs = require('fs');
const path = require('path');
const webpack = require('webpack');
const resolve = require('resolve');
const TerserPlugin = require('terser-webpack-plugin');
const paths = require('./paths');
const modules = require('./modules');
const useTypeScript = fs.existsSync(paths.appTsConfig);


module.exports = function (webpackEnv) {
  return {
    mode:  'production' ,
    entry: paths.popupIndexJs,
    output: {
      path: paths.popupBuild,
      filename: 'props.js'
    },
    infrastructureLogging: {
      level: 'none',
    },
    optimization: {
      minimize: true,
      minimizer: [
        // This is only used in production mode
        new TerserPlugin({
          terserOptions: {
            parse: {
              ecma: 8,
            },
            compress: {
              ecma: 5,
              warnings: false,
              comparisons: false,
              inline: 2,
            },
            mangle: {
              safari10: true,
            },
            output: {
              ecma: 5,
              comments: false,
              ascii_only: true,
            },
          },
        })
      ],
    },
    resolve: {
      modules: ['node_modules'].concat(
        modules.additionalModulePaths || []
      ),
      extensions: paths.moduleFileExtensions
        .map(ext => `.${ext}`)
        .filter(ext => useTypeScript || !ext.includes('ts')),
      alias: {
      },
      plugins: [
      ],
      fallback: {
        "assert": require.resolve("assert/"),
        "stream": require.resolve("stream-browserify"),
        "buffer": require.resolve('buffer/'),
      },
    },
    module: {
      rules: [
        {
          test:/\.ts$/, // 
          loader: 'ts-loader', // -
          exclude: /node_modules/, // 
          options: {
              configFile: path.resolve(__dirname, '../popup/ts-config.json')
          }
        }
      ]
    },
    plugins: [
      new webpack.ProvidePlugin({
        Buffer: ['buffer', 'Buffer'],
        assert: ['assert', 'assert'],
        stream: ['stream', 'stream'],
      }),
    ],
    performance: false,
  };
};
