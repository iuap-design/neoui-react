/**
 * Refactor by liuxiangyang on 2021/9/7.
 */
import classnames from 'classnames'
import moment from 'moment'
import omit from 'omit.js'
import React, { Component, ReactNode } from 'react'
import { findDOMNode } from 'react-dom'
// import PropTypes from 'prop-types'
import RcPicker from '@tinper/rc-picker'
import momentGenerateConfig from '@tinper/rc-picker/lib/generate/moment'
import type { Locale, PanelMode } from '@tinper/rc-picker/lib/interface'
import type { Moment } from 'moment'
import {
    cssUtil,
    formatUtils,
    getChildrenText,
    getNid,
    KeyCode,
    prefix,
    setComponentClass,
    timezoneAdaptor,
    Warning,
    WebUI
} from '../../wui-core/src'
import Icon from '../../wui-icon/src'
import { globalConfig } from '../../wui-provider/src'
import { autoFormat, canFix, deleteFormat, deleteTailSeperator, getDefaultFormat } from './_utils/autoFix'
import { getHalfYear, getHalfYearArr, halfYearFormat } from './_utils/halfYearUtils'
import { getLangInfo, getMomentConfig } from './_utils/lang'
import { BUILT_IN_PLACEMENTS } from './_utils/placement'
import { getActivePresetLabel, getPresets } from './_utils/presets'
import type { DatePickerProps, DatePickerState } from './iPicker'

const {isShouldUpdate /* 废弃API调用时提示更新 */} = Warning

export const _PREFIX_CLS = `${prefix}-picker`
const pickers = ['time', 'date', 'week', 'month', 'year']

// 需包装处理的 props
const _handleProps: (keyof DatePickerProps)[] = [
    'autoFix',
    'clsPrefix',
    'className',
    'size',
    'bordered',
    'getPopupContainer',
    'locale',
    'weekStartsOn',
    'timezone',
    'serverTimezone',
    'enableTimezone',
    'open',
    'disabledDateValid',
    'defaultOpen',
    'defaultPanelShown',
    'defaultValue',
    'dropdownAlign',
    'dropdownClassName',
    'popupClassName',
    'placement',
    'showTime',
    'showHour',
    'showMinute',
    'showSecond',
    'use12Hours',
    'enterKeyDown',
    'onOpenChange',
    'onKeyDown',
    'outInputKeydown',
    'onBlur',
    'onDateInputBlur',
    'onFocus',
    'onClick',
    'outInputFocus',
    'onChange',
    'onOk',
    'onSelect',
    'dateRender',
    'dateCellRender',
    'monthCellRender',
    'monthCellContentRender',
    'clearIcon',
    'closeIcon',
    'suffixIcon',
    'iconClick',
    'dir'
]

const defaultProps = {
    size: 'md',
    // locale: 'zh-cn',
    transitionName: 'slide-up',
    clearIcon: <Icon type='uf-close-c' />,
    suffixIcon: <Icon type='uf-calendar' />,
    timezone: 'Asia/Shanghai',
    serverTimezone: 'Asia/Shanghai',
    enableTimezone: false,
    allowClear: true,
    autoFix: true,
    enterKeyDown: true,
    // validatorFunc: () => true,
    isHeaderSelect: true
}

@WebUI({name: 'datepicker', defaultProps})
class DatePicker extends Component<DatePickerProps, DatePickerState> {
    // pickerRef: React.MutableRefObject<PickerRefConfig>;
    pickerRef = React.createRef<HTMLDivElement>()
    yearUl?: HTMLDivElement | null
    monthUl?: HTMLDivElement | null
    constructor(props: DatePickerProps) {
        super(props)

        const presets = getPresets(props.presets);
        const format = this.generateFormat(props.format);
        this.state = {
            lang: getLangInfo(props),
            // @ts-ignore
            presets,
            activePresetLabel: getActivePresetLabel({...props, presets}),
            open: this.initOpen(props),
            value: this.initValue(props),
            format: this.initWw(props.format)
                ? format
                : format.replace(/ww/gi, 'wo'),
            initFormat: format,
            dropdownAlign: this.getPlacement(),
            showTime: this.getShowTimeOptions(props),
            clearIcon: this.generateClearIcon(),
            suffixIcon: this.generateSuffixIcon(props),
            _isFix: canFix(props, format),
            _forbidOpen: false,
            diffValue: [0, 0],
            selectYear: 0,
            selectMonth: 0,
            // menuValue: '',
            maskShow: false,
            activeYearNum: 0,
            activeMonthNum: 0
        }
    }

    componentDidMount() {
        // eslint-disable-next-line react/no-find-dom-node
        const pickerRef = findDOMNode(this.pickerRef.current) as HTMLDivElement
        const input = pickerRef?.getElementsByTagName('input')[0]
        input.addEventListener('input', this.handleInputFormat)
        // <--------- 仅用于自动化测试 start ------->
        const {fieldid} = this.props
        fieldid !== undefined && input.setAttribute('fieldid', `${fieldid}_input`)
        // <--------- 仅用于自动化测试 end ------->
        this.initSelectValue()
    }

    UNSAFE_componentWillReceiveProps(nextProps: DatePickerProps) {
        if ('value' in nextProps) {
            // QDJCJS-7554 不能增加新值原值不同判断，有业务场景会判断后传入相同的值
            this.setState({
                value: this.initValue(nextProps)
            })
        }
        if ('open' in nextProps && typeof nextProps.open === 'boolean') {
            this.setState({
                open: nextProps.open
            })
        }
        if ('format' in nextProps) {
            const format = this.generateFormat(nextProps.format);
            this.setState({
                format,
                initFormat: format
            })
        }
        if (
            'showTime' in nextProps ||
            'showHour' in nextProps ||
            'showMinute' in nextProps ||
            'showSecond' in nextProps
        ) {
            this.setState({
                showTime: this.getShowTimeOptions(nextProps)
            })
        }
        if ('suffixIcon' in nextProps || 'renderIcon' in nextProps) {
            this.setState({
                suffixIcon: this.generateSuffixIcon(nextProps)
            })
        }
        if ('locale' in nextProps) {
            let lang = getLangInfo(nextProps) // 获取语言包信息
            this.setState({lang})
        }
        if ('activePresetKey' in nextProps) {
            const presets = getPresets(nextProps.presets);
            this.setState({
                activePresetLabel: getActivePresetLabel({...nextProps, presets})
            })
        }
    }

    componentWillUnmount() {
        // eslint-disable-next-line react/no-find-dom-node
        const input = (findDOMNode(this.pickerRef.current) as HTMLDivElement)?.getElementsByTagName('input')[0]
        input.removeEventListener('input', this.handleInputFormat)
    }

