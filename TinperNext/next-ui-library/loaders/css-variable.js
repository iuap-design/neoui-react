const fs = require('fs')

// 切割css变量desc描述和key、value的正则
const variableReg =
    /([\w\s\*\/]+@desc\s([\S ]+)([\s\*]+@jsOnly[\s]+(\w+))?[\w\s\*\/]+)?(--[\w\{\}\-#$]+):([\w\s\(\)\{\}\.\-#$,%]+);/g
// 组件引用的css变量
const variableInvokeReg = /[\(\n]+(--[a-zA-Z0-9\-]+)/g

/**
 * 提取指定文件中的css变量
 * @param {String} str 当前scss文件
 * @param {String} components 涉及到的组件
 * @returns
 */
function extractVariable(str, components) {
    let compVariable = [],
        globalVariable = [],
        compKeys = []
    str.replace(variableReg, (node, _, desc, _2, jsOnly, key, value) => {
        compVariable.push({
            property: key,
            value: value.replace(/\n+|\s{2,}/g, '').trim(),
            desc: desc || '',
            readonly: value.indexOf('var(') > -1,
            components: jsOnly || components
        })
        compKeys.push(key)
        if (value.indexOf('var(') > -1) {
            // 若value为var变量，则认为其引用了全局变量
            const currentVariable =
                value.match(variableInvokeReg) && value.match(variableInvokeReg)[0].replace(variableInvokeReg, '$1')
            currentVariable && globalVariable.push(currentVariable)
        }
        return node
    })

    str.replace(variableInvokeReg, (node, key) => {
        if (!compKeys.includes(key)) {
            globalVariable.push(key)
        }
        return node
    })
    return {compVariable, globalVariable: [...new Set(globalVariable)]}
}

/**
 * 组件名排序
 * @param {String} components 组件字符串
 */
function sortComponents(components) {
    return components
        .split(',')
        .sort((a, b) => a.localeCompare(b))
        .join(',')
}

/**
 * 组件变量输出到目标文件地址
 * @param {String} variableFilePath 输出文件地址
 * @param {Array} variableJson 要追加组件变量
 * @param {Array} globalVariable 组件引用的全局变量列表
 * @param {String} components 当前组件名
 */
function appendVariable(variableFilePath, variableJson, globalVariable, components) {
    let data = fs.readFileSync(variableFilePath, err => {
        console.error(err)
    })
    data = data.toString()
    let res = ''
    if (data.length === 0) {
        res = variableJson.length ? {[components]: variableJson} : {}
    } else {
        data = JSON.parse(data)
        if (components === 'global') {
            // wui-core文件的全局变量处理
            if (data['global'] && data['global'].length) {
                // 若已有其他组件写入全局变量，则只更新value、desc、readonly三项
                variableJson.forEach(variable => {
                    let isHandleVariable = false
                    data['global'].map((p, i) => {
                        // 存在该变量，则直接增加引用组件
                        if (p.property === variable.property) {
                            isHandleVariable = true
                            data['global'][i] = {
                                ...variable,
                                ...p,
                                components:
                                    (variable.components && p.components
                                        ? variable.components + ','
                                        : variable.components) + p.components
                            }
                        }
                    })

                    if (!isHandleVariable) {
                        // 不存在该变量，则新增变量及其引用组件
                        data['global'].push(variable)
                    }
                })
            } else {
                // 首次写入全局变量，直接赋值
                data['global'] = variableJson
            }
        } else {
            if (variableJson.length) {
                // wui-xxx的组件变量
                data[components] = variableJson
            }
            if (globalVariable.length) {
                // wui-xxx引用的全局变量
                if (data['global'] && data['global'].length) {
                    globalVariable.forEach(variable => {
                        let isHandledVariable = false
                        data['global'].map(p => {
                            // 存在该变量，则直接增加引用组件
                            if (p.property === variable && p.components.indexOf(components) === -1) {
                                isHandledVariable = true
                                // components排序，避免文件读取异步导致每次构建生成的components顺序不一致
                                p.components = p.components
                                    ? sortComponents(`${p.components},${components}`)
                                    : components
                            }
                        })
                        if (!isHandledVariable) {
                            // 不存在该变量，则新增变量及其引用组件
                            data['global'].push({
                                property: variable,
                                components
                            })
                        }
                    })
                } else {
                    data['global'] = []
                    globalVariable.forEach(variable => {
                        data['global'].push({
                            property: variable,
                            components
                        })
                    })
                }
            }
        }

        res = data
    }
    res = JSON.stringify(res, null, 4)

    fs.writeFileSync(variableFilePath, res.toString(), {flag: 'w+'}, err => {
        throw err
    })
}

module.exports = function (source) {
    const {
        query: {variableFilePath},
        context
    } = this
    const components = context.replace(/(.*)[\/\\]{1}wui-([-\w]+)[\/\\]{1}(scss|src)/g, '$2')
    const {compVariable: componentVariables, globalVariable} = extractVariable(
        source,
        components === 'core' ? '' : components
    )

    if (components === 'core') {
        // core文件需要提取为global
        appendVariable(variableFilePath, componentVariables, globalVariable, 'global')
    } else if (componentVariables.length || globalVariable.length) {
        // 其他组件依据文件名提取
        appendVariable(variableFilePath, componentVariables, globalVariable, components)
    }

    return source
}
