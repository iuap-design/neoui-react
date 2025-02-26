const path = require('path')
const fs = require('fs')

const pluginName = 'ModifyCssJson'

class ModifyCssJson {
    static getDefaultOptions() {
        return {cssFilePath: path.resolve(__dirname, './css.json')}
    }

    constructor(options = {}) {
        this.options = {...ModifyCssJson.getDefaultOptions(), ...options}
    }

    apply(compiler) {
        compiler.hooks.done.tap(pluginName, () => {
            fs.readFile(this.options.cssFilePath, (err, data) => {
                if (err) {
                    throw Error(err)
                } else {
                    const source = data ? JSON.parse(data.toString()) : {}
                    let target = {global: []}
                    if (source && source.global)
                        // webpack plugin代码降级，可选链不支持
                        source.global.map(item => {
                            const comp = item.components
                            if (comp && comp.indexOf(',') < 0) {
                                if (target[comp]) {
                                    target[comp].push(item)
                                } else {
                                    target[comp] = [item]
                                }
                            } else if (comp && comp.indexOf(',') > 0) {
                                target.global.push(item)
                            }
                        })
                    // 对global变量数组排序
                    target.global = target.global.sort((a, b) => a.property.localeCompare(b.property))
                    // 对整个输出的 css.json 对象文件排序
                    let sortTarget = {}
                    Object.keys(target)
                        .sort((a, b) => {
                            return b === 'global' ? 1 : a.localeCompare(b)
                        }) // 修改排序逻辑，确保global在第一个
                        .map(key => (sortTarget[key] = target[key]))
                    target = JSON.stringify(sortTarget, null, 4)

                    fs.writeFileSync(this.options.cssFilePath, target, {flag: 'w+'}, err => {
                        throw err
                    })
                }
            })
        })
    }
}

module.exports = ModifyCssJson