    initOpen = (props: DatePickerProps) => {
        const {open, defaultOpen, defaultPanelShown} = props
        return open ?? defaultOpen ?? defaultPanelShown ?? false
    }

    initSelectValue = () => {
        // 初始化下拉默认值
        let {value, defaultValue, picker, disabledDateValid, disabledDate, isHeaderSelect} = this.props
        const { open } = this.state
        if (!isHeaderSelect || !open) false
        let selectYear = 0
        let selectMonth = 0
        let dateValue = value || defaultValue
        if (dateValue) {
            if (picker === 'week') {
                let formatCopy = 'gggg-ww'
                if (moment(dateValue, formatCopy).isValid()) {
                    let newValue = moment(dateValue, formatCopy)
                    selectYear = moment(newValue).year()
                    selectMonth = moment(newValue).month() + 1
                } else {
                    console.error(
                        'value is not in the correct format week --- initSelectValue : ',
                        dateValue,
                        formatCopy
                    )
                }
            } else {
                if (moment(dateValue).isValid()) {
                    selectYear = moment(dateValue).year()
                    selectMonth = moment(dateValue).month() + 1
                } else {
                    console.error('value is not in the correct format date --- initSelectValue : ', dateValue)
                }
            }
        } else {
            selectYear = new Date().getFullYear()
            selectMonth = new Date().getMonth() + 1
        }

        if (!disabledDateValid && dateValue) {
            let isDisableDate = disabledDate?.(moment(dateValue))
            if (isDisableDate) {
                selectYear = new Date().getFullYear()
                selectMonth = new Date().getMonth() + 1
            }
        }

        this.setState({
            selectYear: selectYear,
            selectMonth: selectMonth
        })
    }

    initValue = ({
        timezone,
        serverTimezone,
        enableTimezone,
        value,
        showTime,
        picker,
        locale,
        weekStartsOn,
        format: customFormat,
        disabledDateValid = true,
        disabledDate,
        onChange
    }: DatePickerProps) => {
        const format = this.generateFormat(customFormat as string)
        if (value) {
            if (typeof value === 'string') {
                if (moment(value, format).isValid()) {
                    if (!picker || picker === 'date') {
                        if (showTime) {
                            if (enableTimezone) {
                                // 仅showTime时转换时区
                                const {diworkUTC, serverUTC} = timezoneAdaptor({
                                    value,
                                    format,
                                    timezone,
                                    serverTimezone
                                })
                                value = moment(value, format).add(diworkUTC.secondDiff - serverUTC.secondDiff, 's')
                            } else {
                                value = moment(moment(value, format).format(format), format)
                            }
                        } else {
                            value = moment(moment(value, format).format(format), format).startOf('date')
                        }
                    } else if (picker === 'halfYear') {
                        value = getHalfYear(value, getLangInfo({locale, weekStartsOn})).value
                    } else {
                        value = moment(moment(value, format).format(format), format)
                    }
                } else {
                    console.error('value is not in the correct format string --- initValue : ', value, format)
                    value = null
                }
            } else if (value?.isValid?.()) {
                // nothing to do
                if (enableTimezone && showTime && (!picker || picker === 'date')) {
                    value = timezoneAdaptor({value: value!, format, timezone, serverTimezone, isCbValue: false}).value
                }
                value = this._getFormatStartDate({showTime, picker, value})
            } else {
                console.error('value is not in the correct format moment --- initValue : ', value, format)
                value = null
            }
        }

        if (!disabledDateValid && value) {
            let isDisableDate = disabledDate?.(value as Moment) // 此处value已经过时区转换，无需再处理
            if (isDisableDate) {
                onChange?.(null, '')
                return null
            }
        }

        // 确保value的moment实例多语版本一致
        if (value && typeof value !== 'string' /*  && value?.locale */) {
            let langInfo = getLangInfo({locale, weekStartsOn}) // 获取语言包信息
            moment.locale(langInfo.lang, getMomentConfig(weekStartsOn))
            value = moment(value, format)
        }
        return value
    }

    initWw = (format: DatePickerProps['format']): boolean => {
        return !!format && /ww|w(?!o)/gi.test(Array.isArray(format) ? format?.[0] : format) // 匹配ww和w，不匹配wo
    }

    generateFormat = (customFormat?: string | string[]) => {
        let {format, picker = '', showTime} = this.props

        const globalDataFormat = globalConfig().getGlobalDataFormat()
        // format接入工作台首选项等provider配置
        if (!format && (!picker || picker === 'date') && globalDataFormat) {
            const {dateTimeFormat, dateFormat} = globalDataFormat
            format = formatUtils.diworkFormat2Picker(
                showTime ? dateTimeFormat : dateFormat,
                showTime ? 'datetime' : 'date'
            ).format
        }
        // 数组format来源于用户设置的首选项，其中第0项是用户选中值，故format强制取[0]，无需根据list顺序匹配
        customFormat = Array.isArray(customFormat) ? customFormat[0] : customFormat // 兼容string、array类型format
        let mergeFormat = Array.isArray(format) ? format[0] : format // 兼容string、array类型format
        if (picker === 'week' && (customFormat || mergeFormat)) {
            /**
             * YYYY 格式会导致1月1号等日期所在周年错误，需替换为ISO标准的 g 周年；
             * 如：2023-01-01 在YYYY-ww 格式下错误输出 2023-52，
             *                 gggg-ww 格式下正确输出 2023-01
             */
            customFormat = customFormat?.replace(/y/gi, 'g')
            mergeFormat = mergeFormat?.replace(/y/gi, 'g')
        }
        const _result =
            customFormat ||
            mergeFormat ||
            getDefaultFormat(pickers.includes(picker) ? picker : 'date', showTime, this.props)
        return this.initWw(format) ? _result : _result.replace(/W/g, 'w').replace('wo', 'ww')
    }

