import moment, {Moment} from 'moment'
import {DatePickerProps, DatePickerState} from '../iPicker'

const halfYearFormat = (date: Moment, locale: DatePickerState['lang'], hasYear: boolean = true): string => {
    const year = hasYear ? date.year() + '-' : ''
    if (!locale.lang || ['zh-cn', 'zh-tw'].includes(locale.lang)) {
        return date.month() >= 0 && date.month() <= 5
            ? `${year}${locale.langMap.firstHalfYear}`
            : `${year}${locale.langMap.secondHalfYear}`
    } else {
        return date.month() >= 0 && date.month() <= 5
            ? `${year}${year ? 'FH' : locale.langMap.firstHalfYear}`
            : `${year}${year ? 'SH' : locale.langMap.secondHalfYear}`
    }
}

const getHalfYearArr = (locale: DatePickerState['lang'], valueStr: string) => {
    let flag = ''
    ;[locale.langMap.firstHalfYear, locale.langMap.secondHalfYear, 'FH', 'SH'].find((item: string, i: number) => {
        if (valueStr.includes(item)) {
            flag = i % 2 === 0 ? 'FH' : 'SH'
        }
    })
    return [valueStr.match(/^\d+/)?.[0] || '', flag]
}

/**
 * halfYear 无通用格式及moment值，需自行构造
 */
const getHalfYear = (value: DatePickerProps['value'], locale: DatePickerState['lang']) => {
    if (!value) return {value: null, dateString: ''}
    let format = 'YYYY '
    if (value && typeof value === 'string') {
        format += [locale.langMap.firstHalfYear, locale.langMap.secondHalfYear, 'FH', 'SH'].find((item, i) => {
            if ((value! as string).includes(item)) {
                value = moment(value, format).set('M', 6 * (i % 2))
                return true
            }
        })
        if (typeof value === 'string' && moment(value).isValid()) {
            value = moment(value)
        }
    }

    if (!moment.isMoment(value)) {
        return {value: null, dateString: ''}
    }

    let date = value,
        dateFormat = halfYearFormat(date, locale, true)
    let h1 = moment(date, dateFormat).set('M', 0)
    let h2 = moment(date, dateFormat).set('M', 6)
    let h1Str = h1.format(dateFormat)
    let h2Str = h2.format(dateFormat)

    let isH1 = (typeof value === 'string' && value === h1Str) || (typeof value === 'object' && value.get('M') <= 5)
    let isH2 = (typeof value === 'string' && value === h2Str) || (typeof value === 'object' && value.get('M') >= 6)
    if (!isH1 && !isH2) {
        // 如：非法string输入
        console.error('halfYear format is incorrect.')
        return {value: null, dateString: ''}
    }
    return {
        value: isH1 ? h1 : h2,
        dateString: isH1 ? h1Str : h2Str
    }
}

export {getHalfYear, halfYearFormat, getHalfYearArr}
