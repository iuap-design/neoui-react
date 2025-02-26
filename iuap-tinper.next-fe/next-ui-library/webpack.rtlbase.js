const path = require("path");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const webpack = require("webpack");
const CopyWebpackPlugin = require("copy-webpack-plugin");
const WebpackBar = require("webpackbar");
// const ModifyCssJson = require('./plugins/modifyCssJson');
const babelConfig = require("./babel.config");
const gitversion = require("./gitversion");
const pkg = require("./package.json");
const postcssRTLCSS = require("postcss-rtlcss");
const isEs = process.env.module === "es";
if (isEs) {
    babelConfig.presets.shift();
}

// // 清空css变量文件
// const variableFilePath = path.resolve(__dirname, 'css.json')
// fs.writeFileSync(variableFilePath, '', { flag: 'w+' }, err => {
//     throw err
// })

const banner = `FileName: [file]
Version: ${pkg.version}
Commitid: ${gitversion.commitId}
Modified Time: ${new Date()}
Copyright (c) yonyou, Inc. and its affiliates.
`;

module.exports = {
    mode: "development",
    // devtool:'cheap-module-source-map',
    // devtool: 'hidden-cheap-module-source-map', // 单独打包出map源码文件
    devtool: "inline-source-map", // 单独打包出map源码文件
    // devtool:'eval-cheap-module-source-map',
    entry: {
        "tinper-next": "../packages/index.tsx",
        "tinper-style": "../packages/styles.js"
    },
    output: {
        clean: false, // 不清除output目录
        path: path.join(process.cwd(), './dist'),
        filename: isEs ? 'es/[name].min.js' : '[name].min.js',
        library: {// libraryTarget: 'umd' 用法过期使用libary.type代替
            name: 'TinperNext',
            type: 'umd',
            // type:'window',
            // type:'global',
            // type:'umd2',
            umdNamedDefine: true,
        }
    },
    resolve: {
        // 要解析的文件的扩展名
        extensions: [".tsx", ".ts", ".js", ".jsx", ".json"],
        modules: [path.resolve(__dirname, "../packages"), path.resolve(__dirname, "./node_modules")]
    },
    resolveLoader: {
        // 本地loader别名
        alias: {
            "css-variable-loader": path.resolve(__dirname, "./loaders/css-variable.js")
        }
    },
    module: {
        // 配置相应的规则
        rules: [
            {
                test: /\.(ts|js)x?$/,
                include: [
                    /node_modules\/rc-select/,
                    /node_modules\/viewerjs/,
                    /node_modules\/react-draggable/,
                    path.resolve(__dirname, "../packages")
                ],
                use: {
                    loader: "babel-loader",
                    options: babelConfig
                }
            },
            {
                test: /\.(sass|scss|css)$/,
                use: [
                    {
                        loader: MiniCssExtractPlugin.loader
                    },

                    {
                        loader: "css-loader" // 将 CSS 转化成 CommonJS 模块
                    },
                    {
                        loader: "postcss-loader", // style-loader不能与MiniCssExtractPlugin一同使用需要换成postcss-loader
                        options: {
                          
                            postcssOptions: {
                                plugins: [
                                    postcssRTLCSS({
                                        mode: 'override',
                                        processUrls:true, 
                                        ignorePrefixedRules:true,
                                        processKeyFrames:true
                                    }),
                                    require.resolve('./rtl-css-plugin.js'),
    
                                ]
                            }
                        }
                        // }, {
                        //     // 自定义loader，用于生成css变量文档
                        //     loader: 'css-variable-loader',
                        //     options: {
                        //         variableFilePath
                        //     }
                    },
                    {
                        loader: "sass-loader" // 将 Sass 编译成 CSS
                    }
                ]
            },
            {
                test: /\.(png|jpeg|jpg|gif)$/,
                exclude: /(node_modules)/,
                use: [
                    {
                        loader: "url-loader",
                        options: {
                            limit: 8142
                        }
                    }
                ]
            },
            {
                test: /\.(woff2?|eot|ttf|otf|svg|woff)/,
                exclude: /(node_modules)/,
                use: [
                    {
                        loader: "url-loader",
                        options: {
                            limit: 8142
                        }
                    }
                ]
            }
        ]
    },
    externals: {
        react: {
            root: "React",
            var: "React",
            commonjs: "react",
            commonjs2: "react",
            amd: "react"
        },
        "react-dom": {
            root: "ReactDOM",
            var: "ReactDOM",
            commonjs: "react-dom",
            commonjs2: "react-dom",
            amd: "react-dom"
        }
    },
    plugins: [
       
        new MiniCssExtractPlugin({filename: "tinper-next.rtl.css"}),



    ]
};
