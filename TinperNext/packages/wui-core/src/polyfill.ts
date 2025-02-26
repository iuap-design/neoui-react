
const matchAll = (str: string, reg: RegExp) => {
    if (typeof ''.matchAll === 'function') {
        // 浏览器支持string.matchAll则用原生
        return str.matchAll(reg)
    }
    const flags = reg.flags
    if (flags.indexOf('g') === -1) {
        throw TypeError('`.matchAll` does not allow non-global regexes')
    }

    let res = []
    let match = reg.exec(str)
    while (match?.[0]) {
        res.push(match)
        match = reg.exec(str)
    }
    return res
}

export {matchAll}