import moment from 'moment'
import { matchAll } from '../../../wui-core/src'
import { DatePickerProps } from '../iPicker'

const _defaultDateFormat = 'YYYY-MM-DD'
const _defaultTimeFormat = 'HH:mm:ss'

/**
 * * 设计方案： 四位以内Y会被@tinper/rc-picker自动format为YYYY，考虑不足4位时使用S替代Y
 * * 风险点：若用户format含S，会被误转Y
 */
const getCurrentFormat = (value: string, format: string) => {
    if (!value) return ''
    const valueList = value.match(/\d+/g)
    const formatList = format.match(/\w+/gi)
    const yearFormatIndex = formatList?.findIndex(item => item.indexOf('y') > -1 || item.indexOf('Y') > -1) as number
    const monthFormatIndex = formatList?.findIndex(item => item.indexOf('M') > -1) as number
    const dayFormatIndex = formatList?.findIndex(item => item.indexOf('D') > -1) as number
    const yearValue = valueList?.[yearFormatIndex] as string
    const monthValue = valueList?.[monthFormatIndex] as string
    const dayValue = valueList?.[dayFormatIndex] as string
    let currentFormat = format
        .replace(/Y+/gi, 'S'.repeat(Math.min(yearValue?.length, 4)))
        .replace(/M+/g, 'M'.repeat(Math.min(monthValue?.length, 2)))
        // 日期输入的第一位0/1/2/3不做校正
        .replace(/D+/gi, ['0', '1', '2', '3'].includes(dayValue) ? dayValue : 'D'.repeat(Math.min(dayValue?.length, 2)))
        .substring(0, value.length)
    currentFormat = yearValue?.length > 3 ? currentFormat.replace(/S/g, 'Y') : currentFormat
    return currentFormat
}

/**
 * @description 获取分割后的date或format数组
 * @param {String} dateStr 日期字符串
 * @param {Array} joinIcon 分隔符
 * @returns 年月日时分秒数字或格式数组
 */
const splitDate = (dateStr: string, joinIcon: string[]) => {
    let joinIcons = [...joinIcon], // 包装一层，避免shift操作改变原数组
        dateArr: string[] = [],
        temp = ''
    for (let v of dateStr) {
        if (v === joinIcons?.[0]) {
            dateArr.push(temp)
            joinIcons.shift()
            temp = ''
        } else {
            temp += v
        }
    }
    const tailDate = dateStr.match(/[YyMmDdHhSsWwGgOo\d]+$/g)?.[0]
    tailDate && dateArr.push(tailDate)
    return dateArr
}

/**
 * * 年-月-日 时:分:秒 越界校正
 */
