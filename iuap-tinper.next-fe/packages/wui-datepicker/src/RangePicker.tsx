/**
 * Refact by liuxiangyang on 2021/9/29.
 */
import { RangePicker as RCRangePicker } from '@tinper/rc-picker'
import momentGenerateConfig from '@tinper/rc-picker/lib/generate/moment'
import type { RangeValue } from '@tinper/rc-picker/lib/interface'
import type { RangePickerDateProps } from '@tinper/rc-picker/lib/RangePicker'
import classnames from 'classnames'
import type { Moment } from 'moment'
import moment from 'moment'
import omit from 'omit.js'
import type { FocusEvent } from 'react'
import React, { Component, ReactNode } from 'react'
import { findDOMNode } from 'react-dom'
import {
    Warning,
    addEventListener,
    cssUtil,
    formatUtils,
    getChildrenText,
    getNid,
    setComponentClass,
    timezoneAdaptor
} from '../../wui-core/src'
import Icon from '../../wui-icon/src'
import { globalConfig } from '../../wui-provider/src'
import { autoFormat, canFix, deleteTailSeperator, getDefaultFormat } from './_utils/autoFix'
import { getHalfYear, getHalfYearArr, halfYearFormat } from './_utils/halfYearUtils'
import { getLangInfo, getMomentConfig } from './_utils/lang'
import { _PREFIX_CLS } from './DatePicker'
import DatePickerHeaderSelect from './DatePickerHeaderSelect'
import type { RangePickerProps, RangePickerState } from './iPicker'

const {isShouldUpdate /* 废弃API调用时提示更新 */} = Warning
const pickers = ['time', 'date', 'week', 'month', 'year']

const _handleProps: (keyof RangePickerProps)[] = [
    'className',
    'size',
    'bordered',
    'align',
    'dropdownClassName',
    'popupClassName',
    'getPopupContainer',
    'transitionName',
    'locale',
    'weekStartsOn',
    'timezone',
    'serverTimezone',
    'enableTimezone',
    'format',
    'showTime',
    'use12Hours',
    'value',
    'defaultPickerValue',
    'disabledDateValid',
    'placeholder',
    'mode',
    'ranges',
    'onFocus',
    'onBlur',
    'onChange',
    'onCalendarChange',
    'onOpenChange',
    'onSelect',
    'onStartInputBlur',
    'onEndInputBlur',
    'onPresetChange',
    'activePresetKey',
    'renderExtraFooter',
    'renderFooter'
]

const defaultProps = {
    size: 'md',
    antd: false,
    clearIcon: <Icon type='uf-close-c' />,
    suffixIcon: <Icon type='uf-calendar' />,
    timezone: 'Asia/Shanghai',
    serverTimezone: 'Asia/Shanghai',
    enableTimezone: false,
    // mode: ['date', 'date'],
    allowClear: true,
    autoFix: true,
    // locale: 'zh-cn', //4.x版本
    showToday: false,
    showRangeLabel: false,
    // placeholder: ['开始', '结束'],
    // validatorFunc: () => {
    //     return true
    // },
    isHeaderSelect: true,
    atOnceFinish: false
}

/**
 * @desc 删除日期字符串的label
 * @param {string} dateStr 含label日期字符串
 * @returns string
 */
const _deleteLabel = (dateStr: string) => {
    if (typeof dateStr === 'string') {
        return dateStr.replace(/^\S*\((.*)\)$/g, '$1')
    } else {
        return dateStr
    }
}

class RangePicker extends Component<RangePickerProps, RangePickerState> {
    static defaultProps = defaultProps
    constructor(props: RangePickerProps) {
        super(props)
        const langInfo = getLangInfo(props) // 获取语言包信息
        const formats = this.generateRangeFormat(props.format) as RangePickerState['format'];
        const format = this.wo2wwFormat(formats, this.initWw(props.format));
        this.state = {
            langInfo,
            value: this.initValue(props),
            format,
            initFormat: format,
            labelFormat: format,
            showTime: this.getShowTimeOptions(props),
            ranges: this.initRanges(props.ranges),
            activePresetLabel: this.getActivePresetLabel(props),
            placeholder: this.initPlaceholder(props),
            clearIcon: this.generateClearIcon(),
            suffixIcon: this.generateSuffixIcon(),
            open: props.open,
            modeArr: this.initMode(props),
            lastSelectDate: null,
            diffValue: [0, 0],
            maskShow: false,
            rightValue: '',
            leftValue: '',
            inputActiveIndex: 0,
            activeSelectPanel: 'none'
        }
    }
    private node!: RCRangePicker<Moment>
    leftInputValue?: string | number
    rightInputValue?: string | number
    headerSelectLeft?: any
    headerSelectRight?: any

    componentDidMount() {
        this.handleInputAdapt()
        const pickerRef = findDOMNode(this.node) as HTMLElement
        // <--------- 仅用于自动化测试 start ------->
        const {fieldid, id} = this.props
        if (fieldid !== undefined || id !== undefined) {
            const pickerInput = pickerRef.querySelectorAll(`.${_PREFIX_CLS}-input`)
            if (fieldid !== undefined) {
                pickerInput[0].querySelectorAll('input')[0].setAttribute('fieldid', `${fieldid}_start_input`)
                pickerInput[1].querySelectorAll('input')[0].setAttribute('fieldid', `${fieldid}_end_input`)
            }
            if (id !== undefined) {
                pickerInput[0].querySelectorAll('input')[0].setAttribute('id', `${id}_start_input`)
                pickerInput[1].querySelectorAll('input')[0].setAttribute('id', `${id}_end_input`)
            }
        }
        // <--------- 仅用于自动化测试 end ------->
        // this.defaultPanel()
    }

    UNSAFE_componentWillReceiveProps(nextProps: RangePickerProps) {
        if ('value' in nextProps) {
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
            const format = this.generateRangeFormat(nextProps.format)
            if (format[0] && format?.[1]) {
                this.setState({
                    format: format as RangePickerState['format'],
                    initFormat: format as RangePickerState['format'],
                    labelFormat: format as RangePickerState['format']
                })
            }
        }
        if ('showTime' in nextProps) {
            this.setState({
                showTime: this.getShowTimeOptions(nextProps)
            })
        }
        if ('mode' in nextProps) {
            this.setState({
                modeArr: this.initMode(nextProps)
            })
        }
        if ('placeholder' in nextProps || 'dateInputPlaceholder' in nextProps) {
            this.setState({
                placeholder: this.initPlaceholder(nextProps)
            })
        }
        if ('ranges' in nextProps) {
            this.setState({ranges: this.initRanges(nextProps.ranges)})
        }
        if ('activePresetKey' in nextProps) {
            this.setState({
                activePresetLabel: this.getActivePresetLabel(nextProps)
            })
        }
        if ('locale' in nextProps) {
            let langInfo = getLangInfo(nextProps) // 获取语言包信息
            this.setState({langInfo})
        }
    }

