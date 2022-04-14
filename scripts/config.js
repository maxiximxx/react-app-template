const path = require('path')

const PROJECT_PATH = path.resolve(__dirname, '../')
const BUILD_PATH = path.resolve(__dirname, '../build')
const HOST = '0.0.0.0'
const PORT = 3000

module.exports = { PROJECT_PATH, BUILD_PATH, HOST, PORT }