const dateFix = (
    data: string,
    joinIcon: string[],
    isChanged = false,
    format = 'YYYY-MM-DD',
    locale = 'zh-cn',
    showTime: DatePickerProps['showTime']
) => {
    if (/^[YyGg]+$/g.test(format)) {
        // 只有年，不做特别处理
        return {value: data, isChanged: true}
    }
    if (typeof showTime !== 'object') {
        showTime = {}
    }
    let {hourStep, minuteStep, secondStep} = showTime
    // 为防止用户传入step为0，导致除法报错，不能使用默认值1，需赋值
    hourStep = hourStep ? +hourStep : 1
    minuteStep = minuteStep! ? +minuteStep : 1
    secondStep = secondStep! ? +secondStep : 1
    const joinIcons = [...joinIcon]
    const date = splitDate(data, joinIcons)
    const formatArr = splitDate(format, joinIcons)
    const yearPos = formatArr.findIndex(f => /[YySGg]+/g.test(f)),
        monthPos = formatArr.findIndex(f => /M+/g.test(f)),
        dayPos = formatArr.findIndex(f => /[Dd]+/g.test(f)),
        hourPos = formatArr.findIndex(f => /[Hh]+/g.test(f)),
        minPos = formatArr.findIndex(f => /m+/g.test(f)),
        secondPos = formatArr.findIndex(f => /s+/g.test(f)),
        weekPos = formatArr.findIndex(f => /[Ww]+/g.test(f))
    let year = date[yearPos],
        month = date[monthPos],
        day = date[dayPos],
        hour = date[hourPos],
        min = date[minPos],
        second = date[secondPos],
        week = date[weekPos]
    // 月份 越界校正
    if (+month < 1 && month?.length === 2) {
        date[monthPos] = '01'
        isChanged = true
    } else if (+month > 12) {
        date[monthPos] = '12'
        isChanged = true
    }
    // 星期 越界校正
    if (+week < 1 && week?.length === 2) {
        date[weekPos] = '01'
        isChanged = true
    } else if (+week > 52) {
        moment.locale(locale)
        const lastWeek = moment(year).endOf('year').startOf('week').week()
        date[weekPos] = `${lastWeek}`
        isChanged = +week === lastWeek
    }
    // 日 越界校正
    if (day?.length === 2 && +day < 1) {
        date[dayPos] = '01'
        isChanged = true
    }
    if (+day > 28) {
        if (+month === 2) {
            const isLeap = +year % 400 === 0 || (+year % 4 === 0 && +year % 100 !== 0)
            date[dayPos] = isLeap ? '29' : '28'
            isChanged = !isLeap || day !== '29'
        } else {
            if (+day > 30) {
                date[dayPos] = [4, 6, 9, 11].includes(+month) ? '30' : '31'
                isChanged = +day > 31 || [4, 6, 9, 11].includes(+month)
            }
        }
    }

    // 小时 越界校正
    if (+hour > 23) {
        hour = '23'
        date[hourPos] = hour
        isChanged = true
    }
    // 分钟 越界校正
    if (+min > 59) {
        min = '59'
        date[minPos] = min
        isChanged = true
    }
    // 秒 越界校正
    if (+second > 59) {
        second = '59'
        date[secondPos] = second
        isChanged = true
    }

    // ! 增加时分秒输入时对步长配置的校正 start -------
    if (hour && hour.length === 2 && +hour % hourStep !== 0) {
        hour = (Math.floor(+hour / hourStep) * hourStep + '').padStart(2, '0')
        date[hourPos] = hour
        isChanged = true
    }
    if (min && min.length === 2 && +min % minuteStep !== 0) {
        min = (Math.floor(+min / minuteStep) * minuteStep + '').padStart(2, '0')
        date[minPos] = min
        isChanged = true
    }
    if (second && second.length === 2 && +second % secondStep !== 0) {
        second = (Math.floor(+second / secondStep) * secondStep + '').padStart(2, '0')
        date[secondPos] = second
        isChanged = true
    }
    // ! 增加时分秒输入时对步长配置的校正 end -------

    // 月、日只输入0/1时暂不处理，待后续输入再处理
    if (
        monthPos === date.length - 1 &&
        ['0', '1'].includes(month)
        // || (dayPos === date.length - 1 && ['0', '1', '2', '3'].includes(day))
    ) {
        joinIcons.shift()
    }
    const newValue = date.map(v => {
        if (['0', '1'].includes(v) && monthPos === date.length - 1) { // QDJCJS-23685 用户手动输入2024-0场景，手动输入横线-
            return v
        }
        let res = v + (joinIcons.shift() || '')
        return res
    }).join('')
    return {
        value: newValue,
        isChanged
    }
}

/**
 *  获取当前日期的分隔位置及分隔符
 * @param {String} value 用户输入日期
 * @param {Regex} reg 日期分割条件
 * @returns {addLength, joinIcon} 分割位置、分隔符
 */
const findMatchIndexs = (
    value: string,
    reg: RegExp = /[^YyMmDdHhSsWwGgOoAa]+/g
): {joinIcon: string[]; addLength: number[]} => {
    let joinIcon: string[] = [],
        addLength: number[] = [],
        matches = matchAll(value, reg)
    for (let match of matches) {
        joinIcon.push(match[0])
        addLength.push(match.index as number)
    }
    return {joinIcon, addLength}
}

/**
 * @param {String} param.value input date
 * @param {String} param.format custom format
 * @param {String} param.locale 多语
 * @returns
 */
const autoFormat = ({
    value,
    format = _defaultDateFormat,
    showTime,
    locale
}: {
    value: string
    format: string
    showTime: any
    locale?: string
}) => {
    let isChanged = false
    if (!value) {
        return {
            value,
            isChanged,
            format
        }
    }
    value = value.replace(/(\D){2,}/g, '$1') // 删除重复连字符
    const last = value?.length && value.substring(value.length - 1)

    let {joinIcon, addLength} = findMatchIndexs(format)
    // * 非数字输入直接切掉
    if (last && !last.match(/^\d+$/)) {
        return {
            value: value.substring(0, value.length - 1),
            isChanged: true,
            format: getCurrentFormat(value.substring(0, value.length - 1), format)
        }
    }
    if (addLength.includes(value.length)) {
        const fixedDate = dateFix(value, joinIcon, isChanged, format, locale, showTime).value
        return {
            value: fixedDate,
            isChanged: fixedDate !== value,
            format: getCurrentFormat(fixedDate, format)
        }
    }
    if (addLength.includes(value.length - 1)) {
        const joinIconIndex = addLength.findIndex(v => v === value.length - 1)
        const valueList = value.split('')
        const reg = new RegExp(joinIcon[joinIconIndex], 'g')
        if (
            valueList[value.length - 1] !== joinIcon[joinIconIndex] &&
            (value.slice(0, value.length - 1).match(reg)?.length as number) < addLength.indexOf(value.length - 1) + 1
        ) {
            valueList.splice(value.length - 1, 0, joinIcon[joinIconIndex])
            value = valueList.join('')
            isChanged = true
        }
    }
    if (value.length > format.length) {
        // * 日期超长忽略
        return {
            value: value.substring(0, format.length),
            isChanged: true,
            format: getCurrentFormat(value.substring(0, format.length), format)
        }
    }
    // * 越界校正
    const fixedValue = dateFix(value, joinIcon, isChanged, format, locale, showTime)
    return {
        value: fixedValue.value,
        isChanged: fixedValue.isChanged,
        format: getCurrentFormat(fixedValue.value, format)
    }
}

