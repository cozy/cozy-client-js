// webpack.config.js

var nodeExternals = require('webpack-node-externals')
var path = require('path')
var webpack = require('webpack')

var NODE_TARGET = process.env.NODE_TARGET || 'web'

var output = {
  path: path.join(__dirname, '/dist')
}

if (NODE_TARGET === 'web') {
  output.filename = 'cozy-client.js'
  output.library = 'cozy-client-js'
  output.libraryTarget = 'umd'
  output.umdNamedDefine = true
} else {
  output.filename = 'cozy-client.node.js'
  output.libraryTarget = 'commonjs'
}

var config = {
  entry: ['isomorphic-fetch', path.join(__dirname, 'src', 'index.js')],
  devtool: 'source-map',
  target: NODE_TARGET,
  output: output,
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
    'crypto': false
  },
  resolve: {
    root: path.resolve('./src'),
    extensions: ['', '.js']
  }
}

if (NODE_TARGET === 'node') {
  config.externals = [nodeExternals()]
  config.plugins = [
    new webpack.ProvidePlugin({ 'btoa': 'btoa' }),
    new webpack.EnvironmentPlugin(Object.keys(process.env))
  ]
}

module.exports = config
