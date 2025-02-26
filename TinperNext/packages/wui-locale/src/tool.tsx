import _cloneDeep from 'clone';
import { Lang } from '../../wui-core/src/utils/type';
import { LangMap, Locale } from './iLocale';
import { Uidmap } from './local.map';

/**
 * @desc 语言locale转换为小写和中划线
 * @param {String} lang 输入语言
 */
export function langTransform(lang: string): Lang {
    if (!lang) return lang
    let reg = new RegExp('([a-zA-Z]{2})[_-]?([A-Za-z]+)', 'g')
    return lang.replace(reg, '$1-$2').toLowerCase()
}

export const whiteLangMap = {
    calendar: ['dateFormat', 'dayFormat', 'yearFormat', 'dateTimeFormat', 'monthBeforeYear'],
    datePicker: ['dateFormat', 'dayFormat', 'yearFormat', 'dateTimeFormat', 'quarterFormat', 'monthBeforeYear']
}
/**
 * @desc 语言locale key map对象
 */
export const langMap: LangMap = {
    'zh': 'zh-cn',
    'zh-cn': 'zh-cn',
    'en': 'en-us',
    'en-us': 'en-us',
    'zh-tw': 'zh-tw',
    'vi': 'vi-vn',
    'vi-vn': 'vi-vn',
    'id': 'id-id',
    'id-id': 'id-id',
    // 'ar-sa': 'as-sa'
}
export const formatSpecially = (locale: string, i18n: {[key: string]: string | string[]} = {}) => {
    const value: {
        yearFormat?: string;
        quarterFormat?: string;
        dayFormat?: string;
        dateFormat?: string; // 没有地点使用该词条
        dateTimeFormat?: string;
        } = {}
    // 处理 yearFormat
    if (i18n.yearFormat) {
        if (locale.toLowerCase().includes('ja') || locale.toLowerCase().includes('zh')) {
            value.yearFormat = 'YYYY年'
        } else if (locale.toLowerCase().includes('ko') || locale.toLowerCase().includes('kr')) {
            value.yearFormat = 'YYYY년'
        } else if (locale.toLowerCase().includes('ug')) {
            value.yearFormat = 'YYYY-يىلى'
        } else {
            value.yearFormat = 'YYYY'
        }
    }
    //  dayFormat
    if (i18n.dayFormat) {
        if (locale.toLowerCase().includes('ja') || locale.toLowerCase().includes('zh')) {
            value.dayFormat = 'D日'
        } else if (locale.toLowerCase().includes('fr') || locale.toLowerCase().includes('hu')) {
            value.dayFormat = 'DD'
        } else if (locale.toLowerCase().includes('ug')) {
            value.dayFormat = 'D-كۈنى'
        } else {
            value.dayFormat = 'D'
        }
    }
    // dateTimeFormat
    if (i18n.dateTimeFormat) {
        if (locale.toLowerCase().includes('eu') || locale.toLowerCase().includes('si')) {
            value.dateTimeFormat = 'YYYY/M/D HH:mm:ss'
        } else if (locale.toLowerCase().includes('az') || locale.toLowerCase().includes('de') || locale.toLowerCase().includes('et') || locale.toLowerCase().includes('cs')
        || locale.toLowerCase().includes('fi') || locale.toLowerCase().includes('hr') || locale.toLowerCase().includes('lv') || locale.toLowerCase().includes('mk') || locale.toLowerCase().includes('sk')) {
            value.dateTimeFormat = 'D.M.YYYY HH:mm:ss'
        } else if (locale.toLowerCase().includes('bg')) {
            value.dateTimeFormat = 'D M YYYY HH:mm:ss'
        } else if (locale.toLowerCase().includes('ar') || locale.toLowerCase().includes('en') || locale.toLowerCase().includes('fa') || locale.toLowerCase().includes('he') || locale.toLowerCase().includes('hi')
        || locale.toLowerCase().includes('ka') || locale.toLowerCase().includes('kn') || locale.toLowerCase().includes('ml') || locale.toLowerCase().includes('mm')
        || locale.toLowerCase().includes('ms') || locale.toLowerCase().includes('ta') || locale.toLowerCase().includes('tr') || locale.toLowerCase().includes('ur') || locale.toLowerCase().includes('uz')) {
            value.dateTimeFormat = 'M/D/YYYY HH:mm:ss'
        } else if (locale.toLowerCase().includes('fr')) {
            value.dateTimeFormat = 'DD/MM/YYYY HH:mm:ss'
        } else if (locale.toLowerCase().includes('hu') || locale.toLowerCase().includes('mn')) {
            value.dateTimeFormat = 'YYYY/MM/DD HH:mm:ss'
        } else if (locale.toLowerCase().includes('by') || locale.toLowerCase().includes('kk') || locale.toLowerCase().includes('nl') || locale.toLowerCase().includes('ru') || locale.toLowerCase().includes('uk')) {
            value.dateTimeFormat = 'D-M-YYYY HH:mm:ss'
        } else if (locale.toLowerCase().includes('ja') || locale.toLowerCase().includes('tw')) {
            value.dateTimeFormat = 'YYYY年M月D日 HH時mm分ss秒'
        } else if (locale.toLowerCase().includes('zh')) {
            value.dateTimeFormat = 'YYYY年M月D日 HH时mm分ss秒'
        } else if (locale.toLowerCase().includes('km')) {
            value.dateTimeFormat = 'YYYY-M-D HH:mm:ss'
        } else if (locale.toLowerCase().includes('nb') || locale.toLowerCase().includes('sl') || locale.toLowerCase().includes('sr')) {
            value.dateTimeFormat = 'DD.MM.YYYY HH:mm:ss'
        } else if (locale.toLowerCase().includes('sv')) {
            value.dateTimeFormat = 'YYYY-MM-DD H:mm:ss'
        } else if (locale.toLowerCase().includes('ug')) {
            value.dateTimeFormat = 'YYYY-يىلىM—ئاينىڭD-كۈنى، HH:mm:ss'
        } else {
            value.dateTimeFormat = 'D/M/YYYY HH:mm:ss'
        }
    }
    if (i18n.quarter) {
        if (locale.toLowerCase().includes('en')) {
            value.quarterFormat = '[Q]Q'
        } else {
            value.quarterFormat = `Q[${i18n.quarter}]`
        }
    }
    return value
}
/**
 * 获取locale的语言对象
 * @param localeVal
 * @param i18n
 */
