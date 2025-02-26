// /* eslint jsx-a11y/no-autofocus: 0 */
import moment from 'moment';
import React, { Component } from 'react';
// import PropTypes from 'prop-types'
import Trigger from 'rc-trigger'
import Input from './Input'
import Panel from './Panel'
import placements from './placements'
import type {KeyboardEventHandler, LegacyRef, MouseEvent, MouseEventHandler, ReactElement} from 'react'
import type {Moment} from 'moment'
import type {RCTimePickerProps, RCTimePickerState, AmpmType} from './iRCTimePicker'
import { getNid } from '../../../wui-core/src';

// function noop() {}

function refFn<T>(this: any, field: string, component: T) {
    this[field] = component
}

// 增加的计算时间项的方法 added by: gx
function generateOptions(length: number, disabledOptions: number[], hideDisabledOptions: boolean, step: number = 1) {
    // 生成选项数组
    const arr: number[] = []
    for (let value = 0; value < length; value += step) {
        if (!disabledOptions || disabledOptions.indexOf(value) < 0 || !hideDisabledOptions) {
            arr.push(value)
        }
    }
    return arr
}

function toNearestValidTime(time: Moment, hourOptions: number[], minuteOptions: number[], secondOptions: number[]) {
    // 至最近的合法时间
    const hour = hourOptions.slice().sort((a: number, b: number) => Math.abs(time.hour() - a) - Math.abs(time.hour() - b))[0]
    const minute = minuteOptions.slice().sort((a: number, b: number) => Math.abs(time.minute() - a) - Math.abs(time.minute() - b))[0]
    const second = secondOptions.slice().sort((a: number, b: number) => Math.abs(time.second() - a) - Math.abs(time.second() - b))[0]
    return moment(`${hour}:${minute}:${second}`, 'HH:mm:ss')
}

export default class Picker extends Component<RCTimePickerProps, RCTimePickerState> {
    static defaultProps = {
        clearText: 'clear',
        prefixCls: 'rc-time-picker',
        defaultOpen: false,
        inputReadOnly: false,
        // style: {},
        className: '',
        popupClassName: '',
        // popupStyle: {},
        id: '',
        // align: {},
        defaultOpenValue: moment(),
        allowEmpty: true,
        showHour: true,
        showMinute: true,
        showSecond: true,
        disabledHours: () => ([]),
        disabledMinutes: () => ([]),
        disabledSeconds: () => ([]),
        hideDisabledOptions: false,
        placement: 'bottomLeft',
        // onChange: noop,
        // onAmPmChange: noop,
        // onOpen: noop,
        // onClose: noop,
        // onOpenChange: noop,
        // onFocus: noop,
        // onBlur: noop,
        renderExtraFooter: () => null,
        use12Hours: false,
        focusOnOpen: false,
        // onKeyDown: noop,
        allowClear: true,
        inputWidth: 0
    }

    picker: any;
    saveInputRef: LegacyRef<Input>
    savePanelRef: LegacyRef<Panel>

    constructor(props: RCTimePickerProps) {
        super(props)
        this.saveInputRef = refFn.bind(this, 'picker')
        this.savePanelRef = refFn.bind(this, 'panelInstance')
        const {defaultOpen, defaultValue, open = defaultOpen, value = defaultValue} = props
        this.state = {
            inputWidth: undefined,
            inputFocused: !!props.autoFocus,
            panelFocused: open,
            open,
            value
        }
    }

    UNSAFE_componentWillReceiveProps(nextProps: RCTimePickerProps) {
        const {value, open} = nextProps
        if ('value' in nextProps) {
            this.setState({
                value
            })
        }
        if (open !== undefined) {
            this.setState({open})
        }
    }

    onPanelChange = (value: Moment | null) => {
        this.setValue(value)
    }
    onPanelClick = () => {
        this.setState({panelFocused: true})
    }
    onInputFocus = (e: React.FocusEvent<Element, Element>) => {
        this.setState({inputFocused: true})
        this.props.onFocus?.(e)
    }
    onInputBlur = (value: Moment) => {
        this.setValue(value)
        this.setState({inputFocused: false})
        this.props.onBlur?.(value)
    }

    blurHandle = () => {
        this.setState({inputFocused: false})
    }

    onAmPmChange = (ampm: AmpmType) => {
        const {onAmPmChange} = this.props
        onAmPmChange?.(ampm)
    }

    handleOpenChange = (open: boolean) => {
        this.setState({open})
        this.setOpen(false)
    }

    onClear: MouseEventHandler = event => {
        event.stopPropagation()
        this.setValue(null)
        this.setOpen(false)
        this.setState({panelFocused: false})
    }

    onVisibleChange = (open: boolean) => {
        this.setOpen(open)
        this.setState({panelFocused: open})
    }

