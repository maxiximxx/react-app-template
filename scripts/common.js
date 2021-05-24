const path = require('path')
const WebpackBar = require('webpackbar')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const ESLintPlugin = require('eslint-webpack-plugin')
const CopyPlugin = require('copy-webpack-plugin')

const { PROJECT_PATH } = require('./config')
const { isDevelopment } = require('./env')

const getCssLoaders = () => {
  const cssLoaders = [
    isDevelopment
      ? 'style-loader'
      : {
          loader: MiniCssExtractPlugin.loader,
          options: {
            publicPath: '../',
          },
        },
    {
      loader: 'css-loader',
      options: {
        modules: {
          localIdentName: '[local]--[hash:base64:5]',
        },
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
                  grid: true,
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

module.exports = {
  entry: {
    main: './src/main.js',
  },
  output: {
    path: path.resolve(PROJECT_PATH, './app'),
  },
  module: {
    rules: [
      {
        test: /\.jsx?$/,
        exclude: /node_modules/,
        use: [
          {
            loader: 'babel-loader',
            options: {
              cacheDirectory: true,
            },
          },
        ],
      },
      {
        test: /\.css$/,
        use: [...getCssLoaders()],
      },
      {
        test: /\.styl$/,
        use: [...getCssLoaders(), 'stylus-loader'],
      },
      {
        test: /\.(png|svg|jpg|jpeg|gif)$/i,
        type: 'asset',
        generator: {
          filename: 'images/[name].[contenthash:8][ext][query]',
        },
      },
    ],
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: path.resolve(PROJECT_PATH, './public/index.html'),
    }),
    new CopyPlugin({
      patterns: [
        {
          from: path.resolve(PROJECT_PATH, './public'),
          to: path.resolve(PROJECT_PATH, './app/public'),
          globOptions: {
            dot: true,
            gitignore: true,
            ignore: ['**/index.html'],
          },
        },
      ],
    }),
    new ESLintPlugin({
      extensions: ['js', 'jsx'],
    }),
    new WebpackBar({
      color: '#52c41a',
    }),
  ],
  resolve: {
    extensions: ['.js', '.jsx', '.tsx', '.ts', '.json'],
    alias: { 'react-dom': '@hot-loader/react-dom' },
  },
}
