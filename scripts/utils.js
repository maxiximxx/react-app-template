const path = require('path')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const { isDevelopment } = require('./env')

function resolvePath(dir) {
  return path.join(__dirname, `../${dir}`)
}

function getCssLoaders(useCssModules = true) {
  const cssLoaders = [
    isDevelopment
      ? 'style-loader'
      : {
          loader: MiniCssExtractPlugin.loader,
        },
    {
      loader: 'css-loader',
      options: {
        modules: useCssModules
          ? {
              localIdentName: '[local]--[hash:base64:5]',
            }
          : false,
        sourceMap: isDevelopment,
      },
    },
    {
      loader: 'postcss-loader',
      options: {
        postcssOptions: {
          plugins: [
            [
              'postcss-preset-env',
              {
                autoprefixer: {
                  grid: false,
                },
              },
            ],
          ],
        },
      },
    },
  ]
  return cssLoaders
}

module.exports = { resolvePath, getCssLoaders }