    initValue = (props: RangePickerProps): RangeValue<Moment> => {
        const {
            timezone,
            serverTimezone,
            enableTimezone,
            format,
            defaultValue,
            value: initialValue,
            disabledDate,
            disabledDateValid = true,
            onChange,
            weekStartsOn,
            locale,
            picker
        } = props
        const showTime = this.getShowTimeOptions(props)
        let langInfo = getLangInfo({locale, weekStartsOn}) // 获取语言包信息
        moment.locale(langInfo.lang, getMomentConfig(weekStartsOn))
        const formats = this.generateRangeFormat(format)
        let valueProp = this.splitRangeStr2Arr(initialValue) || this.splitRangeStr2Arr(defaultValue) || []
        let values: (Moment | null)[] = []
        for (let i = 0; i < 2; i++) {
            let value = valueProp[i] || ''
            if (value) {
                if (typeof value == 'string') {
                    if (picker === 'halfYear') {
                        const halfYearValue = getHalfYear(value, getLangInfo({locale, weekStartsOn})).value
                        values.push(halfYearValue)
                    } else if (moment(value, formats[i]).isValid()) {
                        if (enableTimezone && showTime && (!picker || picker === 'date')) {
                            const {diworkUTC, serverUTC} = timezoneAdaptor({
                                value,
                                format: formats[i]!,
                                timezone,
                                serverTimezone
                            })
                            value = moment(value, formats[i]).add(diworkUTC.secondDiff - serverUTC.secondDiff, 's')
                        } else {
                            value = moment(value, formats[i])
                        }
                        values.push(value)
                    } else {
                        console.error('value is not in the correct format')
                        let validValue = moment(moment(value), formats[i]) // 如果字符串值和格式生成的moment对象不合法，将字符串的值转换为moment对象，再强制转换一下；
                        // 如 moment('10-13-2222', 'YYYY-MM-DD HH:mm:ss') 非法, 但 moment('10-13-2222') 合法
                        if (validValue.isValid()) {
                            if (enableTimezone && showTime && (!picker || picker === 'date')) {
                                validValue = timezoneAdaptor({
                                    isCbValue: false,
                                    value: validValue,
                                    format: formats[i]!,
                                    timezone,
                                    serverTimezone
                                }).value
                            }
                            values.push(validValue)
                        } else {
                            values.push(null)
                        }
                    }
                } else if (value.isValid?.()) {
                    if (enableTimezone && showTime && (!picker || picker === 'date')) {
                        value = timezoneAdaptor({
                            isCbValue: false,
                            value,
                            format: formats[i]!,
                            timezone,
                            serverTimezone
                        }).value
                    }
                    values.push(value)
                } else {
                    console.error('value is not in the correct format')
                    values = []
                }
            } else {
                values.push(null)
            }
        }

        if (!disabledDateValid) {
            let isDisableStart = values[0] && disabledDate?.(values[0]) // 此处values时区已经过上边判断处理，无需再处理
            let isDisableEnd = values[1] && disabledDate?.(values[1])
            if (isDisableStart || isDisableEnd) {
                if (isDisableStart) {
                    values[0] = null
                }
                if (isDisableEnd) {
                    values[1] = null
                }
                onChange?.(values as RangeValue<Moment>, [
                    values[0] === null ? '' : values[0]?.format(formats[0]),
                    values[1] === null ? '' : values[1]?.format(formats[1])
                ])
                return values as RangeValue<Moment>
            }
        }

        return values as RangeValue<Moment>
    }

    initMode = (props: RangePickerProps): RangePickerState['modeArr'] | undefined => {
        if (props.mode) {
            return Array.isArray(props.mode) ? props.mode : [props.mode, props.mode]
        }
    }

    initWw = (format: RangePickerProps['format']): boolean => {
        return !!format && /ww|w(?!o)/gi.test(Array.isArray(format) ? format?.[0] : format) // 匹配ww和w，不匹配wo
    }

    // 修改周格式
    wo2wwFormat = (formatArr: RangePickerState['format'], wo2ww = true): RangePickerState['format'] => {
        return formatArr?.map(item =>
            wo2ww ? item?.replace(/wo/gi, 'ww') : item?.replace(/ww/gi, 'wo')
        ) as RangePickerState['format']
        // return formatArr?.map(item => ww2wo ? item?.replace(/ww/ig, 'wo') : item?.replace(/wo/ig, 'ww')) as RangePickerState['format']
    }

    /**
     * @desc 生成RangePicker的format数组
     * @param {String|Array} customFormat
     * @returns [startFormat, endFormat]
     */
    generateRangeFormat = (customFormat?: RangePickerProps['format']): [string | undefined, string | undefined] => {
        let {format, picker, showTime} = this.props

        const globalDataFormat = globalConfig().getGlobalDataFormat()
        // format接入工作台首选项
        if (!format && globalDataFormat && (!picker || picker === 'date')) {
            const {dateTimeFormat, dateFormat} = globalDataFormat
            format = formatUtils.diworkFormat2Picker(
                showTime ? dateTimeFormat : dateFormat,
                showTime ? 'datetime' : 'date'
            ).format
        }
        const mergeFormat = customFormat || format || getDefaultFormat(picker || 'date', showTime, this.props)
        // 兼容string、array类型format，并转换为[startFormat, endFormat]数组
        const _result = Array.isArray(mergeFormat)
            ? [mergeFormat[0], mergeFormat?.[1] || mergeFormat[0]]
            : [mergeFormat, mergeFormat]
        return this.wo2wwFormat(_result as RangePickerState['format'])
    }

