const {resolve} = require('path');
var webpack = require('webpack');
var webpackMerge = require('webpack-merge');
var ExtractTextPlugin = require('extract-text-webpack-plugin');
var HtmlWebpackPlugin = require('html-webpack-plugin');
var commonConfig = require('./webpack.config.common.js');
const { buildCfg} = require('./config.js');
const srcPath = resolve(__dirname+'/../', 'src');


module.exports = webpackMerge(commonConfig, {
  devtool: '#source-map',

  output: {
    path: resolve(__dirname+'/../', buildCfg.outputPath),
    filename:  '[name].js?[chunkhash]',
    chunkFilename: '[id].js?[chunkhash]',
    publicPath:  `${buildCfg.staticPath}`
  },

  plugins: [
    new webpack.NoEmitOnErrorsPlugin(),
    new webpack.optimize.UglifyJsPlugin({
      sourceMap:true,
      compress: {
        warnings: false
      }
    }),
    new ExtractTextPlugin('[name].[hash].css'),
    new webpack.DefinePlugin({
      DEBUG: false,
      'process.env': {
        NODE_ENV: '"production"'
      }
    }),
    new HtmlWebpackPlugin({
        template: resolve(srcPath, `index.html`),
        inject: true,
        chunks: ['vendor', 'main', 'vue2editablepolyline'],
        filename: resolve(__dirname+'/../', buildCfg.outputPath, `index.html`)
    })
  ]
});
