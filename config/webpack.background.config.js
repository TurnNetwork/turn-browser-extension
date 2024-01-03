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
    entry: paths.backgroundIndexJs,
    output: {
      path: paths.backgroundBuild,
      filename: 'background.js'
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
              // We want terser to parse ecma 8 code. However, we don't want it
              // to apply any minification steps that turns valid ecma 5 code
              // into invalid ecma 5 code. This is why the 'compress' and 'output'
              // sections only apply transformations that are ecma 5 safe
              // https://github.com/facebook/create-react-app/pull/4234
              ecma: 8,
            },
            compress: {
              ecma: 5,
              warnings: false,
              // Disabled because of an issue with Uglify breaking seemingly valid code:
              // https://github.com/facebook/create-react-app/issues/2376
              // Pending further investigation:
              // https://github.com/mishoo/UglifyJS2/issues/2011
              comparisons: false,
              // Disabled because of an issue with Terser breaking valid code:
              // https://github.com/facebook/create-react-app/issues/5250
              // Pending further investigation:
              // https://github.com/terser-js/terser/issues/120
              inline: 2,
            },
            mangle: {
              safari10: true,
            },
            output: {
              ecma: 5,
              comments: false,
              // Turned on because emoji and regex is not minified properly using default
              // https://github.com/facebook/create-react-app/issues/2488
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
      fallback: {
        "assert": require.resolve("assert/"),
        "stream": require.resolve("stream-browserify"),
        "buffer": require.resolve('buffer/'),
      },
      plugins: [
      ],
    },
    module: {
      rules: [
        {
          test:/\.ts$/, //
          loader: 'ts-loader', // 
          exclude: /node_modules/, // 
          options: {
              configFile: path.resolve(__dirname, '../background/ts-config.json')
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
