import moment, {Moment} from 'moment'
// import '@formatjs/intl-datetimeformat/polyfill'

// Cache time-zone lookups from DateTimeFormat,
// as it is a *very* slow method.
const dtfCache = {}
const timezone2utcCache = {}
let _hasTimeZoneName: boolean

/**
 * 获取缓存的Intl时区对象
 */
const getDateTimeFormat = (timezone: string, timeZoneName?: string) => {
    const key = `${timezone}|${timeZoneName || 'short'}`
    let dtf = dtfCache[key]
    if (!dtf) {
        try {
            // 注意：try...catch 不能改为 supportedLocalesOf 判断
            dtf = new Intl.DateTimeFormat('zh-CN', {
                dateStyle: 'long',
                timeStyle: 'long',
                timeZone: timezone
            })
            if (_hasTimeZoneName === undefined) {
                _hasTimeZoneName = !!dtf.formatToParts().filter(({type}: {type: string}) => type === 'timeZoneName')[0]
            }
            if (!_hasTimeZoneName) {
                dtf = new Intl.DateTimeFormat('zh-CN', {
                    dateStyle: 'long',
                    timeStyle: 'long',
                    timeZoneName: 'short' /** 用于零售的windows app等低版本浏览器的配置，现代浏览器，dateStyle与timeZoneName同时传入报错，如：TypeError: Can't set option timeZoneName when dateStyle is used */,
                    timeZone: timezone
                })
            }
        } catch (e) {
            if (e instanceof RangeError) {
                // 非法时区均处理为 Asia/Shanghai
                // 如：RangeError: Invalid time zone specified: Asia/Shangha

                console.error(e, `it is modified to 'Asia/Shanghai'. `)
                try {
                    dtf = new Intl.DateTimeFormat('zh-CN', {
                        dateStyle: 'long',
                        timeStyle: 'long',
                        timeZone: 'Asia/Shanghai'
                    })
                    if (_hasTimeZoneName === undefined) {
                        _hasTimeZoneName = !!dtf
                            .formatToParts()
                            .filter(({type}: {type: string}) => type === 'timeZoneName')[0]
                    }
                    if (!_hasTimeZoneName) {
                        dtf = new Intl.DateTimeFormat('zh-CN', {
                            dateStyle: 'long',
                            timeStyle: 'long',
                            timeZoneName:
                                'short' /** 用于零售的windows app等低版本浏览器的配置，现代浏览器，dateStyle与timeZoneName同时传入报错，如：TypeError: Can't set option timeZoneName when dateStyle is used */,
                            timeZone: 'Asia/Shanghai'
                        })
                    }

                } catch (error) {

                    try {
                        dtf = new Intl.DateTimeFormat('zh-CN', {
                            year: 'numeric',
                            month: 'long',
                            day: 'numeric',
                            hour: 'numeric',
                            minute: 'numeric',
                            second: 'numeric',
                            hour12: false,
                            timeZone: timezone
                        })
                    } catch (err) {
                        if (err instanceof RangeError) {
                            // 非法时区均处理为 Asia/Shanghai
                            // 如：RangeError: Invalid time zone specified: Asia/Shangha
                            console.error(e, `it is modified to 'Asia/Shanghai'. `)
                            dtf = new Intl.DateTimeFormat('zh-CN', {
                                dateStyle: 'long',
                                timeStyle: 'long',
                                timeZone: 'Asia/Shanghai'
                            })
                            // eslint-disable-next-line max-depth
                            if (_hasTimeZoneName === undefined) {
                                _hasTimeZoneName = !!dtf
                                    .formatToParts()
                                    .filter(({type}: {type: string}) => type === 'timeZoneName')[0]
                            }
                            // eslint-disable-next-line max-depth
                            if (!_hasTimeZoneName) {
                                dtf = new Intl.DateTimeFormat('zh-CN', {
                                    dateStyle: 'long',
                                    timeStyle: 'long',
                                    timeZoneName:
                                        'short' /** 用于零售的windows app等低版本浏览器的配置，现代浏览器，dateStyle与timeZoneName同时传入报错，如：TypeError: Can't set option timeZoneName when dateStyle is used */,
                                    timeZone: 'Asia/Shanghai',
                                    year: 'numeric',
                                    month: 'long',
                                    day: 'numeric',
                                    hour: 'numeric',
                                    minute: 'numeric',
                                    second: 'numeric',
                                    hour12: false,
                                    // timeZone: timezone
                                })
                            }
                        }
                    }
                }
            }
        }
        dtfCache[key] = dtf
    }
    return dtf
}

