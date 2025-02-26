const postcss = require('postcss')
const cssvariables = require('postcss-css-variables')
const nested = require('postcss-nested')
const autoprefixer = require('autoprefixer')
const postcssFlexbugsFixes = require('postcss-flexbugs-fixes')
const fs = require('fs')
const {parse, walk, generate} = require('css-tree')
const themeConfig = require('./../packages/wui-core/src/themeConfig.ts') // 内置主题的css变量配置

/**
 * @description 是否是绝对路径
 * @define {
 *    1、绝对路径定义：以 "<scheme>://" or "//" 开头；
 *    2、RFC 3986 定义的 scheme 正则如下：字母开头，其他包括字母、数字、+、.、-
 * }
 * @param {String} url
 * @returns Boolean
 */
const isAbsoluteURL = url => {
    return /^([a-z][a-z\d\+\-\.]*:)?\/\//i.test(url)
}

const tinperCss = fs.readFileSync('./dist/tinper-next.css', 'utf8')

/**
 * 生成主题对应css文件
 * @param {String} theme 主题色
 * @param {Object} config 该主题色对应变量配置
 * @param {String} inputFile 原始css文件路径
 * @param {String} outputDir 输出的文件目录
 */
function generateTheme(theme = 'default', config = {}, inputFile = tinperCss, outputDir = './dist/theme') {
    for (const [key, value] of Object.entries(config)) {
        config[key] = {value, isImportant: true}
    }

    const css4ie = postcss([
        // 加ie前缀 -ms-
        autoprefixer({
            grid: 'autoplace',
            overrideBrowserslist: ['ie 11']
        }),
        // 修复flex在ie的bug
        postcssFlexbugsFixes,
        // Flatten/unnest rules
        nested,
        // Then process any CSS variables
        cssvariables({
            variables: config
        })
    ]).process(inputFile).css

    // parse CSS to AST
    const ast = parse(css4ie)
    // traverse AST and modify it
    walk(ast, function (node) {
        if (
            this.declaration !== null &&
            node.type === 'Url' &&
            !node.value.startsWith('data:') &&
            // 相对路径
            !isAbsoluteURL(node.value)
        ) {
            node.value = `./../${node.value}` // theme文件夹相对dist路径
        }
    })
    // generate CSS from AST
    const css = generate(ast)

    if (!fs.existsSync(outputDir)) {
        fs.mkdirSync(outputDir)
    }
    fs.writeFileSync(`${outputDir}/tinper-next-${theme}.css`, css, {flag: 'w+'}, err => {
        throw err
    })
}

for (const [theme, config] of Object.entries(themeConfig)) {
    generateTheme(theme, config)
}
