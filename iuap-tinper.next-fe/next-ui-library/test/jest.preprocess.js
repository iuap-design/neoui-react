const transformer = require('babel-jest');
const babelOptions = {
	presets: [
		['@babel/preset-env', {
			"useBuiltIns": "usage",
			"modules": false
		}],
		'@babel/preset-flow',
		'@babel/preset-react',
		'@babel/preset-typescript'
	],
	babelrc: false,
	configFile: false,
	plugins: [
		"@babel/plugin-proposal-function-bind",
		// Stage 1
		"@babel/plugin-proposal-export-default-from",
		"@babel/plugin-proposal-logical-assignment-operators",
		["@babel/plugin-proposal-optional-chaining", {"loose": false}],
		["@babel/plugin-proposal-pipeline-operator", {"proposal": "minimal"}],
		["@babel/plugin-proposal-nullish-coalescing-operator", {"loose": false}],
		"@babel/plugin-proposal-do-expressions",
		"@babel/plugin-transform-modules-commonjs",
		// Stage 2
		["@babel/plugin-proposal-decorators", {"legacy": true}],
		"@babel/plugin-proposal-function-sent",
		"@babel/plugin-proposal-export-namespace-from",
		"@babel/plugin-proposal-numeric-separator",
		"@babel/plugin-proposal-throw-expressions",
		// Stage 3
		"@babel/plugin-syntax-dynamic-import",
		"@babel/plugin-syntax-import-meta",
		"@babel/plugin-proposal-class-properties",
		"@babel/plugin-proposal-json-strings",
		// Other
		'@babel/plugin-transform-runtime',
		'@babel/plugin-proposal-object-rest-spread',
		'@babel/plugin-transform-object-super',
		'@babel/plugin-transform-classes'
	]
}
module.exports = transformer.default.createTransformer(babelOptions)
