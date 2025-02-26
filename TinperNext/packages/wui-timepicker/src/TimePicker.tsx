import React, {Component} from 'react'
import moment from 'moment'
import classNames from 'classnames'
// import PropTypes from 'prop-types';
import { ConfigContext, WithConfigConsumer} from '../../wui-provider/src/context'
import {cssUtil, formatUtils, Warning, WebUI, prefix, getChildrenText, setComponentSize, setComponentClass, getNid} from './../../wui-core/src'
import {getLangInfo} from './../../wui-datepicker/src/_utils/lang'
import i18n from './i18n'
import RcTimePicker from './rc/index'
import type {Moment} from 'moment'
import type {TimePickerProps, TimePickerState, TimePickerDefaultProps, TimePickerWithDefaultProps} from './iTimePicker'
import { globalConfig } from '../../wui-provider/src';

const {isShouldUpdate} = Warning
const prefixCls = `${prefix}-time-picker`

const defaultProps: TimePickerDefaultProps = {
    size: 'md',
    allowClear: true, // 默认允许清除
    focusOnOpen: false,
    autoComplete: 'off',
    placeholder: '',
    locale: 'zh-cn',
    // showHour: true,
    // showMinute: true,
    // showSecond: true,
    clearIcon: <i className='uf uf-close-c' />
    // inputIcon: <i className='uf uf-time-c-o' />,
    // onKeyDown: () => {}
}

@WithConfigConsumer({name: 'timepicker'})
@WebUI({name: 'time-picker', defaultProps})
class TimePicker extends Component<TimePickerProps, TimePickerState> {
    static contextType = ConfigContext;
    constructor(props: TimePickerWithDefaultProps) {
        super(props)
        const {locale, value, defaultValue} = props
        const format = this.getFormat(props)
        const langInfo = getLangInfo({format, locale, localeData: i18n, componentName: 'timePicker'}) // 获取语言包信息
        this.state = {
            langInfo,
            value: this.initValue(value, props),
            defaultValue: this.initValue(defaultValue, props),
            showTime: formatUtils.format2ShowTime(format),
            format
        }
    }

    UNSAFE_componentWillReceiveProps(nextProps: TimePickerProps) {
        if ('value' in nextProps) {
            let value = this.initValue(nextProps.value, nextProps)
            this.setState({
                value
            })
        }

        if ('defaultValue' in nextProps) {
            let defaultValue = this.initValue(nextProps.defaultValue, nextProps)
            this.setState({
                defaultValue
            })
        }

        if ('format' in nextProps) {
            this.setState(
                Object.assign(nextProps.format ? {showTime: formatUtils.format2ShowTime(nextProps.format)} : {}, {
                    format: this.getFormat(nextProps)
                })
            )
        }

        if ('locale' in nextProps) {
            let langInfo = getLangInfo({format: this.getFormat(nextProps), locale: nextProps.locale, localeData: i18n, componentName: 'timePicker'}) // 获取语言包信息
            this.setState({langInfo})
        }
    }

    initValue = (value: TimePickerProps['value'], props: TimePickerProps) => {
        const format = this.getFormat(props)
        if (value) {
            if (typeof value === 'string' && moment(value, format).isValid()) {
                value = moment(value, format)
            } else if (typeof value !== 'string' && value.isValid?.()) {
                value = moment(value.format(format), format)
            } else {
                console.error('`value` of TimePicker is not in correct format')
                value = null
            }
        } else if (value === undefined) {
            value = undefined
        } else {
            value = null
        }
        // 确保value的moment实例多语版本一致
        if (value) {
            let langInfo = getLangInfo({format, locale: this.props.locale, localeData: i18n, componentName: 'timePicker'}) // 获取语言包信息
            moment.locale(langInfo.lang)
            value = moment(value, format)
        }
        return value
    }

