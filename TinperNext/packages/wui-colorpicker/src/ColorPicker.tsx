import classnames from 'classnames'
import React, {Component, MouseEvent, ReactElement} from 'react'
import Button from '../../wui-button/src'
import {WebUI, getNid} from '../../wui-core/src/index'
import Form from '../../wui-form/src'
import Icon from '../../wui-icon/src'
import Input from '../../wui-input/src'
import {Col, Row} from '../../wui-layout/src'
import Modal from '../../wui-modal/src'
import Select from '../../wui-select/src'
import colors from './colors'
import {AutoCalculateArg, ColorItem, ColorPickerProps, ColorPickerState, Colors} from './iColorPicker'
import i18n from './i18n'
import {getLangInfo} from '../../wui-locale/src/tool'
import {ConfigContext} from '../../wui-provider/src/context'

const FormItem = Form.FormItem
const Option = Select.Option

const defaultProps: ColorPickerProps = {
    value: '',
    label: '',
    placeholder: '',
    required: false,
    disabledAlpha: false,
    autoCalculate: () => {},
    onChange: () => {},
    // title: '取色板',
    // cacelBtn: '取消',
    // confirmBtn: '确定',
    isParameterArea: true,
    disabledModal: false,
    disabledInput: false,
}

const initRgb = colors.red.rgbArr[6] ? `rgb(${colors.red.rgbArr[6]})` : ''

@WebUI({name: 'colorpicker', defaultProps})
class ColorPicker extends Component<ColorPickerProps, ColorPickerState> {
    static defaultProps = defaultProps
    private cache: Omit<ColorPickerState, 'displayColorPicker'> = {
        selectedColor: 'red',
        selectedScale: '600',
        selectedRgbValue: initRgb,
        selectedHexValue: '',
        formValue: '',
        alpha: 100
    }
    constructor(props: ColorPickerProps) {
        super(props)
        let initValue = ''
        let initHex = ''
        if ('value' in props) {
            initValue = props.value
            initHex = this.colorRGBtoHex(initRgb)
        }
        this.state = {
            displayColorPicker: false,
            selectedColor: 'red',
            selectedScale: '600',
            selectedRgbValue: initRgb,
            selectedHexValue: initHex,
            formValue: initValue,
            alpha: 100
        }

        this.cache = {
            selectedColor: 'red',
            selectedScale: '600',
            selectedRgbValue: initRgb,
            selectedHexValue: initHex,
            formValue: initValue,
            alpha: 100
        }
    }
    /* eslint-disable */
    UNSAFE_componentWillReceiveProps(nextProps: ColorPickerProps) {
        if (nextProps.value !== this.props.value) {
            this.setState({
                formValue: nextProps.value
            })
        }
    }

    // 返回colors中相等或者最相近的颜色信息
    findClosestColor = (value: string) => {
        let closestColor = {
            selectedColor: 'red' as Colors,
            selectedScale: '600',
            selectedRgbValue: initRgb,
            scaleIndex: 6,
        };
        // 输入值不符合16进制格式时, 返回默认值red-600

        if (value && this.colorHexToRgb(value).startsWith('rgb')) {
            const valueRgb = this.colorHexToRgb(value).replace(/[rgba()]/g, '');
            let minDistance = Infinity;
            for (const key in colors) {
                const rgbArr = colors[key].rgbArr;
                const scale = colors[key].scale;
                for (let i = 0; i < rgbArr.length; i++) {
                    const distance = this.calculateColorDistance(valueRgb, rgbArr[i]);
                    if (distance < minDistance) {
                        minDistance = distance;
                        closestColor = {
                            selectedColor: key as Colors,
                            selectedScale: minDistance === 0 ? scale[i] : 'custom',
                            selectedRgbValue: `rgb(${valueRgb})`,
                            scaleIndex: i,
                        };
                    }
                }
            }
        }
        return closestColor;
    }

    // 计算两个颜色差值
    calculateColorDistance = (color1: string, color2: string) => {
        const [r1, g1, b1] = color1.split(',');
        const [r2, g2, b2] = color2.split(',');

        // 计算每个颜色分量的差值
        const deltaR = Number(r2) - Number(r1);
        const deltaG = Number(g2) - Number(g1);
        const deltaB = Number(b2) - Number(b1);

        // 计算欧式距离
        const distance = Math.sqrt(deltaR * deltaR + deltaG * deltaG + deltaB * deltaB);
        return distance;
    }

