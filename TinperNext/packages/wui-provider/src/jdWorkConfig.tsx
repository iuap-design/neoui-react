// 统一把JDwork的字段配置在这里
// weeStartsOn timezone ： 工作台返回字段
// key ： 钉耙内部的字段
// jdworkMap ： 工作台 传入到tinper 需要的格式转化（function | Object）
// comp：该工作台属性适配哪些组件, 'all': 所有组件, string[]: 组件列表
const formJDWorkJson: {
    [key: string]: {key: string; isDataformat?: boolean; jdworkMap?: {[key: string]: any} | ((key: string) => string); comp: string[] | 'all'}
} = {
    dayOfWeek: {
        key: 'weekStartsOn',
        isDataformat: true,
        jdworkMap: {
            'SATURDAY': 6,
            'SUNDAY': 7,
            'MONDAY': 1,
        },
        comp: [
            'calendar', 'datepicker'
        ]
    },
    timezone: {
        key: 'timezone',
        isDataformat: true,
        comp: ['datepicker']
    },
    serverTimezone: {
        key: 'serverTimezone',
        isDataformat: false,
        comp: ['datepicker']
    },
    enableTimezone: {
        key: 'enableTimezone',
        isDataformat: false, // 是否从dataFormat进一步解析
        comp: ['datepicker']
    },
    locale: {
        key: 'locale',
        isDataformat: false, // 是否从dataFormat进一步解析
        comp: 'all'
    }
}
export default formJDWorkJson
