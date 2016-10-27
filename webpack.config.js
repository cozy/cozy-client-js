// webpack.config.js

var nodeExternals = require('webpack-node-externals')
var path = require('path')

var config = {
  entry: ['whatwg-fetch', path.join(__dirname, 'src', 'index.js')],
  devtool: 'source-map',
  target: 'node',
  output: {
    path: path.join(__dirname, '/dist'),
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
}

module.exports = config
