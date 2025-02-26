const { resolve } = require('path');
const { dirContentQuery } = require('./query-content-dir')
const allFilePath = resolve(__dirname, '../../src/components');
const rooConfigDirs = require('../root-config')
const gFilePath = rooConfigDirs.length === 1 ? rooConfigDirs[0] : allFilePath;
const gExtensions = ['.test.js', '.test.tsx'];
const excludedFolders1 = ['node_modules', '__tests__']
const excludedFolders2 = ['node_modules', 'src']
const AllProps = {};

//returns lines could be saved to log file
// get all file props and generate a object  ==> AllProps
gExtensions.forEach(async (gExtension) => {
  await dirContentQuery(gFilePath, gExtension, excludedFolders1, AllProps);
  // query props coverage
  setTimeout(()=>{
    dirContentQuery(gFilePath, gExtension, excludedFolders2, AllProps);
  }, 1000)
})

