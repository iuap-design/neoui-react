const fs = require('fs')
const {execSync} = require('child_process');
const axios = require('axios')
const {gitBranch, commitId} = require('./gitversion.js')
const pkg = require('./package.json');
const { changlog } = require('./changelog.js');

// 时间版本号
function getDateVersion() {
    let now = new Date();
    let yyyy = now.getFullYear(), mm = now.getMonth() + 1, dd = now.getDate(), hh = now.getHours(),
        m = now.getMinutes(), ss = now.getMilliseconds();
    let zero = (num) => num < 10 ? '0' + num : num;
    return `${yyyy}${zero(mm)}${zero(dd)}${zero(hh)}${zero(m)}${zero(ss)}`
}

// 创建tag，用于生成构建日志
// function createAndPushGitTag(tagName, commitId) {
//     try {
//       // 创建轻量标签
//       execSync(`git tag ${tagName} ${commitId}`);
//       console.log(`成功创建标签 ${tagName}`);
        
//       // 推送标签到远程仓库
//       execSync(`git push origin ${tagName}`);
//       console.log(`成功推送标签 ${tagName} 到远程仓库`);
//     } catch (error) {
//       console.error('操作失败', error.message);
//     }
//   }
  async function getChanglog(tagName, newTagName) {
    try {
        const res = await axios(``);
        const commitIdPattern = /\*\sCommitid:\s([a-f0-9]+)\n/;
        const oldCommitId = commitIdPattern.exec(res.data)[1];
        // return commitId; 
        changlog(oldCommitId, commitId, newTagName);
    } catch(e) {
        console.warn(e);
    }
}

let branch, version;
version = branch = gitBranch;


if (branch.indexOf('develop') > -1) {
    axios('').then(res => {
        const version = res.data['dist-tags'].latest
        const oldVersion = res.data['dist-tags'].snapshot;
        // const mainVersion = version.split('-')[0];
        // const verArr = mainVersion.split('.')
        // verArr[verArr.length - 1] = Number(verArr[verArr.length - 1]) + 1
        // const lastVersion = verArr.join('.') + "-snapshot.1";// 获取最后一次的版本
        const lastVersion = version + '-snapshot.1';
        const arr = lastVersion.split('.');
        arr[arr.length - 1] = getDateVersion();
        const newVersion = arr.join('.');
        console.info("【自动升级版本号】--->" + newVersion);
        pkg.version = newVersion;
        getChanglog(oldVersion, newVersion);

        fs.writeFileSync('./package.json', JSON.stringify(pkg, null, 4));// 同步package.json版本信息
    })
}else if (branch.indexOf('release') > -1) {
    let releaseVersion = branch.replace('release/', '')
    axios('').then(res => {
        // const oldVersion = res.data['dist-tags'].latest;
        // if (pkg.version == releaseVersion) {
        //     console.info("【当前版本已经是】：" + releaseVersion);
        // }
        // pkg.version = releaseVersion;
        // console.info("【自动升级版本号】：" + releaseVersion);
        const lastVersion = res.data['dist-tags'].latest;
        let newVersion;
        if (lastVersion.split('.')[1] === releaseVersion.split('.')[1]) { // 如果是同一个中间版本号，则在原来的基础上小版本号+1
            const arr = lastVersion.split('.');
            let lastVerNum = arr[arr.length - 1] || 0;// 获取最后一次的版本号
            arr[arr.length - 1] = parseInt(lastVerNum) + 1;// 版本号自动+1
            newVersion = arr.join('.')
        } else {
            newVersion = releaseVersion;
        }
        pkg.version = newVersion;
        console.info("【自动升级版本号】：" + newVersion);
        getChanglog(lastVersion, newVersion);
        fs.writeFileSync('./package.json', JSON.stringify(pkg, null, 4));// 同步package.json版本信息
    })
}
