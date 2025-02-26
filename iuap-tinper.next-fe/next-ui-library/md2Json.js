const fs = require('fs');
const path = require('path');
const marked = require('marked');

const objApi = {};

/**
 * 解析md文件，把组件api添加到 objApi对象中
 * @param {String} 文件夹的路径
 */
const mdParse = function (mdContent) {
    const json = marked.lexer(mdContent); // 解析md文件生成Array
    for(let i = 0; i<json.length; i++) {
        if (json[i].type === 'html' && json[i].raw.match(/<!--(.*)-->/) && json[i+1].type === 'table') {
            const key = json[i].raw.match(/<!--(.*)-->/)[1].trim();
            objApi[key] = handleApitoArr(json[i+1].raw);
            i++
        }
    }
}
// 字符串分割成数组
function handleApitoArr(str) {
    const arr1 = str.split('\n');
    // console.log(arr1)
    const arr2 = [];
    for(let k = 2; k < arr1.length; k++) {
        if (arr1[k]) {
            const str = arr1[k].slice(1).replace(/\\\|/g, '丨'); // | 分割线过滤适配
            arr2.push(arrToObj(str.split('|'), arr1[0].slice(1).split('|')))
        }
    }
    return arr2;
}
// 数组转成对象
function arrToObj(arr, arrKey) {
    arrItemTrim(arr);
    arrItemTrim(arrKey);
    const mapKey = {
        '参数': 'property',
        '属性': 'property',
        '名称': 'property',
        '说明': 'desc',
        '描述': 'desc',
        '类型': 'type',
        '默认值': 'value',
        '版本': 'version'
    }
    const apiObj = {};
    for (let i = 0; i < arrKey.length; i++) {
        if(mapKey[arrKey[i]]) {
            apiObj[mapKey[arrKey[i]]] = arr[i]
        }
    }
    return apiObj
}

/**
 * 去掉数组内的空格
 * @param {arr} 文件夹的路径
 */
function arrItemTrim(arr) {
    arr.map((item, i) => {
        if (item) {
            arr[i] = item.trim()
        }
    })
}


/**
 * 过滤
 * @param {String} 文件夹的路径
 * @param {String} 过滤的正则
 */
function filterFile(srcPath, regExcludes = []) {
  
    const deps = (srcPath, regExcludes = []) => {
      let files = fs.readdirSync(srcPath);
      files.forEach(function (filename) {
        let filedir = path.join(srcPath, filename);
        // console.log(filedir)
        let filterFlag = regExcludes.some(item => filedir.match(item))
        if (!filterFlag) {
          let stats = fs.statSync(filedir)
          let isFile = stats.isFile()
          if (isFile) {
            if(filedir.match(/api\.md/)) {
                const md = fs.readFileSync(filedir, 'utf8');
                mdParse(md) //  处理api.md文件
            }
          } else {
            deps(filedir, regExcludes)
          }
        }
      })
  
    }
  
    deps(srcPath, regExcludes);
  }
fs.writeFile(__dirname + '/mdApi.json', '', { 'flag': 'w+' },function(){});
filterFile('../packages',[/demo/, /src/, /test/]);
fs.writeFile(__dirname + '/mdApi.json', JSON.stringify(objApi, null, 2), { 'flag': 'w+' }, function(err) {
    if (err) {
        throw err;
    }
});