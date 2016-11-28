// webpack.config.js

var nodeExternals = require('webpack-node-externals')
var path = require('path')
var webpack = require('webpack')

var config = {
  entry: ['whatwg-fetch', 'regenerator-runtime/runtime', path.join(__dirname, 'src', 'index.js')],
  devtool: 'source-map',
  target: 'node',
  bail: true,
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
  resolve: {
    root: path.resolve('./src'),
    extensions: ['', '.js']
  }
}

if (process.env.NODE_ENV === 'test') {
  config.externals = [nodeExternals()]
  config.plugins = [
    new webpack.ProvidePlugin({ 'btoa': 'btoa' }),
    new webpack.EnvironmentPlugin(Object.keys(process.env))
  ]
}

module.exports = config
