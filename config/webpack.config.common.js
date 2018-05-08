const {resolve} = require('path');
var webpack = require('webpack');
var HtmlWebpackPlugin = require('html-webpack-plugin');
var ExtractTextPlugin = require('extract-text-webpack-plugin');
const srcPath = resolve(__dirname+'/../', 'src');
const sPath = resolve(__dirname+'/../', 'src/pages/vue2editablepolyline');

module.exports = {

  entry: {
    vendor: ['vue','vue-router'],
    main:resolve(srcPath, `index.js`),
    vue2editablepolyline: resolve(sPath, 'vue2editablepolyline.vue')
  },

  resolve: {
    alias: {
      vue: 'vue/dist/vue.esm.js',
      '~':          resolve(srcPath),
      'assets':     resolve(srcPath, 'assets'),
      'pages':     resolve(srcPath, 'pages'),
      'utils':      resolve(srcPath, 'utils'),
      'constants':  resolve(srcPath, 'constants'),
    }
  },

  module: {
    rules: [{
        test: /\.vue$/,
        use: [{
            loader: 'vue-loader',
            options: {
                loaders: {
                    'scss': 'vue-style-loader!css-loader!sass-loader',
                    'sass': 'vue-style-loader!css-loader!sass-loader?indentedSyntax'
                }
            }
        }],
    },  {
        test: /\.html$/,
        use: [{
            loader: 'html-loader',
            options: {
                root: resolve(__dirname, 'src'),
                attrs: ['img:src', 'link:href']
            }
        }]
    },{
          test: require.resolve(resolve(srcPath, 'utils')),
          use: [{
              loader: 'expose-loader',
              options: 'Utils'
          }]
      },{
          test: require.resolve(resolve(srcPath, 'constants')),
          use: [{
              loader: 'expose-loader',
              options: 'Constants'
          }]
      },{
        test: /\.js$/,
        use: {
          loader:'babel-loader'
        },
        exclude: /node_modules/
    }, {
        test: /\.css$/,
        use: ExtractTextPlugin.extract({
          fallback: "style-loader",
          use: ["css-loader" , {
            loader: 'postcss-loader',
            options: {
              plugins: function () {
                return [
                  require('autoprefixer')
                ];
              }
            }
          }]
        })
    }, {
        test: /favicon\.png$/,
        use: [{
            loader: 'file-loader',
            options: {
                name: '[name].[ext]?[hash]'
            }
        }]
    }, {
        test: /\.(png|jpg|jpeg|gif|eot|ttf|woff|woff2|svg|svgz)(\?.+)?$/,
        exclude: /favicon\.png$/,
        use: [{
            loader: 'url-loader',
            options: {
                limit: 10000
            }
        }]
    }, {
        test: /\.sass$|\.scss/,
        include: resolve(__dirname, 'src/pages'),
        use: ExtractTextPlugin.extract({
          fallback: "style-loader",
          use: ['style-loader',
          'css-loader?modules&localIdentName=[name]_[local]_[hash:base64:5]' +
          '!postcss-loader' +
          '!sass-loader?sourceMap=true']
        })
    }]
  },

  plugins: [
    new webpack.optimize.CommonsChunkPlugin({
      name: 'vendor',
      minChunks: Infinity,
    })
  ]
};