export let globalLangs = {};
export const mapLangFn = (config: {[key: string]: string}) => {
    if (config.locale) {
        return config
    }
    const middleLocales: {[key: string]: string} = {}
    // 生成 component-key: value 的格式
    Object.entries(config).forEach(([key, value])=> {
        if (Uidmap[key] && typeof Uidmap[key] === 'string') {
            middleLocales[Uidmap[key]] = value
        } else if (Uidmap[key] && Array.isArray(Uidmap[key])) {
            Uidmap[key].forEach((k: string) => {
                middleLocales[k] = value
            })
        }
    })

    const returnLocales = transformKeyToNestedObject(middleLocales)
    return returnLocales
};

/**
 * @description 1、key以短横线-分割转换为嵌套对象；
 *              2、value中动态内容替换为花括号；
 *              3、需分割的value转换为数组；
 * @param obj 键值对数组， 如 {'calendar-allDay': "全天", 'form-date-format': "'${label}' 是非法的日期格式"}
 * @returns
 *          {
                "calendar": {
                    "allDay": "全天"
                },
                "form": {
                    "date": {
                        "format": "'${label}' 是非法的日期格式"
                    }
                }
            }
 */
function transformKeyToNestedObject(obj: Record<string, any>): any {
    const keys = Object.entries(obj)
    const result: any = {};

    keys.forEach(([keyPathStr, value]) => {
        const keyPath = keyPathStr.split('-'); // 如 'form-number-min'
        let currentLevel = result;
        // 遍历keys数组，将每个key作为路径，构建嵌套对象
        for (let i = 0; i < keyPath.length - 1; i++) {
            const key = keyPath[i];
            if (!currentLevel[key]) {
                currentLevel[key] = {};
            }
            currentLevel = currentLevel[key];
        }
        // 设置最后一个key的值
        const lastKey = keyPath[keyPath.length - 1];
        value.replace(/<%=/g, '{').replace(/%>/g, '}')
        if (value.includes('__')) { // 键值对数组， 如 "1月__2月__3月__4月__5月__6月__7月__8月__9月__10月__11月__12月"
            value = value.split('__')
        }
        currentLevel[lastKey] = value;
    });

    return result;
}

export function getLangInfo<T extends Record<string, any>>(localeVal?: string | Locale, i18n: Locale = {}, componentName = ''): {lang: Lang, langMap: T} {
    i18n = _cloneDeep(i18n)
    let lang = 'zh-cn';
    if (localeVal && typeof localeVal === "object") {
        if ('locale' in localeVal) {// 兼容antd语言包对象，对象中存在locale属性则直接获取语言类型即可
            lang = localeVal.locale as string ;
        } else if ('lang' in localeVal) {// 兼容tinper的Locale组件语言包
            lang = localeVal.lang as string;
        } else {// 直接引入DataPicker组件语言包对象暂不提供支持
            console.error('暂不支持语言包对象，请使用locale="zh-cn"或locale="en"等语言标识');
        }
        lang = langTransform(lang)
        lang = langMap[lang] ?? lang;
        i18n[lang] = {...i18n[lang], ...localeVal, locale: lang};
    } else if (localeVal && typeof localeVal === "string") {// 4.x支持的语言标识
        localeVal = langTransform(localeVal);
        i18n[localeVal] = {...i18n[lang], ...i18n[localeVal], locale: localeVal}
        lang = localeVal
        if (globalLangs[lang]) {
            const componentLangMap = globalLangs[lang][componentName];
            if (!componentLangMap) {
                i18n[lang] = i18n[lang || 'zh-cn'];
                console.error(`此环境中多语平台中缺少TinperNext${componentName}组件的语言注册`)
            } else {
                const componentLangMapKeys = Object.keys(componentLangMap);
                if (!componentLangMap || !componentLangMapKeys.length) {
                    i18n[lang] = i18n[lang || 'zh-cn'];
                    console.error(`此环境中多语平台中缺少TinperNext${componentName}组件的语言注册`)
                } else {
                    Object.keys(i18n[lang]).forEach((key) => {
                        if (!componentLangMapKeys.includes(key) && key !== 'locale' && (!whiteLangMap[componentName] || !whiteLangMap[componentName].includes(key))) {
                            console.error(`此环境中多语平台中缺少对TinperNext${componentName}组件${key}字段的注册`)
                        }
                    })
                    // 增加locale 属性  个别 组件会用到（datepicker） 如果传入的词条没有对应的组件则默认取内置 如不存在内置语种 则取汉语
                    i18n[lang] = {
                        // 如果 多语出入字段缺失 则取本地该语种词条
                        ...i18n[lang],
                        ...componentLangMap,
                        locale: lang,
                        ...formatSpecially(lang, {...i18n['zh-cn'], ...componentLangMap})
                    }
                }
            }
        } else {
            lang = langTransform(lang)
        }
    }
    lang = langMap[lang] ?? lang; // locale='en' 转换为 locale='en-us'
    return {// 默认中文
        lang: lang, // 语言类型
        langMap: i18n[lang] || {} // 语言关系包
    }
}
