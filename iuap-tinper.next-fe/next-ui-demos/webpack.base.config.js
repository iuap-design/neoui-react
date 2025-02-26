const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const {CleanWebpackPlugin} = require('clean-webpack-plugin')
const webpack = require('webpack')
const WebpackBar = require('webpackbar')
const postcssRTLCSS = require('postcss-rtlcss')
const babelConfig = require('../next-ui-library/babel.config')
const plugins = [
    new WebpackBar(),
    new webpack.DefinePlugin({
        'process.env.GIT_VERSION': JSON.stringify('develop'),
        'GROBAL_CONTEXT': process.env.PIPPELINE === 'pro' ? JSON.stringify('') : JSON.stringify('/iuap-yondesign/ucf-wh'),
    }),
    new HtmlWebpackPlugin({
        template: './entry/index.html',
        filename: './index.html',
        env: process.env.NODE_ENV
    }),
    // 只加载`moment`的三个语言包，大幅缩减大小
    new webpack.ContextReplacementPlugin(/moment[/\\]locale$/, /en-au|en-gb|zh-cn|zh-tw/),
    new webpack.HotModuleReplacementPlugin(),
    new CleanWebpackPlugin()
]

module.exports = {
    entry: {
        main: './entry/index.js'
    },
    output: {
        path: path.join(process.cwd(), './build'),
        filename: 'bundle.js'
    },
    resolve: {
        // 要解析的文件的扩展名
        extensions: ['.ts', '.tsx', '.js', '.jsx', '.json'],
        // 解析目录时要使用的文件名
        mainFiles: ['index'],
        modules: [path.resolve(__dirname, './node_modules')],
        alias: {
            '@tinper/next-ui/lib': path.resolve(__dirname, '../packages/'),
            '@tinper/next-ui': path.resolve(__dirname, '../packages/index.tsx'),
            '@tinper/styles': path.resolve(__dirname, '../packages/styles.js')
        }
    },
    // resolveLoader: {
    // 	// 本地loader别名
    // 	alias: {
    // 		"css-variable-loader": path.resolve(__dirname, "./loaders/css-variable.js"),
    // 	}
    // },
    module: {
        // 配置相应的规则
        rules: [
            {
                test: /\.(css|scss)$/,
                use: [
                    'style-loader',
                    'css-loader',
                    {
                        loader: "postcss-loader", // style-loader不能与MiniCssExtractPlugin一同使用需要换成postcss-loader
                        options: {
                            postcssOptions: {
                                plugins: [
                                    postcssRTLCSS({
                                        mode: 'override',
                                        processUrls:true, 
                                        ignorePrefixedRules:true,
                                        processKeyFrames: true
    
                                    })
                                ]
                            }
                        }
                    },
                    {
                        loader: 'sass-loader',
                        options: {
                            sassOptions: {
                                fiber: false
                            }
                        }
                    }
                ]
            },
            {
                test: /\.m?(ts|js)x?$/,
                use: {
                    loader: 'babel-loader',
                    options: babelConfig
                },
                include: [
                    path.resolve(__dirname,'./node_modules/@react-dnd'),
                    path.resolve(__dirname,'./entry'),
                    path.resolve(__dirname,'./dist'),
                    path.resolve(__dirname,'../packages')
                ],
                // exclude: /node_modules/
            },
            {
                test: /\.less$/,
                use: ['style-loader', {loader: 'css-loader', options: {importLoaders: 1}}, 'less-loader']
            },
            {
                test: /\.(png|jpeg|jpg|gif)$/,
                exclude: /(node_modules)/,
                use: [
                    {
                        loader: 'url-loader',
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
                        loader: 'url-loader',
                        options: {
                            limit: 8142
                        }
                    }
                ]
            }
        ]
    },
    optimization: {
        // splitChunks: {
        // 	chunks: 'all',
        // 	minSize: 100,
        // 	minRemainingSize: 0,
        // 	minChunks: 1,
        // 	maxAsyncRequests: 30,
        // 	maxInitialRequests: 30,
        // 	enforceSizeThreshold: 50000,
        // 		// name: (entrypoint) => `runtimechunk~${entrypoint.name}`,
        // 	cacheGroups: {
        // 		defaultVendors: {
        // 			test: /[\\/]node_modules[\\/]/,
        // 			priority: -10,
        // 			reuseExistingChunk: true,
        // 			filename: 'vender.js'
        // 		},
        // 		default: {
        // 			minChunks: 1,
        // 			priority: -20,
        // 			reuseExistingChunk: true,
        // 		},
        // 	},
        // }
    },
    plugins
}