    generateClearIcon = () => {
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

    generateSuffixIcon = () => {
        // 兼顾 iconClick处理
        const {suffixIcon, renderIcon, iconClick, id, fieldid} = this.props
        return (
            <span
                id={id ? id + '_suffix' : undefined}
                fieldid={fieldid ? fieldid + '_suffix' : undefined}
                onClick={iconClick}
            >
                {(typeof suffixIcon === 'function' && suffixIcon()) ||
                    (suffixIcon as ReactNode) ||
                    (typeof renderIcon === 'function' && renderIcon()) ||
                    (renderIcon as ReactNode)}
            </span>
        )
    }

    /**
     * string类型输入转换为数组
     * @param {String | Array} str Tinper老版本value、placeholder等的string类型输入
     * @param {String} seperator 分隔符
     * @returns {Array}
     */
    splitRangeStr2Arr = (str: string | RangePickerProps['value'], seperator?: string) => {
        if (typeof str !== 'string') return str // 只处理string类型
        let result: string[] = []
        const seperators = seperator !== undefined ? [seperator, '~', 'to', '至', '-'] : ['~', 'to', '至', '-']
        for (let i = 0; i < seperators.length; i++) {
            if (str.indexOf(seperators[i]) > -1) {
                seperator = seperators[i]
                result = str.split(seperator)
                break
            }
            if (i === seperators.length) {
                console.error('[param error]: `value` `defaultValue` `placeholder` of RangePicker must has an Array.')
            }
        }
        if (seperator !== undefined && str.indexOf(seperator) > -1) {
            result = str.split(seperator)
        }
        // 日期分隔符与起止分隔符相同情况兼容
        // 如： '2022-01-01 - 2030-05-12'，两者均为 '-'
        if (result.length > 2) {
            result = [result.slice(0, 3).join(seperator), result.slice(3).join(seperator)]
        }
        // str无分隔符`～`等场景，如 `开始结束`
        if (result.length === 0) {
            result = [str, str]
        }
        return result.map(item => item.trim())
    }

    initPlaceholder = (props: RangePickerProps): [string, string] | undefined => {
        let {placeholder, dateInputPlaceholder} = props
        placeholder = placeholder || dateInputPlaceholder
        if (!placeholder) return
        if (React.isValidElement(placeholder)) {
            placeholder = getChildrenText(placeholder).join('')
        }
        if (typeof placeholder === 'string') {
            return this.splitRangeStr2Arr(placeholder) as [string, string]
        } else if (Array.isArray(placeholder)) {
            return [getChildrenText(placeholder[0]).join(''), getChildrenText(placeholder?.[1]).join('')]
        } else {
            console.error('`placeholder` must be an Array.')
        }
    }

    initRanges = (ranges: RangePickerProps['ranges']) => {
        if (Array.isArray(ranges)) {
            let formatRanges: Record<string, any> = {}
            ranges.map(range => {
                range.label = getChildrenText(range.label).join('')
                formatRanges[range.label] = range.value
            })
            return formatRanges
        } else if (typeof ranges === 'object') {
            return ranges
        } else {
            return {}
        }
    }

    getActivePresetLabel = ({ranges, activePresetKey}: RangePickerProps) => {
        let activePresetLabel = ''
        if (Array.isArray(ranges)) {
            ranges.map(range => {
                if (range.key === activePresetKey || range.label === activePresetKey) {
                    activePresetLabel = range.label
                }
            })
        } else if (typeof ranges === 'object') {
            if (activePresetKey && ranges[activePresetKey]) {
                activePresetLabel = activePresetKey
            }
        }
        return activePresetLabel
    }

    // 获取格式后的日期字符串
    getValue = (value: moment.Moment | string, format: string) => {
        const {timezone, serverTimezone, enableTimezone} = this.props
        // 此处value可能为string或Moment或空
        if (enableTimezone && moment.isMoment(value)) {
            const {serverUTC, deviceUTC} = timezoneAdaptor({value, format, timezone, serverTimezone})
            value = value.clone().add(serverUTC.secondDiff - deviceUTC.secondDiff, 's') // 用于回调，需要校正为serverTimezone时区时间
        }
        return moment.isMoment(value) ? value.format(format) : value ?? ''
    }

    handleInputAdapt = () => {
        // eslint-disable-next-line react/no-find-dom-node
        let startInput = (findDOMNode(this.node) as HTMLElement)
            .querySelectorAll(`.${_PREFIX_CLS}-input`)[0]
            .querySelectorAll('input')[0]
        // eslint-disable-next-line react/no-find-dom-node
        let endInput = (findDOMNode(this.node) as HTMLElement)
            .querySelectorAll(`.${_PREFIX_CLS}-input`)[1]
            .querySelectorAll('input')[0]

        addEventListener(endInput, 'focus', this.endInputFocus)

        addEventListener(startInput, 'input', this.startInputFormat)
        addEventListener(endInput, 'input', this.endInputFormat)

        addEventListener(startInput, 'blur', this.startInputBlur)
        addEventListener(endInput, 'blur', this.endInputBlur)

    }

    startInputBlur = (e: FocusEvent) => {
        this.onInputBlur(e, 'start')
    }
    endInputBlur = (e: FocusEvent) => {
        this.onInputBlur(e, 'end')
    }

    endInputFocus = (e: FocusEvent) => {
        this.onInputEndFocus(e, 'end')
    }

    startInputFormat = (e: InputEvent) => {
        this.handleInputFormat(e, 'start')
    }
    endInputFormat = (e: InputEvent) => {
        this.handleInputFormat(e, 'end')
    }

    /**
     * 格式化Input输入内容：自动填充
     *  =========== input输入字符串视为diwork时区字符串（与props字符串视为server时区不同），回调将调整为server时区 ============
     */
    handleInputFormat = (e: any, type: 'start' | 'end') => {
        const {onChange, onOpenChange, picker, showTime, timezone, serverTimezone, enableTimezone} = this.props
        const {initFormat} = this.state
        const [startFormat, endFormat] = initFormat
        let format = type === 'start' ? startFormat : endFormat
        const _isFix = canFix(this.props, format)
        const stateValue = this.state.value
        // * 开启自动校正
        if (_isFix) {
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
            let formatDate = autoFormat({value, format, showTime, locale: this.state.langInfo.lang})
            let valueStr = formatDate.value
            if (e.inputType === 'deleteContentBackward') {
                if (value.length === 0) {
                    // 删除到空时需触发onChange，并关闭面板触发onOpenChange
                    this.setState({
                        open: false,
                        value: null,
                        format: initFormat
                    })
                    onChange?.(null, '')
                    onOpenChange?.(false)
                    return
                }
                // 删除操作尾部分隔符处理
                formatDate = Object.assign(formatDate, deleteTailSeperator(valueStr, formatDate.format))
            }

            if (formatDate.isChanged || isDeleteChanged) {
                if (/\D0$/g.test(valueStr)) {
                    /* 尾部的-0特别处理，format替换为-0 */
                    let tempFormat = formatDate.format.slice(0, -2) + valueStr.slice(-2)
                    const currentValue = valueStr ? moment(valueStr, tempFormat) : null;
                    const valueArr = type === 'start' ? [currentValue, stateValue?.[1]] : [stateValue?.[0], currentValue]
                    const formatArr = type === 'start' ? [tempFormat, endFormat] : [startFormat, tempFormat]
                    this.setState({
                        value: valueArr as RangeValue<Moment>,
                        format: formatArr as RangePickerState['format']
                    })
                } else if (!/[^S]+/g.test(formatDate.format)) {
                    /* 只有年的特别处理，Y被转S替换，禁止用户非数字输入 */
                    const currentValue = valueStr ? moment(valueStr.replace(/\D+/g, ''), formatDate.format) : null;
                    const valueArr = type === 'start' ? [currentValue, stateValue?.[1]] : [stateValue?.[0], currentValue]
                    const formatArr = type === 'start' ? [formatDate.format, endFormat] : [startFormat, formatDate.format]
                    this.setState({
                        value: valueArr as RangeValue<Moment>,
                        format: formatArr as RangePickerState['format']
                    })
                } else {
                    const currentValue = valueStr ? moment(valueStr, formatDate.format) : null;
                    const valueArr = type === 'start' ? [currentValue, stateValue?.[1]] : [stateValue?.[0], currentValue]
                    const formatArr = type === 'start' ? [formatDate.format, endFormat] : [startFormat, formatDate.format]
                    this.setState({
                        value: valueArr as RangeValue<Moment>,
                        format: formatArr as RangePickerState['format']
                    })
                }
            }

            let valueMoment = moment(valueStr, formatDate.format)
            if (
                // 输入完成
                format?.length === valueStr?.length &&
                valueMoment.isValid()
            ) {
                const currentValue: RangeValue<Moment> = type === 'start' ? [valueMoment, stateValue?.[1] ?? null] : [stateValue?.[0] ?? null, valueMoment]
                this.setState({
                    open: false, // 输入完成需关闭面板，并触发onOpenChange回调
                    value: currentValue,
                    format: initFormat
                })

                if (enableTimezone && showTime && (!picker || picker === 'date')) {
                    valueMoment = timezoneAdaptor({
                        value: valueMoment,
                        format,
                        timezone,
                        serverTimezone
                    }).value
                    valueStr = this.getValue(valueMoment, format) || ''
                }
                onChange?.(currentValue, valueStr)
                onOpenChange?.(false)
            }
        } else {
            // * 无需自动校正场景，仅保留合法值
            let inputValue = e.target.value
            let valueMoment = moment(inputValue, format)

            // halfYear 单独处理回调及相关dom事件
            if (inputValue.length === format.length && picker === 'halfYear') {
                requestAnimationFrame(() => {
                    const {value, dateString} = getHalfYear(inputValue, this.state.langInfo)
                    const currentValue: RangeValue<Moment> = type === 'start' ? [value, stateValue?.[1] ?? null] : [stateValue?.[0] ?? null, value]
                    this.setState({value: currentValue})
                    onChange?.(currentValue, dateString)
                })
            } else if (inputValue.length === format.length && valueMoment.isValid()) {
                requestAnimationFrame(() => {
                    const currentValue: RangeValue<Moment> = type === 'start' ? [valueMoment, stateValue?.[1] ?? null] : [stateValue?.[0] ?? null, valueMoment]
                    this.setState({
                        value: currentValue,
                        format: initFormat
                    })

                    if (enableTimezone && showTime && (!picker || picker === 'date')) {
                        valueMoment = timezoneAdaptor({
                            value: valueMoment,
                            format,
                            timezone,
                            serverTimezone
                        }).value
                        inputValue = this.getValue(valueMoment, format) || ''
                    }
                    const _currentValue: RangeValue<Moment> = type === 'start' ? [valueMoment, stateValue?.[1] ?? null] : [stateValue?.[0] ?? null, valueMoment]
                    onChange?.(_currentValue, inputValue)
                })
            }
        }
    }

    onInputEndFocus = (_e: FocusEvent<Element, Element>, type: 'start' | 'end') => {
        let { picker } = this.props
        if (picker === 'time' && type === 'end') {
            this.setState({
                inputActiveIndex: 0
            })
        }
    }

    // focus时，如有label，需移除，便于用户修改
    handleFocus = (e: FocusEvent<HTMLInputElement, Element>) => {
        const {showRangeLabel, onFocus} = this.props
        let {initFormat: format} = this.state
        format = this.wo2wwFormat(format as RangePickerState['format'])
        this.setState({format})
        if (showRangeLabel) {
            this.setState({labelFormat: format}, () => {
                onFocus?.(e)
            })
        } else {
            onFocus?.(e)
        }
    }

    // blur时，如有showRangeLabel，需添加
    handleBlur = (e: FocusEvent<HTMLInputElement, Element>) => {
        const {showRangeLabel, onBlur} = this.props
        let {labelFormat, initFormat: format, activePresetLabel} = this.state
        format = this.wo2wwFormat(format as RangePickerState['format'], this.initWw(this.props.format))
        labelFormat = this.wo2wwFormat(labelFormat as RangePickerState['format'], this.initWw(this.props.format))
        if (showRangeLabel) {
            const presetFormat: [string, string] =
                showRangeLabel && activePresetLabel
                    ? [activePresetLabel + '(' + format[0] + ')', activePresetLabel + '(' + format[1] + ')']
                    : labelFormat
            this.setState({labelFormat: presetFormat})
        } else {
            this.setState({labelFormat})
        }
        onBlur?.(e)
    }

    onInputBlur = (e: FocusEvent<Element, Element>, type: 'start' | 'end') => {
        const {
            onStartInputBlur,
            onEndInputBlur,
            onChange,
            disabledDateValid,
            disabledDate,
            picker,
            timezone,
            serverTimezone,
            enableTimezone
        } = this.props
        let {value, initFormat: format, showTime, langInfo} = this.state
        format = this.wo2wwFormat(format as RangePickerState['format'], this.initWw(this.props.format))
        if (!disabledDateValid && value && disabledDate) {
            if (value[0] && disabledDate(value[0])) {
                value[0] = null
            }
            if (value[1] && disabledDate(value[1])) {
                value[1] = null
            }
        }
        let startValue = value?.[0]?.format(format[0]) ?? ''
        let endValue = value?.[1]?.format(format[1]) ?? ''

        // <----------------- 删除部分内容导致非法问题等 start  ------------------------------>
        let [startFormat, endFormat] = this.state.initFormat
        const currentFormat = type === 'start' ? startFormat : endFormat;
        const currentValueStr = (e.target as any).value
        let valueMoment = moment(currentValueStr, currentFormat)
        // QDJCJS-10002, moment不能简易传入format里非年月日时分秒的格式，对周 w 单独处理
        if (/w/gi.test(currentFormat)) {
            const reg = /[YyMmDdHhSsWwGgOo\d]+/gi
            const formatArr = currentFormat.match(reg)
            const valueArr = currentValueStr.match(reg)
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
        let _currentValue = isValidValue ? valueMoment : null
        const valueArr: RangeValue<Moment> = type === 'start' ? [_currentValue, value?.[1] ?? null] : [value?.[0] ?? null, _currentValue];

        this.setState({
            value: valueArr,
            format
        })
        // <----------------- 删除部分内容导致非法问题等 end  ------------------------------>

        if (enableTimezone && showTime && (!picker || picker === 'date')) {
            for (let i = 0; i < 2; i++) {
                if (value?.[i]) {
                    const timezoneValue = timezoneAdaptor({
                        value: value[i]!,
                        format: format[i],
                        timezone,
                        serverTimezone
                    }).value
                    const timezoneValueStr = this.getValue(timezoneValue, format[i])
                    i === 0 ? (startValue = timezoneValueStr) : i === 1 ? (endValue = timezoneValueStr) : ''
                }
            }
        }

        // QDJCJS-9244，删除到空视为有效输入。解决手动清除结束日期后，起始日期无法选择被清除的结束日期以后日期的问题
        if ((e.target as any).value === '') {
            let _value
            if (type === 'start' && value?.[0] !== null) {
                _value = [null, value?.[1] || null] as RangePickerState['value']
                // 有效输入需触发值变更、onChange回调
                this.setState({
                    value: _value
                })
                if (picker === 'halfYear') {
                    const halfYearArr = getHalfYearArr(langInfo, endValue)
                    onChange?.(_value, `["" , "${endValue}"]`, ['', endValue], [['', ''], halfYearArr])
                } else {
                    if (enableTimezone && _value?.[1] && showTime && (!picker || picker === 'date')) {
                        _value[1] = timezoneAdaptor({
                            value: _value[1],
                            format: format[1],
                            timezone,
                            serverTimezone
                        }).value
                        endValue = this.getValue(_value[1], format[1])
                    }
                    onChange?.(_value, `["" , "${endValue}"]`, ['', endValue])
                }
            } else if (type === 'end' && value?.[1] !== null) {
                _value = [value?.[0] || null, null] as RangePickerState['value']
                // 有效输入需触发值变更、onChange回调
                this.setState({
                    value: _value
                })
                if (picker === 'halfYear') {
                    const halfYearArr = getHalfYearArr(langInfo, startValue)
                    onChange?.(_value, `["${startValue}", ""]`, [startValue, ''], [halfYearArr, ['', '']])
                } else {
                    if (enableTimezone && _value?.[0] && showTime && (!picker || picker === 'date')) {
                        _value[0] = timezoneAdaptor({
                            value: _value[0],
                            format: format[0],
                            timezone,
                            serverTimezone
                        }).value
                        startValue = this.getValue(_value[0], format[0])
                    }
                    onChange?.(_value, `["${startValue}", ""]`, [startValue, ''])
                }
            }
        }
        // 失去焦点时下拉收起
        this.headerSelectLeft?.inputBlur(false)
        this.headerSelectRight?.inputBlur(false)
        this.setState({
            maskShow: false
        })

        type === 'start'
            ? onStartInputBlur?.(e, startValue, [startValue, endValue])
            : onEndInputBlur?.(e, endValue, [startValue, endValue])
    }

    hiddenHandleSelect = (position: 'left' | 'right') => {
        if (position === 'left') {
            this.headerSelectRight?.inputBlur(false)
        } else {
            this.headerSelectLeft?.inputBlur(false)
        }
        this.setActiveSelectPanel()
    }

    /**
     * 日期范围变化的回调
     * @param {Array[moment]} value 选中的日期范围值
     * @param {Array[String]} formatString 数组字符串
     * @param {[String]} label 快捷按钮文本，非快捷按钮选中日期无此项
     */
    handleChange = (value: RangePickerState['value'], formatString: [string, string], label?: string) => {
        formatString = [_deleteLabel(formatString[0]), _deleteLabel(formatString[1])]
        const {showRangeLabel, onChange, antd, onPanelChange, picker, timezone, serverTimezone, enableTimezone} =
            this.props
        let {initFormat: format, showTime, langInfo, modeArr} = this.state
        if (antd) {
            // 兼容antd参数
            this.setState({
                value
            })
            onChange?.(value, formatString)
        } else {
            if (!label) {
                this.setState({
                    value,
                    labelFormat: format,
                    activePresetLabel: ''
                })
            } else {
                this.setState(() => {
                    const presetFormat: [string, string] = showRangeLabel
                        ? [label + '(' + format[0] + ')', label + '(' + format[1] + ')']
                        : format
                    return {
                        value,
                        labelFormat: presetFormat
                    }
                })
            }
            /**
             * 1. 保持与4.2.0重构前版本一致，在change事件前触发onPanelChange，以确保start/end均已取到
             * 2. 增加第二个参数mode
             * 3. clear的空值不触发
             */
            if (value) {
                if (picker === 'halfYear') {
                    const halfYearStartArr = getHalfYearArr(langInfo, formatString?.[0])
                    const halfYearEndArr = getHalfYearArr(langInfo, formatString?.[1])
                    onPanelChange?.(value, modeArr)
                    onChange?.(value, `["${formatString?.[0]}" , "${formatString?.[1]}"]`, formatString, [
                        halfYearStartArr,
                        halfYearEndArr
                    ])
                } else {
                    for (let i = 0; i < 2; i++) {
                        if (enableTimezone && value?.[i] && showTime && (!picker || picker === 'date')) {
                            value[i] = timezoneAdaptor({
                                value: value[i]!,
                                format: format[i],
                                timezone,
                                serverTimezone
                            }).value
                            formatString[i] = this.getValue(value[i]!, format[i])
                        }
                    }
                    onPanelChange?.(value, modeArr)
                    // 老版本参数为三个，需保证新旧版本参数一致
                    onChange?.(value, `["${formatString?.[0]}" , "${formatString?.[1]}"]`, formatString)
                }
            } else {
                this.setState({
                    diffValue: [0, 0],
                    leftValue: '',
                    rightValue: ''
                })
                // 老版本参数为三个，需保证新旧版本参数一致
                onChange?.(value, '', null)
            }
        }
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
    getShowTimeOptions: any = (props: RangePickerProps) => {
        let {format: customFormat, showTime, picker} = props
        if (!showTime) return false
        const format = this.generateFormat(customFormat as string)

        const globalDataFormat = globalConfig().getGlobalDataFormat()
        // showTime接入工作台首选项等provider配置
        if ((!picker || picker === 'date') && globalDataFormat) {
            const {dateTimeFormat} = globalDataFormat
            const diworkFormat = formatUtils.diworkFormat2Picker(dateTimeFormat, showTime ? 'datetime' : 'date')
            showTime = {...diworkFormat.showTime, ...(typeof showTime === 'object' ? showTime : {})}
        }
        let showTimeOptions: RangePickerProps['showTime'] = {},
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
                    // defaultValue = defaultValue.split('~') as [string, string]
                    if (moment(defaultValue, format).isValid()) {
                        defaultValue = moment(defaultValue, format)
                    } else if (!moment(defaultValue, format).isValid()) {
                        defaultValue = zeroTime
                    }
                } else if (moment.isMoment(defaultValue) && !defaultValue.isValid()) {
                    defaultValue = zeroTime
                } else if (Array.isArray(defaultValue)) {
                    if (typeof defaultValue[0] === 'string') { // 支持showTime.defaultValue=['00:00:00', '23:00:00']
                        defaultValue[0] = moment(defaultValue[0], format).isValid() ? moment(defaultValue[0], format) : zeroTime
                    }
                    if (typeof defaultValue?.[1] === 'string') {
                        defaultValue[1] = moment(defaultValue[1], format).isValid() ? moment(defaultValue[1], format) : zeroTime
                    }
                }
            } else {
                defaultValue = zeroTime // 默认时分秒为 0点0分0秒
            }
            showTimeOptions = {...showTime, defaultValue, hourStep, minuteStep, secondStep}
        } else {
            // 兼容 TimePickerPanel 配置
            showTimeOptions = {
                format,
                showHour: format.includes('hh') || format.includes('HH'),
                showMinute: format.includes('mm'),
                showSecond: format.includes('ss'),
                defaultValue: zeroTime // 默认时分秒为 0点0分0秒
            }
        }
        if (showTimeOptions?.use12Hours) {
            showTimeOptions.format = showTimeOptions.format ? showTimeOptions.format.replace(/H/gi, 'h') : 'hh:mm:ss a'
        }
        return showTimeOptions
    }
    handleCalendarChange = (
        value: RangePickerState['value'],
        formatString: [string, string],
        info: {range: string}
    ) => {
        const {picker, timezone, serverTimezone, enableTimezone, atOnceFinish} = this.props
        const {showTime, initFormat: format} = this.state
        formatString = [_deleteLabel(formatString[0]), _deleteLabel(formatString[1])]
        // 记录上次用户选择日期，用于快捷按钮点击时的回调参数
        if (value === null) {
            // clear事件
            this.setState({
                lastSelectDate: null
            })
        } else {
            this.setState({
                lastSelectDate: info.range === 'start' ? value?.[0] : value?.[1]
            })
        }

        for (let i = 0; i < 2; i++) {
            if (enableTimezone && value?.[i] && showTime && (!picker || picker === 'date')) {
                value[i] = timezoneAdaptor({
                    value: value[i]!,
                    format: format[i],
                    timezone,
                    serverTimezone
                }).value
                formatString[i] = this.getValue(value[i]!, format[i])
            }
        }

        const {onCalendarChange, onSelect} = this.props
        onCalendarChange?.(value, formatString, info)
        // let startInput = (findDOMNode(this.node) as HTMLElement)
        //     .querySelectorAll(`.${_PREFIX_CLS}-input`)[0]
        //     .querySelectorAll('input')[0]
        if (info.range === 'start') {
            onSelect?.(value?.[0] as moment.Moment)
        } else if (info.range === 'end') {
            onSelect?.(value?.[1] as moment.Moment)
            if (value && !value?.includes(null) && showTime && atOnceFinish) { // 存在时间面板如果开始结束都存在值，则操作结束日期，如果结束日期大于开始日期则直接关闭面板
                let isBefore = moment(value![0]).isBefore(value![1])
                if (isBefore) {
                    this.setState({
                        open: false
                    })
                }
                // setTimeout(() => {
                //     startInput.blur()
                // }, 100)
            }
        }
    }

