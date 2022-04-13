// const webpack = require('webpack')
const portfinder = require('portfinder')
const chalk = require('chalk')
const prompts = require('prompts')
const { merge } = require('webpack-merge')

const common = require('./common')
const { HOST, PORT } = require('./config')

portfinder.basePort = PORT

const dev = {
  mode: 'development',
  devtool: 'cheap-module-source-map',
  output: {
    filename: 'js/[name].js',
  },
  // plugins: [new webpack.HotModuleReplacementPlugin({})],
  devServer: {
    compress: true,
    open: true,
    hot: true,
    historyApiFallback: true,
    host: HOST,
    port: PORT,
  },
}

module.exports = new Promise((resolve) => {
  portfinder
    .getPortPromise()
    .then((port) => {
      const config = merge(common, dev)
      if (port !== PORT) {
        const errorMessage = `Something is already running on port ${PORT}.`
        const changePortMessage = 'Would you like to run the app on another port instead?'
        const question = {
          type: 'confirm',
          name: 'shouldChangePort',
          message: `${chalk.yellow(errorMessage)}\n${chalk.cyan(changePortMessage)}`,
          initial: true,
        }
        prompts(question).then((answer) => {
          if (answer.shouldChangePort) {
            config.devServer.port = port
            resolve(config)
          }
        })
      } else {
        resolve(config)
      }
    })
    .catch((err) => {
      if (err && err.message) {
        console.log(chalk.red(err.message))
      }
      process.exit(1)
    })
})