/**
 * 秒差值转换为UTC时区
 * @param  {number} secondDiff 29143,与UTC时区的时差，单位秒
 * @returns {string} +0805
 */
const getSecond2UTC = (secondDiff: number) => {
    const flag = secondDiff >= 0 ? '+' : '-'
    secondDiff = Math.abs(secondDiff)
    const h = Math.floor(secondDiff / (60 * 60))
    secondDiff -= h * 60 * 60
    const m = Math.floor(secondDiff / 60)
    secondDiff -= m * 60
    const utcStr = `${flag}${String(h).padStart(2, '0')}${String(m).padStart(2, '0')}`
    return utcStr
}

/**
 * UTC时区转秒差值
 * @param timeZoneName Intl返回的timeZoneName
 * @example 'GMT+8:05:43' ==> 29143  || 'GMT+8' ==> 28800
 */
const getUTC2Second = (timeZoneName: string) => {
    const timeToken = timeZoneName.match(/(\+|-)?(\d{1,2})?/g)?.filter(t => t)
    const arr3 = Array.from({length: 3}, (_v, i) => timeToken?.[i] || '0')
    const secondDiff = arr3.reduce((prev, cur) => +prev * 60 + +cur, 0)
    return secondDiff
}

/**
 * GMT、UTC 时区转换为 ETC/GMT时区，兼容工作台调整或用户传值
 * @param timezone 用户传入的时区
 * @example 'utc+08' | 'gmt+08' | 'gmt+0800' ==> 'ETC/GMT-8'
 *          'utc'    | 'gmt'                 ==> 'ETC/GMT'
 */
const getGMT2ETC = (timezone: string) => {
    if (/gmt|utc/gi.test(timezone)) {
        timezone = timezone.replace(/^(gmt|utc)(\+|-)?([0-9]{0,4})$/gi, (_, _gmt, _flag, _num) => {
            const gmt = 'ETC/GMT'
            const flag = _flag === '+' ? '-' : _flag === '-' ? '+' : ''
            const num = _num && _num !== '0' ? _num.replace(/0/g, '') : ''
            return gmt + flag + num
        })
    }
    return timezone
}

/**
 * ETC/GMT-8 格式转化成utc、secondDiff
 */
const getUtcSecondDiff = (timezone: string) => {
    let utc = ''
    let secondDiff = 0
    if (timezone.includes('+')) {
        let newArr = timezone?.split('+')
        let lastNum = newArr[1]?.length === 1 ? `0${newArr[1]}` : newArr[1]
        utc = `-${lastNum}00`
        secondDiff = -1 * Number(newArr[1]) * 3600
    } else if (timezone.includes('-')) {
        let newArr = timezone?.split('-')
        let lastNum = newArr[1]?.length === 1 ? `0${newArr[1]}` : newArr[1]
        utc = `+${lastNum}00`
        secondDiff = Number(newArr[1]) * 3600
    } else {
        utc = `0000`
        secondDiff = 0
    }
    return {utc, secondDiff}
}

/**
 * 时区timezone转换为utc偏移量
 * @param {string} timezone Asia/Shanghai
 * @param {string} value
 * @param {string} format
 * @returns { utc: +0805, secondDiff: 29143 }
 */