    handleValue = (val: any) => {
        if (val) {
            let yearNum = val.year()
            let monthNum = val.month() + 1
            return [yearNum, monthNum]
        } else {
            let yearNum = moment().year()
            let monthNum = moment().month() + 1
            return [yearNum, monthNum]
        }
    }

    onInputFocus = (val: number, val2: string, e: FocusEvent<HTMLInputElement, Element>) => {
        // 左右input触发回调
        this.handleFocus(e)
        const {isHeaderSelect, picker} = this.props
        const { open } = this.state
        if (open && isHeaderSelect) {
            if (val2 && val === 0) {
                // 触发左面板赋值
                if (!picker || picker === 'date' || picker === 'week') {
                    // let dateArr = this.handleValue(val2)
                    let dateArr = this.handleValue(this.state.value![0])
                    this.leftInputValue = dateArr![0] + dateArr![1]
                    this.setState({
                        rightValue: dateArr![0] + '年 ' + parseInt(dateArr![1]) + '月',
                        leftValue: dateArr![0] + '年 ' + (parseInt(dateArr![1]) + 1) + '月'
                    })
                } else if (picker === 'month' || picker === 'quarter' || picker === 'halfYear') {
                    this.leftInputValue = parseInt(val2)
                    this.setState({
                        rightValue: parseInt(val2) + 1 + '年',
                        leftValue: val2 + '年'
                    })
                } else if (picker === 'year') {
                    let yearNum = parseInt(val2)
                    let currentYear = yearNum - parseInt(yearNum.toString().slice(3, 4))
                    this.setState({
                        rightValue: currentYear + 10 + '-' + (currentYear + 19),
                        leftValue: currentYear + '-' + (currentYear + 9)
                    })
                }
            }
            if (val2 && val === 1) {
                // 触发右面板赋值
                if (!picker || picker === 'date' || picker === 'week') {
                    let dateArr = this.handleValue(this.state.value![1])
                    this.rightInputValue = dateArr![0] + dateArr![1]
                    if (this.rightInputValue !== this.leftInputValue) {
                        this.setState({
                            rightValue: dateArr![0] + '年 ' + (parseInt(dateArr![1]) - 1) + '月',
                            leftValue: dateArr![0] + '年 ' + parseInt(dateArr![1]) + '月'
                        })
                    }
                } else if (picker === 'month' || picker === 'quarter' || picker === 'halfYear') {
                    this.rightInputValue = parseInt(val2)
                    if (this.rightInputValue !== this.leftInputValue) {
                        this.setState({
                            rightValue: val2,
                            leftValue: parseInt(val2) - 1 + '年'
                        })
                    }
                } else if (picker === 'year') {
                    let yearNum = parseInt(val2)
                    let currentYear = yearNum - parseInt(yearNum.toString().slice(3, 4))
                    this.setState({
                        rightValue: currentYear + '-' + (currentYear + 9),
                        leftValue: currentYear - 10 + '-' + (currentYear - 19)
                    })
                }
            }
            this.setState({
                inputActiveIndex: val
            })
        }
    }

