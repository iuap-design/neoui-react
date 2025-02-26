const path = require('path');
const gulp = require('gulp');
const fs = require("fs");
const json2md = require("json2md");
const { exec } = require('child_process');
const menuArr = require('./menu.json');
const cssJson = require('../next-ui-library/css.json');

const iconfontJson = require('../packages/wui-core/scss/iconfont-next.json');

const globalHeaderMap = {
    "property": "变量名称",
    "value": "默认值",
    "desc": "描述",
    "components": "影响组件"
}

const componentHeaderMap = {
    "property": "变量名称",
    "value": "默认值",
    "desc": "描述",
}

// 创建多级目录
function mkdirsSync(dirname) {
    if (fs.existsSync(dirname)) {
        return true;
    } else {
        if (mkdirsSync(path.dirname(dirname))) {
            fs.mkdirSync(dirname);
            return true
        }
    }
}

// 复制文件夹
function CopyDirectory(src, dest) {
    if (!fs.existsSync(dest)) {
        fs.mkdirSync(dest);
    }
    const dirs = fs.readdirSync(src);
    dirs.forEach(function(item) {
        const itemPath = path.join(src, item);
        const temp = fs.statSync(itemPath);
        if (temp.isFile()) { // 是文件
            fs.copyFileSync(itemPath, path.join(dest, item));
        } else if (temp.isDirectory()) {
            CopyDirectory(itemPath, path.join(dest, item));
        }
    });
}

/** Demo的tsx转换为jsx语法 */
const tsx2jsx = done => {
    const arr = fs.readdirSync('../packages')
    arr.map(item => {
        if (['wui-core'].includes(item) || !item.startsWith('wui-')) return
        try {
            // 创建目录
            mkdirsSync(`./build/packages/${item}/demo`)
            // 复制文件
            CopyDirectory(`../packages/${item}/demo`, `./build/packages/${item}/demo`)
        } catch (e) {
            console.error(e)
        }
    })

    exec('tsc -p tsconfig.demo.json') // 执行tsx编译

    done()
}

const cssJson2md = done => {
    fs.copyFileSync('./entry/static/theme.png', './build/theme.png');
    fs.writeFileSync('./build/css.json', JSON.stringify(cssJson))
    const mdJson = [
        { h2: "主题颜色定制" },
        { p: "tinper-next 设计规范和技术上支持灵活的样式定制，以满足业务和品牌上多样化的视觉需求，包括全局和指定组件的视觉定制" },
        // { img: { source: '/demos/theme.png', alt: "组件主题展示" } },
        { p: "以下是所有相关css变量的说明" }
    ];
    if (cssJson.global) {
        const globalRows = [];
        const globalHeaders = Object.keys(globalHeaderMap).map(key => globalHeaderMap[key]);
        cssJson.global.forEach((item) => {
            const rowObj = {};
            Object.keys(globalHeaderMap).forEach(key => {
                rowObj[globalHeaderMap[key]] = item[key] ? item[key].replace(/[\r\n]/g, "") : ''
            })
            globalRows.push({ ...rowObj });
        })
        mdJson.push({ h2: "全局css变量" });
        mdJson.push({
            table: {
                headers: [...globalHeaders],
                rows: [...globalRows]
            }
        });
    }
    mdJson.push({ h2: "组件css变量" });
    const headers = Object.keys(componentHeaderMap).map(key => componentHeaderMap[key])
    Object.keys(cssJson).forEach(key => {
        if (['global'].includes(key)) return;
        const rows = [];
        cssJson[key].forEach(item => {
            const rowObj = {};
            Object.keys(componentHeaderMap).forEach(key => rowObj[globalHeaderMap[key]] = item[key].replace(/[\r\n]/g, ""));
            rows.push({ ...rowObj });
        })
        mdJson.push({ h3: `${key}` });
        mdJson.push({
            table: {
                headers: [...headers],
                rows
            }
        });
    })
    mdJson.push({ h2: '定制方式' })
    mdJson.push({ p: '原理上是使用css变量定义的方式对全局变量或组件变量重新定义，用户可使用以下方式进行主题颜色定制' });
    mdJson.push({ p: "使用:root对变量进行自定义" });
    mdJson.push({ code: { language: "css", content: ":root{\n--primary-color: rgb(238,34,51);\n--primary-color-hover: rgb(190, 27, 28);\n--primary-color-active: rgb(190, 27, 28);\n}" } });
    fs.writeFileSync('./build/cssVariable.md', json2md(mdJson));
    done();
}

