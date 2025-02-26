const path = require("path");
// const fs = require("fs");
// const child = require('child_process');
// var inquirer = require("inquirer");
// const spawn = require("cross-spawn");
const rimraf = require("rimraf");
// var file = require("html-wiring");
// var util = require("./util");

// var global = require("./global");

// var browserSync = require("browser-sync");
// var reload = browserSync.reload;
// var shelljs = require("shelljs");
// var fse = require("fs-extra");

// ==========gulp & gulp plugin==========
const gulp = require("gulp");
const babel = require("gulp-babel");
const sass = require("gulp-dart-sass");
// const concat = require("gulp-concat");
// const rename = require("gulp-rename");
// const clean = require("gulp-clean");
const greplace = require('gulp-replace');
// var svgSymbols = require('gulp-svg-symbols');
// var csso = require('gulp-csso');
// var sourcemaps = require("gulp-sourcemaps");
// var autoprefix = require("gulp-autoprefixer");
// var replace = require("gulp-just-replace");
// var es3ify = require("gulp-es3ify");
// var eslint = require("gulp-eslint");
// var conven = require("gulp-conventional-changelog");

const colors = require("colors/safe");
colors.setTheme({
    silly: 'rainbow',
    input: 'grey',
    verbose: 'cyan',
    prompt: 'grey',
    info: 'green',
    data: 'grey',
    help: 'cyan',
    warn: 'yellow',
    debug: 'blue',
    error: 'red'
});

const babelConfig = require("./babel.config");
const gitversion = require('./gitversion');
// // webpack
// var webpack = require("webpack");

// gulp.task("changelogInit", function () {
// 	//设置镜像
// 	spawn.sync(
// 		"npm",
// 		["--registry", "https://registry.npm.taobao.org", "install", "express"], {
// 			stdio: "inherit"
// 		}
// 	);
// 	//init commitizen
// 	spawn.sync(
// 		"commitizen",
// 		["init", "cz-conventional-changelog", "--save", "--save-exact", "--force"], {
// 			stdio: "inherit"
// 		}
// 	);
// });

// gulp.task("changelog", function () {
// 	console.log(colors.info("###### build changelog ######"));
// 	if (!fs.accessSync("CHANGELOG.md")) {
// 		fse.outputFileSync(path.join(process.cwd(), "./CHANGELOG.md"), "");
// 	}
// 	gulp
// 		.src(path.join(process.cwd(), "./CHANGELOG.md"))
// 		.pipe(
// 			conven({
// 				preset: "angular",
// 				releaseCount: 0,
// 				samefile: true
// 			})
// 		)
// 		.pipe(gulp.dest("./"));
// });

// 清除构建目录
gulp.task("build_clean", function(done) {
    rimraf.sync('./lib');// 删除lib目录
    // rimraf.sync('./dist');//删除dist目录
    // gulp.src('./lib').pipe(clean());
    // gulp.src('./dist').pipe(clean());
    done();
});

// 编译js
gulp.task("build_js", function(done) {
    // console.log(colors.info("###### component jsx->js start ######"));
    var srcPaths = [
        path.join(__dirname, "../packages/**/src/*.js"),
        path.join(__dirname, "../packages/**/src/**/*.js"),
        path.join(__dirname, "../packages/**/src/*.jsx"),
        path.join(__dirname, "../packages/**/src/**/*.jsx"),
        path.join(__dirname, "../packages/**/src/*.ts"),
        path.join(__dirname, "../packages/**/src/**/*.ts"),
        path.join(__dirname, "../packages/**/src/*.tsx"),
        path.join(__dirname, "../packages/**/src/**/*.tsx"),
        path.join(__dirname, "../packages/index.tsx"),
        // path.join(__dirname, "../packages/index-ts.tsx"),
    ];
    gulp
        .src(srcPaths)
        .pipe(
            babel(babelConfig)
        )
    // .pipe(
    // 	rename(function (path) {
    // 		path.dirname += "./build";
    // 		// path.basename += "-goodbye";
    // 		// path.extname = ".md";
    // 	})
    // )
        .pipe(gulp.dest('lib'))
        .on("end", function() {
            // console.log(colors.info("###### component jsx->js done ######"));
            done();
        });
});
// 编译css
gulp.task("build_css", function(done) {
    // console.log(colors.info("###### component scss->css start ######"));
    var srcPaths = [
        path.join(__dirname, "../packages/**/src/*.scss"),
        path.join(__dirname, "../packages/**/src/*.css")
    ];
    gulp
        .src(srcPaths)
        .pipe(sass())
        .pipe(gulp.dest('lib'))
        .on("end", function() {
            // console.info(colors.info("###### component scss->css done ######"));
            done();
        });
});
// 环境变量替换
gulp.task("build_replace", function(done) {
    var srcPaths = [
        path.join(__dirname, 'lib/index.js'),
        // path.join(__dirname, 'lib/index-ts.tsx'),
    ];
    gulp.src(srcPaths)
        .pipe(greplace('process.env.GIT_VERSION', JSON.stringify(gitversion.gitInfo)))
        .pipe(gulp.dest('lib'))
        .on("end", function() {
            done();
        });
})
// 打包lib库
gulp.task("build_lib", gulp.series(["build_clean", "build_js", "build_css", "build_replace"]), function() {
});
gulp.task("build_replace_es", function(done) {
    var srcPaths = [
        path.join(__dirname, 'es/index.js'),
        // path.join(__dirname, 'lib/index-ts.tsx'),
    ];
    gulp.src(srcPaths)
        .pipe(greplace('process.env.GIT_VERSION', JSON.stringify(gitversion.gitInfo)))
        .pipe(gulp.dest('es'))
        .on("end", function() {
            done();
        });
})