    // 点击翻页拉下值更新
    handlePanelChange = (
        value: RangePickerState['value'],
        mode: RangePickerState['modeArr'],
        type?: string,
        diff?: number
    ) => {
        const {onPanelChange, antd, picker, isHeaderSelect} = this.props
        const { open } = this.state
        this.setState({modeArr: mode})
        antd && onPanelChange?.(value, mode)
        if (!isHeaderSelect || !open) return
        if (!picker || picker === 'date' || picker === 'week') {
            if (type == 'year' && (diff as number) > 0) {
                // 年度右翻页
                let firstValue = ''
                let lastmonth = ''
                let lastValue = ''
                if (this.state.inputActiveIndex === 0) {
                    // 左面的input触发
                    firstValue = (value![0] || value![1])?.year() + '年 ' + (value![0] || value![1])?.month() + '月'
                    lastmonth = (value![0] || value![1])!?.month() + 1 + '月'
                    lastValue = (value![0] || value![1])?.year() + '年 ' + lastmonth
                } else {
                    firstValue = (value![1] || value![0])?.year() + '年 ' + (value![1] || value![0])?.month() + '月'
                    lastmonth = (value![1] || value![0])!?.month() + 1 + '月'
                    lastValue = (value![1] || value![0])?.year() + '年 ' + lastmonth
                }
                this.setState({
                    rightValue: firstValue,
                    leftValue: lastValue
                })
            } else if (type == 'year' && (diff as number) < 0) {
                // 年度左翻页
                let firstValue = ''
                let lastValue = ''
                if (this.state.inputActiveIndex === 0) {
                    firstValue =
                        (value![0] || value![1])?.year() + '年 ' + ((value![0] || value![1])!?.month() + 1) + '月'
                    lastValue =
                        (value![0] || value![1])?.year() + '年 ' + ((value![0] || value![1])!?.month() + 2) + '月'
                } else {
                    firstValue =
                        (value![1] || value![0])?.year() + '年 ' + ((value![1] || value![0])!?.month() + 1) + '月'
                    lastValue =
                        (value![1] || value![0])?.year() + '年 ' + ((value![1] || value![0])!?.month() + 2) + '月'
                }
                this.setState({
                    rightValue: firstValue,
                    leftValue: lastValue
                })
            } else if (type == 'month' && (diff as number) > 0) {
                // 月度右翻页
                let firstValue = ''
                let lastValue = ''
                if (this.state.inputActiveIndex === 0) {
                    firstValue = value![0]?.year() + '年 ' + value![0]?.month() + '月'
                    lastValue = value![0]?.year() + '年 ' + (value![0]!?.month() + 1) + '月'
                } else {
                    firstValue = value![1]?.year() + '年 ' + value![1]?.month() + '月'
                    lastValue = value![1]?.year() + '年 ' + ((value![1] || value![0])!?.month() + 1) + '月'
                }
                this.setState({
                    rightValue: firstValue,
                    leftValue: lastValue
                })
            } else if (type == 'month' && (diff as number) < 0) {
                // 月度左翻页
                let firstValue = value![0]?.year() + '年 ' + value![0]?.month() + '月'
                let lastValue =
                    (value![1]?.year() || value![0]?.year()) + '年 ' + ((value![0] || value![1])!?.month() + 1) + '月'
                if (this.state.inputActiveIndex === 0) {
                    firstValue = value![0]?.year() + '年 ' + (value![0]!?.month() + 1) + '月'
                    lastValue =
                        (value![0]?.year() || value![1]?.year()) +
                        '年 ' +
                        ((value![0] || value![1])!?.month() + 2) +
                        '月'
                } else {
                    firstValue = value![1]?.year() + '年 ' + (value![1]!?.month() + 1) + '月'
                    lastValue = value![1]?.year() + '年 ' + ((value![1] || value![0])!?.month() + 2) + '月'
                }
                this.setState({
                    rightValue: firstValue,
                    leftValue: lastValue
                })
            }
        } else if (picker === 'month' || picker === 'quarter' || picker === 'halfYear') {
            if (type == 'year' && (diff as number) > 0) {
                let firstValue = ''
                let lastValue = ''
                if (this.state.inputActiveIndex === 0) {
                    // 左面的input触发
                    firstValue = (value![0] || value![1])?.year() + '年 '
                    lastValue = (value![0] || value![1])!?.year() - 1 + '年 '
                } else {
                    firstValue = (value![1] || value![0])?.year() + '年 '
                    lastValue = (value![1] || value![0])!?.year() - 1 + '年 '
                }
                this.setState({
                    rightValue: firstValue,
                    leftValue: lastValue
                })
            } else if (type == 'year' && (diff as number) < 0) {
                let firstValue = ''
                let lastValue = ''
                if (this.state.inputActiveIndex === 0) {
                    firstValue = (value![0] || value![1])!?.year() + '年 '
                    lastValue = (value![0] || value![1])!?.year() - 1 + '年 '
                } else {
                    firstValue = (value![1] || value![0])!?.year() + '年 '
                    lastValue = (value![1] || value![0])!?.year() - 1 + '年 '
                }
                this.setState({
                    rightValue: firstValue,
                    leftValue: lastValue
                })
            }
        } else if (picker === 'year') {
            if (type == 'year' && (diff as number) > 0) {
                let firstValue = ''
                let lastValue = ''
                if (this.state.inputActiveIndex === 0) {
                    // 左面的input触发
                    let yearNum = (value![0] || value![1])?.year()
                    let currentYear = (yearNum as number) - parseInt((yearNum as number).toString().slice(3, 4))
                    firstValue = currentYear + '-' + (currentYear + 9)
                    lastValue = currentYear - 10 + '-' + (currentYear - 1)
                } else {
                    let yearNum = (value![1] || value![0])?.year()
                    let currentYear = (yearNum as number) - parseInt((yearNum as number).toString().slice(3, 4))
                    firstValue = currentYear + '-' + (currentYear + 9)
                    lastValue = currentYear - 10 + '-' + (currentYear - 1)
                }
                this.setState({
                    rightValue: firstValue,
                    leftValue: lastValue
                })
            } else if (type == 'year' && (diff as number) < 0) {
                let firstValue = ''
                let lastValue = ''
                if (this.state.inputActiveIndex === 0) {
                    // 左面的input触发
                    let yearNum = (value![0] || value![1])?.year()
                    let currentYear = (yearNum as number) - parseInt((yearNum as number).toString().slice(3, 4))
                    firstValue = currentYear + '-' + (currentYear + 9)
                    lastValue = currentYear - 10 + '-' + (currentYear - 1)
                } else {
                    let yearNum = (value![1] || value![0])?.year()
                    let currentYear = (yearNum as number) - parseInt((yearNum as number).toString().slice(3, 4))
                    firstValue = currentYear + '-' + (currentYear + 9)
                    lastValue = currentYear - 10 + '-' + (currentYear - 1)
                }
                this.setState({
                    rightValue: firstValue,
                    leftValue: lastValue
                })
            }
        }
    }

