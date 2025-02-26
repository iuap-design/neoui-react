const path = require('path')
const cli = require('./node_modules/cypress/lib/cli');
const ownerMap = require('./cypress/owner-constants')
console.log(process.argv);
const errorMsg = '必需 传递一个参数owner;比如 npm run cy -- owner=***; f的取值范围是[ "gyj", "jzy", "zyh", "gl", "server"]';
const errorMsg1 = '参数owner的传入存在错误,取值范围[ "gyj", "jzy", "zyh", "gl", "server"]'
if (process.argv.length < 3) {
  throw new Error(errorMsg)
}
const cy = process.argv.find(_ => _.startsWith('owner='))?.split('owner=')[1] || '';
const comp = process.argv.find(_ => _.startsWith('comp='))?.split('comp=')[1] || '';
const isUpdateSnapShots = process.argv.some(_ => _ === '-u')

if (!cy) {
  throw new Error(errorMsg);
}
if (!ownerMap[cy]) {
  throw new Error(errorMsg1);
}
process.env.cy = cy;
process.env.comp = comp;
if (isUpdateSnapShots) {
  const diffCli = require('./node_modules/cypress-image-diff-js/dist/cli');
  const cypressDiffDir = path.join(__dirname, 'node node_modules/cypress-image-diff-js/bin/cypress-image-diff.js');
  diffCli.cli([process.argv[0], cypressDiffDir, '-u']) 
} else {
  const cypressDir = path.join(__dirname, 'node node_modules/cypress/bin/cypress');
  let arg = [ process.argv[0], cypressDir, 'run', '--component', '--browser', 'chrome', '--config-file', 'cypress/cypress.config.ts'];
  cli.init(arg)
}



// node node_modules/cypress-image-diff-js/bin/cypress-image-diff.js