    /**
     * 格式化Input输入内容
     *  =========== input输入字符串视为diwork时区字符串（与props字符串视为server时区不同），回调将调整为sercer时区 ============
     */
    handleInputFormat = (e: any) => {
        const {onChange, onOpenChange, picker, showTime, timezone, serverTimezone, enableTimezone} = this.props
        let format = this.state.initFormat
        // * 开启自动校正
        if (this.state._isFix) {
            let value = e.target.value,
                isDeleteChanged = false
            if (/^\d{5}$/.test(value)) {
                // 处理删除尾部补足的分隔符-后再输入数字时只填充分隔符-而没数字问题
                value = value.slice(0, 4) + '-' + value.slice(4)
                isDeleteChanged = true
            } else if (value.search(/\d{5,}/) > -1) {
                // 处理日期中间删除问题
                value =
                    e.target.value.slice(0, Math.max(0, e.target.selectionStart - 1)) +
                    e.target.value.slice(e.target.selectionStart)
                isDeleteChanged = true
            }

            let formatDate = autoFormat({value, format, showTime, locale: this.state.lang.lang})
            let valueStr = formatDate.value
            if (e.inputType === 'deleteContentBackward') {
                if (value.length === 0) {
                    // 删除到空时需触发onChange，并关闭面板触发onOpenChange
                    this.setState({
                        open: false,
                        value: null,
                        format
                    })
                    onChange?.(null, '')
                    onOpenChange?.(false, null, '')
                    return
                }
                // 删除操作尾部分隔符处理
                formatDate = Object.assign(formatDate, deleteTailSeperator(valueStr, formatDate.format))
            }

            let valueMoment = moment(valueStr, formatDate.format)
            if (formatDate.isChanged || isDeleteChanged) {
                if (/\D0$/g.test(valueStr)) {
                    /* 尾部的-0特别处理，format替换为-0 */
                    let tempFormat = formatDate.format.slice(0, -2) + valueStr.slice(-2)
                    this.setState({
                        value: valueStr ? moment(valueStr, tempFormat) : null,
                        format: tempFormat
                    })
                } else if (!/[^S]+/g.test(formatDate.format)) {
                    /* 只有年的特别处理，Y被转S替换，禁止用户非数字输入 */
                    this.setState({
                        value: valueStr ? moment(valueStr.replace(/\D+/g, ''), formatDate.format) : null,
                        format: formatDate.format
                    })
                } else {
                    this.setState({
                        value: valueStr ? moment(valueStr, formatDate.format) : null,
                        format: formatDate.format
                    })
                }
            }
            if (
                // 输入完成
                format?.length === valueStr?.length &&
                valueMoment.isValid()
            ) {
                this.setState({
                    open: false, // 输入完成需关闭面板，并触发onOpenChange回调
                    value: valueMoment,
                    format
                })

                if (enableTimezone && showTime && (!picker || picker === 'date')) {
                    valueMoment = timezoneAdaptor({
                        value: valueMoment,
                        format,
                        timezone,
                        serverTimezone
                    }).value
                    valueStr = this.getValue(valueMoment) || ''
                }
                onChange?.(valueMoment, valueStr)
                onOpenChange?.(false, valueMoment, valueStr)
            }
        } else {
            // * 无需自动校正场景，仅保留合法值
            let inputValue = e.target.value
            let valueMoment = moment(inputValue, format)

            // halfYear 单独处理回调及相关dom事件
            if (inputValue.length === format.length && picker === 'halfYear') {
                requestAnimationFrame(() => {
                    const {value, dateString} = getHalfYear(inputValue, this.state.lang)
                    this.setState({value})
                    const halfYearArr = getHalfYearArr(this.state.lang, dateString)
                    onChange?.(value, dateString, halfYearArr)
                })
            } else if (inputValue.length === format.length && valueMoment.isValid()) {
                requestAnimationFrame(() => {
                    this.setState({
                        value: valueMoment,
                        format
                    })

                    if (enableTimezone && showTime && (!picker || picker === 'date')) {
                        valueMoment = timezoneAdaptor({
                            value: valueMoment,
                            format,
                            timezone,
                            serverTimezone
                        }).value
                        inputValue = this.getValue(valueMoment) || ''
                    }
                    onChange?.(valueMoment, inputValue)
                })
            }
        }
    }

    // 获取格式后的日期字符串
    getValue = (value: moment.Moment | string) => {
        const {timezone, serverTimezone, enableTimezone} = this.props
        const {format, initFormat} = this.state
        // 此处value可能为string或Moment或空
        if (enableTimezone && moment.isMoment(value)) {
            const {serverUTC, deviceUTC} = timezoneAdaptor({value, format, timezone, serverTimezone})
            value = value.clone().add(serverUTC.secondDiff - deviceUTC.secondDiff, 's') // 用于回调，需要校正为serverTimezone时区时间
        }
        return moment.isMoment(value) ? value.format(initFormat) : value
    }

    getShowTimeOptions = (props: DatePickerProps) => {
        let {format: customFormat, showTime, showHour, showMinute, showSecond, picker} = props
        if (!showTime) return false
        const format = this.generateFormat(customFormat as string)

        const globalDataFormat = globalConfig().getGlobalDataFormat()
        // showTime接入工作台首选项等provider配置
        if ((!picker || picker === 'date') && globalDataFormat) {
            const {dateTimeFormat} = globalDataFormat
            const diworkFormat = formatUtils.diworkFormat2Picker(dateTimeFormat, showTime ? 'datetime' : 'date')
            showTime = {...diworkFormat.showTime, ...(typeof showTime === 'object' ? showTime : {})}
        }
        let showTimeOptions: DatePickerProps['showTime'] = {},
            zeroTime = moment('00:00:00', 'HH:mm:ss')
        if (typeof showTime === 'object') {
            // showTime.defaultValue如非moment，则转换为moment
            let {defaultValue, format, use12Hours, hourStep, minuteStep, secondStep} = showTime
            // 为防止用户传入step为0，导致除法报错，不能使用默认值1，需赋值
            hourStep = hourStep ? +hourStep : 1
            minuteStep = minuteStep! ? +minuteStep : 1
            secondStep = secondStep! ? +secondStep : 1
            if (!format) {
                format = use12Hours ? 'hh:mm:ss a' : 'HH:mm:ss'
            }
            if (defaultValue) {
                if (typeof defaultValue === 'string') {
                    if (moment(defaultValue, format).isValid()) {
                        defaultValue = moment(defaultValue, format)
                    } else if (!moment(defaultValue, format).isValid()) {
                        defaultValue = zeroTime
                    }
                } else if (!defaultValue?.isValid?.()) {
                    defaultValue = zeroTime
                }
            } else {
                defaultValue = zeroTime // 默认时分秒为 0点0分0秒
            }
            showTimeOptions = {...showTime, defaultValue, hourStep, minuteStep, secondStep}
        } else {
            // 兼容 TimePickerPanel 配置
            showTimeOptions = {
                format,
                showHour,
                showMinute,
                showSecond,
                defaultValue: zeroTime // 默认时分秒为 0点0分0秒
            }
        }
        if (showTimeOptions?.use12Hours) {
            showTimeOptions.format = showTimeOptions.format ? showTimeOptions.format.replace(/H/gi, 'h') : 'hh:mm:ss a'
        }
        return showTimeOptions
    }

