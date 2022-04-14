const path = require('path')
const WebpackBar = require('webpackbar')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const ESLintPlugin = require('eslint-webpack-plugin')
const ForkTsCheckerWebpackPlugin = require('fork-ts-checker-webpack-plugin')
const CopyPlugin = require('copy-webpack-plugin')

const { PROJECT_PATH, BUILD_PATH } = require('./config')
const { isDevelopment } = require('./env')

const getCssLoaders = (useCssModules = true) => {
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

module.exports = {
  entry: {
    main: './src/main.tsx',
  },
  output: {
    path: path.resolve(PROJECT_PATH, BUILD_PATH),
  },
  module: {
    rules: [
      {
        test: /\.(tsx?|js)$/,
        exclude: /node_modules/,
        use: [
          {
            loader: 'babel-loader',
            options: {
              plugins: [isDevelopment && require.resolve('react-refresh/babel')].filter(Boolean),
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
          to: path.resolve(PROJECT_PATH, './build/public'),
          globOptions: {
            dot: true,
            gitignore: true,
            ignore: ['**/index.html'],
          },
        },
      ],
    }),
    new ESLintPlugin({
      extensions: ['tsx', 'ts', 'js'],
    }),
    new ForkTsCheckerWebpackPlugin({
      typescript: {
        configFile: path.resolve(PROJECT_PATH, './tsconfig.json'),
        diagnosticOptions: {
          semantic: true,
          syntactic: true,
        },
        mode: 'write-references',
      },
    }),
    new WebpackBar({
      color: '#52c41a',
    }),
  ],
  resolve: {
    extensions: ['.tsx', '.ts', '.js', '.json'],
  },
}