// gulp.task("svgScript", function () {
// 	return gulp
// 		.src([path.join(process.cwd(), "./src/static/**/*.svg")], function (a, b) {
// 		})
// 		.pipe(
// 			svgSymbols({
// 				slug: name => {
// 					// console.log("name--", name)
// 					return name;
// 				},
// 			})
// 		)
// 		.pipe(rename((path) => {
// 			path.basename = 'loading';
// 		}), (a, b) => {
// 			// console.log("a-", a);
// 			// console.log("b-", b)
// 		})
// 		.pipe(gulp.dest('build/static/images/'));
// 	// .pipe(gulp.dest('build'));
// 	// .pipe(gulp.dest(function(file){return 'build/static/images/'+file.base+'.svg';}));
// })

// gulp.task("sass_demo", function (cb) {
// 	gulp
// 		.src([path.join(process.cwd(), "./demo/**/*.scss")])
// 		.pipe(sourcemaps.init())
// 		.pipe(sass())
// 		.pipe(concat("demo.css"))
// 		.pipe(
// 			autoprefix({
// 				browsers: ["last 2 versions", "not ie < 8"],
// 				cascade: false
// 			})
// 		)
// 		.pipe(
// 			replace([{
// 				search: /\/\*#\ssourceMappingURL=([^\*\/]+)\.map\s\*\//g,
// 				replacement: "/* end for `$1` */\n"
// 			}])
// 		)
// 		.pipe(sourcemaps.write("."))
// 		.pipe(gulp.dest("./dist"))
// 		.on("end", function () {
// 			console.info(colors.info("###### sass_demo done ######"));
// 			cb();
// 		});
// });
//

// gulp.task("reload_by_js", ["pack_demo"], function () {
// 	reload();
// });
//
// gulp.task("reload_by_demo_css", ["sass_demo"], function () {
// 	reload();
// });

// gulp.task("server", ["pack_demo", "sass_demo"], function () {
// 	var port = util.getPkg().config.port || 3000;
// 	browserSync({
// 		server: {
// 			baseDir: path.join(process.cwd(), "./"),
// 			port: port
// 		},
// 		open: "external"
// 	});
// 	//监听js源码文件变化
// 	gulp.watch(
// 		[
// 			path.join(process.cwd(), "./src/**/*.js"),
// 			path.join(process.cwd(), "./demo/**/*.js")
// 		],
// 		["reload_by_js"]
// 	);
// 	//监听scss源码文件变化
// 	gulp.watch(path.join(process.cwd(), "src/**/*.scss"), ["reload_by_demo_css"]);
// 	//监听demo里面的scss源码文件变化
// 	gulp.watch(path.join(process.cwd(), "demo/**/*.scss"), [
// 		"reload_by_demo_css"
// 	]);
// 	//监听demo里面的js源码文件变化
// 	gulp.watch(path.join(process.cwd(), "./demo/demolist/*.js"), ["pack_demo"]);
// });

// gulp.task("start", ["server"]);
// gulp.task("pub", ["pack_build", "sass_component"], async function () {
// 	let questions = await util.getQuestions();
// 	let answers = await inquirer.prompt(questions);
// 	var pkg = util.getPkg();
// 	pkg.version = answers.version;
// 	file.writeFileFromString(JSON.stringify(pkg, null, " "), "package.json");
//
// 	if (answers.checkChangelog === "y") {
// 		spawn.sync("git", ["add", "."], {
// 			stdio: "inherit"
// 		});
// 		spawn.sync("git", ["cz"], {
// 			stdio: "inherit"
// 		});
//
// 		console.log(colors.info("#### Npm Info ####"));
// 		spawn.sync("bee-tools", ["run", "changelog"], {
// 			stdio: "inherit"
// 		});
// 	}
// 	console.log(colors.info("#### Git Info ####"));
// 	spawn.sync("git", ["add", "."], {
// 		stdio: "inherit"
// 	});
// 	spawn.sync("git", ["commit", "-m", "publish " + pkg.version], {
// 		stdio: "inherit"
// 	});
// 	spawn.sync("git", ["tag", "v" + pkg.version]);
// 	spawn.sync("git", ["push", "origin", "v" + pkg.version], {
// 		stdio: "inherit"
// 	});
// 	spawn.sync("git", ["push", "origin", answers.branch], {
// 		stdio: "inherit"
// 	});
// 	spawn.sync(answers.npm, ["publish"], {
// 		stdio: "inherit"
// 	});
// 	// await global.getGithubToken();
// });

// webpack(require("./webpack.dev.js"), function (err, stats) {
// 	// 重要 打包过程中的语法错误反映在stats中
// 	console.log("webpack log:" + stats);
// 	if (err) cb(err);
// 	console.info("###### pack_demo done ######");
// 	cb();
// });

gulp.task("default", function() {
});
