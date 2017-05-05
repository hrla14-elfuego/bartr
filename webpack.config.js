const webpack = require('webpack');
const path = require('path');

const SRC_DIR = path.resolve(__dirname, 'client/src');
const BUILD_DIR = path.resolve(__dirname, 'client/build');

module.exports = {
  entry: path.resolve(SRC_DIR, 'bartr.js'),
  output: {
    filename: 'bundle.js',
    path: BUILD_DIR
  },
  module: {
    rules: [
    {
      loader: 'babel-loader',
      exclude: /node_modules/,
      test: /\.js$/,
      query: {
        presets: ['es2015', 'react'],
        plugins: ['transform-object-rest-spread']
      }
    }, 
    {
      test: /\.css$/,
      use: ['style-loader', 'css-loader']
    }
    ]
  },
  watch: true
};