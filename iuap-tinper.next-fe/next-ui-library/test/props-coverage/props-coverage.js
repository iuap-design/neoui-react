const {resolve} = require('path');
const {dirContentQuery} = require('./query-content-dir')
const allFilePath = resolve(__dirname, '../../../packages');
const rooConfigDirs = require('../root-config')
const gFilePath = rooConfigDirs.length === 1 ? rooConfigDirs[0] : allFilePath;
const gExtension = '.test.js';
const excludedFolders1 = ['node_modules', 'test', 'src1', "rc", 'wui-core','wui-animate', 'wui-overlay', 'wui-transition', 'wui-locale','wui-dynamicview']
const excludedFolders2 = ['node_modules', 'src', 'src1', "rc", 'wui-core','wui-animate', 'wui-overlay', 'wui-transition', 'wui-locale', 'wui-dynamicview']
const AllProps = {};

//returns lines could be saved to log file
// get all file props and generate a object  ==> AllProps
(async () => {
	await dirContentQuery(gFilePath, gExtension, excludedFolders1, AllProps);
// query props coverage
	// dirContentQuery(gFilePath, gExtension, excludedFolders2, AllProps);
	setTimeout(()=>{
        dirContentQuery(gFilePath, gExtension, excludedFolders2, AllProps);
    },1000)
})()