    getPlacement = () => {
        // placement更新为dropdownAlign
        const {dropdownAlign, placement = 'bottomLeft'} = this.props
        return BUILT_IN_PLACEMENTS[dropdownAlign || placement]
    }

    handleOpenChange = (open: boolean) => {
        // 兼容enterKeyDown禁止打开面板
        if (this.state._forbidOpen && open) return
        this.setState({open})
        const {onOpenChange, showTime, picker, timezone, serverTimezone, enableTimezone} = this.props
        let {value, initFormat: format} = this.state

        if (enableTimezone && value && showTime && (!picker || picker === 'date')) {
            value = timezoneAdaptor({value, format, timezone, serverTimezone, isCbValue: moment.isMoment(value)}).value
        }

        onOpenChange?.(
            open,
            value,
            picker === 'halfYear'
                ? getHalfYear(value, this.state.lang).dateString
                : moment.isMoment(value) // eslint-disable-next-line indent
                ? this.getValue(value) // eslint-disable-next-line indent
                : value ?? ''
        )
        if (!open) {
            this.setState({
                maskShow: open
            })
        } else {
            if (value) {
                this.setState({
                    diffValue: [0, 0], // QDJCJS-26813 修复MonthPicker先选择一个月份，再切换年月，年份会每次选择后减N问题
                    selectYear: moment(value).year(),
                    selectMonth: moment(value).month() + 1
                })
            }
        }
    }

    handleKeyDown = (e: any) => {
        const {
            onKeyDown,
            outInputKeydown,
            onOpenChange,
            onChange,
            enterKeyDown,
            picker,
            showTime,
            timezone,
            serverTimezone,
            enableTimezone
        } = this.props
        const format = this.state.initFormat
        let _forbidOpen = false
        if (e.keyCode === KeyCode.ESC) {
            let value = this.state.value
            this.setState({format, open: false})
            let valueStr = moment.isMoment(value) ? value.format(format) : value ?? ''

            if (
                enableTimezone &&
                value &&
                showTime &&
                (!picker || picker === 'date') &&
                (typeof value === 'string' || value.isValid?.())
            ) {
                value = timezoneAdaptor({
                    value,
                    format,
                    timezone,
                    serverTimezone,
                    isCbValue: moment.isMoment(value)
                }).value
                valueStr = this.getValue(value) || ''
            }

            onOpenChange?.(false, value, valueStr)
        } else if (e.keyCode === KeyCode.BACKSPACE) {
            // * 删除拖蓝选中内容
            let s = getSelection() as unknown as string
            let reg = new RegExp(s, 'g'),
                _value = e.target.value
            if (_value.length === 1) return // * 删除到空不在此处处理
            if (_value.match(reg)?.length === 1) {
                _value = _value.replace(s.toString(), '')
            }
            // s.deleteFromDocument()
            s = s.toString()

            // * 开启自动校正
            if (this.state._isFix) {
                let value = _value
                if (s.length === 0) {
                    // * backspace直接删除，无拖蓝选中区域，则只删除光标前一个字符
                    value = value.slice(0, e.target.selectionStart - 1) + value.slice(e.target.selectionStart)
                    let yearStr = value.match(/\d{5,}/g)?.[0]
                    if (yearStr && _value[e.target.selectionStart - 1]?.search(/\D+/) > -1) {
                        value =
                            _value.slice(0, Math.max(0, e.target.selectionStart - 2)) +
                            _value.slice(Math.max(0, e.target.selectionStart - 1))
                    }
                }

                let formatDate = autoFormat({value, format, showTime, locale: this.state.lang.lang})
                /* 删除操作后结尾为分隔符，则把分隔符一同删除 */
                formatDate = Object.assign(formatDate, deleteTailSeperator(formatDate.value, formatDate.format))

                if (
                    (formatDate.format === format || formatDate.format === '') && // fix: QDJCJS-9354 合法日期但尚未完成操作时不应执行赋值操作
                    formatDate.value &&
                    formatDate.isChanged &&
                    moment(formatDate.value, formatDate.format).isValid() &&
                    !/S+/g.test(formatDate.format) /* 删除到最后的年不特别处理 */
                ) {
                    this.setState({
                        value: moment(formatDate.value, formatDate.format),
                        format: formatDate.format
                    })
                }
            }
        } else if (e.keyCode === KeyCode.ENTER) {
            // enterKeyDown为false时按下enter键不打开面板
            if (!enterKeyDown) {
                _forbidOpen = true
            }
            let value: moment.Moment | null
            let inputValue = e.target.value
            // * 开启自动校正
            if (this.state._isFix) {
                if (inputValue.length < format.length && inputValue) {
                    inputValue = deleteFormat(inputValue, format)
                }
                const formatDate = autoFormat({value: inputValue, format, showTime, locale: this.state.lang.lang})
                let valueStr = formatDate.value
                value = moment(valueStr, format)
                value.isValid() && this.setState({value, format})

                if (enableTimezone && value.isValid() && showTime && (!picker || picker === 'date')) {
                    value = timezoneAdaptor({
                        value,
                        format,
                        timezone,
                        serverTimezone
                    }).value
                    valueStr = this.getValue(value) || ''
                }
                onChange?.(value, valueStr)
                // Enter确认时需要触发onOpenChange事件
                onOpenChange?.(false, value, valueStr)
            } else {
                // halfYear 单独处理回调及相关dom事件
                if (picker === 'halfYear') {
                    value = getHalfYear(inputValue, this.state.lang).value
                    this.setState({value, format})
                    const halfYearArr = getHalfYearArr(this.state.lang, inputValue)
                    onChange?.(value, inputValue, halfYearArr)
                } else {
                    if (inputValue === '') {
                        value = null
                    } else {
                        value = moment(inputValue, format)
                    }
                    if (value === null || value.isValid()) {
                        this.setState({value, format})
                    }
                    if (enableTimezone && value?.isValid() && showTime && (!picker || picker === 'date')) {
                        value = timezoneAdaptor({
                            value,
                            format,
                            timezone,
                            serverTimezone
                        }).value
                        inputValue = this.getValue(value) || ''
                    }
                    onChange?.(value, inputValue)
                }
                // Enter确认时需要触发onOpenChange事件
                onOpenChange?.(false, value, inputValue)
            }
        }
        this.setState({_forbidOpen})
        onKeyDown?.(e, e.preventDefault) || outInputKeydown?.(e, e.preventDefault)
    }

