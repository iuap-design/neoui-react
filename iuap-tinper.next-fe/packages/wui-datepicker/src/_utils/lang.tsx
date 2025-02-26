import type { Locale as RcPickerLocale } from '@tinper/rc-picker/lib/interface'
import moment from 'moment'
import 'moment/locale/en-gb'
import 'moment/locale/id'
import 'moment/locale/vi'
import 'moment/locale/zh-cn'
import 'moment/locale/zh-tw'
import type { Lang } from '../../../wui-core/src/utils/type'
import dateLocale from '../../../wui-locale/src/dateLocale'
import type { Locale } from '../../../wui-locale/src/iLocale'
import { DatePickerProps } from '../iPicker'
import enUS from '../locale/en_US'
import idID from '../locale/id_ID'
import viVn from '../locale/vi_VN'
import zhCN from '../locale/zh_CN'
import zhTW from '../locale/zh_TW'
import { getLangInfo as getLangTool, langTransform } from './../../../wui-locale/src/tool'

// 语言标识与内部语言包关系，TODO:此处其他语言包待丰富
// const LANG_MAP: {[language: string]: any} = {
//     en: enUS,
//     'en-us': enUS,
//     zh: zhCN,
//     'zh-cn': zhCN,
//     'zh-tw': zhTW,
//     'vi-vn': viVn,
//     'id-id': idID
const i18n = {
    lang: 'zh-cn',
    'zh-cn': {...zhCN, ...dateLocale['zh-cn']},
    zh: {...zhCN, ...dateLocale['zh-cn']},
    en: {...enUS, ...dateLocale['en-us']},
    'en-us': {...enUS, ...dateLocale['en-us']},
    'zh-tw': {...zhTW, ...dateLocale['zh-tw']},
    'vi-vn': {...viVn, ...dateLocale['vi-vn']},
    'id-id': {...idID, ...dateLocale['id-id']}
};

export const weekStartsOnMap = {
    'SATURDAY': 6,
    'SUNDAY': 7,
    'MONDAY': 1
}

// 生成moment配置，如周起始日
export function getMomentConfig(dow?: DatePickerProps['weekStartsOn']): Record<string, any> {
    dow = dow && isNaN(+dow) ? weekStartsOnMap[dow] : dow
    return dow || dow === 0 ? {week: {dow: +dow}} : {};
}

/**
 * @desc 获取语言包信息
 * @param localeVal locale属性值
 * @param weekStartsOn 一周第一天
 */

export function getLangInfo({
    format,
    locale,
    weekStartsOn,
    componentName = 'datePicker',
    localeData
}: {
    format?: any,
    locale?: any;
    weekStartsOn?: DatePickerProps['weekStartsOn'];
    componentName?: string;
    localeData?: {[key: string]: any}
}): {lang: Lang; langMap: RcPickerLocale} {
    const local: {lang: string; langMap: RcPickerLocale} = getLangTool<RcPickerLocale>(locale, localeData || i18n, componentName)
    const {lang} = local
    const momentConfig = getMomentConfig(weekStartsOn)
    moment.locale(lang, momentConfig)
    // QDJCJS-12649：在中文下只显示PM/AM，而非凌晨、上午、中午、下午、晚上
    if (['zh-cn', 'zh-tw'].includes(lang)) {
        format = Array.isArray(format) ? format[0] : format
        const isLowcaseAM = format?.includes('a')
        moment.locale(lang, {
            meridiemParse: /AM|PM/i,
            meridiemHour: function(hour: number, meridiem: string) {
                if (hour === 12) {
                    hour = 0
                }
                if (meridiem.toUpperCase() === 'AM') {
                    return hour;
                } else if (meridiem.toUpperCase() === 'PM') {
                    return hour + 12
                } else {
                    // '中午'
                    return hour >= 11 ? hour : hour + 12
                }
            },
            meridiem: function(hour, minute) {
                var hm = hour * 100 + minute
                if (hm < 1200) {
                    return isLowcaseAM ? 'am' : 'AM'
                } else {
                    return isLowcaseAM ? 'pm' : 'PM'
                }
            },
            ...momentConfig
        });
    }

    return local
}

// 兼容处理props.locale = {locale:'zh-cn'}情况，修复props.locale='zh-cn'变为'en'时，moment实例locale没有同步更新的问题
export function updateValueLocale(localeVal: string | Locale, value: any) {
    let lang = '';
    if (typeof localeVal === 'string') {
        lang = localeVal;
    } else if (typeof localeVal === 'object') {
        if (localeVal.locale) {
            lang = localeVal.locale;
        } else if (localeVal.lang) {
            lang = localeVal.lang as string;
        }
    }
    lang = langTransform(lang);
    if (value && typeof value.locale === 'function') {
        value.locale(lang || 'zh-cn');
    }
}
