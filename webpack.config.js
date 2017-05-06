const webpack = require('webpack');
const path = require('path');

const SRC_DIR = path.resolve(__dirname, './client/src/');
const BUILD_DIR = path.resolve(__dirname, './client/build/');

module.exports = {
  entry: path.resolve(SRC_DIR, 'index.js'),
  output: {
    filename: 'bundle.js',
    path: BUILD_DIR
  },
  module: {
    rules: [
    {
      test: /\.js$/,
      loader: 'babel-loader?cacheDirectory',
      exclude: /node_modules/,
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
  devServer: {
    contentBase: "./client/static",
    publicPath: "/",
    hot: true,
    inline: true
  },
  devtool: 'sourcemap',
  plugins: [
    new webpack.HotModuleReplacementPlugin(),
  ]
};