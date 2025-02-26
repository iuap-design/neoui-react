const webpack = require('webpack');
const path = require('path');
const { merge } = require('webpack-merge')
const config = require('./webpack.prod')

module.exports = merge(config, {
  resolve: { fallback: { events: false } },
  devtool: 'eval-source-map',
  devServer: {
    hot: true,
    static: { directory: path.join(process.cwd(), 'lib/bundle'), },
    compress: true,
    port: 2233,
    https: true
  },
  optimization: {
    sideEffects: true,
    minimize: false
  },
  plugins: [
    new webpack.HotModuleReplacementPlugin(),
  ],
})
