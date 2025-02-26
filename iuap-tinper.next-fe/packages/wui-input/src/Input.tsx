import classnames from 'classnames'
import omit from 'omit.js'
// import PropTypes from 'prop-types'import TextArea from 'rc-textarea'
import TextArea from 'rc-textarea'
import React, { Component } from 'react'
import Button from '../../wui-button/src'
import { WebUI, prefix as componentPrefix, getChildrenText, getNid, setComponentClass, stopKeyEventBubbles } from '../../wui-core/src/index'
import Icon from '../../wui-icon/src'
import { DefaultProps, InputProps, InputState, InputWithDefaultProps } from './iInput'
// import { InputNumberProps } from '../../wui-input-number/src/iInputNumber'

const textareaPrefix = componentPrefix + '-textarea'

const defaultProps: DefaultProps = {
    componentClass: 'input',
    clsPrefix: 'wui-input',
    type: 'text',
    size: 'md',
    bordered: true,
    trim: false,
    trigger: 'click',
    iconRender: () => null,
    // showMaxLabel: false, // 需兼容showCount
    allowInputOverMax: false, // textarea默认行为调整为不允许超出maxLength
    // passwordVisible: false,
    visibilityToggle: true,
    debounceDelay: 0,
    antd: false
}

let cutValue = (value?: string | number, maxLength?: number) => {
    if (maxLength && value) {
        value = value.toString().substring(0, maxLength)
    }
    return value ?? ''
}

@WebUI({name: 'input', defaultProps})
class Input extends Component<InputWithDefaultProps, InputState> {
    constructor(props: InputWithDefaultProps) {
        super(props)
        const value =
            props.value === undefined
                ? cutValue(props.defaultValue, props.maxLength)
                : cutValue(props.value, props.maxLength)
        this.state = {
            passwordVisible: props.passwordVisible ?? false,
            showSearch: !props.value,
            value,
            focused: false,
            isInputChinese: false,
            prevValue: props.value,
            autoSize: [props.type, props.componentClass].includes('textarea') ? this.getAutoSize(props) : undefined,
        }
        this.input = null
        this.clickClearBtn = false
        this.clickSearchBtn = false
        this.lastScrollCall = 0
    }

    private input: any
    private clickClearBtn: boolean
    private clickSearchBtn: boolean
    private lastScrollCall: number
    private e!: any
    isInputChinese = false
    UNSAFE_componentWillReceiveProps(nextProps: InputProps) {
	    const {value, passwordVisible, type, componentClass} = nextProps
        let newState: InputState = {prevValue: value}
        if (this.isInputChinese === false) {
            if (value !== undefined || this.state.prevValue !== value) {
                newState.value = value;
            }
        } else if (value !== undefined && this.state.prevValue !== value && this.state.value !== value) {
            this.isInputChinese = false;
        }
        if (nextProps.passwordVisible !== undefined) {
            newState.passwordVisible = passwordVisible
        }
        newState.autoSize = [type, componentClass].includes('textarea') ? this.getAutoSize(nextProps) : undefined;
        this.setState(
            newState
        )
    }
    componentDidMount() {
        if (this.props.type === 'password') {
            this.removePasswordValue();
        }
    }
    componentWillUnmount() {
        if (this.input) {
            this.input.blur();
            this.input = null;
        }
    }

    /** 性能优化：调整autoSize属性 */
    getAutoSize = (props: InputProps) => {
	    const {defaultValue, value, type, componentClass, autoSize, placeholder} = props
        if (![type, componentClass].includes('textarea')) return
        if ((typeof autoSize !== 'object') || autoSize?.minRows || placeholder || value || defaultValue || this.state?.prevValue) {
            return autoSize
        }
    }

