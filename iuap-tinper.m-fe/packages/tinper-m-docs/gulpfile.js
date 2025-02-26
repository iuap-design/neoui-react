const path = require('path');
const { watch } = require('gulp');
const fs = require('fs');
const compConfig = require('./comp.config.json')
const menuArr = require('./comp.config.json');
const gulp = require('gulp')
const env = process.env.NODE_ENV
const flatComps = {}
compConfig.forEach(group => {
  const { title: groupTitle, order: groupOrder, children } = group
  children.forEach(comp => {
    const { title, code, order, debug, person, email } = comp
    if (!(env === 'production' && debug === true)) {
      // 生产环境不展示debug为true的组件
      flatComps[code] = {
        groupTitle,
        groupOrder,
        order,
        title,
        person,
        email
      }
    }
  })
})

const compKeys = Object.keys(flatComps)

function deleteDir(url) {
  var files = [];

  if (fs.existsSync(url)) {  //判断给定的路径是否存在

    files = fs.readdirSync(url);   //返回文件和子目录的数组
    files.forEach(function (file) {
      var curPath = path.join(url, file);

      if (fs.statSync(curPath).isDirectory()) { //同步读取文件夹文件，如果是文件夹，则函数回调
        deleteDir(curPath);
      } else {
        fs.unlinkSync(curPath);    //是指定文件，则删除
      }

    });

    fs.rmdirSync(url); //清除文件夹
  } else {
    console.log('给定的路径不存在！');
  }

}

const pack_docs = (done) => {
  const paths = []; // 所有的demo路径
  const com = []; // 所有的组件名称，如wui-button
  const demoInfo = {}
  const dir = '../../packages/tinper-m-basic/src/components';

  deleteDir('./docs/basic-components'); //清除文件夹

  const readFile = (path) => {
    try {
      return fs.readFileSync(path, 'utf8')
    } catch (e) {
      return ''
    }
  }

  function explorer(dirpath, component) { // filepath 当前demo文件夹路径, component 当前组件
    if (!compKeys.includes(component)) return
    com.push(component)
    const mdConfig = `---
nav: basic-components
group:
  title: ${flatComps[component].groupTitle}
  order: ${flatComps[component].groupOrder}
title: ${flatComps[component].title}
order: ${flatComps[component].order}
toc: content
person: ${flatComps[component].person}
email: ${flatComps[component].email}
---
`
    let docs = {},
      demos = ['## 示例\n'];
    //demos
    const demosDirPath = path.join(dirpath, '/demos')
    fs.readdirSync(demosDirPath).forEach(function (file) {
      if (/^([A-Z][a-z]+)*demo\d*.(js|tsx)/.test(file)) {
        let data = fs.readFileSync(demosDirPath + '//' + file, 'utf-8');
        let title, desc, mobile, compact;
        try {
          title = data.match(/@title.{0,30}/) || [];
          title = title.join('').replace(/@title/, '');
        } catch (e) {
          console.log('please write title like @title');
        }

        try {
          desc = data.match(/@description.{0,150}/) || [];
          desc = desc.join('').replace(/@description/, '');
        } catch (e) {
          console.log('please write description like @description');
        }

        try {
          mobile = data.match(/@mobile.{0,150}/) || true;
          mobile = mobile.join('').replace(/@mobile/, '');
          mobile = (mobile.trim() === true)
        } catch (e) {
          // console.log("please write description like @mobile");
        }

        try {
          compact = data.match(/@compact.{0,150}/);
          compact = compact.join('').replace('@compact', '').trim();
        } catch (e) {
          // console.log("please write description like @mobile");
        }

        demos.push(
          `<code src="@components/${component}/demos/${file}" title="${title}" mobile="${mobile}" ${compact ? 'compact=' + compact : ''} ></code>\n`
        );
        try {
          demoInfo[component][file] = {
            fileName: file,
            title: flatComps[component]?.title,
            mobile
          }
        } catch (e) {
          demoInfo[component] = {}
          demoInfo[component][file] = {
            fileName: file,
            title: flatComps[component]?.title,
            mobile
          }
        }

      }
    });

    docs.demos = demos.join('')

    //docs
    const docsDirPath = path.join(dirpath, '/docs')
    fs.readdirSync(docsDirPath).forEach(function (file) {
      if (/README.md/.test(file)) {
        docs.readme = `${dir}/${component}/docs/${file}`
      }

      if (/API.md/.test(file)) {
        docs.api = `${dir}/${component}/docs/${file}`
      }
    });

    const outputfile = [mdConfig, readFile(docs.readme), docs.demos, readFile(docs.api)].join('\n')
    try {
      fs.statSync(path.join(__dirname, './docs/basic-components'));
    } catch (e) {
      fs.mkdirSync('./docs/basic-components', { recursive: true })
    }
    fs.writeFile(`./docs/basic-components/${component}.md`, outputfile, function (
      err
    ) {
      if (err) throw err;
    });
  }

  fs.readdirSync(dir).forEach(file => {
    const pth = path.resolve(dir, file)
    const stat = fs.statSync(pth)
    if (stat.isDirectory() && file !== '_style' && file !== '_utils') {
      paths.push(pth)
      com.push(file)
    }
  })

  paths.map((pth, index) => {
    explorer(pth, com[index]);
  })

  gulp.src(['./docs/develop-guide/*.md'])
    .pipe(gulp.dest('./docs/basic-components'))

  fs.writeFile('./.dumi/theme/demoInfo.json', JSON.stringify(demoInfo), function (
    err
  ) {
    if (err) throw err;
  });
  done()
}


exports.pack_docs = () => {
  watch('../../packages/tinper-m-basic/src/components/**/{docs,demos}/**/*', { ignoreInitial: false }, pack_docs)
}

exports.pack_docs_build = pack_docs

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

const demoApi = done => {
  const arr = fs.readdirSync('../tinper-m-basic/src/components');
  const api = [];
  // api 数量
  let api_count = 0;
  const apiReg = /^\|(\s*[a-zA-Z]+\s*)\|/
  arr.map(item => {
    if (item == 'index.d.ts') {
      return
    }
    try {
      let str = fs.readFileSync('../tinper-m-basic/src/components/' + item + '/docs/API.md', 'utf8');
      let str1 = fs.readFileSync('../tinper-m-basic/src/components/' + item + '/docs/README.md', 'utf8');
      menuArr.map((ite) => {
        const string = str1.substring(0, str.indexOf('## 何时使用'))
        let info = string.substring(string.indexOf('\n')).trim();
        let temp = false;
        ite.children.map((i) => {
          if (i.code == item) temp = true
        })
        if (temp) {
          if (ite.child) {
            ite.child.push({
              component: item,
              info
            })
          } else {
            ite.child = [{
              component: item,
              info
            }]
          }
        }
      })
      // 获取api 数量
      let apiData = str.split('\n').filter(_str => !!_str && apiReg.test(_str.trim()));
      api_count =  api_count + apiData.length;

      const apiIndex = str.indexOf('## API')
      let apiContent = str.substring(apiIndex)
      apiContent = apiContent.replace('## API', '## ' + item)
      api.push(apiContent)
    // eslint-disable-next-line no-empty
    } catch { }
  })
  // 获取组件数量
  let comp_count = menuArr.reduce((total, cur) => total + (cur.children ? cur.children.length : 0), 0)
  api.unshift('')
  api.unshift('# comp_count:' + comp_count)
  api.unshift('# api_count:' + api_count)

  fs.writeFileSync('./dist/allApi.md', api.join('\n'));
  done();
}

exports.demo_api_build = demoApi

