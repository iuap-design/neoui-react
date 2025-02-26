const {merge} = require('webpack-merge')
const config = require('./webpack.dev')
const path = require('path');
const webpack = require('webpack')
const TerserPlugin = require('terser-webpack-plugin')
const CssMinimizerPlugin = require('css-minimizer-webpack-plugin')
const { WriteManifestPlugin } = require('ynf-dx-webpack-plugins')


// const gitversion = require('./gitversion')
// const pkg = require('./package.json');
// const isEs = process.env.module === 'es';

// const banner = `FileName: [file]
// Version: ${pkg.version}
// Commitid: ${gitversion.commitId}
// Modified Time: ${new Date()}
// Copyright (c) yonyou, Inc. and its affiliates.
// `

module.exports = merge(config, {
    mode: 'production',
    // devtool:'nosources-source-map',//没有源码内容，调试只能看到模块信息和行信息，不能看到源码，但报错有源码堆栈
    devtool: 'source-map', // 开启源码调试
    optimization: {
        minimize: true,
        minimizer: [
            new TerserPlugin({
                // 压缩js
                terserOptions: {
                    compress: {
                        "drop_console": true, // 清除console
                        "drop_debugger": true // 清除debugger
                    }
                },
                extractComments: false // 不生成LICENSE.txt
            })
        ]
    },
    // output: {
    //     // filename: isEs ? 'es/[name].min.js' : '[name].min.js',
    //     // filename: '[name].min.js',
    //     // filename: (pathData) => {
    //     //     if (Object.keys(localeEntrie).some(name => pathData.chunk.name === name)) {
    //     //         return `${pathData.chunk.name}.js`
    //     //     }
    //     //     return isEs ? 'es/[name].min.js' : '[name].min.js';
    //     // },
    // },
    plugins: [
        new CssMinimizerPlugin({
            parallel: true // 开启多线程
        }),

        new WriteManifestPlugin({
            srcPath: path.join(__dirname, '../packages'),
            distPath: path.join(__dirname, './dist'),
            childrenDir: ''
        })
        // new webpack.BannerPlugin({
        //     // banner: JSON.stringify(gitversion.gitInfo),
        //     // include: /\.css$/
        //     banner: banner
        // })
    ]
})
