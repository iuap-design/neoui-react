const path = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
let babelConfig = require("../babel.config");
babelConfig.plugins = babelConfig.plugins.filter(_ => _ !== 'babel-plugin-transform-globalthis');
module.exports = {
  mode: 'development',
  entry: [path.join(__dirname, 'index.tsx')],
  output: {
    path: path.resolve(__dirname, 'dist'),
  },
  devtool: false,
  module: {
    rules: [
      {
        test: /\.(sass|scss|css)$/,
        use: [{
            loader: "style-loader"
        }, {
            loader: "css-loader" // 将 CSS 转化成 CommonJS 模块
        }, {
            loader: "postcss-loader", // style-loader不能与MiniCssExtractPlugin一同使用需要换成postcss-loader
        }, {
            loader: "sass-loader" // 将 Sass 编译成 CSS
        }]
    },
    {
      test: /\.(png|jpeg|jpg|gif)$/,
      exclude: /(node_modules)/,
      use: [{
          loader: "url-loader",
          options: {
              limit: 8142,
          }
      }]
    }, {
        test: /\.(woff2?|eot|ttf|otf|svg|woff)/,
        exclude: /(node_modules)/,
        use: [{
            loader: "url-loader",
            options: {
                limit: 8142,
            }
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
    new HtmlWebpackPlugin({
      template: path.join(__dirname, 'public', 'index.html'),
    }),
    new webpack.ProvidePlugin({
      React: 'react',
    }),
    new webpack.DefinePlugin({
      'process.env.GIT_VERSION': JSON.stringify(process.env.GIT_VERSION),
    })

  ],
  mode: 'development',
  resolve: {
    alias: {
      '@tinper/styles': path.resolve(__dirname, '../../packages/styles.js'),
      '@tinper/next-ui': path.resolve(__dirname, '../../packages/index.tsx'),

    },
    extensions: [
        ".ts", ".tsx", ".jsx", ".js", ".json"
    ],
    modules: [path.resolve(__dirname, '../../packages'), path.resolve(__dirname, '../node_modules')],

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