    handleBlur = (e: React.FocusEvent<HTMLInputElement>) => {
        let value = e.target.value
        const {
            onBlur,
            onDateInputBlur,
            onChange,
            disabledDateValid,
            disabledDate,
            picker,
            showTime,
            timezone,
            serverTimezone,
            enableTimezone
        } = this.props

        // halfYear 单独处理回调及相关dom事件
        if (picker === 'halfYear') {
            let valueMoment = getHalfYear(value, this.state.lang).value
            if (!disabledDateValid && valueMoment && disabledDate?.(valueMoment)) {
                valueMoment = null
                value = ''
            }
            this.setState({value: valueMoment})

            const halfYearArr = getHalfYearArr(this.state.lang, value)
            onChange?.(valueMoment, value, halfYearArr)
            if (this.pickerRef.current) {
                this.pickerRef.current.blur()
            }
            onBlur?.(e, value) || onDateInputBlur?.(e, value)
            return
        }

        let format = this.state.initFormat
        let valueMoment = moment(value, format)
        // QDJCJS-10002, moment不能简易传入format里非年月日时分秒的格式，对周 w 单独处理
        if (/w/gi.test(format)) {
            const reg = /[YyMmDdHhSsWwGgOo\d]+/gi
            const formatArr = format.match(reg)
            const valueArr = value.match(reg)
            let weekNum
            formatArr?.forEach((item, i) => {
                if (/w/gi.test(item)) {
                    weekNum = +valueArr?.[i]!
                    valueMoment = valueMoment.week(weekNum)
                }
            })
        }
        // 失焦时有效值保存
        const isValidValue = value && valueMoment.isValid()
        let _value = isValidValue ? valueMoment : null
        let _valueString = isValidValue ? valueMoment.format(format) : ''
        if (!disabledDateValid && _value && disabledDate?.(_value)) {
            _value = null
            _valueString = ''
        }

        this.setState({
            value: _value,
            format: this.initWw(this.props.format) ? format : format.replace(/ww/gi, 'wo')
        })

        if (enableTimezone && _value && showTime && (!picker || picker === 'date')) {
            _value = timezoneAdaptor({
                value: _value,
                format,
                timezone,
                serverTimezone
            }).value
            _valueString = (_value && this.getValue(_value)) || ''
        }

        if (_valueString !== value) {
            // 失焦需触发onChange
            onChange?.(_value, _valueString)
        }
        if (this.pickerRef.current) {
            this.pickerRef.current.blur()
        }
        onBlur?.(e, _valueString) || onDateInputBlur?.(e, _valueString)
    }

    handleFocus = (e: React.FocusEvent<HTMLInputElement>) => {
        const {picker} = this.props
        let {format} = this.state
        if (picker === 'week') {
            this.setState({
                format: format?.replace(/wo/gi, 'ww')
            })
        }
        if (this.pickerRef.current) {
            this.props.open ?? e.stopPropagation()
            this.pickerRef.current.focus()
            this.props.onFocus?.(e) || this.props.outInputFocus?.(e)
            this.setState({_forbidOpen: false})
        }
    }

    handleClick = (e: React.MouseEvent<HTMLInputElement>) => {
        e.stopPropagation()
        this.props.onClick?.(e)
    }

    _getFormatStartDate = ({showTime, picker, value, format: customFormat}: DatePickerProps & {value: Moment}) => {
        const format = this.generateFormat(customFormat as string)
        if (!value) return null
        if (picker === 'halfYear') {
            return getHalfYear(value, getLangInfo(this.props)).value
        } else if (picker === 'week' && moment.isMoment(value)) {
            // 修复QDJCJS-7764：picker===week时，moment.format会将周格式化为该周第一天问题
            return value
        } else if (!showTime && (!picker || picker === 'date')) {
            return moment(value, format).startOf('date')
        } else if (typeof showTime === 'object') {
            // 防止传入moment不符合步长
            if (!moment.isMoment(value)) {
                value = moment(value)
            } // value为moment时无需处理
            let {hourStep, minuteStep, secondStep} = showTime
            hourStep = hourStep ? +hourStep : 1
            minuteStep = minuteStep! ? +minuteStep : 1
            secondStep = secondStep! ? +secondStep : 1
            let hour = value.get('h'),
                min = value.get('m'),
                second = value.get('s')
            if (hour % hourStep !== 0) {
                hour = Math.floor(hour / hourStep) * hourStep
            }
            if (min % minuteStep !== 0) {
                min = Math.floor(min / minuteStep) * minuteStep
            }
            if (second % secondStep !== 0) {
                second = Math.floor(second / secondStep) * secondStep
            }
            value.set({hour, minute: min, second})
            return value
        } else {
            // format后的string构造出来的moment除string外的其他单位都是0；
            // 如 moment('2023', 'YYYY')构造结果除年外，月日时分秒均为0；
            return moment(moment.isMoment(value) ? value.format(format) : value, format)
        }
    }

    // 确认修改日期
    handleChange = (value: moment.Moment, dateString: string) => {
        const {onChange, showTime, picker, timezone, serverTimezone, enableTimezone} = this.props
        const {format, initFormat} = this.state
        let showTimeValue = this._getFormatStartDate({showTime, picker, value, format: initFormat})
        if (enableTimezone && value && showTime && (!picker || picker === 'date')) {
            const {diworkUTC, valueUTC} = timezoneAdaptor({value, format, timezone, serverTimezone})
            showTimeValue =
                showTimeValue && showTimeValue.clone().subtract(diworkUTC.secondDiff - valueUTC.secondDiff, 's') // 用于回调，需要校正为serverTimezone时区时间
            dateString = (showTimeValue && this.getValue(showTimeValue)) || ''
        }
        this.setState({value: showTimeValue})
        if (picker === 'halfYear') {
            const halfYearArr = getHalfYearArr(this.state.lang, dateString)
            onChange?.(showTimeValue, dateString, halfYearArr)
        } else {
            dateString = (showTimeValue && this.getValue(showTimeValue)) || '' // 输入年份后，直接点击月份时，此时值格式为yyyy-,获取的dateString为不全的值如：2023-，通过这个值在计算只能获取的2023-01-01，所以通过正确的showTimeValue在格式化一下
            onChange?.(showTimeValue, dateString)
        }
    }

