const { merge } = require('webpack-merge')
const config = require('./webpack.dev')
const TerserPlugin = require('terser-webpack-plugin')
const CssMinimizerPlugin = require('css-minimizer-webpack-plugin')

module.exports = merge(config, {
  mode: 'production',
  // devtool:'nosources-source-map',//没有源码内容，调试只能看到模块信息和行信息，不能看到源码，但报错有源码堆栈
  devtool: 'source-map', // 开启源码调试
  optimization: {
    sideEffects: true,
    minimize: true,
    minimizer: [
      new TerserPlugin({
        // 压缩js
        extractComments: false,
        terserOptions: {
          compress: {
            drop_console: true, // 清除console
            drop_debugger: true, // 清除debugger
            pure_funcs: ['console.log', 'console.info', 'console.debug', 'console.warn', 'debugger']
          }
        }
      })
    ]
  },
  output: { filename: '[name].min.js' },
  plugins: [
    new CssMinimizerPlugin({ parallel: true // 开启多线程
    })
  ]
})