    handleOpenChange = (open: boolean) => {
        const {onOpenChange} = this.props
        this.setState({open})
        onOpenChange?.(open)
    }

    /**
     * @desc 选中快捷日期的回调
     * @param {String} label 快捷选项文本
     * @param {[moment||null, moment||null]} value 新选中的值
     */
    handlePresetChange = (label: string, value: RangeValue<Moment>) => {
        const {onPresetChange, ranges, picker, timezone, serverTimezone, enableTimezone} = this.props
        const {showTime, initFormat: format} = this.state

        for (let i = 0; i < 2; i++) {
            if (enableTimezone && value?.[i] && showTime && (!picker || picker === 'date')) {
                value[i] = timezoneAdaptor({
                    value: value[i]!,
                    format: format[i],
                    timezone,
                    serverTimezone
                }).value
            }
        }

        if (Array.isArray(ranges)) {
            let item = ranges.filter(range => range.label === label)[0]
            this.setState({activePresetLabel: label})
            onPresetChange?.(label, value, item, this.state.lastSelectDate)
        } else if (typeof ranges === 'object') {
            this.setState({
                activePresetLabel: label
            })
            onPresetChange?.(label, value, ranges[label], this.state.lastSelectDate)
        }
        // 快捷键选中日期范围后触发失焦
        let startInput = (findDOMNode(this.node) as HTMLElement)
            .querySelectorAll(`.${_PREFIX_CLS}-input`)[0]
            .querySelectorAll('input')[0]
        startInput.blur()
        let endInput = (findDOMNode(this.node) as HTMLElement)
            .querySelectorAll(`.${_PREFIX_CLS}-input`)[1]
            .querySelectorAll('input')[0]
        endInput.blur()
    }

