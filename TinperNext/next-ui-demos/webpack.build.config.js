const {merge} = require('webpack-merge');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const baseConfig = require('./webpack.base.config.js');
const babelConfig = require('../next-ui-library/babel.config')
var path = require('path');
module.exports = merge(baseConfig, {
    mode: 'production',
    devtool: "source-map",
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
        'prop-types': {
            root: 'PropTypes',
            var: 'PropTypes',
            commonjs: 'prop-types',
            commonjs2: 'prop-types',
            amd: 'prop-types',
        },
        'axios': 'axios',
        '@tinper/next-ui': 'TinperNext',
    },
    // plugins: [
    // 	new CopyWebpackPlugin([{
    // 		from: '../packages/',
    // 		to: 'packages'
    // 	}]),
    // ]
});

