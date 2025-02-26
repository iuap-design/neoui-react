const path = require('path');
const {merge} = require('webpack-merge');
const config = require('./webpack.dev');
const webpack = require('webpack');
const {TNSClientPlugin} = require('@tinper/next-plugin');
delete config.externals;
module.exports = merge(config, {
	entry: {
		'tinper-next': '../packages/index-tns.js',
	},
	output: {
		clean: true,//输出前先清理目录
		path: path.join(process.cwd(), './dist/tns'),
	},
	plugins: [
		new TNSClientPlugin({})
	]
})
