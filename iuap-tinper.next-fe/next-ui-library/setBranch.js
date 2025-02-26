const pkg = require("./package.json");
const fs = require("fs");
if (process.argv && process.argv.length > 0) {
	process.argv.map(item => {
		if (~item.indexOf('-branch=') || ~item.indexOf('--branch=')) {
			pkg._gitBranch = item.split('=')[1]
			fs.writeFileSync('./package.json', JSON.stringify(pkg, null, 4));//同步package.json版本信息
		}
	})
}
