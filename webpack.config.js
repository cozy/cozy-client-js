// webpack.config.js

var nodeExternals = require('webpack-node-externals')
var path = require('path')
var webpack = require('webpack')

var NODE_ENV = process.env.NODE_ENV
var NODE_TARGET = process.env.NODE_TARGET || 'web'

var config = {
  entry: ['isomorphic-fetch', path.join(__dirname, 'src', 'index.js')],
  devtool: 'source-map',
  target: NODE_TARGET,
  output: {
    path: path.join(__dirname, '/dist'),
    filename: 'cozy-client.js',
    library: 'cozy-client-js',
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
        loader: 'standard-loader',
        exclude: /node_modules|.tmp\/mocha-webpack/
      }
    ]
  },
  node: {
    "crypto": false
  },
  resolve: {
    root: path.resolve('./src'),
    extensions: ['', '.js']
  },
}

if (NODE_TARGET === 'node') {
  config.externals = [nodeExternals()]
  config.plugins = [
    new webpack.ProvidePlugin({ 'btoa': 'btoa' }),
    new webpack.EnvironmentPlugin(Object.keys(process.env))
  ]
}

module.exports = config