    // 打开色板
    handleClick = (e: MouseEvent<HTMLDivElement>) => {
        e.stopPropagation()
        const { selectedColor, selectedScale, selectedRgbValue } = this.findClosestColor(this.state.formValue);
        const newState = {
            displayColorPicker: !this.state.displayColorPicker,
            selectedColor,
            selectedScale,
            selectedRgbValue,
            selectedHexValue: this.colorRGBtoHex(selectedRgbValue),
        };
        this.cache = Object.assign(this.cache, newState)
        this.setState(newState)
    }

    // 关闭色板/点击弹框取消按钮
    handleClose = () => {
        let {selectedColor, selectedScale, selectedRgbValue, selectedHexValue, alpha} = this.cache
        this.setState({
            displayColorPicker: false,
            selectedColor,
            selectedScale,
            selectedRgbValue,
            selectedHexValue,
            alpha
        })
    }

    // 点击弹框确定按钮
    submit = () => {
        let {autoCalculate, onChange} = this.props
        let {selectedColor, selectedScale, selectedHexValue, alpha} = this.state
        let tempRgb = this.colorHexToRgb(selectedHexValue, +alpha)
        let obj = {
            class: `${selectedColor}-${selectedScale}`,
            rgba: tempRgb,
            hex: selectedHexValue
        }
        this.setState({
            formValue: selectedHexValue,
            displayColorPicker: false
        })
        this.cache = Object.assign(this.cache, {
            selectedColor,
            selectedScale,
            selectedRgbValue: tempRgb,
            selectedHexValue,
            formValue: selectedHexValue,
            alpha
        })
        if (autoCalculate) {
            let result = this.calcHoverAndActive(selectedColor, selectedScale, selectedHexValue)
            autoCalculate(result)
        }
        if (onChange) {
            onChange(obj)
        }
    }

    /**
     * 根据选中的颜色计算 深一色度和浅一色度 的色值
     * @param selectedColor
     * @param selectedScale
     */
    calcHoverAndActive = (selectedColor: Colors, selectedScale: string, selectedHexValue: string): AutoCalculateArg => {
        let obj: Partial<AutoCalculateArg> = {}
        let selectedRgbArr = colors[selectedColor] ? colors[selectedColor].rgbArr : ''
        let selectedScaleArr = colors[selectedColor] ? colors[selectedColor].scale : ''
        let index = selectedScaleArr.indexOf(selectedScale)
        let lighter = '',
            darker = ''
        if (index === 0) {
            lighter = ''
            darker = `rgb(${selectedRgbArr[index + 1]})`
            obj.lighter = lighter
            obj.darker = darker
        } else if (index === selectedRgbArr.length - 1) {
            lighter = `rgb(${selectedRgbArr[index - 1]})`
            darker = ''
            obj.lighter = lighter
            obj.darker = darker
        } else if (index > 0 && index < selectedRgbArr.length - 1) {
            lighter = `rgb(${selectedRgbArr[index - 1]})`
            darker = `rgb(${selectedRgbArr[index + 1]})`
            obj.lighter = lighter
            obj.darker = darker
        }
        obj.clor = selectedHexValue
        return obj as AutoCalculateArg
    }

    // 下拉框值更改
    handleSelectChange = (value: Colors) => {
        let selectedRgb = `rgb(${colors[value].rgbArr[6]})` || ''
        let selectedHex = this.colorRGBtoHex(selectedRgb)
        this.setState({
            selectedColor: value,
            selectedScale: '600',
            selectedRgbValue: selectedRgb,
            selectedHexValue: selectedHex,
            alpha: 100
        })
    }

    // 选择色块
    handleSelectScale = (value: string, e: MouseEvent<HTMLLIElement>) => {
        let rgb = window.getComputedStyle(e.currentTarget).getPropertyValue('background-color')
        let hex = this.colorRGBtoHex(rgb)
        this.setState({
            selectedScale: value,
            selectedRgbValue: rgb,
            selectedHexValue: hex
        })
    }

