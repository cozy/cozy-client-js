// webpack.config.js

var nodeExternals = require('webpack-node-externals')
var path = require('path')
var webpack = require('webpack')

var NODE_TARGET = process.env.NODE_TARGET || 'web'
var production = process.env.NODE_ENV === 'production'

var output = {
  path: path.join(__dirname, '/dist')
}

if (NODE_TARGET === 'web') {
  Object.assign(output, {
    filename: production ? 'cozy-client.min.js' : 'cozy-client.js',
    library: ['cozy', 'client'],
    libraryTarget: 'umd',
    umdNamedDefine: true
  })
} else {
  Object.assign(output, {
    filename: 'cozy-client.node.js',
    libraryTarget: 'commonjs'
  })
}

var config = {
  entry: ['isomorphic-fetch', path.join(__dirname, 'src', 'index.js')],
  devtool: 'source-map',
  target: NODE_TARGET,
  output: output,
  resolve: {
    root: path.resolve('./src'),
    extensions: ['', '.js']
  },
  module: {
    loaders: [
      {
        test: /\.js$/,
        loader: 'babel-loader',
        exclude: /(node_modules|bower_components)/
      }
    ]
  },
  node: {
    'crypto': false
  }
}

if (NODE_TARGET === 'node') {
  config.externals = [nodeExternals()]
  config.plugins = [
    new webpack.optimize.DedupePlugin(),
    new webpack.ProvidePlugin({ 'btoa': 'btoa' }),
    new webpack.EnvironmentPlugin(Object.keys(process.env))
  ]
} else if (production) {
  config.plugins = [
    new webpack.optimize.DedupePlugin(),
    new webpack.optimize.OccurenceOrderPlugin(),
    new webpack.optimize.UglifyJsPlugin({
      mangle: true,
      compress: {
        warnings: false
      }
    })
  ]
}

module.exports = config
