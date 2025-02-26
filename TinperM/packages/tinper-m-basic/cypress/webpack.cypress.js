const path = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
let babelConfig = require('../babel.config');
babelConfig.plugins = [
  '@babel/plugin-proposal-function-bind',
  '@babel/plugin-proposal-export-default-from',
  '@babel/plugin-proposal-logical-assignment-operators',
  ['@babel/plugin-proposal-optional-chaining', { loose: false }],
  ['@babel/plugin-proposal-pipeline-operator', { proposal: 'minimal' }],
  ['@babel/plugin-proposal-nullish-coalescing-operator', { loose: false }],
  '@babel/plugin-proposal-do-expressions',
  ['@babel/plugin-proposal-decorators', { legacy: true }],
  '@babel/plugin-proposal-function-sent',
  '@babel/plugin-proposal-export-namespace-from',
  '@babel/plugin-proposal-numeric-separator',
  '@babel/plugin-proposal-throw-expressions',
  '@babel/plugin-syntax-dynamic-import',
  '@babel/plugin-syntax-import-meta',
  '@babel/plugin-proposal-class-properties',
  '@babel/plugin-proposal-json-strings',
  ['module-resolver',
    {
      alias: {
        '@': '../src',
        '@assets': '../src/assets',
        '@utils': '../src/utils',
        '@common': '../src/common',
        '@tests': '../src/tests',
        '@components': '../src/components',
        '@hooks': '../src/hooks',
        '@tinper/m$': '../src'
      }, 
    }],
  '@babel/plugin-transform-runtime',
  '@babel/plugin-proposal-object-rest-spread',
  '@babel/plugin-transform-object-super',
  '@babel/plugin-transform-classes',
  ['import',
    {
      libraryName: 'antd-mobile-fieldid',
      libraryDirectory: 'lib/es/components'
    }
  ],
  [
    'import',
    {
      libraryName: 'lodash',
      libraryDirectory: '',
      camel2DashComponentName: false
    },
    'lodash'
  ],
  [
    'import',
    {
      libraryName: '@tinper/m-icons',
      libraryDirectory: 'lib/cjs',
      camel2DashComponentName: false
    },
    '@tinper/m-icons'
  ]
]
babelConfig.plugins = babelConfig.plugins.filter(_ => _ !== 'babel-plugin-transform-globalthis');

module.exports = {
  mode: 'development',
  entry: [path.join(__dirname, 'index.tsx')],
  output: { path: path.resolve(__dirname, 'dist'), },
  devtool: false,
  module: {
    rules: [
      {
        test: /\.(sass|scss|css|less)$/,
        use: [{ loader: 'style-loader' }, { loader: 'css-loader' // 将 CSS 转化成 CommonJS 模块
        }, { loader: 'postcss-loader', // style-loader不能与MiniCssExtractPlugin一同使用需要换成postcss-loader
        }, { loader: 'sass-loader' // 将 Sass 编译成 CSS
        }, { loader: 'less-loader' // 将 Less 编译成 CSS
        }]
      },
      {
        test: /\.(png|jpeg|jpg|gif)$/,
        exclude: /(node_modules)/,
        use: [{
          loader: 'url-loader',
          options: { limit: 8142, }
        }]
      }, {
        test: /\.(woff2?|eot|ttf|otf|svg|woff)/,
        exclude: /(node_modules)/,
        use: [{
          loader: 'url-loader',
          options: { limit: 8142, }
        }]
      },
      {
        test: /\.(ts|js)x?$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          options: babelConfig
        },
      },
    ],
  },
  plugins: [
    new HtmlWebpackPlugin({ template: path.join(__dirname, 'public', 'index.html'), }),
    new webpack.ProvidePlugin({ React: 'react', }),
    new webpack.DefinePlugin({ 'process.env.GIT_VERSION': JSON.stringify(process.env.GIT_VERSION), }),

  ],
  mode: 'development',
  resolve: {
    alias: { '@tinper/m': path.resolve(__dirname, '../src/components/index.tsx') },
    extensions: [
      '.ts', '.tsx', '.jsx', '.js', '.json'
    ],
    modules: [path.resolve(__dirname, '../src/components'), path.resolve(__dirname, '../node_modules')],

  },
  // 开发服务器 devServer：用来自动化（自动编译，自动打开浏览器，自动刷新浏览器）
  devServer: {
    // 项目构建后的路径，也就是代码要运行的项目目录
    static: '../',
    //compress是否启动gzip压缩，让代码体积更小，速度更快
    compress: true,
    // 指定开发服务器的端口号
    port: 'auto',
    // open是否自动打开浏览器，打开的是默认浏览器。
    // open: true,
    hot: true,
  }
};