    disabledDate = (current: moment.Moment) => {
        const {disabledDate, picker, timezone, serverTimezone, enableTimezone} = this.props
        const {showTime, initFormat: format} = this.state
        if (!disabledDate) return false
        if (!picker || picker === 'date') {
            if (!showTime) {
                current = current?.startOf('date')
            } else if (enableTimezone) {
                current = timezoneAdaptor({
                    value: current,
                    format: format[0],
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
            return getCalendarContainer(dom)
        } else {
            return cssUtil.parentsUntil(dom)
        }
    }

    // 处理下拉面板解耦参数更新不及时问题
    setActiveSelectPanel = () =>
        requestAnimationFrame(() => {
            this.setState({
                activeSelectPanel: 'none'
            })
        })

    // 下拉面板隐藏时activeSelectPanel更新为none
    updateActiveSelectPanel = (flag: string) => {
        let {picker} = this.props
        if (!picker || picker === 'date' || picker === 'week') {
            if (flag == 'monthFlag') {
                this.setActiveSelectPanel()
            }
        } else {
            this.setActiveSelectPanel()
        }
    }

    getDiffValueHandle = ({
        value,
        val,
        ismask,
        position,
        flag
    }: {
        value: [number, number]
        val: string
        ismask: boolean
        position: 'left' | 'right'
        flag: string
    }) => {
        // 选择下拉之后更新面板
        let {picker} = this.props
        if (!picker || picker === 'date' || picker === 'week') {
            let dateArr = val.split(/\s+/)
            let newRightValue = dateArr[0] + ' ' + (parseInt(dateArr[1]) + 1) + '月'
            this.setState(
                position === 'left'
                    ? {
                        leftValue: newRightValue,
                        rightValue: val
                    }
                    : {
                        leftValue: val,
                        rightValue: newRightValue
                    }
            )
        } else if (picker === 'month' || picker === 'quarter' || picker === 'halfYear') {
            let newRightValue = parseInt(val) + '年'
            this.setState(
                position === 'left'
                    ? {
                        leftValue: newRightValue,
                        rightValue: parseInt(val) + 1 + '年'
                    }
                    : {
                        leftValue: parseInt(val) - 1 + '年',
                        rightValue: newRightValue
                    }
            )
        } else if (picker === 'year') {
            let newArr = val.split('-')
            this.setState(
                position === 'left'
                    ? {
                        leftValue: val,
                        rightValue: parseInt(newArr[0]) + 10 + '-' + (parseInt(newArr[1]) + 10)
                    }
                    : {
                        leftValue: parseInt(newArr[0]) - 10 + '-' + (parseInt(newArr[1]) - 10),
                        rightValue: val
                    }
            )
        }
        this.updateActiveSelectPanel(flag)
        this.setState({
            diffValue: value,
            maskShow: ismask
        })
    }

    onPanelshow = (val: boolean, position: 'left' | 'right') => {
        this.setState({
            activeSelectPanel: position,
            maskShow: !val
        })
    }

    generateSelectPanel = (position: 'left' | 'right') => {
        const {picker, fieldid, defaultValue} = this.props
        const {langInfo, leftValue, rightValue} = this.state
        return (
            <DatePickerHeaderSelect
                {...(position === 'left' ? {valueLeft: leftValue} : {value: rightValue})}
                fieldid={fieldid}
                key={position}
                position={position}
                lang={langInfo}
                onPanelshow={this.onPanelshow}
                picker={picker}
                getDiffValueHandle={this.getDiffValueHandle}
                defaultValue={defaultValue}
                ref={el => (position === 'left' ? (this.headerSelectLeft = el) : (this.headerSelectRight = el))}
                hiddenHandleSelect={this.hiddenHandleSelect}
            ></DatePickerHeaderSelect>
        )
    }

    getMergedFormat = (format: RangePickerState['format'], initFormat: RangePickerState['initFormat'], labelFormat: RangePickerState['labelFormat']) => {
        if (format && initFormat && format[0] === initFormat[0] && format[1] === initFormat[1]) {
            return labelFormat
        } else {
            return format
        }
    }

    render() {
        let {
            use12Hours,
            picker,
            className,
            size,
            requiredStyle,
            bordered,
            align,
            dropdownClassName,
            popupClassName,
            timezone,
            serverTimezone,
            enableTimezone,
            value,
            defaultValue,
            defaultPickerValue,
            linkedPanels = false,
            superPrevIcon,
            superNextIcon,
            prevIcon,
            nextIcon,
            renderExtraFooter,
            renderFooter,
            dateRender,
            dateCellRender,
            dir: direction = 'ltr',
            isHeaderSelect
        } = this.props
        const state = this.state
        let {
            activePresetLabel,
            langInfo,
            format,
            initFormat,
            labelFormat,
            showTime,
            open,
            ranges,
            placeholder,
            clearIcon,
            suffixIcon,
            modeArr,
            activeSelectPanel
        } = state
        let _defaultPickerValue = (!value && !defaultValue && defaultPickerValue) || undefined
        isShouldUpdate('DatePicker', this.props)

        const leftPanel = open && isHeaderSelect ? this.generateSelectPanel('left') : null
        const rightPanel = open && isHeaderSelect ? this.generateSelectPanel('right') : null

        const mergedFormat = this.getMergedFormat(format, initFormat, labelFormat)

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
            <RCRangePicker
                {...adapterNid}
                {...omit(this.props, _handleProps)}
                /* 内置配置 */
                ref={node => {
                    this.node = node as RCRangePicker<Moment>
                }}
                direction={direction}
                prefixCls={_PREFIX_CLS}
                transitionName='slide-up'
                className={mergedCls}
                dropdownClassName={dropdownClassName || popupClassName}
                generateConfig={generateConfig}
                locale={Object.assign({}, langInfo.langMap, {
                    shortMonths: langInfo.langMap.monthsShort,
                    shortWeekDays: langInfo.langMap.weekdaysMin,
                    halfYearFormat: (date: Moment) => halfYearFormat(date, langInfo, false)
                })} // 语言包必须提供
                value={state.value ?? undefined}
                format={picker === 'halfYear' ? (date: Moment) => halfYearFormat(date, langInfo) : mergedFormat}
                use12Hours={use12Hours}
                showTime={showTime as RangePickerDateProps<Moment>['showTime']}
                open={open ?? undefined}
                defaultPickerValue={
                    // 无value且无defaultValue时才可使用defaultPickerValue
                    _defaultPickerValue
                }
                mode={modeArr}
                placeholder={placeholder}
                ranges={ranges}
                activePresetLabel={activePresetLabel}
                linkedPanels={linkedPanels}
                disabledDate={this.disabledDate}
                // onFocus={this.handleFocus} // onFocus整合进onInputFocus
                onInputFocus={this.onInputFocus}
                onBlur={this.handleBlur}
                onPresetChange={this.handlePresetChange}
                onChange={this.handleChange}
                onCalendarChange={this.handleCalendarChange}
                onOpenChange={this.handleOpenChange}
                onPanelChange={this.handlePanelChange}
                getPopupContainer={this.getPopupContainerDom as (node: HTMLElement) => HTMLElement}
                renderExtraFooter={renderExtraFooter || renderFooter}
                dateRender={dateRender || dateCellRender}
                clearIcon={clearIcon}
                suffixIcon={suffixIcon}
                superPrevIcon={superPrevIcon ?? <Icon type={direction === 'rtl' ? 'uf-youjiantou_shuang' : 'uf-daoshouye'} />} // UE 需求，更换默认翻页箭头
                superNextIcon={superNextIcon ?? <Icon type={direction === 'rtl' ? 'uf-daoshouye' : 'uf-youjiantou_shuang'} />}
                prevIcon={prevIcon ?? <Icon type={direction === 'rtl' ? 'uf-arrow-right' : 'uf-arrow-left'} />}
                nextIcon={nextIcon ?? <Icon type={direction === 'rtl' ? 'uf-arrow-left' : 'uf-arrow-right'} />}
                // @ts-ignore
                diffValue={open && isHeaderSelect ? this.state.diffValue : undefined}
                headerSelectLeft={leftPanel}
                headerSelectRight={rightPanel}
                showSelectMask={open && isHeaderSelect ? this.state.maskShow : false}
                activeSelectPanel={activeSelectPanel}
            ></RCRangePicker>
        )
    }
}

// RangePicker.propTypes = propTypes
export default RangePicker
