const webpack = require('webpack');
const path = require('path');

const SRC_DIR = path.resolve(__dirname, './client/src/');
const BUILD_DIR = path.resolve(__dirname, './client/static/');

module.exports = {
  // entry: path.resolve(SRC_DIR, 'index.js'),
  entry: {
    'app': [
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
        ]
      }
    },
    {
      test: /\.css$/,
      use: ['style-loader', 'css-loader']
    }
    ]
  },
  plugins: [
    new webpack.HotModuleReplacementPlugin(),
    new webpack.DefinePlugin({
      'DEPLOYMENT_ENV': JSON.stringify(process.env.NODE_ENV),
      'API_ENDPOINT': JSON.stringify(""),
      'AUTH0_CLIENT_ID': JSON.stringify(process.env.AUTH0_CLIENT_ID),
      'AUTH0_DOMAIN': JSON.stringify(process.env.AUTH0_DOMAIN),
    })
  ]
};