const webpack = require('webpack');
const path = require('path');

const SRC_DIR = path.resolve(__dirname, 'client');
const BUILD_DIR = path.resolve(__dirname, 'client');

module.exports = {
  entry: path.resolve(SRC_DIR, 'index.js'),
  output: {
    filename: 'bundle.js',
    path: BUILD_DIR
  },
  module: {
    rules: [{
      loader: 'babel-loader',
      exclude: /node_modules/,
      test: /\.js$/,
      query: {
        presets: ['es2015', 'react']
      }
    }, {
      test: /\.css$/,
      use: ['style-loader', 'css-loader']
    }]
  },
  watch: true
};
