export function getCompApis(all, tested) {
    let allApis = [],
        tempCompApis = '',
        tempAllApis = []
    const allComps = Object.keys(all)
    allComps.map(compName => {
        tempCompApis = ''
        all[compName].map(({property}) => {
            if (property.includes('~~')) return // 不考虑已删除属性
            tempAllApis.push(`${compName}-${property}`)
            tempCompApis += `${property}, `
        })
        allApis.push(`${compName}: ${tempCompApis.slice(0, -2)}`)
    })

    let testedApis = [],
        tempTestedCompApis = '',
        tempTestedAllApis = []
    tested.map(({compName, props}) => {
        tempTestedCompApis = ''
        props.map(({propKey, itemsKey}) => {
            tempTestedAllApis.push(`${compName}-${itemsKey ?? propKey}`)
            tempTestedCompApis += `${itemsKey ?? propKey}, `
        })
        testedApis.push(`${compName}: ${tempTestedCompApis.slice(0, -2)}`)
    })

    let restApis = tempAllApis
        .filter(api => !tempTestedAllApis.includes(api))
        .map(api => {
            return api.split('-')
        })
        .reduce((pre, [comp, api]) => {
            let lastItem = pre[pre.length - 1]
            if (!lastItem) {
                // 初始，新组件加第一个API
                pre.push(`${comp}: ${api}, `)
            } else if (!lastItem.startsWith(comp)) {
                // 删除多余逗号
                pre[pre.length - 1] = lastItem.slice(0, -2)
                // 新组件加第一个API
                pre.push(`${comp}: ${api}, `)
            } else if (lastItem.startsWith(comp)) {
                // 已有组件加API
                pre[pre.length - 1] += `${api}, `
            }
            return pre
        }, [])

    // console.log('11111----- allApis ----', allApis)
    // console.log('11111----- testedApis ----', testedApis)
    // console.log('11111----- restApis ----', restApis)
    return {allApis, testedApis, restApis}
}

function getApiFromJson(json) {
    let jsonApiMap = {}
    const comps = Object.keys(json)
    comps.map(compName => {
        jsonApiMap[compName] = []
        json[compName].map(({property}) => {
            if (property.includes('~~')) return // 不考虑已删除属性
            jsonApiMap[compName].push(property)
        })
    })
    return jsonApiMap
}

export function getUntestedApis(all, tested) {
    let allApis = getApiFromJson(all),
        testedApis = getApiFromJson(tested)
    let untestedApis = []

    Object.keys(allApis).map(comp => {
        untestedApis.push(`${comp}: `)
        let delLast = true
        allApis[comp].map((api, i) => {
            if(!testedApis[comp].includes(api)) {
                untestedApis[untestedApis.length - 1] += `${api}, `
                delLast = false
            }
        })
        if (delLast) {
            untestedApis.pop()
        }
    })
    return untestedApis
}
