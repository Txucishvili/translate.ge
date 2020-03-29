const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const WebpackMd5Hash = require("webpack-md5-hash");
const CleanWebpackPlugin = require('clean-webpack-plugin');
const webpack = require('webpack');
const CopyPlugin = require('copy-webpack-plugin');

module.exports = (env, argv) => {
  const isDevelopment = argv.mode === 'development';
  console.log('[mode]', argv.mode);

  const jsFiles = ['./src/index.js', "./src/js/index.js", "./src/js/main.js"];
  const sassFiles = ["./src/sass/style.scss"];

  return ({
    entry: [].concat(jsFiles, sassFiles),
    output: {
      path: path.join(__dirname, "/dist"),
      filename: "index.js",
      sourceMapFilename: '[file].map',
    },
    mode: argv.mode,
    devtool: isDevelopment
      ? 'source-map'
      : '',
    devServer: {
      stats: {
        children: false,
        maxModules: 0
      },
      port: 3001,
    },
    module: {
      rules: [
        {
          test: /\.(css|s[ac]ss)$/,
          use: [
            {
              loader: MiniCssExtractPlugin.loader
            },
            {
              loader: 'css-loader',
              options: {
                importLoaders: 2,
                sourceMap: true
              }
            },
            {
              loader: 'postcss-loader',
              options: {
                plugins: () => [
                  require('autoprefixer')
                ],
                sourceMap: true
              }
            },
            {
              loader: 'sass-loader',
              options: {
                sourceMap: true
              }
            },
          ]
        },
        {
          test: /\.(jpg|png)$/,
          loader: 'file-loader',
          options: {
            hash: false,
            chunk: false
          }
        },
        {
          test: /\.(woff(2)?|ttf|eot|svg)(\?v=\d+\.\d+\.\d+)?$/,
          use: [
            {
              loader: 'file-loader',
              options: {
                name: '[name].[ext]',
                outputPath: (url, resourcePath, context) => {
                  // `resourcePath` is original absolute path to asset
                  // `context` is directory where stored asset (`rootContext`) or `context` option

                  // To get relative path you can use
                  // const relativePath = path.relative(context, resourcePath);

                  console.log('url', url);
                  console.log('context', context);
                  console.log('resourcePath', resourcePath);

                  if (/my-custom-image\.png/.test(resourcePath)) {
                    return `other_output_path/${url}`;
                  }

                  if (/images/.test(context)) {
                    return `image_output_path/${url}`;
                  }

                  return path.relative(`${context}/src`, resourcePath);
                },
                esModule: false
              }
            }
          ]
        }
      ]
    },
    plugins: [
      new CleanWebpackPlugin('dist', {}),
      new MiniCssExtractPlugin({
        filename: 'style.css',
        chunkFilename: "[id].css"
      }),
      new HtmlWebpackPlugin({
        template: './src/index.html',
        filename: 'index.html',
      }),
      new HtmlWebpackPlugin({
        template: './src/online-translate.html',
        filename: 'online-translate.html',
      }),
      new HtmlWebpackPlugin({
        template: './src/order.html',
        filename: 'order.html',
      }),
      new HtmlWebpackPlugin({
        template: './src/404.html',
        filename: '404.html',
      }), // TODO: FIX
      new CopyPlugin([
        { from: './src/images', to: './images' },
        { from: './src/assets', to: './assets' }
      ])
    ]
  })
};
