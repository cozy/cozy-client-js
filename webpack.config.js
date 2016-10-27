// webpack.config.js

var webpack = require('webpack');
var nodeExternals = require('webpack-node-externals');
var path = require('path');

var config = {
  entry: ['babel-polyfill', 'whatwg-fetch', __dirname + '/src/index.js'],
  devtool: 'source-map',
  target: 'node',
  output: {
    path: __dirname + '/dist',
    filename: 'cozy-api.js',
    library: 'cozy-api',
    libraryTarget: 'umd',
    umdNamedDefine: true
  },
  module: {
    loaders: [
      {
        test: /\.js$/,
        loader: 'babel-loader',
        exclude: /(node_modules|bower_components)/
      },
      {
        test: /\.js$/,
        loader: "eslint-loader",
        exclude: /node_modules/
      }
    ]
  },
  resolve: {
    root: path.resolve('./src'),
    extensions: ['', '.js']
  }
};

if(process.env.NODE_ENV==='test')
  config.externals = [nodeExternals()]

module.exports = config;
