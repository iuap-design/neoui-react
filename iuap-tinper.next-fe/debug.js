/* eslint-disable camelcase */
/**
 * 调试代码输出脚本
 */
const path = require('path');
const fs = require('fs');
const child = require('child_process');
// const spawn = require('cross-spawn');
const gulp = require('gulp');
// const babel = require('gulp-babel');
const debugTarget = process.env.TARGET;

console.log("[DEBUG]:调试:" + debugTarget);

const debugFolderPath = path.join(__dirname, './packages/' + debugTarget);
var count = 0;
//-------------初始化相关信息-------------------
const watchRootPackages = path.join(__dirname, '/packages/');//包根目录
const watchPackageFolderNames = fs.readdirSync(watchRootPackages).filter((pkgFolderName) => {//所有包目录名
	// console.log("pkgFolder--->",pkgFolder)
	return (pkgFolderName + '').startsWith('wui-') && pkgFolderName != 'wui-core' //确保为组件的包 , 排除wui-core包。
});

// 获取全部组件包信息
const watchPackageInfos = watchPackageFolderNames.map((pkgFolderName) => {
	let pkgInfo = {
		folderName: '' + pkgFolderName,//文件目录名
		folderPath: '',//文件目录路径
		packageName: '',//组件包名
		packagePath: '',//组件包package.json文件路径
		packageFile: ''//组件包package.json文件对象
	};
	pkgInfo.folderPath = path.join(watchRootPackages, '/' + pkgFolderName);
	pkgInfo.packagePath = path.join(pkgInfo.folderPath, '/package.json');
	pkgInfo.packageFile = fs.readFileSync(pkgInfo.packagePath);
	pkgInfo.packageName = JSON.parse(pkgInfo.packageFile).name;
	// console.log("packageInfo--->",pkgInfo);
	return pkgInfo;
});

// 获取当前组件依赖的组件
const debugTargetDeps = function () {
	let deps = [];
	let targetPkgInfo = watchPackageInfos.find((pkg) => pkg.folderName == debugTarget);
	if (!targetPkgInfo) return deps;
	let packageJson = JSON.parse(targetPkgInfo.packageFile);
	for (let depName in packageJson.dependencies) {
		if (!deps.includes(depName) && watchPackageInfos.find((pkg) => pkg.packageName == depName)) {
			deps.push(depName);
		}
	}
	for (let depDevName in packageJson.devDependencies) {
		if (!deps.includes(depDevName) && watchPackageInfos.find((pkg) => pkg.packageName == depDevName)) {
			deps.push(depDevName);
		}
	}

	return deps;
}();

console.log("[DEBUG]:依赖:" + debugTargetDeps);


// const targetPackage = path.join(targetPath, 'node_modules/@mdf/baseui/lib')

// const targetLib = path.resolve('.', targetPackage);


//1.实时构建jsx -> js 到目标位置
debugTargetDeps.forEach((debugDepName) => {
	let depPkgInfo = watchPackageInfos.find((pkg) => pkg.packageName == debugDepName);
	let targetSrc = path.join(depPkgInfo.folderPath, 'src');
	let targetBuild = path.join(debugFolderPath, 'node_modules/' + depPkgInfo.packageName + '/build');
	console.log(`[DEBUG]:监听:${depPkgInfo.packageName}:${targetSrc.replace(__dirname, '')} -> ${targetBuild.replace(__dirname, '')}`);
	//---------监听依赖模块的js文件变化----------
	const js_watch = gulp.watch([targetSrc + '/**/*.js', targetSrc + '/**/*.jsx'], function (done) {
		done();
	});
	//js文件被修改
	js_watch.on('change', function (_path, stats) {
		js_dep_build(_path);
		js_demo_build();
	});
	//js文件被创建
	js_watch.on('add', function (_path, stats) {
		js_dep_build(_path);
		js_demo_build();
	});
	//js依赖重新编译
	const js_dep_build = function (_path) {
		// gulp.src([
		//     targetSrc+'/**/*.js',
		//     targetSrc+'/**/*.jsx'
		// ])
		// .pipe(
		//     babel({
		//         presets:[
		//             '@babel/preset-env',
		//             '@babel/preset-react',
		//         ],
		//         plugins: [
		//             "@babel/plugin-proposal-class-properties",
		//             "@babel/plugin-proposal-export-default-from",
		//             "@babel/plugin-transform-runtime",
		//             "babel-plugin-lodash"
		//         ]
		//     })
		// )
		// .on('error', (err) => {
		//     console.log('[DEBUG] babel error -> ',err);
		//     process.exit(1)
		// })
		// .pipe(gulp.dest(targetBuild))
		// .on("end", function () {
		//     console.log(`[DEBUG][${count}]依赖文件被修改 编译完成`);
		//     js_demo_build();
		//
		// });
		console.log(`[DEBUG][${count}]依赖文件被修改 ${_path.replace(__dirname, '')} -> ${targetBuild.replace(__dirname, '')}`);
		let excResult = child.execSync(`bee-tools run pack_build --JS_SRC ${targetSrc} --JS_BUILD ${targetBuild}`);
		// console.log(`[DEBUG][${count}]依赖文件被修改 编译日志`,excResult.toString());
		console.log(`[DEBUG][${count}]依赖文件被修改 编译完毕`);
	};
	//demo重新编译和加载
	const js_demo_build = function () {
		console.log(`[DEBUG][${count}]示例文件重新编译 ...`)
		let excResult = child.execSync('bee-tools run reload_by_js');
		console.log(`[DEBUG][${count}]示例文件重新编译 完毕`)
		++count;
	}

	//---------监听依赖模块的scss文件变化----------
	const scss_watch = gulp.watch([targetSrc + '/**/*.scss'], function (done) {
		done();
	});

	//scss文件被修改
	scss_watch.on('change', function (_path, stats) {
		scss_dep_build(_path);
		scss_demo_build();
	});
	//scss文件被创建
	scss_watch.on('add', function (_path, stats) {
		scss_dep_build(_path);
		scss_demo_build();
	});

	//scss依赖重新编译
	const scss_dep_build = function (_path) {
		console.log(`[DEBUG][${count}]依赖文件被修改 ${_path.replace(__dirname, '')} -> ${targetBuild.replace(__dirname, '')}`);
		let excResult = child.execSync(`bee-tools run sass_component --CSS_SRC ${targetSrc} --CSS_BUILD ${targetBuild}`);
		// console.log(`[DEBUG][${count}]依赖文件被修改 编译日志`,excResult.toString());
		console.log(`[DEBUG][${count}]依赖文件被修改 编译完毕`);
	};
	//scssdemo重新编译和加载
	const scss_demo_build = function () {
		console.log(`[DEBUG][${count}]示例文件重新编译 ...`)
		let excResult = child.execSync('bee-tools run reload_by_demo_css');
		console.log(`[DEBUG][${count}]示例文件重新编译 完毕`)
		++count;
	}
});
