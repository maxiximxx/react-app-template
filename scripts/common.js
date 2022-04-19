const WebpackBar = require('webpackbar')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const ESLintPlugin = require('eslint-webpack-plugin')
const ForkTsCheckerWebpackPlugin = require('fork-ts-checker-webpack-plugin')

const { isDevelopment } = require('./env')
const { resolvePath, getCssLoaders } = require('./utils')

module.exports = {
  entry: {
    main: './src/main.tsx',
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
      template: resolvePath('public/index.html'),
    }),
    new ESLintPlugin({
      extensions: ['tsx', 'ts', 'js'],
    }),
    new ForkTsCheckerWebpackPlugin({
      typescript: {
        configFile: resolvePath('tsconfig.json'),
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
    alias: {
      "@": resolvePath('src')
    }
  },
}
