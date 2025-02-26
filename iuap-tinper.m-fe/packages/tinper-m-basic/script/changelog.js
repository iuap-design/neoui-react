const fs = require('fs')
const { execSync } = require('child_process');

const CommitType = {
  fix: '问题修复',
  perf: '功能优化',
  feat: '新增功能',
  refactor: '重构'
}

function sortCom(s1, s2) {
  let x1 = s1.msg;
  let x2 = s2.msg;
  if (x1 < x2) {
    return -1;
  }
  if (x1 > x2) {
    return 1;
  }
  return 0;
}

let mdJson = [];

function handleAllJson2md(arr, type) {
  mdJson.push(`------------ ${CommitType[type]} [${arr.length}] ------------`)
  arr.forEach(item => {
    mdJson.push(`* ${item.msg} (${item.commitId})`)
  })
}

async function changlog(oldId, newId, newTag) {
  let commitReg = /commit\s([0-9a-f]{40})/;
  let MsgReg = /(fix|perf|feat|refactor):\s(.{0,})\n+$/
  // 获取符合范围的提交记录
  try {
    const gitLogCommand = `git log ${oldId}..${newId} --no-merges`;
    const allLogCont = execSync(gitLogCommand, { encoding: 'utf-8' });
    let commitIdArr = allLogCont.match(/commit\s([0-9a-f]{40})/g);
    // 根据commit 切割提交记录
    let msgArr = allLogCont.split(/commit\s[0-9a-f]{40}/).slice(1);
    // console.log('msgArr====', msgArr);
    let valid_msgArr = [];
    msgArr.forEach((it, index) => {
      const match = MsgReg.exec(it)
      if (match && match.length > 0 && !valid_msgArr.find(item => match[2] && item.msg == match[2]) && match[2].indexOf('--no-record') === -1) {
        let obj = {};
        obj.msg = match[2];
        obj.type = match[1];
        let commitId = commitReg.exec(commitIdArr[index])[1]
        commitId = commitId.slice(-6);
        obj.commitId = commitId;
        valid_msgArr.push(obj);
      }
    });
    let fix_log = [], perf_log = [], feat_log = [], refactor_log = [];

    valid_msgArr.forEach(item => {
      item = { ...item, typeName: CommitType[item.type] };
      if (item.type === 'refactor') {
        refactor_log.push(item);
      } else if (item.type === 'perf') {
        perf_log.push(item);
      } else if (item.type === 'feat') {
        feat_log.push(item);
      } else {
        fix_log.push(item);
      }
    })
    fix_log.sort(sortCom);
    perf_log.sort(sortCom);
    feat_log.sort(sortCom);
    refactor_log.sort(sortCom);
    let log_obj = { fix_log, perf_log, feat_log, refactor_log }
    mdJson.push('版本: ' + newTag);
    Object.keys(log_obj).forEach(key => {
      if (log_obj[key].length === 0) return;
      handleAllJson2md(log_obj[key], key.split('_')[0])
    });
  } catch (err) {
    console.error(err);
  }

  if (!fs.existsSync('./GIT_CHANGELOG')) {
    fs.mkdirSync('./GIT_CHANGELOG');
  }
  fs.writeFileSync('./GIT_CHANGELOG/CHANGELOG.md', mdJson.join('\n'), 'utf-8')

}

module.exports = { changlog }
