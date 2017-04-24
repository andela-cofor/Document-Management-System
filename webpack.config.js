const webpack = require('webpack');
const path = require('path');
const ExtractTextPlugin = require('extract-text-webpack-plugin');

const GLOBALS = {
  'process.env.NODE_ENV': JSON.stringify('production')
};

module.exports = {
  entry: [
    './client/src/index'
  ],
  module: {
    loaders: [
      {
        test: /\.js?$/,
        loader: 'babel',
        exclude: /node_modules/,
        query: {
          presets: ['react']
        }
      }
    ]
  },
  resolve: {
    extensions: ['', '.css', '.js']
  },
  output: {
    path: path.join(__dirname, 'client/dist/'),
    publicPath: './app/',
    filename: 'bundle.js'
  },
  devServer: {
    contentBase: './client/dist',
    hot: true
  },
  node: {
    net: 'empty',
    dns: 'empty'
  },
  plugins: [
    new webpack.optimize.OccurenceOrderPlugin(),
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NoErrorsPlugin(),
    new webpack.DefinePlugin(GLOBALS),
    new ExtractTextPlugin('css/bundle.css', {
      allChunks: true
    }),
  ]
};