    // 渲染下拉框选项
    renderOption = () => {
        const {clsPrefix} = this.props
        let opts = []
        for (let prop in colors) {
            let item = colors[prop as Colors]
            opts.push(
                <Option key={item.key} value={item.key} className={`${clsPrefix}-select-option clearfix`}>
                    <div className={`option-overview bg-${item.key}-600`}></div>
                    <span> {item.name} </span>
                </Option>
            )
        }
        return opts
    }

    // 渲染预制的色板，提供可选择的颜色示例
    renderColorPlate = (selectedColor: Colors) => {
        let {selectedScale, selectedRgbValue, formValue} = this.state
        const {fieldid} = this.props
        let list: ReactElement[] = []
        // state 闭环控制selectedColor colors[selectedColor] 会一直有值
        let color: ColorItem = JSON.parse(JSON.stringify(colors[selectedColor]));
        const inputColorInfo = this.findClosestColor(formValue);
        if(selectedColor === inputColorInfo.selectedColor && inputColorInfo.selectedScale === 'custom'){
            color.scale.splice(inputColorInfo.scaleIndex, 0, 'custom') // 加入自定义输入的颜色
        }
        let iconClass = this.isDark(selectedRgbValue) ? 'dark-contrast' : 'light-contrast'
        color.scale.map(item => {
            list.push(
                <li
                    key={item}
                    className={`bg-${color.key}-${item}`}
                    style={ item === 'custom' ? { backgroundColor: formValue } : undefined }
                    fieldid={fieldid ? `${fieldid}_list_${item}` : undefined}
                    onClick={(e: MouseEvent<HTMLLIElement>) => this.handleSelectScale(item, e)}
                >
                    {selectedScale === item ? (
                        <Icon
                            type='uf-correct-2'
                            fieldid={fieldid ? `${fieldid}_icon_${item}` : undefined}
                            className={iconClass}
                        ></Icon>
                    ) : (
                        ''
                    )}
                </li>
            )
        })
        return list
    }

    // 把16进制颜色转换为RGB颜色
    colorHexToRgb(color: string, alpha?: number) {
        let sColor = color
        sColor = sColor.toLowerCase()
        // 十六进制颜色值的正则表达式
        let reg = /^#([0-9a-fA-f]{3}|[0-9a-fA-f]{6})$/
        // 如果是16进制颜色
        if (sColor && reg.test(sColor)) {
            if (sColor.length === 4) {
                let sColorNew = '#'
                for (let i = 1; i < 4; i += 1) {
                    sColorNew += sColor.slice(i, i + 1).concat(sColor.slice(i, i + 1))
                }
                sColor = sColorNew
            }
            // 处理六位的颜色值
            let sColorChange = []
            for (let i = 1; i < 7; i += 2) {
                sColorChange.push(parseInt('0x' + sColor.slice(i, i + 2)))
            }
            if (alpha) {
                sColorChange.push(+alpha / 100)
            }
            return 'rgba(' + sColorChange.join(',') + ')'
        }
        return sColor
    }

