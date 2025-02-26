/**
 * // 统计当前文件夹下所有 .js .json 代码行数（相对路径）
 * node codecount ../packages .js .jsx .tsx .ts
 * // 统计 E:\pro\aliyun 目录下 .java .kt .xml .c 代码行数（绝对路径）
 * node ./app.js E:\pro\aliyun .java .kt .xml .c
 * @type {module:fs}
 */
let fs = require('fs')
let path = require('path')

// 获取命令行参数
let parm = process.argv.splice(2)
// 第一个参数是路径
let rootPath = parm[0]
// 后面的所有参数都是文件后缀
let types = parm.splice(1)
// 需要过滤的文件夹
let filter = ['./node_modules']
// 统计结果
let num = 0
let demoNum = 0;
let testNum = 0;
let srcNum = 0;

// 获取行数
async function line(path) {
    let rep = await fs.readFileSync(path)
    rep = rep.toString()
    let lines = rep.split('\n')
    console.log(path + ' ' + lines.length)
    if (path.indexOf('/demo/') > 0) {
        demoNum += lines.length;
    } else if (path.indexOf('/test/') > 0) {
        testNum += lines.length;
    } else if (path.indexOf('/src/') > 0) {
        srcNum += lines.length;
    }
    num += lines.length
}

// 递归所有文件夹统计
async function start(pt) {
    let files = fs.readdirSync(pt)
    files
        .map(file => {
            return `${pt}/${file}`
        })
        .forEach(file => {
            let stat = fs.statSync(file)
            if (stat.isDirectory()) {
                if (filter.indexOf(pt) != -1) {
                    return
                }
                start(file)
                return
            }
            let ext = path.extname(file)
            if (types.indexOf(ext) != -1) {
                line(file)
            }
        })
}

(async() => {
    await start(rootPath)
    console.log(`[总代码行数]：${num}`)
    console.log(`[业务代码行数]：${srcNum}`)
    console.log(`[测试代码行数]：${testNum}`)
    console.log(`[示例代码行数]：${demoNum}`)
})()
