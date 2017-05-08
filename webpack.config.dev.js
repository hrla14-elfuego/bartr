const webpack = require('webpack');
const path = require('path');
require('dotenv').config()


const SRC_DIR = path.resolve(__dirname, './client/src/');
const BUILD_DIR = path.resolve(__dirname, './client/build/');

module.exports = {
  // entry: path.resolve(SRC_DIR, 'index.js'),
  entry: {
    'app': [
      'react-hot-loader/patch',
      "webpack-dev-server/client?http://localhost:8080",
        'webpack/hot/dev-server',
      "babel-polyfill",
      './client/src/index'
    ]
  },
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
        cacheDirectory: true,
        presets: ['es2015', 'react'],
        plugins: [
          'transform-object-rest-spread',
          'transform-regenerator',
          'react-hot-loader/babel',
        ]
      }
    },
    {
      test: /\.css$/,
      use: ['style-loader', 'css-loader']
    }
    ]
  },
  // devServer: {
  //   contentBase: "./client/static",
  //   publicPath: "/",
  //   hot: true,
  //   inline: true
  // },
  devtool: 'eval',
  cache: true,
  plugins: [
    new webpack.HotModuleReplacementPlugin(),
    new webpack.DefinePlugin({
      'API_ENDPOINT': JSON.stringify("http://localhost:5000"),
      'AUTH0_CLIENT_ID': JSON.stringify(process.env.AUTH0_CLIENT_ID),
      'AUTH0_DOMAIN': JSON.stringify(process.env.AUTH0_DOMAIN),
    })
  ]
};