    handleSelect = (value: moment.Moment) => {
        const {onSelect, onChange, showTime, picker, timezone, serverTimezone, enableTimezone} = this.props

        // halfYear 单独处理回调及相关dom事件
        if (picker === 'halfYear') {
            const {value: valueMoment, dateString} = getHalfYear(value, this.state.lang)
            this.setState({value: valueMoment})
            onSelect?.(valueMoment, dateString)
            return
        }

        // 确保用户拿到值为startOf date
        let showTimeValue = this._getFormatStartDate({showTime, picker, value})
        const format = this.state.initFormat
        // showTime和picker = time时，只有点击‘确定’按钮或者‘此刻’按钮才赋值（修复showTime时，value修改没有触发onChange事件）
        if (!showTime && picker !== 'time') {
            this.setState({value: showTimeValue, format})
        }

        if (enableTimezone && value && showTime && (!picker || picker === 'date')) {
            const {diworkUTC, valueUTC} = timezoneAdaptor({value, format, timezone, serverTimezone})
            showTimeValue =
                showTimeValue && showTimeValue.clone().subtract(diworkUTC.secondDiff - valueUTC.secondDiff, 's') // 用于回调，需要校正为serverTimezone时区时间
        }

        onSelect?.(showTimeValue, (showTimeValue && this.getValue(showTimeValue)) || '')
        // QDJCJS-7925 修复手动输入年份后再弹出面板选择1月1号时不触发onChange问题
        if (value.diff(this.state.value) === 0) {
            onChange?.(showTimeValue, (showTimeValue && this.getValue(showTimeValue)) ?? '')
        }
    }

    handleOk = (value: moment.Moment) => {
        const {onOk, showTime, picker, timezone, serverTimezone, enableTimezone} = this.props

        let showTimeValue = this._getFormatStartDate({showTime, picker, value})
        const format = this.state.initFormat

        if (enableTimezone && showTimeValue && (!picker || picker === 'date')) {
            showTimeValue = timezoneAdaptor({
                value: showTimeValue,
                format,
                timezone,
                serverTimezone
            }).value
        }
        this.setState({value: showTimeValue, format})

        onOk?.(showTimeValue, (showTimeValue && this.getValue(showTimeValue)) || '')
    }

    dateRender = (currentDate: moment.Moment, today: moment.Moment) => {
        let {dateRender, dateCellRender, fieldid} = this.props
        fieldid = fieldid && `${fieldid}_inner-${currentDate.format('YYYY-MM-DD')}`
        if (dateRender) {
            return (
                // 包装一层解决 dateRender 自定义配置样式丢失问题
                <div className={`${_PREFIX_CLS}-cell-inner`} {...(fieldid ? {fieldid} : {})}>
                    {dateRender(currentDate, today)}
                </div>
            )
        } else if (dateCellRender) {
            return (
                // 包装一层解决 dateCellRender 自定义配置样式丢失问题
                <div className={`${_PREFIX_CLS}-cell-inner`} {...(fieldid ? {fieldid} : {})}>
                    {dateCellRender(currentDate, today)}
                </div>
            )
        } else {
            return (
                // 默认日期样式
                <div className={`${_PREFIX_CLS}-cell-inner`} {...(fieldid ? {fieldid} : {})}>
                    {currentDate.get('date')}
                </div>
            )
        }
    }

    monthCellRender = (currentDate: moment.Moment, locale: Locale) => {
        let {monthCellRender} = this.props
        if (monthCellRender) {
            return (
                // 包装一层解决 monthCellRender 自定义配置样式丢失问题
                <div className={`${_PREFIX_CLS}-cell-inner`}>{monthCellRender?.(currentDate, locale)}</div>
            )
        }
    }

    generateClearIcon = (): React.ReactNode => {
        // closeIcon更新为clearIcon，兼容函数式写法
        const {clearIcon, closeIcon, id, fieldid} = this.props
        return (
            <span id={id ? id + '_clear' : undefined} fieldid={fieldid ? fieldid + '_clear' : undefined}>
                {(typeof clearIcon === 'function' && clearIcon()) ||
                    (typeof closeIcon === 'function' && closeIcon()) ||
                    (closeIcon as ReactNode) ||
                    (clearIcon as ReactNode)}
            </span>
        )
    }

    iconClick = (e: React.MouseEvent<HTMLSpanElement, MouseEvent>) => {
        e.stopPropagation()
        const {iconClick} = this.props
        this.setState({_forbidOpen: false, open: true})
        iconClick?.(e)
    }

    generateSuffixIcon = (props: DatePickerProps): React.ReactNode => {
        // 兼顾 iconClick处理
        const {suffixIcon, renderIcon, id, fieldid} = props
        return (
            <span
                id={id ? id + '_suffix' : undefined}
                fieldid={fieldid ? fieldid + '_suffix' : undefined}
                onClick={this.iconClick}
            >
                {(typeof suffixIcon === 'function' && suffixIcon()) ||
                    (suffixIcon as ReactNode) ||
                    (typeof renderIcon === 'function' && renderIcon()) ||
                    (renderIcon as ReactNode)}
            </span>
        )
    }

    disabledDate = (current: moment.Moment) => {
        const {disabledDate, showTime, picker, timezone, serverTimezone, enableTimezone} = this.props
        const {format} = this.state
        if (!disabledDate) return false
        if (!picker || picker === 'date') {
            if (!showTime) {
                current = current?.startOf('date')
            } else if (enableTimezone) {
                current = timezoneAdaptor({
                    value: current,
                    format,
                    timezone,
                    serverTimezone
                }).value
            }
        }
        return disabledDate?.(current)
    }

    getPopupContainerDom = (dom: HTMLElement) => {
        const {getPopupContainer, getCalendarContainer} = this.props
        if (typeof getPopupContainer === 'function') {
            return getPopupContainer(dom)
        } else if (typeof getCalendarContainer === 'function') {
            return getCalendarContainer(dom) // 兼容旧版本
        } else {
            return cssUtil.parentsUntil(dom)
        }
    }

    handlePanelChange = (value: moment.Moment, mode: PanelMode) => {
        // 点击前后按钮时更新下拉value值
        let {isHeaderSelect, showTime, picker, timezone, serverTimezone, enableTimezone, onPanelChange} = this.props
        let {initFormat: format} = this.state

        if (enableTimezone && value && showTime && (!picker || picker === 'date')) {
            value = timezoneAdaptor({
                value,
                format,
                timezone,
                serverTimezone
            }).value
        }

        onPanelChange?.(value, mode)
        if (!isHeaderSelect) return
        let year = value.year()
        let month = value.month() + 1
        if (!picker || picker === 'date' || picker === 'week') {
            this.setState({
                selectYear: year,
                selectMonth: month
            })
        } else if (picker === 'month' || picker === 'quarter' || picker === 'halfYear') {
            this.setState({
                selectYear: year
            })
        } else if (picker === 'year') {
            let downRound = value.year() - parseInt(value.year().toString().slice(3, 4))
            this.setState({
                selectYear: downRound
            })
        }
    }

