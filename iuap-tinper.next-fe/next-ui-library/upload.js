const fs = require('fs')
const path = require('path')
const pkg = require('./package.json')
const fetch = require('node-fetch');
const formData = require('form-data');
const axios = require('axios');
const version = pkg.version;
const gitContent = require('./gitversion.js');
function getFileArr(_path, arr) {
	if (!fs.existsSync(_path)) {
		console.error(_path + '查找不到，请查看');
		return
	}
	const files = fs.readdirSync(_path);
	files.map(item => {
		const filePath = path.join(_path, item)
		if(fs.statSync(filePath).isDirectory()) {
			getFileArr(filePath ,arr)
		} else {
			arr.push('./' + filePath)
		}
	})
}

async function main() {
	let branch = gitContent.gitBranch;
	let tag = null;
	let feature = false
	if (branch.indexOf('develop') > -1) { // snapshot 上传
		tag = "snapshot"
	} else if (branch.indexOf('release') > -1) { // release 上传
		tag = "release"
	} else if (branch.indexOf('beta') > -1) { // beta 上传
		tag = "beta"
	} else if (branch.indexOf('feature') > -1) { // feature 上传
		feature = true;
		tag = branch.replace('feature/', '');
	}
	let betaFix = false; //
	if (!tag) return


	// const client = new OSS(ossconfig);
	const arr = [];
	getFileArr('./dist', arr)
	if (fs.existsSync('./coverage')) {
		getFileArr('./coverage', arr);
	}
	if (fs.existsSync('./cy-coverage')) {
		getFileArr('./cy-coverage', arr);
	} else {
		console.log('cy-coverage')
	}
	if (fs.existsSync('./GIT_CHANGELOG')) {
		getFileArr('./GIT_CHANGELOG', arr);
	}
	const fileList = [];
	const PromiseArr = [];
	for (let i = 0; i < arr.length; i++) {
		const form = new formData();
		const fileName = arr[i];
		let _path = path.join('static/tinper-next/' + version + '/', fileName.replace('./dist/', ''))
		form.append("file", fs.createReadStream(fileName));
		form.append("type", 'put');
		form.append("path", _path);
		// PromiseArr.push(client.put('static/tinper-next/' + version + '/' + fileName, fs.createReadStream('./dist/' + fileName)).catch(err => console.log(err)))
		PromiseArr.push(fetch('', {method: 'post', body: form})
			.then(res => {
				return res.json()
			}))
		if (!feature && !betaFix) { // feature分支不上传固定的tag目录
			const form = new formData();
			const fileName = arr[i];
			_path = path.join('static/tinper-next/' + tag + '/', fileName.replace('./dist/', ''))
			fileList.push(_path)
			form.append("file", fs.createReadStream(fileName));
			form.append("type", 'put');
			form.append("path", _path);
			PromiseArr.push(fetch('', {method: 'post', body: form})
				.then(res => {
					return res.json()
				}))
		}
	}
	await Promise.all(PromiseArr).then(async(result) => {
		console.log('upload success')
		
	})
	if (feature) return // feature分支的CDN没有固定Tag，无需刷新
	if (!feature && !betaFix) { // feature分支不上传固定的tag目录
		console.log(fileList)
		// await axios({ // 清理日常环境的version缓存
		// 	method: 'post',
		// 	data: {
		// 		fileList: fileList.join(','),
		// 		folder: 'static/tinper-next/' + tag + '/'
		// 	},
		// 	url: 'https://package.yonyoucloud.com/npm/oss/clean'
		// })
	}
	const refreshUrl = [
		'https://design.yonyoucloud.com/static/tinper-next/' + tag + '/tinper-next.min.js',
		'https://design.yonyoucloud.com/static/tinper-next/' + tag + '/tinper-next.css'
	];
	let j = 0;
	for (let i = 0; i < refreshUrl.length; i++) {
		if (j > 20) {
			console.log('刷新失败,请手动刷新！')
			break // 总数超出20次即不再尝试刷新
		}
		j++;
		const item = refreshUrl[i]
		console.log('即将刷新：' + item)
		const res = await axios({
			method: 'post',
			data: {
				url: encodeURIComponent(item)
			},
			url: ''
		})
		if (res.status === 200) {
			console.log(item + '已刷新！')
		} else {
			refreshUrl.push(item)
		}
	}
}
main()


