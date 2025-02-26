const fs = require('fs')
const axios = require('axios')
const childProcess = require('child_process');
const pkg = require('./package.json');
const gitContent = require('./gitversion.js')
let branch = gitContent.gitBranch;
const feaVersion = branch.replace('feature/', '')

// 时间版本号
function getDateVersion() {
	let now = new Date();
	let yyyy = now.getFullYear(), mm = now.getMonth() + 1, dd = now.getDate(), hh = now.getHours(),
		m = now.getMinutes(), ss = now.getMilliseconds();
	let zero = (num) => num < 10 ? '0' + num : num;
	return `${yyyy}${zero(mm)}${zero(dd)}${zero(hh)}${zero(m)}${zero(ss)}`
}
async function feaPublish () {
	let lastVersion = ''
	// feature/vtag4.5.4-rtl  => 4.5.4-rtl.20190613173805
	if (feaVersion.indexOf('vtag') == 0) {
		lastVersion = feaVersion.replace('vtag', '').trim() + '.' + getDateVersion();
	} else if (feaVersion.indexOf('onpremise') === 0 && pkg.version) {
		lastVersion = pkg.version + '-' + feaVersion + '.' + getDateVersion();
	} else {
		const res = await axios('');
		const version = res.data['dist-tags']['latest']
		const verArr = version.split('.');
		verArr[verArr.length - 1] = Number(verArr[verArr.length - 1]) + 1;
		lastVersion = verArr.join('.') + '-' + feaVersion + '.' + getDateVersion();
	}

	pkg.version = lastVersion;
	fs.writeFileSync('./package.json', JSON.stringify(pkg, null, 4));//同步package.json版本信息
	childProcess.execSync('node upload.js', {'encoding': 'utf8'});
	childProcess.execSync('npm --userconfig=./npmrc --registry= publish --tag=' + feaVersion, {'encoding': 'utf8'});
}

feaPublish();