    cascaderChange = (val: any) => {
        // 选择cascader之后，联动日历面板
        let {picker} = this.props
        let differenceYear = 0
        let differenceMonth = 0

        if (!picker || picker === 'date' || picker === 'week') {
            differenceYear = parseInt(val[0]) - this.state.selectYear
            differenceMonth = parseInt(val[1]) - this.state.selectMonth
            this.setState({
                selectYear: parseInt(val[0]),
                selectMonth: parseInt(val[1])
            })
        } else if (picker === 'month' || picker === 'quarter' || picker === 'halfYear') {
            differenceYear = parseInt(val[0]) - this.state.selectYear
            differenceMonth = 0
            this.setState({
                selectYear: parseInt(val[0])
            })
        } else if (picker === 'year') {
            let currentYear = this.state.selectYear - parseInt(this.state.selectYear.toString().slice(3, 4))
            differenceYear = (parseInt(val[0].slice(0, 4)) - currentYear) / 10
            differenceMonth = 0
            this.setState({
                selectYear: parseInt(val[0])
            })
        }
        this.setState({
            diffValue: [differenceYear, differenceMonth] // 联动选择值之后让日历面板跳转到相应的年月，传入@tinper/rc-picker
        })
    }
    // 点击年份
    onChangeYear = (val: string, index: number) => {
        let {picker} = this.props
        if (!picker || picker === 'date' || picker === 'week') {
            this.setState({
                selectYear: parseInt(val)
            })
        } else if (picker === 'month' || picker === 'quarter' || picker === 'halfYear') {
            this.setState({
                maskShow: false,
                selectYear: parseInt(val)
            })
        } else if (picker === 'year') {
            this.setState({
                maskShow: false,
                selectYear: parseInt(val)
            })
        }
        this.setState({
            activeYearNum: index
        })
        let newArr = [val, this.state.selectMonth]
        this.cascaderChange(newArr)
    }
    // 点击月份
    // @ts-ignore
    onChangeMonth = (monthValue: string, index: number) => {
        this.setState({
            maskShow: false,
            selectMonth: index + 1,
            activeMonthNum: index
        })
        let newArr = [this.state.selectYear, index + 1]
        this.cascaderChange(newArr)
    }
    clickValue = (e: any) => {
        let {picker, weekStartsOn} = this.props
        let {lang} = this.state
        this.setState({maskShow: !this.state.maskShow})
        let currentYear = parseInt(
            e.target.parentNode.parentNode.querySelector(`.${_PREFIX_CLS}-year-btn`)?.textContent
        )
        let currentMonth = e.target.parentNode.parentNode.querySelector(`.${_PREFIX_CLS}-month-btn`)?.textContent
        let options = this.getOptions()
        options.map((item, index) => {
            if (picker === 'year') {
                // picker为年时以10年为单位
                let currentYearRang = e.target.parentNode.parentNode.querySelector(
                    `.${_PREFIX_CLS}-decade-btn`
                ).textContent
                if (item.label === currentYearRang) {
                    this.setState({
                        activeYearNum: index
                    })
                }
            } else {
                if (parseInt(item.label) === currentYear) {
                    this.setState({
                        activeYearNum: index,
                        selectYear: currentYear
                    })
                }
            }
        })
        moment.locale(lang.lang, getMomentConfig(weekStartsOn))
        let monthArr = lang.langMap?.monthsShort || moment.localeData().monthsShort()
        // @ts-ignore
        monthArr.map((item: any, index: number) => {
            if (currentMonth === item) {
                this.setState({
                    activeMonthNum: index,
                    selectMonth: index + 1
                })
            }
        })
        setTimeout(() => {
            // 每次面板展开选中项在面板中间
            let liDom = document.querySelectorAll(`.${_PREFIX_CLS}-header-select-year li`)[0]
            let liHeight = liDom?.getBoundingClientRect()?.height
            if (this.yearUl) {
                this.yearUl.scrollTop = (this.state.activeYearNum - 2) * liHeight
            }
            if (this.monthUl) {
                this.monthUl.scrollTop = (this.state.activeMonthNum - 2) * liHeight
            }
        }, 0)
    }
    headerSelect = () => {
        let {lang} = this.state
        let {picker, fieldid, weekStartsOn} = this.props
        let options: {label: string; value: string; children?: any}[] = this.getOptions()
        moment.locale(lang.lang, getMomentConfig(weekStartsOn))
        let monthData = lang.langMap?.monthsShort || moment.localeData().monthsShort()
        let node = (
            <div className={`${_PREFIX_CLS}-header-select`}>
                <div className={`${_PREFIX_CLS}-header-select-year`} ref={el => (this.yearUl = el)}>
                    <ul>
                        {options.map((item, index) => {
                            return (
                                <li
                                    className={
                                        this.state.activeYearNum == index
                                            ? `${_PREFIX_CLS}-header-select-year-active`
                                            : undefined
                                    }
                                    key={item.value + index}
                                    {...(fieldid ? {fieldid: `${fieldid}_year_${parseInt(item.label)}`} : {})}
                                    onClick={this.onChangeYear.bind(this, item.label, index)}
                                >
                                    {lang.lang === 'zh-cn' || lang.lang === 'zh-tw'
                                        ? picker != 'year'
                                            ? this.state.activeYearNum == index
                                                ? parseInt(item.label) + ' 年'
                                                : parseInt(item.label)
                                            : item.label
                                        : picker != 'year'
                                            ? parseInt(item.label)
                                            : item.label}
                                </li>
                            )
                        })}
                    </ul>
                </div>
                {options[0]?.children && (
                    <div className={`${_PREFIX_CLS}-header-select-month`} ref={el => (this.monthUl = el)}>
                        <ul>
                            {Array.isArray(monthData) && monthData?.map((item: string, index: number) => {
                                return (
                                    <li
                                        className={
                                            this.state.activeMonthNum == index
                                                ? `${_PREFIX_CLS}-header-select-month-active`
                                                : undefined
                                        }
                                        key={item + index}
                                        {...(fieldid ? {fieldid: `${fieldid}_month_${index + 1}`} : {})}
                                        onClick={this.onChangeMonth.bind(this, item, index)}
                                    >
                                        {lang.lang === 'zh-cn' || lang.lang === 'zh-tw' ? parseInt(item) : item}
                                        {lang.lang === 'zh-cn' || lang.lang === 'zh-tw'
                                            ? this.state.activeMonthNum == index
                                                ? ' 月'
                                                : ''
                                            : ''}
                                    </li>
                                )
                            })}
                        </ul>
                    </div>
                )}
            </div>
        )
        let iconNode = (
            <div className={`${_PREFIX_CLS}-header-select-icon`}>
                {this.state.maskShow ? <Icon type='uf-gridcaretarrowup' /> : <Icon type='uf-gridcaretdown' />}
            </div>
        )
        return (
            <>
                {iconNode}
                <div className={`${_PREFIX_CLS}-header-select-box`}>
                    {this.state.maskShow && node}
                    <div
                        style={{background: 'transparent', height: '100%'}}
                        onClick={this.clickValue}
                        {...(fieldid ? {fieldid: `${fieldid}_header-select`} : {})}
                    >
                        {' '}
                    </div>
                </div>
            </>
        )
    }