    onEsc = () => {
        this.setOpen(false)
        this.focus()
    }

    onKeyDown: KeyboardEventHandler = e => {
        if (e.keyCode === 40) {
            this.setOpen(true)
        }
        this.props.onKeyDown?.(e)
    }

    setValue(value: Moment | null) {
        const {onChange} = this.props
        if (!('value' in this.props)) {
            this.setState({
                value
            })
        }
        onChange?.(value)
    }

    getFormat() {
        const {format, showHour, showMinute, showSecond, use12Hours} = this.props
        if (format) {
            return format
        }

        if (use12Hours) {
            const fmtString = [showHour ? 'h' : '', showMinute ? 'mm' : '', showSecond ? 'ss' : '']
                .filter(item => !!item)
                .join(':')

            return fmtString.concat(' A')
        }

        return [showHour ? 'HH' : '', showMinute ? 'mm' : '', showSecond ? 'ss' : ''].filter(item => !!item).join(':')
    }

    isAM() {
        const {defaultOpenValue} = this.props;
        const {value} = this.state;
        const realValue = value || defaultOpenValue;
        return realValue && realValue.hour() >= 0 && realValue.hour() < 12;
    }

    getPanelElement() {
        const {
            prefixCls,
            // className,
            fieldid,
            // placeholder,
            disabledHours,
            disabledMinutes,
            disabledSeconds,
            hideDisabledOptions,
            // inputReadOnly,
            // allowEmpty,
            showHour,
            showMinute,
            showSecond,
            defaultOpenValue,
            clearText,
            locale,
            showNow,
            renderExtraFooter,
            use12Hours,
            hourStep,
            minuteStep,
            secondStep,
            dir,
            // clearIcon
        } = this.props
        const {value, inputWidth} = this.state
        return (
            <Panel
                clearText={clearText}
                prefixCls={`${prefixCls}-panel`}
                // className={className} // 移除多余className传递
                ref={this.savePanelRef}
                fieldid={fieldid}
                locale={locale}
                value={value}
                dir={dir}
                // inputReadOnly={inputReadOnly}
                onClick={this.onPanelClick}
                onChange={this.onPanelChange}
                onAmPmChange={this.onAmPmChange}
                onOpenChange={this.handleOpenChange}
                defaultOpenValue={defaultOpenValue}
                showHour={showHour!}
                showMinute={showMinute!}
                showSecond={showSecond!}
                format={this.getFormat()}
                disabledHours={disabledHours}
                disabledMinutes={disabledMinutes}
                disabledSeconds={disabledSeconds}
                hideDisabledOptions={hideDisabledOptions!}
                use12Hours={use12Hours}
                hourStep={hourStep!}
                minuteStep={minuteStep!}
                secondStep={secondStep!}
                showNow={showNow}
                renderExtraFooter={renderExtraFooter}
                width={inputWidth}


            />
        )
    }

    getPopupClassName() {
        const {showHour, showMinute, showSecond, use12Hours, prefixCls, popupClassName} = this.props
        let className = popupClassName
        // Keep it for old compatibility
        if ((!showHour || !showMinute || !showSecond) && !use12Hours) {
            className += ` ${prefixCls}-panel-narrow`
        }
        let selectColumnCount = 0
        if (showHour) {
            selectColumnCount += 1
        }
        if (showMinute) {
            selectColumnCount += 1
        }
        if (showSecond) {
            selectColumnCount += 1
        }
        if (use12Hours) {
            selectColumnCount += 1
        }
        className += ` ${prefixCls}-panel-column-${selectColumnCount}`
        return className
    }

    setOpen(open: boolean) {
        const {onOpen, onClose, onOpenChange} = this.props
        const {open: currentOpen} = this.state
        if (currentOpen !== open) {
            if (!('open' in this.props)) {
                this.setState({open})
            }
            onOpenChange?.({open})
            if (open) {
                onOpen?.({open})
            } else {
                onClose?.({open})
            }
        }
    }

    focus() {
        this.picker.focus()
    }

    blur() {
        this.picker.blur()
    }

    renderClearButton() {
        const {value} = this.state
        const {prefixCls, allowEmpty, clearIcon, clearText, fieldid} = this.props
        if (!allowEmpty || !value) {
            return null
        }

        if (React.isValidElement(clearIcon)) {
            return React.cloneElement(clearIcon, {
                fieldid: fieldid ? fieldid + '_clear' : undefined,
                title: clearText,
                onClick: (e: MouseEvent<HTMLElement>) => {
                    if ((clearIcon as ReactElement).props?.onClick) (clearIcon as ReactElement).props?.onClick(e)
                    this.onClear(e)
                }
            })
        }

        return (
            <a
                role='button'
                className={`${prefixCls}-clear`}
                title={clearText}
                onClick={this.onClear}
                tabIndex={0}
                fieldid={fieldid ? fieldid + '_clear' : undefined}
            >
                {clearIcon || <i className={`${prefixCls}-clear-icon`} />}
            </a>
        )
    }