const getUtcoffset = (timezone: string, value?: string, format?: string) => {
    const _timezone = getGMT2ETC(timezone) // 为保证缓存key一致，不可下沉到getDateTimeFormat方法
    if (!moment(value, format).isValid()) {
        if (moment(value).isValid()) {
            value = moment(value).format(format)
        } else {
            console.error('Date is invalid: ' + value)
            value = undefined
        }
    }
    const key = `${_timezone}|${value || 'short'}|${format ?? ''}` // 传入value时要求value相同才存储
    let offset = timezone2utcCache[key]
    if (!offset) {
        if (timezone && !value && (/gmt|utc/gi.test(timezone))) {
            offset = getUtcSecondDiff(_timezone)
        } else {
            value = value && moment(value, format).format('YYYY-MM-DD HH:mm:ss')
            // console.log('getUtcoffset => value', timezone, _timezone, value, format)
            const _value = value && new Date(value) // 字符串类输入无法区分，直接认为是东八区
            // console.log('getUtcoffset => _value', _value)
            const _dtf = getDateTimeFormat(_timezone) // DateTimeFormat构造函数
            const _timezoneToken = _dtf.formatToParts(_value)
            // _timezoneToken 示例
            // [
            //     {type: 'timeZoneName', value: 'GMT+8:05:43'},
            //     {type: 'literal', value: ' '},
            //     {type: 'hour', value: '20'},
            //     {type: 'literal', value: ':'},
            //     {type: 'minute', value: '04'},
            //     {type: 'literal', value: ':'},
            //     {type: 'second', value: '11'}
            // ]
            const _timeZoneNameValue = _timezoneToken.filter(({type}: {type: string}) => type === 'timeZoneName')[0]?.value
            const secondDiff = getUTC2Second(_timeZoneNameValue || 'GMT+8') // 时间偏移second 29143
            const utcStr = getSecond2UTC(secondDiff)
            offset = {
                utc: utcStr,
                secondDiff
            }
        }
        timezone2utcCache[key] = offset
    }
    return offset
}

/**
 * 时间转换器，转换为工作台时区
 */
export function timezoneAdaptor({
    isCbValue = true,
    value,
    format,
    timezone = 'Asia/Shanghai',
    serverTimezone = 'Asia/Shanghai'
}: {
    isCbValue?: boolean // 是否用于回调
    value: string | Moment // string类型视为serverTimezone构造moment， Moment类型将调整为工作台时区显示
    format: string
    timezone?: string // 工作台时区
    serverTimezone?: string // 服务端存储时区
}) {
    try {
        const deviceSecondDiff = -new Date().getTimezoneOffset() * 60 // 480
        const deviceUTC = {
            utc: getSecond2UTC(deviceSecondDiff),
            secondDiff: deviceSecondDiff
        }
        const serverUTC = getUtcoffset(serverTimezone) // now 服务端时间偏移量 8小时

        let diworkUTC, valueUTC, valueMoment
        if (typeof value === 'string') {
            diworkUTC = getUtcoffset(timezone, value, format)
            // console.log('timezoneAdaptor => diworkUTC', diworkUTC)
            valueUTC = getUtcoffset(serverTimezone, value, format) // 值服务端时间偏移量 8h 5min 43s
            valueMoment = moment(value, format)
                .utcOffset(serverUTC.secondDiff / 60, true)
                .add(diworkUTC.secondDiff - valueUTC.secondDiff, 'second') // 校正工作台与UTC时间差
        } else {
            diworkUTC = getUtcoffset(timezone, value.format(format), format)
            const secondDiff = value.utcOffset() * 60
            valueUTC = {
                utc: getSecond2UTC(secondDiff),
                secondDiff
            }
            valueMoment = value.clone().add(diworkUTC.secondDiff - deviceUTC.secondDiff, 'second')
        }

        if (isCbValue && moment.isMoment(value)) {
            valueMoment = value.clone().subtract(diworkUTC.secondDiff - valueUTC.secondDiff, 's')
        }

        // console.log(
        //     '1111--------intl -----',
        //     deviceUTC,
        //     diworkUTC,
        //     serverUTC,
        //     valueUTC,
        //     value,
        //     valueMoment,
        //     valueMoment.format()
        // )

        return {
            deviceUTC, // 设备时区 及 UTC秒差
            diworkUTC, // 工作台时区
            serverUTC, // 服务端存储时区
            valueUTC, // 值对应时区
            value: valueMoment // 调整为工作台时区的时间
        }
    } catch (error) {
        // console.log('timezoneAdaptor => error', error)
        return {
            deviceUTC: {
                secondDiff: 0,
                utc: "+0800"
            }, // 设备时区 及 UTC秒差
            diworkUTC: {
                secondDiff: 0,
                utc: "+0800"
            }, // 工作台时区
            serverUTC: {
                secondDiff: 0,
                utc: "+0800"
            }, // 服务端存储时区
            valueUTC: {
                secondDiff: 0,
                utc: "+0800"
            }, // 值对应时区
            value: moment(value, format) // 调整为工作台时区的时间
        }

    }
}