    getOptions = () => {
        // 获取cascader的options
        let {picker} = this.props
        let nowDate = new Date()
        let currentYear: number = nowDate.getFullYear()
        let options = []
        let childrenOptions = []
        for (let i = 1; i < 13; i++) {
            let obj = {label: i + '月', value: i + '月'}
            childrenOptions.push(obj)
        }
        if (!picker || picker === 'date' || picker === 'week') {
            for (let i = currentYear - 200; i < currentYear + 200; i++) {
                let obj = {label: i + '年', value: i + '年', children: childrenOptions}
                options.push(obj)
            }
        } else if (picker === 'month' || picker === 'quarter' || picker === 'halfYear') {
            for (let i = currentYear - 200; i < currentYear + 200; i++) {
                let obj = {label: i + '年', value: i + '年'}
                options.push(obj)
            }
        } else if (picker === 'year') {
            for (let i = currentYear - 200; i < currentYear + 200; i++) {
                if (i % 10 === 0) {
                    let obj = {label: i + '-' + (i + 9), value: i + '-' + (i + 9)}
                    options.push(obj)
                }
            }
        }
        return options
    }

    render() {
        const props = this.props
        let {
            timezone,
            serverTimezone,
            enableTimezone,
            use12Hours,
            className,
            size,
            requiredStyle,
            bordered,
            align,
            placeholder,
            defaultValue,
            monthCellRender,
            picker,
            superPrevIcon,
            superNextIcon,
            prevIcon,
            nextIcon,
            dropdownClassName,
            popupClassName,
            isHeaderSelect,
            dir: direction
        } = props
        let {value, format, open, lang, dropdownAlign, showTime, clearIcon, suffixIcon, activePresetLabel, presets} = this.state
        isShouldUpdate('DatePicker', props)

        const mergedCls = classnames(className, size && `${_PREFIX_CLS}-${size}`, {
            ...setComponentClass({clsPrefix: _PREFIX_CLS, bordered, align, requiredStyle})
        })
        const globalDataFormat = globalConfig().getGlobalDataFormat()
        let now = moment()
        if ((!picker || picker === 'date') && showTime) {
            if (globalDataFormat) {
                const {dateTimeFormat} = globalDataFormat
                use12Hours = use12Hours ?? formatUtils.diworkFormat2Picker(dateTimeFormat, 'datetime').use12Hours
            }
            if (enableTimezone) {
                const {diworkUTC, deviceUTC} = timezoneAdaptor({
                    value: now.format(),
                    format: 'YYYY-MM-DD HH:mm:ss',
                    timezone,
                    serverTimezone
                })
                now = now.clone().add(diworkUTC.secondDiff - deviceUTC.secondDiff, 's') // ·此刻·显示为工作台时区
            }
        }
        const generateConfig = Object.assign(momentGenerateConfig, {getNow: () => now}) // 工作台与计算机时区不一致场景的时间调整
        const adapterNid = getNid(this.props)

        return (
            <RcPicker
                /* 内置配置 */
                ref={this.pickerRef as any}
                generateConfig={generateConfig}
                prefixCls={_PREFIX_CLS}
                transitionName='slide-up'
                tabIndex={0} //  Tab 按键切换顺序，不暴露给用户
                direction={direction}
                /* custom需omit配置 */
                {...adapterNid}
                {...omit(props, _handleProps)}
                /* custom配置 */
                placeholder={getChildrenText(placeholder).join('')}
                defaultValue={(defaultValue && moment(defaultValue, format?.replace(/wo/gi, 'ww'))) ?? undefined}
                value={value ? value : value !== undefined ? null : undefined}
                format={picker === 'halfYear' ? (date: Moment) => halfYearFormat(date, lang) : format}
                open={open ?? undefined}
                locale={Object.assign({}, lang.langMap, {
                    shortMonths: lang.langMap.monthsShort,
                    shortWeekDays: lang.langMap.weekdaysMin,
                    halfYearFormat: (date: Moment) => halfYearFormat(date, lang, false)
                })}
                dropdownAlign={dropdownAlign}
                dropdownClassName={dropdownClassName || popupClassName}
                className={mergedCls}
                activePresetLabel={activePresetLabel}
                // @ts-ignore
                presets={presets}
                showTime={showTime}
                use12Hours={use12Hours}
                clearIcon={clearIcon}
                suffixIcon={suffixIcon}
                superPrevIcon={superPrevIcon ?? <Icon type={direction === 'rtl' ? 'uf-youjiantou_shuang' : 'uf-daoshouye'} />} // UE 需求，更换默认翻页箭头
                superNextIcon={superNextIcon ?? <Icon type={direction === 'rtl' ? 'uf-daoshouye' : 'uf-youjiantou_shuang'} />}
                prevIcon={prevIcon ?? <Icon type={direction === 'rtl' ? 'uf-arrow-right' : 'uf-arrow-left'} />}
                nextIcon={nextIcon ?? <Icon type={direction === 'rtl' ? 'uf-arrow-left' : 'uf-arrow-right'} />}
                disabledDate={this.disabledDate}
                onOpenChange={this.handleOpenChange}
                onSelect={this.handleSelect}
                onChange={this.handleChange}
                onOk={this.handleOk}
                onKeyDown={this.handleKeyDown}
                onFocus={this.handleFocus}
                onBlur={this.handleBlur}
                onClick={this.handleClick}
                dateRender={this.dateRender}
                monthCellRender={monthCellRender ? this.monthCellRender : undefined}
                getPopupContainer={this.getPopupContainerDom}
                onPanelChange={this.handlePanelChange}
                // @ts-ignore
                diffValue={open && isHeaderSelect && this.state.diffValue}
                headerSelect={open && isHeaderSelect ? this.headerSelect() : null}
                showSelectMask={open && isHeaderSelect && this.state.maskShow}
            />
        )
    }
}

export default DatePicker
