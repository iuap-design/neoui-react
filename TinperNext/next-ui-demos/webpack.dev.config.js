const {merge} = require('webpack-merge');
const baseConfig = require('./webpack.base.config.js');
// let component = null
// if(process.env.component) {
// 	component = process.env.component.split(',')
// }
// let entry = {}
// if(component) {
// 	Object.keys(baseConfig.entry).map(item=> {
// 		if(component.indexOf(item) > -1) {
// 			entry[item] = baseConfig.entry[item]
// 		}
// 	})
// } else {
// 	entry = baseConfig.entry
// }
// baseConfig.entry = entry;

var webpackConfig = merge(baseConfig, {
    // 设置为开发模式
    mode: 'development',
    devtool: "eval-source-map",
    // 配置服务端目录和端口
    devServer: {
        static: '../',
        hot: true,
        open: true,
        port: 3003,
        proxy: {
            '/iuap-yondesign/ucf-wh/demos': {
                target: 'http://localhost:3003/',
                pathRewrite: {'^/iuap-yondesign/ucf-wh/demos': ''},
            },
        },
    }
});
// console.log('webpackConfig--->',webpackConfig);
module.exports = webpackConfig;

