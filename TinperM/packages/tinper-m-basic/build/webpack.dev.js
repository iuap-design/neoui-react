const path = require('path');
const fs = require('fs');
const webpack = require('webpack');
const babelConfig = require('../babel.config');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const CopyPlugin = require('copy-webpack-plugin')
const gitversion = require('../script/gitversion');
const packageInfo = require('../package.json')

const banner = `FileName: [file]
Version: ${packageInfo.version}
Commitid: ${gitversion.commitId}
Modified Time: ${new Date()}
Copyright (c) yonyou, Inc. and its affiliates.`

const ENTRY_FILE =  path.join(process.cwd(), './src/index.tsx')
const DIST_PATH = path.join(process.cwd(), './lib/bundle')

const patterns = [
  { from: path.join(process.cwd(),'public/module.xml') },
  { from: path.join(process.cwd(), '../../coverage'), to: path.join(process.cwd(), './lib/bundle/coverage') },
  { from: path.join(process.cwd(), 'node_modules/@tinper/m-icons/lib/iconfont/iconfont.js'), to: path.join(process.cwd(), './lib/bundle/tinper-m-icons.js') },
]
// if (fs.existsSync('./GIT_CHANGELOG')) {
//   patterns.push({ from: path.join(process.cwd(), 'GIT_CHANGELOG'), to: path.join(process.cwd(), './lib/bundle/GIT_CHANGELOG') })
// }

module.exports = {
  mode: 'development',
  devtool: 'inline-source-map',
  entry: { 'tinper-m': ENTRY_FILE },
  output: {
    clean: false, // 不清除output目录
    path: DIST_PATH,
    environment: {
      arrowFunction: false
    },
    filename: '[name].dev.js',
    library: {
      name: 'TinperM',
      type: 'umd',
      umdNamedDefine: true,
    },
  },
  resolve: {
    extensions: ['.tsx', '.ts', '.js', '.jsx', '.json'],
    modules: [
      path.join(process.cwd(), './src'),
      path.join(process.cwd(), './node_modules/antd-mobile-fieldid'),
      path.join(process.cwd(), './node_modules')
    ],
  },
  module: {
    // 配置相应的规则
    rules: [
      {
        test: /\.(mjs|ts|js)x?$/,
        include: [
          /node_modules/,
          path.join(process.cwd(), './src')],
        use: {
          loader: 'babel-loader',
          options: babelConfig
        },
      }, {
        test: /\.(css|less)$/,
        use: [
          { loader: MiniCssExtractPlugin.loader },
          { loader: 'css-loader' },
          { loader: 'less-loader' }]
      }, {
        test: /\.(png|jpeg|jpg|gif)$/,
        exclude: /(node_modules)/,
        use: [{
          loader: 'url-loader',
          options: { limit: 8142, }
        }]
      }, {
        test: /\.(woff2?|eot|ttf|otf|svg|woff)/,
        include: [
          /node_modules\/antd-mobile-fieldid/,
          path.join(process.cwd(), './src')],
        use: [{
          loader: 'url-loader',
          options: { limit: 8142, }
        }]
      }
    ]
  },
  externals: {
    react: {
      root: 'React',
      var: 'React',
      commonjs: 'react',
      commonjs2: 'react',
      amd: 'react',
    },
    'react-dom': {
      root: 'ReactDOM',
      var: 'ReactDOM',
      commonjs: 'react-dom',
      commonjs2: 'react-dom',
      amd: 'react-dom',
    },
  },
  plugins: [
    new webpack.BannerPlugin({ banner: banner }),
    new CopyPlugin({
      patterns
    }),
    new MiniCssExtractPlugin({ filename: 'tinper-m.css' }),
    // new webpack.HotModuleReplacementPlugin(),
  ]
};
