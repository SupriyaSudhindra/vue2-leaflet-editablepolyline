const {resolve} = require('path');
var webpackMerge = require('webpack-merge');
var ExtractTextPlugin = require('extract-text-webpack-plugin');
var HtmlWebpackPlugin = require('html-webpack-plugin');
var commonConfig = require('./webpack.config.common.js');
var webpack = require('webpack');
const {buildCfg } = require('./config.js');
const srcPath = resolve(__dirname+'/../', 'src');


module.exports = webpackMerge(commonConfig, {
  devtool: '#source-map',

  output: {
    path: resolve(__dirname, buildCfg.outputPath),
    filename: '[name].js',
    chunkFilename: '[id].js?[chunkhash]',
    publicPath: "/"
  },
  plugins: [
    new webpack.DefinePlugin({
      DEBUG: true,
      'process.env': {
        NODE_ENV: '"development"'
      }
    }),
    new ExtractTextPlugin('[name].css'),

    new HtmlWebpackPlugin({
        template: resolve(srcPath, `index.html`),
        inject: true,
        chunks: ['vendor', 'main'],
        filename: resolve(__dirname, buildCfg.outputPath, `index.html`)
    })
  ],
  devServer: {
    port: 8080,
    inline: false,
    stats: 'minimal',
    proxy:  {},
    historyApiFallback: true
  }
});