    removePasswordValue = () => {
        this.input && this.input.getAttribute('type') === 'password' && this.input.hasAttribute('value') && this.input.removeAttribute('value');
    }
    handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>, valueChinese: InputWithDefaultProps['value'], composition?: 'start' | 'end') => {
        const {onChange, debounceDelay, antd, value: propValue} = this.props
        const now = new Date().getTime()
        if (now - this.lastScrollCall < debounceDelay) return
        this.lastScrollCall = now
        // const value = cutValue(this.input.value || e.target.value, maxLength)
        // #QDJCJS-7720设置maxLength后搜狗输入法录入中文过程中，当录入快到达最大长度时，会删已经录入的文本
        const value = valueChinese || this.input.value || e.target.value
        if (propValue === undefined || this.isInputChinese || composition === 'end') {
            this.setState({
                value: value ?? '',
                showSearch: value == null || value === ''
            })
        }
        if (this.isInputChinese) {
            return
        }
        antd ? onChange?.(e) : onChange?.(value, e)
    }

    handleTextareaChange = (e: React.ChangeEvent<HTMLInputElement>, valueChinese: InputWithDefaultProps['value'], composition?: 'start' | 'end') => {
        const {onChange, debounceDelay, antd, value: propValue} = this.props
        const now = new Date().getTime()
        if (now - this.lastScrollCall < debounceDelay) return
        this.lastScrollCall = now

        // 超长处理
        let limitValue = (valueChinese || e.target.value) + ''
        if (Number(e.target.selectionStart) >= limitValue.length && e.target.scrollHeight > e.target.offsetHeight) {
            e.target.scrollTop = e.target.scrollHeight; // 在末尾输入时，滚动到底部，防止被遮挡
        }
        // const value = cutValue(this.input.value || e.target.value, maxLength)
        // #QDJCJS-7720设置maxLength后搜狗输入法录入中文过程中，当录入快到达最大长度时，会删已经录入的文本(去掉cutValue方法之后，录入过程字节数可能会超过maxLength,但最终结果保持不变)
        // const value = this.input.value || limitValue
        if (propValue === undefined || this.isInputChinese || composition === 'end') {
            this.setState({value: limitValue ?? ''})
        }

        if (this.isInputChinese) {
            return
        }
        antd ? onChange?.(e) : onChange?.(limitValue, e)
    }

    handleChange = (e: React.ChangeEvent<HTMLInputElement>, valueChinese: InputWithDefaultProps['value'], composition?: 'start' | 'end') => {
        const {onChange, debounceDelay, antd, value: propValue} = this.props
        const now = new Date().getTime()
        if (now - this.lastScrollCall < debounceDelay) return
        this.lastScrollCall = now
        // const value = cutValue(this.input.value || e.target.value, maxLength)
        // #QDJCJS-7720设置maxLength后搜狗输入法录入中文过程中，当录入快到达最大长度时，会删已经录入的文本(去掉cutValue方法之后，录入过程字节数可能会超过maxLength,但最终结果保持不变)
        const value = valueChinese || this.input.value || e.target.value
        if (propValue === undefined || this.isInputChinese || composition === 'end') {
            this.setState({value: value ?? ''})
        }

        if (this.isInputChinese) {
            return
        }
        antd ? onChange?.(e) : onChange?.(value, e)
    }

    // 输入中文处理，文字合成输入过程中不再触发change
    handleComposition = (e: React.CompositionEvent<HTMLInputElement>, composition: 'start' | 'end') => {
        const {onCompositionStart, onCompositionEnd, type, componentClass} = this.props
        if (composition === 'start') {
            // this.setState({
            this.isInputChinese = true
            // })
            onCompositionStart?.(e)
        } else if (composition === 'end') {
            const value = this.input?.value || (e as any).target?.value;
            // 输入法切换过程中ref 会变为null
            this.isInputChinese = false
            onCompositionEnd?.(e)
            if (type === 'search') {
                this.handleSearchChange(e as unknown as React.ChangeEvent<HTMLInputElement>, value, composition)
            } else if (type === 'textarea' || componentClass === 'textarea') {
                this.handleTextareaChange(e as unknown as React.ChangeEvent<HTMLInputElement>, value, composition)
            } else {
                this.handleChange(e as unknown as React.ChangeEvent<HTMLInputElement>, value, composition)
            }
        }
    }

    clearValue = (e: React.MouseEvent<HTMLDivElement>) => {
        e.stopPropagation()
        const {onChange, antd, disabled, type, onSearch} = this.props
        if (disabled) return
        this.setState({
            showSearch: true,
            value: ''
        })
        if (this.e && this.e.target) {
            this.e.target.value = ''
        }
        antd ? onChange?.(this.e) : onChange?.('', this.e)
        this.input.focus()
        // fix: 代码与文档不一致，input框清空时需要调用onSearch方法，参数为空
        if (type === 'search') onSearch?.('', e)
    }
    handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
        const {onSearch, type, onKeyDown, onPressEnter} = this.props
        let _e = Object.assign({}, e)
        this.e = _e
        if (e.keyCode === 13) {
            onPressEnter?.(e)
            if (type === 'search') onSearch?.(this.input.value, e)
        }
        stopKeyEventBubbles(e); // 阻止LEFT, RIGHT, UP, DOWN, ENTER, ESC等按键事件冒泡
        onKeyDown?.(e)
    }
    handleSearch = (e: React.MouseEvent<HTMLDivElement>) => {
        const {onSearch, disabled, loading} = this.props
        if (!disabled && !loading) onSearch?.(this.input.value, e)
    }

    trimString = (value: string | number, trim: InputProps['trim']) => {
        if (trim && typeof value === 'string') {
            value = trim === 'left' ? value.trimStart() : trim === 'right' ? value.trimEnd() : value.trim()
        }
        return value
    }

    focus = () => {
        this.input?.focus()
    }

    blur = () => {
        this.input?.blur()
    }
    handleBlur = (e: React.FocusEvent<HTMLInputElement>) => {
        const {value} = this.state
        const {onBlur, onChange, allowClear, antd, trim} = this.props
        let trimValue = value ?? ''
        if (trim && typeof value === 'string') {
            trimValue = this.trimString(value, trim)
        }
        let _e = Object.assign({}, e)
        this.e = _e
        this.setState({focused: false, value: trimValue})
        let callbackData: any = antd ? e : trimValue
        if (trimValue !== value) {
            antd ? onChange?.(e) : onChange?.(trimValue, e)
        }
        if (onBlur) {
            if (allowClear && this.clickClearBtn) {
                this.clickClearBtn = false
                onBlur?.(callbackData, _e, true)
            } else if (this.clickSearchBtn) {
                this.clickSearchBtn = false
                onBlur?.(callbackData, _e, true)
            } else {
                onBlur?.(callbackData, _e)
            }
        }
    }
    handleFocus = (e: React.FocusEvent<HTMLInputElement>) => {
        const {value} = this.state
        const {onFocus, antd, focusSelect, type, componentClass, disabled} = this.props
        if ([type, componentClass].includes('textarea') && e.target.selectionStart === 0) { // QDJCJS-23488 修复textarea在autoFocus时光标设置到结束位置
            e.target.setSelectionRange((value + '').length, (value + '').length)
        }
        if (focusSelect) {
            e.currentTarget.select?.()
            this.input?.select?.()
        }
        let callbackData: any = antd ? e : value
        this.setState({focused: !disabled})
        onFocus?.(callbackData, e)
    }
    handleClick: React.MouseEventHandler<HTMLInputElement> = e => {
        this.props.onClick?.(e)
    }
    onClearBtnMouseDown = (e: React.MouseEvent<HTMLDivElement>) => {
        e.preventDefault()
        this.clickClearBtn = true
    }
    onSearchBtnMouseDown = (e: React.MouseEvent<HTMLDivElement>) => {
        e.preventDefault()
        this.clickSearchBtn = true
    }

    /**
     * 字数限制文本
     */
    renderLimitText({currentLength, maxLength}: {currentLength: number; maxLength?: number}) {
        const {type, componentClass, showMaxLabel, clsPrefix} = this.props;
        const isTextarea = type === 'textarea' || componentClass === 'textarea';
        if (
            (isTextarea || type === 'text') &&
            (showMaxLabel ?? false) &&
            maxLength !== undefined
        ) {
            const limitPrefix = isTextarea ? textareaPrefix : clsPrefix;
            const currentCls = classnames(`${limitPrefix}-limit-current`, {
                [`${limitPrefix}-limit-current-warning`]: maxLength && currentLength > maxLength
            })
            return (
                <span className={`${limitPrefix}-limit`}>
                    <span className={currentCls}>{currentLength}</span>
                    {`/${maxLength}`}
                </span>
            )
        }
    }


    // TODO: renderInput，renderSearch, renderPassword应合并为同一实现
    renderInput = () => {
        const {
            id,
            fieldid,
            style,
            componentClass: Component,
            type,
            className,
            size,
            align,
            clsPrefix,
            bordered,
            placeholder,
            debounceDelay,
            value: propsValue,
            readOnly,
            requiredStyle,
            onChange,
            onSearch,
            onBlur,
            onPressEnter,
            maxLength,
            allowClear,
            focusSelect,
            prefix,
            suffix,
            innerClassName,
            innerStyle,
            trigger,
            iconRender,
            passwordVisible,
            visibilityToggle,
            onVisibleChange,
            showMaxLabel,
            allowInputOverMax,
            nid,
            uitype,
            title,
            ...others
        } = this.props
        let CurrentComp = Component
        // input[type="file"] 不应该有类名 .form-control.
        const {value: stateValue, autoSize} = this.state
        const value = (this.isInputChinese || propsValue === undefined) ? stateValue : propsValue;
        let classes: Record<string, any> = {}
        // 单独的 md / xs等size
        if (size) {
            classes[size] = true
        }
        let isTextarea = false
        if (type === 'textarea' || Component === 'textarea') {
            isTextarea = true
            CurrentComp = TextArea
        }
        let classNames
        if (type !== 'file') {
            classNames = classnames(clsPrefix, classes)
        }
        if (prefix || suffix) classNames += ` ${clsPrefix}-prefix-suffix`

        // 加判断，是否有 前后缀，是否加 wrapper
        let focusClassName = this.state.focused ? `${clsPrefix}-affix-focus` : ''
        let adapterNid = getNid(this.props) // 适配nid、uitype

        if (allowClear || suffix || prefix || (showMaxLabel ?? false)) {
            if (innerClassName) classNames += ' ' + innerClassName
            return (
                <div
                    id={id ? id + '_input' : undefined}
                    fieldid={fieldid ? fieldid + '_input' : undefined}
                    className={classnames(
                        `${clsPrefix}-affix-wrapper ${clsPrefix}-affix-wrapper-${size}`,
                        isTextarea ? textareaPrefix + '-affix-wrapper' : '',
                        focusClassName,
                        className,
                        {
                            ...setComponentClass({clsPrefix, bordered, align, requiredStyle}),
                            [`${clsPrefix}-affix-wrapper-disabled`]: others.disabled,
                            [`${clsPrefix}-close`]: allowClear,
                            [`${clsPrefix}-showMaxLabel`]: showMaxLabel,
                            [`${clsPrefix}-autosize`]: isTextarea && !!this.props.autoSize,
                        }
                    )}
                    style={style}
                    onClick={this.handleClick}
                    {...adapterNid}
                >
                    {prefix && (
                        <span
                            id={id ? id + '_prefix' : undefined}
                            fieldid={fieldid ? fieldid + '_prefix' : undefined}
                            className={`${clsPrefix}-simple-prefix`}
                        >
                            {prefix}
                        </span>
                    )}
                    <CurrentComp
                        {...omit(others, ['antd', 'onClick', 'trim'])}
                        {...(isTextarea
                            ? {
                                prefixCls: textareaPrefix /* textarea使用rc，需要加前缀 */,
                                showMaxLabel: showMaxLabel ?? false,
                                autoSize
                            }
                            : {type})}
                        id={id}
                        fieldid={fieldid}
                        // type={type}
                        style={innerStyle}
                        ref={(node: HTMLElement) => (this.input = node)}
                        placeholder={getChildrenText(placeholder).join('')}
                        value={value ?? ''}
                        title={title ?? value ?? ''}
                        readOnly={readOnly}
                        onCompositionStart={(e: React.CompositionEvent<HTMLInputElement>) => {
                            this.handleComposition(e, 'start')
                        }}
                        onCompositionEnd={(e: React.CompositionEvent<HTMLInputElement>) => {
                            this.handleComposition(e, 'end')
                        }}
                        onChange={isTextarea ? this.handleTextareaChange : this.handleChange}
                        onBlur={this.handleBlur}
                        onFocus={this.handleFocus}
                        onKeyDown={this.handleKeyDown}
                        className={classnames(classNames)}
                        maxLength={maxLength}
                        maxlength={isTextarea && !allowInputOverMax ? maxLength : undefined}
                    />
                    {
                        // textarea最长文本数字
                        this.renderLimitText({
                            // spread操作符用于处理表情等合成字符slice后错误或乱码等问题，如：一家三口'👨👨👨'.slice(0, 2) === '👨'
                            currentLength: (String(value ?? '')).length,
                            maxLength
                        })
                    }
                    {allowClear && (value || value === 0) && (
                        <div
                            className={`${clsPrefix}-suffix has-close`}
                            id={id ? id + '_clear' : undefined}
                            fieldid={fieldid ? fieldid + '_clear' : undefined}
                            onMouseDown={this.onClearBtnMouseDown}
                            onClick={this.clearValue}
                        >
                            <Icon type='uf-close-c' />
                        </div>
                    )}
                    {suffix && (
                        <span
                            className={`${clsPrefix}-simple-suffix`}
                            id={id ? id + '_suffix' : undefined}
                            fieldid={fieldid ? fieldid + '_suffix' : undefined}
                        >
                            {suffix}
                        </span>
                    )}
                </div>
            )
        } else {
            if (className) classNames += ' ' + className
            return (
                <CurrentComp
                    style={style} // TODO: 此处貌似应使用innerStyle
                    {...omit(others, ['antd', 'trim'])}
                    {...(isTextarea ? {prefixCls: textareaPrefix /* textarea使用rc，需要加前缀 */, autoSize} : {type})}
                    id={id}
                    fieldid={fieldid}
                    // type={type}
                    ref={(node: HTMLElement) => (this.input = node)}
                    placeholder={getChildrenText(placeholder).join('')}
                    value={value ?? ''}
                    title={title ?? value ?? ''}
                    readOnly={readOnly}
                    onCompositionStart={(e: React.CompositionEvent<HTMLInputElement>) => {
                        this.handleComposition(e, 'start')
                    }}
                    onCompositionEnd={(e: React.CompositionEvent<HTMLInputElement>) => {
                        this.handleComposition(e, 'end')
                    }}
                    onChange={isTextarea ? this.handleTextareaChange : this.handleChange}
                    onBlur={this.handleBlur}
                    onClick={this.handleClick}
                    onFocus={this.handleFocus}
                    onKeyDown={this.handleKeyDown}
                    className={classnames(classNames, {
                        [`${clsPrefix}-${size}`]: !!size && !isTextarea,
                        [`${textareaPrefix}-no-limit`]: isTextarea,
                        ...setComponentClass({clsPrefix, bordered, align, requiredStyle})
                    })}
                    maxLength={maxLength}
                    maxlength={isTextarea && !allowInputOverMax ? maxLength : undefined}
                    {...adapterNid}
                />
            )
        }
    }

    renderSearch = () => {
        const {
            id,
            fieldid,
            componentClass: Component,
            type,
            className,
            size,
            align,
            bordered,
            clsPrefix,
            placeholder,
            debounceDelay,
            value: propsValue,
            readOnly,
            requiredStyle,
            onChange,
            onSearch,
            onBlur,
            onPressEnter,
            style,
            maxLength,
            allowClear,
            loading,
            wrapperClassName,
            innerClassName,
            innerStyle,
            trigger,
            iconRender,
            icon,
            enterButton = false,
            passwordVisible,
            visibilityToggle,
            onVisibleChange,
            showMaxLabel,
            allowInputOverMax,
            nid,
            uitype,
            title,
            ...others
        } = this.props
        // input[type="file"] 不应该有类名 .form-control.
        const {value: stateValue} = this.state
        const value = (this.isInputChinese || propsValue === undefined) ? stateValue : propsValue;
        let classes: Record<string, boolean> = {}
        if (size) {
            classes[size] = true
        }
        let focusClassName = this.state.focused ? `${clsPrefix}-affix-focus` : ''

        const searchIcon = icon || <Icon type='uf-search-light-2' />
        const pureIcon = icon
            ? React.cloneElement(icon, {
                onClick: () => {} // 图标的click上移到button执行，增加触发区域
            })
            : ''
        let iconProps: Record<string, string> = {}
        if (id) iconProps.id = `${id}-search`

        let button: React.ReactNode
        const enterButtonAsElement = (enterButton || {}) as React.ReactElement

        if (!enterButton && !loading) {
            button = React.cloneElement(searchIcon, {
                ...iconProps,
                onClick: (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
                    searchIcon?.props?.onClick?.(e)
                    this.handleSearch(e)
                }
            })
        } else if (
            enterButtonAsElement?.type === 'button' ||
            (enterButtonAsElement?.type as any)?.defaultProps?.clsPrefix === `${componentPrefix}-button`
        ) {
            button = React.cloneElement(enterButtonAsElement, {
                colors: 'primary',
                ...iconProps,
                key: 'enterButton',
                loading,
                onClick: (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
                    icon?.props?.onClick?.(e)
                    enterButtonAsElement?.props?.onClick?.(e)
                    this.handleSearch(e)
                },
                children: (
                    <>
                        {enterButtonAsElement?.props?.children ?? ''}
                        {pureIcon}
                    </>
                )
            })
        } else {
            button = (
                <Button
                    colors='primary'
                    {...iconProps}
                    key='enterButton'
                    className={classnames(`${clsPrefix}-enterbutton`, iconProps?.className)}
                    loading={loading}
                    onClick={(e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
                        icon?.props?.onClick?.(e)
                        this.handleSearch(e)
                    }}
                >
                    {enterButton}
                    {pureIcon}
                </Button>
            )
        }
        let adapterNid = getNid(this.props) // 适配nid、uitype

        return (
            <div
                id={id ? id + '_input' : undefined}
                fieldid={fieldid ? fieldid + '_input' : undefined}
                className={classnames(`${clsPrefix}-search`, `${clsPrefix}-affix-wrapper`, focusClassName, className, {
                    [`${clsPrefix}-affix-wrapper-${size}`]: !!size,
                    ...setComponentClass({clsPrefix, bordered, align, requiredStyle}),
                    [`${clsPrefix}-with-button`]: !!enterButton || !!loading,
                    [`${clsPrefix}-affix-wrapper-readonly`]: readOnly,
                    [`${clsPrefix}-affix-wrapper-disabled`]: others.disabled,
                    [`${clsPrefix}-close`]: allowClear
                })}
                onClick={this.handleClick}
                style={style}
                {...adapterNid}
            >
                <Component
                    style={innerStyle}
                    {...omit(others, ['antd', 'onClick', 'trim'])}
                    id={id}
                    fieldid={fieldid}
                    type={type}
                    readOnly={readOnly}
                    ref={(node: HTMLElement) => (this.input = node)}
                    onChange={this.handleSearchChange}
                    placeholder={getChildrenText(placeholder).join('')}
                    value={value ?? ''}
                    title={title ?? value ?? ''}
                    onKeyDown={this.handleKeyDown}
                    onCompositionStart={(e: React.CompositionEvent<HTMLInputElement>) => {
                        this.handleComposition(e, 'start')
                    }}
                    onCompositionEnd={(e: React.CompositionEvent<HTMLInputElement>) => {
                        this.handleComposition(e, 'end')
                    }}
                    onBlur={this.handleBlur}
                    onFocus={this.handleFocus}
                    className={classnames(clsPrefix, classes, innerClassName)}
                    maxLength={maxLength}
                />
                {allowClear && (value || value === 0) ? (
                    <div
                        className={`${clsPrefix}-suffix has-close`}
                        id={id ? id + '_clear' : undefined}
                        fieldid={fieldid ? fieldid + '_clear' : undefined}
                        onMouseDown={this.onClearBtnMouseDown}
                        onClick={this.clearValue}
                    >
                        <Icon type='uf-close-c' />
                    </div>
                ) : (
                    ''
                )}
                <div className={`${clsPrefix}-suffix`} fieldid={fieldid ? fieldid + '_search' : undefined} onMouseDown={this.onSearchBtnMouseDown}>
                    {button}
                </div>
            </div>
        )
    }

    getIcon = (prefixCls: string, icon: React.ReactNode) => {
        const {trigger, disabled, onVisibleChange} = this.props
        let {passwordVisible} = this.state
        const triggerVisibleChange = () => {
            if (disabled) {
                return
            }
            this.setState({
                passwordVisible: !passwordVisible
            }, this.removePasswordValue)
            onVisibleChange?.(!passwordVisible)
        }
        const ActiconMap: Record<string, string> = {
            click: 'onClick',
            hover: 'onMouseOver'
        }
        const iconTrigger = ActiconMap[trigger] || ''
        const iconProps = {
            [iconTrigger]: triggerVisibleChange,
            className: `${prefixCls}-icon`,
            onMouseDown: (e: MouseEvent) => {
                e.preventDefault()
            },
            onMouseUp: (e: MouseEvent) => {
                e.preventDefault()
            }
        }

        return React.cloneElement(React.isValidElement(icon) ? icon : <span>{icon}</span>, iconProps)
    }

    renderPassword = () => {
        const {
            id,
            fieldid,
            componentClass: Component,
            type,
            className,
            size,
            align,
            bordered,
            prefix,
            suffix,
            clsPrefix,
            debounceDelay,
            placeholder,
            value: propsValue,
            readOnly,
            requiredStyle,
            onSearch,
            onChange,
            onBlur,
            onPressEnter,
            maxLength,
            allowClear,
            wrapperClassName,
            innerClassName,
            innerStyle,
            style,
            trigger,
            iconRender,
            visibilityToggle,
            onVisibleChange,
            showMaxLabel,
            allowInputOverMax,
            nid,
            uitype,
            title,
            ...others
        } = this.props

        const {value: stateValue, passwordVisible} = this.state
        const value = propsValue || stateValue
        let classes: Record<string, boolean> = {}
        if (size) {
            classes[size] = true
        }
        let focusClassName = this.state.focused ? `${clsPrefix}-affix-focus` : ''
        const toggleVisibleIcon = iconRender(passwordVisible)
        let adapterNid = getNid(this.props) // 适配nid、uitype

        const passwordInput = (hasIcons = true) => (
            <Component
                style={hasIcons ? innerStyle : style}
                {...omit(others, ['antd', 'onClick', 'passwordVisible', 'trim'])}
                id={id}
                fieldid={fieldid}
                type={passwordVisible ? 'text' : 'password'}
                readOnly={readOnly}
                ref={(node: HTMLElement) => (this.input = node)}
                onChange={this.handleChange}
                placeholder={getChildrenText(placeholder).join('')}
                value={value ?? ''}
                title={title ?? (passwordVisible && value) ?? ''}
                onKeyDown={this.handleKeyDown}
                onBlur={this.handleBlur}
                onFocus={this.handleFocus}
                className={classnames(clsPrefix, classes, innerClassName, {[`${clsPrefix}-${size}`]: !!size && !hasIcons, ...(hasIcons ? {} : setComponentClass({clsPrefix, bordered, align, requiredStyle}))})}
                maxLength={maxLength}
                {...(hasIcons === false ? adapterNid : {})}
            />
        )

        if (allowClear || visibilityToggle || suffix || prefix) {
            return (
                <div
                    id={id ? id + '_input' : undefined}
                    fieldid={fieldid ? fieldid + '_input' : undefined}
                    className={classnames(
                        `${clsPrefix}-password`,
                        `${clsPrefix}-affix-wrapper`,
                        focusClassName,
                        className,
                        {
                            [`${clsPrefix}-affix-wrapper-${size}`]: !!size,
                            ...setComponentClass({clsPrefix, bordered, align, requiredStyle}),
                            [`${clsPrefix}-affix-wrapper-disabled`]: others.disabled,
                            [`${clsPrefix}-close`]: allowClear
                        }
                    )}
                    onClick={this.handleClick}
                    style={style}
                    {...adapterNid}
                >
                    {prefix && (
                        <span
                            id={id ? id + '_prefix' : undefined}
                            fieldid={fieldid ? fieldid + '_prefix' : undefined}
                            className={`${clsPrefix}-simple-prefix`}
                        >
                            {prefix}
                        </span>
                    )}
                    {passwordInput()}
                    {allowClear && (value || value === 0) ? (
                        <div
                            className={`${clsPrefix}-suffix has-close`}
                            id={id ? id + '_clear' : undefined}
                            fieldid={fieldid ? fieldid + '_clear' : undefined}
                            onMouseDown={this.onClearBtnMouseDown}
                            onClick={this.clearValue}
                        >
                            <Icon type='uf-close-c' />
                        </div>
                    ) : (
                        ''
                    )}
                    {visibilityToggle && toggleVisibleIcon && (
                        <div className={`${clsPrefix}-suffix`} fieldid={fieldid ? fieldid + '_password' : undefined}>
                            {this.getIcon(`${clsPrefix}-password`, toggleVisibleIcon)}
                        </div>
                    )}
                    {/* 兼容4.3.2以下版本用户通过suffix生成小眼睛的方案 */}
                    {suffix && (
                        <span
                            className={`${clsPrefix}-simple-suffix`}
                            id={id ? id + '_suffix' : undefined}
                            fieldid={fieldid ? fieldid + '_suffix' : undefined}
                        >
                            {suffix}
                        </span>
                    )}
                </div>
            )
        } else {
            return passwordInput(false)
        }
    }

    render() {
        if (this.props.type === 'search') {
            return this.renderSearch()
        } else if (this.props.type === 'password') {
            return this.renderPassword()
        }

        return this.renderInput()
    }
}

// Input.propTypes = propTypes
export default Input as React.ComponentClass<InputProps>