    // 计算不可用小时选项 added by: gx
    disabledHours = () => {
        const {use12Hours, disabledHours} = this.props
        let disabledOptions = disabledHours?.() || []
        if (use12Hours && Array.isArray(disabledOptions)) {
            if (this.isAM()) {
                disabledOptions = disabledOptions.filter(h => h < 12).map(h => (h === 0 ? 12 : h))
            } else {
                disabledOptions = disabledOptions.map(h => (h === 12 ? 12 : h - 12))
            }
        }
        return disabledOptions
    }

    // 处理输入框宽度变化 added by: gx
    handleInputWidthChange = (width: number) => {
        this.setState({
            inputWidth: width
        })
    }

    render() {
        const {
            prefixCls,
            placeholder,
            placement,
            align,
            allowEmpty,
            id,
            fieldid,
            disabled,
            transitionName,
            style,
            className,
            getPopupContainer,
            name,
            autoComplete,
            autoFocus,
            inputReadOnly,
            inputIcon,
            popupStyle,
            allowClear,
            disabledMinutes,
            disabledSeconds,
            focusOnOpen,
            // clearIcon,
            hideDisabledOptions,
            hourStep,
            minuteStep,
            secondStep,
            defaultOpenValue,
            locale,
            clearText,
            showHour,
            showMinute,
            showSecond,
            onEsc
        } = this.props
        // 新增一些传给Input组件的属性 added by: gx
        const {open, value, inputFocused, panelFocused} = this.state
        const popupClassName = this.getPopupClassName()
        // 将之前Header里的处理逻辑放到TimePicker中 added by: gx
        const disabledHourOptions = this.disabledHours()
        const disabledMinuteOptions = disabledMinutes!(value ? value.hour() : null)
        const disabledSecondOptions = disabledSeconds!(value ? value.hour() : null, value ? value.minute() : null)
        const hourOptions = generateOptions(24, disabledHourOptions, hideDisabledOptions!, hourStep)
        const minuteOptions = generateOptions(60, disabledMinuteOptions, hideDisabledOptions!, minuteStep)
        const secondOptions = generateOptions(60, disabledSecondOptions, hideDisabledOptions!, secondStep)

        const validDefaultOpenValue = defaultOpenValue && toNearestValidTime(defaultOpenValue, hourOptions, minuteOptions, secondOptions)

        const focusedCls = inputFocused || panelFocused ? `${prefixCls}-focused` : ''
        let adapterNid = getNid(this.props)
        return (
            <Trigger
                prefixCls={`${prefixCls}-panel`}
                popupClassName={popupClassName}
                popupStyle={popupStyle}
                popup={this.getPanelElement()}
                popupAlign={align}
                builtinPlacements={placements}
                popupPlacement={placement}
                action={disabled ? [] : ['click']}
                destroyPopupOnHide
                getPopupContainer={getPopupContainer}
                popupTransitionName={transitionName}
                popupVisible={open}
                onPopupVisibleChange={this.onVisibleChange}
            >
                <span fieldid={fieldid} className={`${prefixCls} ${className} ${focusedCls}`} style={style} {...adapterNid}>
                    <Input
                        prefixCls={prefixCls!}
                        onFocus={this.onInputFocus}
                        onBlur={this.onInputBlur}
                        blurHandle={this.blurHandle}
                        format={this.getFormat()}
                        autoFocus={autoFocus}
                        onChange={this.onPanelChange}
                        autoComplete={autoComplete!}
                        disabled={disabled}
                        onKeyDown={this.onKeyDown}
                        name={name}
                        showHour={showHour!}
                        showMinute={showMinute!}
                        showSecond={showSecond!}
                        placeholder={placeholder}
                        id={id}
                        fieldid={fieldid}
                        readOnly={!!inputReadOnly}
                        ref={this.saveInputRef}
                        locale={locale}
                        value={value}
                        clearText={clearText}
                        defaultOpenValue={validDefaultOpenValue!}
                        // currentSelectPanel={currentSelectPanel}
                        onEsc={onEsc}
                        hourOptions={hourOptions}
                        minuteOptions={minuteOptions}
                        secondOptions={secondOptions}
                        disabledHours={this.disabledHours}
                        disabledMinutes={disabledMinutes!}
                        disabledSeconds={disabledSeconds!}
                        allowEmpty={allowEmpty!}
                        focusOnOpen={focusOnOpen!}
                        handleInputWidthChange={this.handleInputWidthChange}
                    />
                    {allowClear && !disabled && this.renderClearButton()}
                    {inputIcon || <span className={`${prefixCls}-icon`} />}
                </span>
            </Trigger>
        )
    }
}
