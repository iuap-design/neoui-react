const axios = require('axios')
const childProcess = require('child_process');
const pkg = require('../package.json');
const gitContent = require('./gitversion.js')
// const betaTag = betaVersion.replace(/\./g, '\-') + '-beta'
axios('').then(async res => {
  let betaFix = false;
  const version = pkg.version
  const metaJson = res.data;
  const betaVersion = metaJson['dist-tags'].beta
  const betaMainVersion = betaVersion.split('-')[0]
  const mainVersion = version.split('-')[0]
  const betaMainVersionArr = betaMainVersion.split('.')
  const mainVersionArr = mainVersion.split('.')
  for (let i = 0; i < 3; i++) {
    if (betaMainVersionArr[i] > mainVersionArr[i]) {
      betaFix = true;
      break;
    }
    if (betaMainVersionArr[i] < mainVersionArr[i]) {
      betaFix = false;
      break;
    }
  }
  childProcess.execSync(`npm --userconfig=./ynpmrc --registry= publish --tag=${!betaFix ? 'beta' : 'beta-fix'}`, { encoding: 'utf8' });
})