    // 把RGB颜色转换为16进制颜色
    colorRGBtoHex(color: string) {
        let that = color
        let reg = /^#([0-9a-fA-f]{3}|[0-9a-fA-f]{6})$/
        if (/^(rgb|RGB)/.test(that)) {
            let aColor = that.replace(/(?:\(|\)|rgb|RGB)*/g, '').split(',')
            let strHex = '#'
            for (let i = 0; i < aColor.length; i++) {
                let hex = Number(aColor[i]).toString(16)
                if (hex.length < 2) {
                    hex = '0' + hex
                }
                strHex += hex
            }
            if (strHex.length !== 7) {
                strHex = that
            }
            return strHex
        } else if (reg.test(that)) {
            let aNum = that.replace(/#/, '').split('')
            if (aNum.length === 6) {
                return that
            } else if (aNum.length === 3) {
                let numHex = '#'
                for (let i = 0; i < aNum.length; i += 1) {
                    numHex += aNum[i] + aNum[i]
                }
                return numHex
            }
        }
        return that
    }

    /**
     * 根据RGB值判断 深色与浅色
     * @param rgbColor rgb色值
     * @return
     */
    isDark = (rgbColor: string) => {
        // let reg = /^#([0-9a-fA-f]{3}|[0-9a-fA-f]{6})$/;
        let aColor: string[] = []
        if (/^(rgb|RGB)/.test(rgbColor)) {
            aColor = rgbColor.replace(/(?:\(|\)|rgb|RGB)*/g, '').split(',')
        }
        let r = +aColor[0],
            g = +aColor[1],
            b = +aColor[2]
        if (r * 0.299 + g * 0.578 + b * 0.114 >= 192) {
            // 浅色
            return false
        } else {
            // 深色
            return true
        }
    }

    // 输入框值更改事件
    handleChange = (value: string) => {
        const colorRegex = /^#[0-9a-fA-F]{0,6}$/;
        if (/[\u4E00-\u9FA5]/g.test(value)) return // 中文不合法，不做后续处理
        if (value && !colorRegex.test(value)) return // 输入不合法，不做后续处理
        const {onChange} = this.props
        let tempRgb = this.colorHexToRgb(value)
        let obj = {
            class: '',
            rgba: tempRgb,
            hex: value
        }
        if (onChange) {
            onChange(obj)
        }
        this.setState({
            formValue: value
        })
    }

    // alpha值更改事件
    handleAlphaChange = (value: string) => {
        let reg = /^(?:[0-9][0-9]?|100)$/
        if (value !== '' && !reg.test(value)) return
        this.setState({alpha: value === '' ? value : +value})
    }
    handleAlphaBlur = (value: string) => {
        if (value === '') {
            this.setState({alpha: +value})
        }
    }

    render() {
        const {
            locale,
            clsPrefix,
            size,
            align,
            bordered,
            label,
            required,
            placeholder,
            className,
            disabled,
            disabledAlpha,
            isParameterArea,
            disabledModal,
            disabledInput,
            fieldid
            // ...others
        } = this.props
        const {selectedColor, selectedScale, selectedRgbValue, selectedHexValue, formValue, alpha} = this.state
        const {getFieldError} = this.props.form as any
        let adapterNid = getNid(this.props)

        const validateStatus = /^(#[0-9a-fA-F]{3}|#[0-9a-fA-F]{6})$/.test(formValue) ? 'success' : 'error';
        const inputNode = (
            <Input
                fieldid={fieldid ? `${fieldid}_input` : undefined}
                size={size}
                align={align}
                bordered={bordered}
                disabled={disabled || disabledInput}
                placeholder={placeholder}
                value={formValue}
                onChange={this.handleChange}
                suffix={
                    <div
                        style={{backgroundColor: formValue, zIndex: 9}}
                        fieldid={fieldid ? `${fieldid}_input_color` : undefined}
                        className={`${clsPrefix}-form-color-demo ${(disabled || disabledModal) ? 'disabled' : ''}`}
                        onClick={!disabled && !disabledModal ? this.handleClick : () => {}}
                    ></div>
                }
            />
        )

        return (
            <ConfigContext.Consumer>
                {({locale: configLocale}) => {
                    const local = getLangInfo(locale || configLocale, i18n, 'colorpicker')
                    return (
                        <div className={classnames(clsPrefix, className)} fieldid={fieldid} {...adapterNid}>
                            {label || required ? (
                                <FormItem className={`${clsPrefix}-form`} label={label} required={required} size={size}
                                    validateStatus={validateStatus} hasFeedback
                                >
                                    {inputNode}
                                </FormItem>
                            ) : (
                                inputNode
                            )}
                            <div className='error' fieldid={fieldid ? `${fieldid}_error` : undefined}>
                                {getFieldError('hexadecimal')}
                            </div>
                            <Modal
                                width={isParameterArea ? '600' : '350'}
                                className={`${clsPrefix}-modal`}
                                visible={this.state.displayColorPicker}
                                onCancel={this.handleClose}
                                backdropClosable={false}
                                {...this.props.modalProps}
                                fieldid={fieldid ? `${fieldid}_color_modal` : undefined}
                            >
                                <Modal.Header
                                    closeButton
                                    fieldid={fieldid ? `${fieldid}_color_modal_header` : undefined}
                                >
                                    <Modal.Title fieldid={fieldid ? `${fieldid}_color_modal_title` : undefined}>
                                        {this.props.title || local?.langMap?.title}
                                    </Modal.Title>
                                </Modal.Header>

                                <Modal.Body fieldid={fieldid ? `${fieldid}_color_modal_body` : undefined}>
                                    <div className={`${clsPrefix}-panel-header`}>
                                        <div className={`${clsPrefix}-color-preview`}>
                                            <div
                                                className={`${clsPrefix}-color-preview-demo bg-${selectedColor}-600`}
                                            ></div>
                                        </div>
                                        <Select
                                            defaultValue={selectedColor}
                                            fieldid={fieldid ? `${fieldid}_color_select` : undefined}
                                            style={{width: 200}}
                                            onChange={this.handleSelectChange}
                                        >
                                            {this.renderOption()}
                                        </Select>
                                    </div>
                                    <div className={`${clsPrefix}-panel-content`}>
                                        <Row>
                                            <Col
                                                md={14}
                                                xs={14}
                                                sm={14}
                                                style={isParameterArea ? {} : {width: '100%', marginLeft: '10.5px'}}
                                                className='col-7'
                                            >
                                                <ul className={`${clsPrefix}-panel-color-plate clearfix`}>
                                                    {this.renderColorPlate(selectedColor)}
                                                </ul>
                                            </Col>
                                            {isParameterArea && (
                                                <Col md={10} xs={10} sm={10} className='col-5'>
                                                    <div className={`${clsPrefix}-panel-color-info`}>
                                                        <div className='transparent-bg'>
                                                            <div
                                                                fieldid={
                                                                    fieldid ? `${fieldid}_color_select_div` : undefined
                                                                }
                                                                className={`selected-color bg-${selectedColor}-${selectedScale}`}
                                                                style={selectedScale === 'custom' ? {opacity: +alpha / 100, backgroundColor: selectedRgbValue} : {opacity: +alpha / 100}}
                                                            ></div>
                                                        </div>
                                                        <ul>
                                                            <li
                                                                fieldid={fieldid ? `${fieldid}_color_class` : undefined}
                                                            >
                                                                <label className={`${clsPrefix}-label`}>Class：</label>
                                                                {`${selectedColor}-${selectedScale}`}
                                                            </li>
                                                            <li fieldid={fieldid ? `${fieldid}_color_rgb` : undefined}>
                                                                <label className={`${clsPrefix}-label`}>RGB：</label>
                                                                {`${selectedRgbValue}`}
                                                            </li>
                                                            <li fieldid={fieldid ? `${fieldid}_color_hex` : undefined}>
                                                                <label className={`${clsPrefix}-label`}>HEX：</label>
                                                                {`${selectedHexValue}`}
                                                            </li>
                                                            <li>
                                                                <label className={`${clsPrefix}-label`}>Alpha</label>
                                                                <Input
                                                                    size='md'
                                                                    value={alpha}
                                                                    fieldid={
                                                                        fieldid ? `${fieldid}_color_alpha` : undefined
                                                                    }
                                                                    onChange={this.handleAlphaChange}
                                                                    onBlur={this.handleAlphaBlur}
                                                                    disabled={disabledAlpha}
                                                                    suffix='%'
                                                                />
                                                            </li>
                                                        </ul>
                                                    </div>
                                                </Col>
                                            )}
                                        </Row>
                                    </div>
                                </Modal.Body>

                                <Modal.Footer fieldid={fieldid ? `${fieldid}_color_modal_footer` : undefined}>
                                    <Button
                                        onClick={this.handleClose}
                                        colors='secondary'
                                        fieldid={fieldid ? `${fieldid}_color_modal_footer_cancel` : undefined}
                                        style={{marginRight: 8}}
                                    >
                                        {this.props.cacelBtn || local?.langMap?.cancel}
                                    </Button>
                                    <Button
                                        onClick={this.submit}
                                        colors='primary'
                                        fieldid={fieldid ? `${fieldid}_color_modal_footer_ok` : undefined}
                                    >
                                        {this.props.confirmBtn || local?.langMap?.ok}
                                    </Button>
                                </Modal.Footer>
                            </Modal>
                        </div>
                    )
                }}
            </ConfigContext.Consumer>
        )
    }
}

export default Form.createForm()(ColorPicker as React.ComponentClass<Partial<ColorPickerProps>>)
