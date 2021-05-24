const webpack = require('webpack')
const { merge } = require('webpack-merge')

const common = require('./common')
const { HOST, PORT } = require('./config')

const dev = {
  mode: 'development',
  devtool: 'cheap-module-source-map',
  output: {
    filename: 'js/[name].js',
  },
  plugins: [new webpack.HotModuleReplacementPlugin({})],
  devServer: {
    compress: true,
    open: true,
    hot: true,
    historyApiFallback: true,
    host: HOST,
    port: PORT,
  },
}

module.exports = merge(common, dev)
