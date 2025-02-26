const child_process = require('child_process');
// const pkg = require("./package.json");
// let gitBranch = child_process.execSync('git name-rev --name-only HEAD').toString().trim();
// // let gitBranch = child_process.execSync('git symbolic-ref --short HEAD').toString().trim();
// if(pkg._gitBranch) {
// 	gitBranch = pkg._gitBranch
// }
let commitId
const commitMessage = child_process.execSync('git log --date=format:"%Y-%m-%d %H:%M:%S" -1').toString();

const commitIdPattern = /commit\s([a-f0-9]+)/;
const match = commitIdPattern.exec(commitMessage);

if (match && match[1]) {
  commitId = match[1];
}

const gitBranch = process.env.CI_COMMIT_REF_NAME || child_process.execSync('git branch --show-current')?.toString()?.replace('\n', '');
// const gitBranch = child_process.execSync('git rev-parse --abbrev-ref HEAD').toString();
const gitLog = child_process.execSync('git log --date=format:"%Y-%m-%d %H:%M:%S" -1').toString().trim();
const gitInfo = ['Branch:' + gitBranch, gitLog].join('\n');
// console.log("AAA--->",gitInfo);
module.exports = { gitBranch, gitLog, gitInfo, commitId };
