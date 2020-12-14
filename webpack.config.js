const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const DotenvWebpackPlugin = require('dotenv-webpack');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const CopyPlugin = require('copy-webpack-plugin');
const { BundleAnalyzerPlugin } = require('webpack-bundle-analyzer');
const webpack = require('webpack');
require('dotenv').config();

module.exports = (env) => {
  console.log(`API_URL: ${env.API_URL || process.env.API_URL}`);

  return {
    entry: [
      '/node_modules/regenerator-runtime/runtime.js',
      './src/index.tsx'
    ],
    mode: 'development',
    module: {
      rules: [
        {
          test: /\.js$/,
          exclude: /node_modules/,
          use: {
            loader: 'babel-loader',
            options: {
              presets: ['@babel/env']
            }
          }
        }, {
          test: /\.(ts|tsx)$/,
          exclude: /node_modules/,
          use: [{
            loader: 'babel-loader',
            options: {
              presets: ['@babel/env']
            }
          }, {
            loader: 'ts-loader',
            options: {
              transpileOnly: true,
            }
          }]
        }, {
          test: /\.less$/,
          use: [
            MiniCssExtractPlugin.loader,
            '@teamsupercell/typings-for-css-modules-loader',
            {
              loader: 'css-loader',
              options: {
                sourceMap: true,
                modules: true
              }
            },
            'less-loader'
          ],
          include: /\.module\.less$/
        }, {
          test: /\.less$/,
          use: [
            MiniCssExtractPlugin.loader,
            '@teamsupercell/typings-for-css-modules-loader',
            'css-loader',
            'less-loader'
          ],
          exclude: /\.module\.less$/
        }
      ]
    },
    resolve: { extensions: ['.js', '.ts', '.tsx'] },
    devServer: {
      contentBase: path.join(__dirname, 'public/'),
      port: 3000,
      stats: 'minimal',
      historyApiFallback: true
    },
    output: {
      publicPath: '/',
      filename: 'bundle.js'
    },
    plugins: [
      new DotenvWebpackPlugin(),
      new webpack.DefinePlugin({
        API_URL: JSON.stringify(env.API_URL || process.env.API_URL)
      }),
      new HtmlWebpackPlugin({
        template: 'src/templates/index.ejs'
      }),
      new MiniCssExtractPlugin(),
      new CopyPlugin({
        patterns: [
          { from: 'public', to: '.' }
        ]
      }),
      new BundleAnalyzerPlugin({
        analyzerMode: 'static',
        openAnalyzer: false
      })
    ]
  };
};