const demoApi = done => {
    const arr = fs.readdirSync('../packages');
    const api = [];
    // api 数量
    let api_count = 0;
    const apiReg = /^\|(\s*[a-zA-Z]+\s*)\|/
    arr.map(item => {
        if (['readme.md', 'wui-core', 'index.js', 'styles.js'].includes(item)) {
            return
        }
        try {
            let str = fs.readFileSync('../packages/' + item + '/docs/api.md', "utf8");
            let demostr;
            try {
                demostr = fs.readFileSync('./dist/' + item + '.js', "utf8");
            } catch (err) {
                if (err) {
                    console.log("error:\n" + err);
                }
            }
            menuArr.map((ite, index) => {
                const string = str.substring(0, str.indexOf('## API'))
                let info = string.substring(string.indexOf('\n')).trim()
                if (ite.components[item]) {
                    if (ite.children) {
                        ite.children.push({
                            ...ite.components[item],
                            url: '/detail/component/' + item,
                            component: item,
                            info,
                            bip: demostr.indexOf('isBip=true') > 0,
                            other: demostr.indexOf('isOther=true') > 0,
                        })
                    } else {
                        ite.children = [{
                            ...ite.components[item],
                            url: '/detail/component/' + item,
                            component: item,
                            info,
                            bip: demostr.indexOf('isBip=true') > 0,
                            other: demostr.indexOf('isOther=true') > 0,
                        }]
                    }
                }
            })
            // 创建目录
            // mkdirsSync(`./build/packages/${item}/demo`);
            mkdirsSync(`./build/packages/${item}/docs`);
            // 复制文件
            // CopyDirectory(`../packages/${item}/demo`, `./build/packages/${item}/demo`);
            CopyDirectory(`../packages/${item}/docs`, `./build/packages/${item}/docs`);

            fs.writeFileSync('./build/component.json', JSON.stringify(menuArr));
            // const strIndexArr = getStrPositions(str, '## ')
            // 获取api 数量
            let apiData = str.split('\n').filter(_str => !!_str && apiReg.test(_str.trim()));
            api_count = api_count + apiData.length;

            const apiIndex = str.indexOf('## API')
            let apiContent = str.substring(apiIndex)
            apiContent = apiContent.replace('## API', '## ' + item)
            api.push(apiContent)
        } catch {

        }
    })
    // 获取组件数量
    let comp_count = menuArr.reduce((total, cur) => {
        return total + (cur.components ? Object.keys(cur.components).length : 0);
    }, 0)
    api.unshift('# comp_count:' + comp_count)
    api.unshift('# api_count:' + api_count)

    fs.writeFileSync('./build/README.md', fs.readFileSync('../next-ui-library/README.md'))
    fs.writeFileSync('./build/allApi.md', api.join('\n'));
    fs.writeFileSync('./build/CHANGELOG.md', fs.readFileSync('../next-ui-library/CHANGELOG.md'))
    fs.writeFileSync('./build/updateV3toV4.md', fs.readFileSync('../next-ui-library/updateV3toV4.md'))
    done();
}

gulp.task("tsx2jsx", tsx2jsx)

gulp.task("demo_api", gulp.series("tsx2jsx", cssJson2md, demoApi))

