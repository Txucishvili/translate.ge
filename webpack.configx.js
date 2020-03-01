const path = require('path');

const nodeExternals = require("webpack-node-externals");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const WebpackMd5Hash = require("webpack-md5-hash");
const CleanWebpackPlugin = require('clean-webpack-plugin');
const webpack = require('webpack');

module.exports = (env, argv) => {
  const isDevelopment = argv.mode === 'development';

  return {
    entry: ["./src/js/index.js", "./src/sass/style.scss"],
    output: {
      path: path.resolve(__dirname, '/dist'),
      filename: '[name].js',
    },
    mode: argv.mode,
    devServer: {
      stats: {
        children: false,
        maxModules: 0
      },
      port: 3001,
    },
    target: "node",
    module: {
      rules: [
        {
          test: /\.jsx?$/,
          loader: 'babel-loader',
          exclude: /node_modules/
        },
        {
          test: /\.js$/,
          loader: 'babel-loader',
          exclude: /node_modules/
        },
        {
          test: /\.scss$/,
          use: [
            {
              loader: MiniCssExtractPlugin.loader,
              options: {
                hmr: process.env.NODE_ENV === 'development',
                options: {includePaths: [path.resolve(__dirname, "src/sass/*.scss"),]}
              },
            },
            'css-loader',
            'sass-loader',
          ]
        },
        {
          test: /\.(jpe?g|png|gif|svg|ico)$/i,
          use: [{
            loader: 'file-loader',
            options: {
              name: '[name].[ext]',
              outputPath: 'images/'
            }
          }]
        },
        {
          test: /\.(html)$/,
          use: {
            loader: 'html-loader',
            options: {
              attrs: ['img:src', 'link:href']
            }
          }
        }
      ]
    },
    plugins: [
      new CleanWebpackPlugin('dist', {}),
      new webpack.HotModuleReplacementPlugin(),
      new MiniCssExtractPlugin({
        filename: 'style.css',
        chunkFilename: "[id].css"
      }),
      new HtmlWebpackPlugin({
        template: './src/index.html',
        filename: 'index.html'
      }),
      new WebpackMd5Hash()
    ]
  }
};