    getFormat = (props: TimePickerProps) => {
        let {format} = props
        if (format) return format;

        let showTime: any = {};
        const globalDataFormat = globalConfig().getGlobalDataFormat()
        if (!format && globalDataFormat) {
            const {timeFormat} = globalDataFormat
            format = formatUtils.diworkFormat2Picker(timeFormat, 'time').format
            if (format) {
                showTime = formatUtils.format2ShowTime(format);
            }
        }

        // 未传入format时，showTime配置都默认为true【***不要合并props，逻辑更清晰***】
        let {use12Hours, showHour, showMinute, showSecond} = props;
        showHour = showHour ?? showTime.showHour ?? true;
        showMinute = showMinute ?? showTime.showMinute ?? true;
        showSecond = showSecond ?? showTime.showSecond ?? true;

        if (use12Hours) {
            const fmtString = [showHour ? 'h' : '', showMinute ? 'mm' : '', showSecond ? 'ss' : '']
                .filter(item => !!item)
                .join(':')
            return fmtString.concat(' A')
        }

        return [showHour ? 'HH' : '', showMinute ? 'mm' : '', showSecond ? 'ss' : ''].filter(item => !!item).join(':')
    }

    getPopupContainerDom = (dom: HTMLElement) => {
        const {getPopupContainer} = this.props
        if (typeof getPopupContainer === 'function') {
            return (getPopupContainer as (h?: HTMLElement) => HTMLElement)(dom)
        } else {
            return cssUtil.parentsUntil(dom)
        }
    }

    handleTimeChange = (time: Moment | null) => {
        const {onChange} = this.props
        let timeString = ''
        if (time !== null && typeof time.format === 'function') {
            timeString = time.format(this.state.format)
        }
        this.setState({
            value: time
        })
        onChange?.(time, timeString)
    }

    render() {
        let {
            defaultOpenValue,
            showClear,
            allowClear,
            className,
            requiredStyle,
            bordered,
            align,
            showNow,
            use12Hours,
            placeholder,
            clearText,
            renderExtraFooter,
            addon,
            inputIcon,
            suffixIcon,
            clsPrefix,
            onChange,
            locale,
            size,
            placement = this.props.dir === "rtl" ? "bottomRight" : "bottomLeft",
            ...other
        } = this.props

        // ConfigProvider的context配置
        bordered = bordered ?? (this.context as React.ContextType<typeof ConfigContext>)?.bordered ?? true // 接受provider控制

        let {value, defaultValue, format, showTime, langInfo} = this.state
        isShouldUpdate('TimePicker', this.props)

        const globalDataFormat = globalConfig().getGlobalDataFormat()
        if (globalDataFormat) {
            const {timeFormat} = globalDataFormat
            use12Hours = use12Hours ?? formatUtils.diworkFormat2Picker(timeFormat, 'time').use12Hours
        }
        size = setComponentSize(size, {defaultIsMd: true})
        // 兼容API
        const extra = {
            inputIcon: inputIcon || suffixIcon || <i className='uf uf-time-c-o' />,
            renderExtraFooter: renderExtraFooter || addon,
            allowClear: showClear !== undefined ? showClear : allowClear,
            className: classNames(className, {
                [`${prefixCls}-${size}`]: !!size,
                [`${prefixCls}-disabled`]: other.disabled,
                [`${prefixCls}-rtl`]: other.dir === 'rtl',
                ...setComponentClass({clsPrefix: prefixCls, bordered, align, requiredStyle})
            })
        }
        let _clearText =
            getChildrenText(clearText).join('') ||
            (langInfo.langMap as {clear: string})?.clear

        let _defaultOpenValue = moment(defaultOpenValue, format).isValid() ? moment(defaultOpenValue, format) : moment().set({h: 0, m: 0, s: 0}) // 默认时分秒为 0点0分0秒
        let adapterNid = getNid(this.props)

        return (
            <RcTimePicker
                {...(!showTime ? {} : (showTime as any))}
                {...other}
                {...extra}
                placement={placement}
                transitionName='slide-up'
                getPopupContainer={this.getPopupContainerDom}
                prefixCls={clsPrefix}
                locale={langInfo} // 补充多语的locale
                showNow={showNow}
                placeholder={getChildrenText(placeholder).join('')}
                value={value}
                defaultValue={defaultValue}
                defaultOpenValue={_defaultOpenValue}
                format={format}
                use12Hours={use12Hours}
                onChange={this.handleTimeChange}
                clearText={_clearText}
                {...adapterNid}
            />
        )
    }
}

// TimePicker.propTypes = propTypes;
export default TimePicker