gulp.task("pack_demo", (done) => {
    const paths = []; // 所有的demo路径
    const com = []; // 所有的组件名称，如wui-button
    const dir = path.join(process.cwd(), '../packages');

    function sortNumber(a, b) {
        return a.replace(/[^0-9]/ig, "") - b.replace(/[^0-9]/ig, "")
    }
    // 处理Demo.js 和 Demo.scss文件
    function handlefile(filepath, component) {
        const arr = [], code = [], scssArr = [];
        let files;
        try {
            files = fs.readdirSync(filepath)
        } catch (err) {
            if (err) {
                console.log("error:\n" + err);
                return;
            }
        }
        // 所有demo 排序遍历处理
        files = files && files.length ? files.sort(sortNumber) : [];
        const demoType = filepath.split('/')[filepath.split('/').length - 1];
        let type = demoType.split('-')[1];
        type = type.toLowerCase().replace(type[0], type[0].toUpperCase());
        files.forEach(function(file) {
            if (file.search(/^([A-Z][a-z]+)*Demo\d*.(js|tsx)/) !== -1) {
                let fileName = file.replace(/.(js|tsx)/, "");
                let data = fs.readFileSync(filepath + "//" + file, "utf-8");
                let title, desc, iframe, demoCode;
                try {
                    title = data.match(/@title.{0,30}/) || [];
                    title = title.join("").replace(/@title/, "");
                } catch (e) {
                    console.log("please write title like @title");
                }

                try {
                    desc = data.match(/@description.{0,150}/) || [];
                    desc = desc.join("").replace(/@description/, "");
                } catch (e) {
                    console.log("please write description like @description");
                }

                try {
                    iframe = data.match(/@iframe.{0,10}/) || [];
                    iframe = iframe.join("").replace(/@iframe/, "");
                } catch (e) {
                    console.log("please write iframe like @iframe");
                }

                try {
                    demoCode = data.match(/@demoCode.{0,30}/) || [];
                    demoCode = demoCode.join("").replace(/@demoCode/, "").trim(); // 值为dev/demo6类型
                } catch (e) {
                    console.log("please write demoCode like @demoCode");
                }


                arr.push({
                    example: "<" + type + fileName + " />",
                    title: (title || fileName).trim(),
                    // code: data,
                    desc: desc.trim(),
                    type: type.toLowerCase(),
                    fileType: /.(js|tsx)/.exec(file)[0] || 'js',
                    fileName,
                    iframe: iframe,
                    demoCode: demoCode
                });
                code.push(
                    `import ${type}${fileName} from "../../packages/${component}/demo/${demoType}/${fileName}";`
                );
            }

            if (file.search(/\.scss/) !== -1) {
                let fileName = file.replace(".scss", "");
                code.push(
                    `import "../../packages/${component}/demo/${demoType}/${fileName}.scss";`
                );
                // fs.stat(paths + "//" + file, function (err, stat) {
                // 	//console.log(stat);
                // 	if (err) {
                // 		console.log(err);
                // 		return;
                // 	}
                // 	if (stat.isDirectory()) {
                // 		//console.log(paths + "\/" + file + "\/");
                // 		explorer(path + "/" + file);
                // 	} else {
                // 		// console.log(paths + "\/" + file);
                // 	}
                // });
                let data = fs.readFileSync(filepath + "//" + file, "utf-8");

                scssArr.push({
                    fileName,
                    type: type.toLowerCase(),
                    "scss_code": data
                });
            }
        });

        return { "new_arr": arr, "new_code": code, "new_scss_arr": scssArr };

    }

    function explorer(dirpath, component) { // filepath 当前demo文件夹路径, component 当前组件
        let arr = [],
            scssArr = [],
            code = [];
        fs.readdir(dirpath, function(err, files) {
            if (err) {
                console.log("error:\n" + err);
                return;
            }
            files.forEach(function(file) {
                if (file.search(/demo-bip|demo-other|demo-dev/) !== -1) {
                    const { new_arr: newArr, new_scss_arr: newScssArr, new_code: newCode } = handlefile(dirpath + "/" + file, component);
                    arr.push(...newArr);
                    scssArr.push(...newScssArr);
                    code.push(...newCode);

                } else if (file.search(/\.scss/) !== -1) {
                    let fileName = file.replace(".scss", "");
                    code.push(
                        `import "../../packages/${component}/demo/${fileName}.scss";`
                    );
                }
            });

            arr.forEach(element => {
                if (scssArr.find(_it => _it.fileName === element.fileName && _it.type === element.type)) {
                    Object.assign(element, { hasScss: true });
                } else {
                    Object.assign(element, { hasScss: false });
                }
            })

            // 根据处理的数据生成dist下的相关文件
            let index = "import React, { Component } from 'react';\n" +
                "import ReactDOM from 'react-dom';\n" +
                "{demolist}"
            let str = `export const isBip=${!!arr.find(item => item.type === 'bip')};`;
            str += `export const isOther=${!!arr.find(item => item.type === 'other')};`
            str += "const DemoArray = " + JSON.stringify(arr) + "\n";
            str += "export default DemoArray"
            str = str.replace(/ple":"</gi, 'ple":<').replace(/","tit/gi, ',"tit');

            index = index.replace(/\{demolist\}/, code.join("") + str);

            try {
                fs.statSync(path.join(__dirname, './dist'));
            } catch (e) {
                fs.mkdirSync('./dist')
            }

            fs.writeFile('./dist/' + component + '.js', index, function(
                err
            ) {
                if (err) throw err;
                // webpack(require("./webpack.dev.js"), function (err, stats) {
                // 	// 重要 打包过程中的语法错误反映在stats中
                // 	console.log("webpack log:" + stats);
                // 	if (err) cb(err);
                // 	console.info("###### pack_demo done ######");
                // 	cb();
                // });
            });
        });

    }

    // 遍历packages组件, 处理其demo文件夹
    fs.readdirSync(dir).forEach(file => {
        const pth = path.resolve(dir, file)
        const stat = fs.statSync(pth)
        if (stat.isDirectory() && !['wui-core'].includes(file)) {
            paths.push(path.join(pth, './demo'))
            com.push(file)
        }
    })
    paths.map((pth, index) => {
        explorer(pth, com[index]);
    })
    done()
});

// 生成字体渲染文件
gulp.task("create_icon_demo", (done) => {
    let iconDemos = '<ul id="icon_lists" className="icon_lists">';
    let classNames = '';
    iconfontJson.glyphs.forEach(item => {
        iconDemos = iconDemos + `<li>
						<Icon type="${iconfontJson.css_prefix_text}${item.font_class}"></Icon>
							<div className="name">${item.name}</div>
							<div className="fontclass">.${iconfontJson.css_prefix_text}${item.font_class}</div>
						</li>`;
        classNames = classNames + `.uf.${iconfontJson.css_prefix_text}${item.font_class}:before,\n`
    })
    iconDemos = iconDemos + '</ul>';
    mkdirsSync(`./iconDir`);
    fs.writeFileSync('./iconDir/iconDemos.txt', iconDemos);
    fs.writeFileSync('./iconDir/iconClassNames.txt', classNames);
    done();
})