/**
 * * 修正日期删除后部分字段缺失
 */
const deleteFormat = (date: string, format: string) => {
    const dateList = moment(date, format).parsingFlags().parsedDateParts
    dateList[0] = ((dateList[0] ?? moment().format('YYYY')) + '').padStart(4, '0')
    dateList[1] = ((dateList[1] ?? 0) + 1 + '').padStart(2, '0')
    dateList[2] = ((dateList[2] ?? 1) + '').padStart(2, '0')
    return format
        .replace(/Y+/i, dateList[0])
        .replace(/M+/, dateList[1])
        .replace(/D+/i, dateList[2])
        .replace(/(\D+)00/g, '$101') // 月日为00时修正为01，如2222-00修正为2222-01
}

/**
 * @description 获取时间部分的格式
 */
const getTimeFormat = (props: DatePickerProps) => {
    const {showTime, format, picker} = props
    const reg = /[HhmSsAa]+/g
    if (format && typeof format === 'string') return format.slice(format.search(reg))
    if (typeof showTime === 'object') {
        const {use12Hours, showHour = true, showMinute = true, showSecond = true} = showTime
        const fmtString = [showHour ? use12Hours ? 'hh' : 'HH' : '', showMinute ? 'mm' : '', showSecond ? 'ss' : '']
            .filter(item => !!item)
            .join(':')
        return use12Hours ? fmtString.concat(' a') : fmtString
    } else if (showTime || picker === 'time') {
        return _defaultTimeFormat
    }
    return ''
}

/**
 * @description 获取默认格式
 */
const getDefaultFormat = (picker: string, showTime: any, props: any) => {
    showTime && picker === 'date' && (picker = 'datetime')
    const timeFmt = getTimeFormat(props)
    const defaultFormat: {[propName: string]: string} = {
        time: timeFmt,
        date: _defaultDateFormat,
        datetime: _defaultDateFormat + ' ' + timeFmt,
        week: 'gggg-WW',
        month: 'YYYY-MM',
        quarter: 'YYYY-[Q]Q',
        year: 'YYYY'
    }
    return defaultFormat[picker]
}

const canFix = (props: any, format: string) => {
    const {autoFix, picker} = props
    if (
        // 用户提供格式非年、月、日顺序时，由于其存在依赖关系，无法自动修正
        format &&
        ((format.search(/Y/gi) !== -1 &&
            format.search(/M/gi) !== -1 &&
            format.search(/Y/gi) >= format.search(/M/gi)) ||
            (format.search(/Y/gi) !== -1 &&
                format.search(/D/gi) !== -1 &&
                format.search(/Y/gi) >= format.search(/D/gi)) ||
            (format.search(/M/gi) !== -1 &&
                format.search(/D/gi) !== -1 &&
                format.search(/M/gi) >= format.search(/D/gi)) ||
            (format.search(/Y/gi) !== -1 &&
                format.search(/W/gi) !== -1 &&
                format.search(/Y/gi) >= format.search(/W/gi)))
    ) {
        return false
    }
    return !!(autoFix && (!picker || ['date', 'month', 'year', 'week'].includes(picker)))
}

/**
     * 删除尾部分隔符
     * @param {dateString} value 日期字符串
     * @param {formatString} format 格式字符串
     */
const deleteTailSeperator = (value: string, format: string) => {
    let isvalidFormatStrReg = /[^YyMmDdHhSsGgWwOoAa]+$/g
    if (isvalidFormatStrReg.test(format)) {
        let _deleteStr = format.match(isvalidFormatStrReg)?.[0]
        let _deleteValueReg = new RegExp(`${_deleteStr}$`, 'g')
        return {
            value: value.replace(_deleteValueReg, ''),
            format: format.replace(isvalidFormatStrReg, '')
        }
    }
    return {value, format}
}

export {
    autoFormat,
    canFix,
    deleteFormat,
    deleteTailSeperator,
    findMatchIndexs,
    getCurrentFormat,
    getDefaultFormat,
    getTimeFormat,
    splitDate
}
