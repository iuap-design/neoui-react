import classnames from 'classnames'
import omit from "omit.js"
import React, { Component } from 'react'
import { KeyCode, WebUI, formatUtils, getNid, matchAll, setComponentClass, setComponentSize } from '../../wui-core/src/index'
import InputGroup from '../../wui-input-group/src'
import Input from '../../wui-input/src'
import { getLangInfo } from '../../wui-locale/src/tool'
import Message from '../../wui-message/src'
import { globalConfig } from '../../wui-provider/src'
import { ConfigContext, WithConfigConsumer } from '../../wui-provider/src/context'
import Tooltip from '../../wui-tooltip/src'
import InputNumberGroup from './InputNumberGroup'
import i18n from './i18n.js'
import type {
    InputNumberDefaultProps,
    InputNumberProps,
    InputNumberState,
    InputNumberWithDefaultProps,
    IntegerMarksType
} from './iInputNumber'

const defaultIntegerMarks: IntegerMarksType = [
    {
        len: 3,
        // mark: '百',
        key: 'hundred'
    },
    {
        len: 4,
        // mark: '千',
        key: 'thousand'
    },
    {
        len: 5,
        // mark: '万',
        key: 'tenThousand'
    },
    {
        len: 6,
        // mark: '十万',
        key: 'hundredThousand'
    },
    {
        len: 7,
        // mark: '百万',
        key: 'million'
    },
    {
        len: 8,
        // mark: '千万',
        key: 'tenMillion'
    },
    {
        len: 9,
        // mark: '亿',
        key: 'hundredMillion'
    },
    {
        len: 10,
        // mark: '十亿',
        key: 'billion'
    },
    {
        len: 11,
        // mark: '百亿',
        key: 'tenBillion'
    },
    {
        len: 12,
        // mark: '千亿',
        key: 'hundredBillion'
    },
    {
        len: 13,
        // mark: '万亿',
        key: 'trillion'
    },
    {
        len: 14,
        // mark: '十万亿',
        key: 'tenTrillion'
    },
    {
        len: 15,
        // mark: '百万亿',
        key: 'hundredTrillion'
    },
    {
        len: 16,
        // mark: '千万亿',
        key: 'quadrillion'
    },
]

const defaultProps: InputNumberDefaultProps = {
    size: 'md',
    value: '',
    step: 1,
    iconStyle: 'double',
    autoFix: false,
    autoWidth: false,
    min: Number.MIN_SAFE_INTEGER,
    max: Number.MAX_SAFE_INTEGER,
    readOnly: false,
    delay: 300,
    autoFocus: false,
    disabled: false,
    locale: 'zh-cn',
    toNumber: true,
    displayCheckPrompt: false,
    keyboard: true,
    rootClassName: '',
    autoCorrectCase: false,
    roundAt: 5
}

// 校验提示
function prompt(content?: string) {
    Message.destroy()
    Message.create({content, color: 'warninglight'})
}

function setCaretPosition(ctrl: HTMLInputElement, pos: number, need: boolean) {
    if (ctrl && need) {
        if (ctrl.setSelectionRange && ctrl.type !== 'number') {
            ctrl.focus()
            ctrl.setSelectionRange(pos, pos)
            // IE8 and below，兼容IE场景，单测不覆盖
        } else if ((ctrl as any).createTextRange) {
            let range = (ctrl as any).createTextRange()
            range.collapse(true)
            range.moveEnd('character', pos)
            range.moveStart('character', pos)
            range.select()
        }
    }
}

/**
 * 分割字符串
 * 示例：'-123,45.06789'  ===>  ['-', '123', ',', '45', '.', '06789']
 */
function splitValue(value: string | number): string[] {
    value = value || value === 0 ? String(value) : '';
    const reg = /(\D)?(\d+)?(\D)?/g; // 注意用户最开始仅输入负号-或小数点时场景，所以数字不是必须的
    const res: string[] = [];
    for (let item of matchAll(value, reg)) {
        item.map((str, i) => i > 0 && !!str && res.push(str));
    }
    return res;
}

/**
 * 移除分隔符，输出可计算数字字符串
 * 示例：'-123,45.06789'  ===>  '-12345.06789'
 */
function value4calc({
    value,
    thousandSeparator = ',',
    decimalSeparator = '.'
}: {
    value?: string | number;
    thousandSeparator?: string;
    decimalSeparator?: string;
}): string {
    if (typeof value === 'number') return String(value);
    if (value === null || value === undefined) return '';

    let _value = splitValue(value);
    value = _value
        .map(item => {
            if (item === thousandSeparator) {
                item = '';
            } else if (item === decimalSeparator) {
                item = '.';
            } else if (item && !/[0-9e+-]+/ig.test(item)) { // 删除其他非法字符
                item = ''
            }
            return item;
        })
        .join('');
    return value;
}

@WithConfigConsumer()
@WebUI({name: 'input-number', defaultProps})
class InputNumber extends Component<InputNumberProps, InputNumberState> {
    static InputNumberGroup: typeof InputNumberGroup = InputNumberGroup
    static contextType = ConfigContext

    inputRef!: any
    timer!: ReturnType<typeof setTimeout>
    focus: boolean = false

    constructor(props: InputNumberWithDefaultProps) {
        super(props)
        // 初始化状态，加减按钮是否可用，根据当前值判断
        let data = this.judgeValue({isInit: true, props})
        const {precision, max, min, locale} = props
        const initFormat = this.getFormat(props)
        const {thousandSeparator, decimalSeparator, minusRight} = initFormat
        this.state = {
            ...initFormat,
            precision,
            value: data.value,
            max: max === 0 ? 0 : max || Number.MAX_SAFE_INTEGER || Math.pow(2, 53) - 1,
            min: min === 0 ? 0 : min || Number.MIN_SAFE_INTEGER || (Math.pow(2, 53) - 1) * -1,
            minusDisabled: data.minusDisabled,
            plusDisabled: data.plusDisabled,
            showValue: this.value4show(data.value, thousandSeparator, decimalSeparator, minusRight),
            placeholderShow: true,
            local: getLangInfo(locale, i18n, 'inputNumber'),
            preValue: '' // 输入的合法的数据, onChange事件触发此值的修改更新
        }
    }

    /**
     * 转化为金额大写
     */
    convertToChineseCurrency = (val: string | number) => {
        let value = Number(val);

        if (typeof val === 'string' && /^[^-]*-$/.test(val)) return val[val.length - 1] + val.slice(0, val.length - 1);
        if (val === '' || val == null) return '';
        //  0显示为零元整
        if (value === 0) return '零元整';
        // 负数显示原数值
        if (value < 0) return val;
        if ((typeof val === 'string' && val.includes("e")) || Number.isNaN(value)) return '错误的金额！'

        // 15判断是因为如果有16位整数+两位小数，Number会丢失小数精度
        let [integer, decimal = '0'] = typeof val === 'string' && val.length > 15 ? val.split('.') : value.toString().split('.');

        integer = integer.replace(/^0+/, ''); // 删除所有开头的零
        let numArr = ['', '壹', '贰', '叁', '肆', '伍', '陆', '柒', '捌', '玖'];
        let descArr = ['', '拾', '佰', '仟', '万', '拾', '佰', '仟', '亿', '拾', '佰', '仟', '万亿', '拾', '佰', '仟', '兆', '拾', '佰', '仟'];
        let rmbDescArr = ['角', '分'];

        // 整数部分的读法
        let integerRes = '';
        let count = integer.length; // 整数位数
        if (count > 16 || (count > String(Number.MAX_SAFE_INTEGER).length)) {
            return '错误的金额！';
        } else if (count === 0) {
            integerRes = '零';
        } else {
            for (let i = 0; i < count; i++) {
                let n = integer[i]; // 当前位上的数字
                // 当前数字的单位索引 descArr
                let j = count - i - 1;

                // 判断是否需要在数字前加“零”
                let isLing = i > 1 && n !== '0' && integer[i - 1] === '0'; // 去除首位且本位不是零上一位是零
                let cnZero = isLing ? '零' : '';
                // 获取当前数字的中文大写
                let cnNum = numArr[n];

                // 判断当前单位是否需要省略
                let isEmptyUnit = (n === '0' && j % 4 !== 0) || integer.slice(i - 3, i + 1) === '0000';
                let cnDesc = isEmptyUnit ? '' : descArr[j];
                integerRes += cnZero + cnNum + cnDesc;
            }
        }

        // 小数部分的读法
        let decimalRes = '';
        count = (decimal || '').length;

        if (decimal === null) {
            decimalRes = '整';
        } else if (decimal === '0') {
            decimalRes = '';
        } else if (count > 2) {
            return '错误的金额！' // 规范，只处理两位小数情况
        } else {
            for (let i = 0; i < count; i++) {
                let n = decimal[i];
                // 判断是否需要在数字前加“零”
                let isLing = i > 0 && n !== '0' && decimal[i - 1] === '0';
                let cnZero = isLing && integerRes !== '零' ? '零' : '';
                let cnNum = numArr[n];
                let cnDesc = cnNum ? rmbDescArr[i] : '';

                decimalRes += cnZero + cnNum + cnDesc;
            }
        }

        let res = integerRes === '零' ? decimalRes : integerRes + (decimalRes === '' ? '元整' : `元${decimalRes}`);

        return res
    }

    /**
     * 校验value
     * @param {*} props
     * @param {原来的值} oldValue
     * @param {精度} precision
     */
    judgeValue = ({
        isInit = false,
        props,
        oldValue,
        precision
    }: {
        isInit?: boolean
        props: InputNumberProps
        oldValue?: InputNumberState['value']
        precision?: InputNumberProps['precision']
    }): {
        value: string | number
        minusDisabled: boolean
        plusDisabled: boolean
    } => {
        let currentValue
        let currentMinusDisabled = false
        let currentPlusDisabled = false
        let {value, min, max, defaultValue, displayCheckPrompt, locale, autoCorrectCase, invalidCaseError} = props
        const {minusRight} = this.getFormat(this.props)
        if (!value && value !== 0) {
            // undefined, null, 空字符串''，但不包括带空格的空字符串 '  '
            if (isInit && (defaultValue || defaultValue === 0)) {
                value = defaultValue
            } else {
                return {
                    value: '',
                    minusDisabled: false,
                    plusDisabled: false
                }
            }
        }
        value = this.deleteSpaces(value)
        precision = precision ?? props.precision
        if (!max && max !== 0 && this.state) max = this.state.max
        if (!min && min !== 0 && this.state) min = this.state.min
        if (minusRight) {
            value = value?.toString() ?? ''
            if (value.indexOf('-') != -1) {
                // 所有位置的负号转到前边
                value = value.replace('-', '')
                value = '-' + value
            }
            value = value ? Number(value) : ''
        }
        if (value != undefined && value != null) {
            if (value === '') {
                currentValue = ''
                return {
                    value: '',
                    minusDisabled: false,
                    plusDisabled: false
                }
            } else {
                // fix: 用户传入超长字符串数字时，类型转换会丢失精度，+"12345678901234.54663344"  ==> 12345678901234.547
                currentValue =
                    (typeof value === 'string' &&
                        (value.replace(/[^\d]/g, '').length >
                            16 /** 没超出安全数字，但长度超过16也会超出js数字可用的存储空间 */ ||
                            +value >= +max! /** 超出安全数字但没超过16位 */ ||
                            +value <= +min!)
                        ? value // 超长值不改变类型
                        : +value) ?? 0
            }
        } else {
            // NaN
            if (oldValue || oldValue === 0 || oldValue === '0') {
                currentValue = oldValue
            } else {
                // value为空
                return {
                    value: '',
                    minusDisabled: false,
                    plusDisabled: false
                }
            }
        }
        if (currentValue == -Infinity) {
            return {
                value: min ?? '',
                minusDisabled: true,
                plusDisabled: false
            }
        }
        if (currentValue == Infinity) {
            return {
                value: max ?? '',
                minusDisabled: false,
                plusDisabled: true
            }
        }

        const local = getLangInfo(locale, i18n, 'inputNumber')
        if (min !== undefined && +currentValue <= min) {
            if (displayCheckPrompt && +currentValue < min) prompt(local.langMap.msgMin)
            currentMinusDisabled = true
            // QDJCJS-26550 针对传入超出范围的值后自动纠正功能，加开关，传属性后则不纠正，抛出报错事件
            autoCorrectCase && +currentValue < min ? invalidCaseError?.() : currentValue = min
        }
        if (max !== undefined && +currentValue >= max) {
            if (displayCheckPrompt && +currentValue > max) prompt(local.langMap.msgMax)
            currentPlusDisabled = true
            // QDJCJS-26550 针对传入超出范围的值后自动纠正功能，加开关，传属性后则不纠正，抛出报错事件
            autoCorrectCase && +currentValue > max ? invalidCaseError?.() : currentValue = max
        }

        if (precision !== undefined) {
            currentValue = this.getPrecision(currentValue, precision)
        }
        if (minusRight) {
            currentValue = '' + currentValue
            if (currentValue.indexOf('-') != -1) {
                // 负号转到后边
                currentValue = currentValue.replace('-', '')
                currentValue = currentValue + '-'
            }
        }
        return {
            value: currentValue,
            minusDisabled: currentMinusDisabled,
            plusDisabled: currentPlusDisabled
        }
    }

    componentDidMount() {
        if (this.props.autoFocus) {
            this.inputRef?.input.focus()
        }
    }

    UNSAFE_componentWillReceiveProps(nextProps: InputNumberProps) {
        const {max, min, step, value, precision} = nextProps
        const state = this.state
        const {thousandSeparator, decimalSeparator, minusRight, toThousands} = this.getFormat(nextProps)
        if (thousandSeparator !== undefined) {
            this.setState({
                thousandSeparator
            })
        }
        if (decimalSeparator !== undefined) {
            this.setState({
                decimalSeparator
            })
        }
        if (max !== undefined && max !== state.max) {
            this.setState({
                max,
                plusDisabled:
                    max !== undefined && (+state.value >= max || (step !== undefined && +state.value + step > max))
            })
        }
        if (min !== undefined && min !== state.min) {
            this.setState({
                min,
                minusDisabled:
                    min !== undefined && (+state.value <= min || (step !== undefined && +state.value - +step < min))
            })
        }
        if (toThousands !== undefined && toThousands !== state.toThousands) {
            let data = this.judgeValue({props: nextProps, oldValue: state.value, precision})
            this.setState({
                toThousands,
                showValue: this.value4show(data.value, thousandSeparator, decimalSeparator, minusRight)
            })
        }
        if (minusRight !== undefined && minusRight !== state.minusRight) {
            let data = this.judgeValue({props: nextProps, oldValue: state.value, precision})
            this.setState({
                minusRight,
                showValue: this.value4show(data.value, thousandSeparator, decimalSeparator, minusRight)
            })
        }
        if (precision !== undefined && precision !== state.precision) {
            let data = this.judgeValue({props: nextProps, oldValue: state.value, precision})
            this.setState({
                precision,
                value: data.value,
                preValue: data.value,
                showValue: this.value4show(data.value, thousandSeparator, decimalSeparator, minusRight)
            })
        }

        if (value !== state.value) {
            if (this.focus) {
                if (value !== Infinity && value !== -Infinity) {
                    let data = this.judgeValue({props: nextProps, oldValue: state.value})
                    let nextValue = this.deleteSpaces(value ?? '')
                    let isThousand = this.isThousandth({value: nextValue, thousandSeparator: '', decimalSeparator: '.'}) // 是否是千分位, fix: QDJCJS-14424 props进来的值为可计算有效数字
                    if (isThousand) {
                        nextValue = this.delcommafy({num: nextValue, thousandSeparator})
                    }
                    // 处理focus时value传入不符合精度的数值，显示错误的问题
                    const precisedValue = this.getPrecision(nextValue, precision);
                    if (precision !== undefined && Number(nextValue) !== Number(precisedValue)) {
                        nextValue = precisedValue;
                    }
                    const newState = {
                        value: nextValue,
                        preValue: nextValue,
                        showValue: this.value4show(nextValue, thousandSeparator, decimalSeparator, minusRight),
                        minusDisabled: data.minusDisabled,
                        plusDisabled: data.plusDisabled
                    }
                    // 只有newState有不同的值才更新state, 避免多余setState
                    if (this.stateHasDiff(newState, state)) {
                        this.setState(newState)
                    }
                }
            } else {
                let data = this.judgeValue({props: nextProps, oldValue: state.value})
                const newState = {
                    value: data.value,
                    preValue: data.value,
                    showValue: this.value4show(data.value, thousandSeparator, decimalSeparator, minusRight),
                    minusDisabled: data.minusDisabled,
                    plusDisabled: data.plusDisabled
                }
                if (this.stateHasDiff(newState, state)) {
                    this.setState(newState)
                }
            }
        }
    }

    componentWillUnmount() {
        this.clear()
    }

    /**
     *  判断newState对比state是否有不同的值, 返回true表示有改变
     */
    stateHasDiff(newState: { [key: string]: any }, state: { [key: string]: any }) {
        return !Object.entries(newState).every(([key, value]) => value === state[key]);
    }

    /**
     *  获取格式配置，包括：千分位、小数点、负号位置、是否需要千分位;
     * @returns {thousandSeparator, decimalSeparator, minusRight, toThousands}
     */
    getFormat(props: InputNumberProps) {
        const {thousandSeparator, decimalSeparator, minusRight, toThousands} = props;
        // format接入工作台首选项等provider配置
        const globalDataFormat = globalConfig().getGlobalDataFormat();
        const {numberFormat} = globalDataFormat;
        if (numberFormat) {
            let diworkFormat = formatUtils.diworkfFormat2Num(numberFormat);
            return {
                thousandSeparator: toThousands === false ? '' : (thousandSeparator ?? diworkFormat.thousandSeparator),
                decimalSeparator: decimalSeparator ?? diworkFormat.decimalSeparator,
                minusRight: minusRight ?? diworkFormat.minusRight,
                toThousands: toThousands ?? !!diworkFormat.thousandSeparator,
            }
        } else {
            return {
                thousandSeparator: toThousands === false ? '' : (thousandSeparator ?? ','),
                decimalSeparator: decimalSeparator ?? '.',
                minusRight: minusRight ?? false,
                toThousands: toThousands ?? false,
            }
        }
    }

    /**
     *  @memberof InputNumber
     * round 是否要四舍五入(此参数无效,超长不让输入)
     */
    numToFixed = (value: string | number, precision?: InputNumberProps['precision'], round?: boolean): string => {
        const {decimalSeparator} = this.state
        value = String(value)
        if (!value && value !== '0') return value
        if (!precision && String(precision) !== '0') return value
        let preIndex = value.indexOf(decimalSeparator)
        if (value.indexOf(decimalSeparator) === -1) return value
        preIndex++
        let endIndex = preIndex + (precision ?? 0)
        let precValue = value.substring(preIndex, preIndex + endIndex) + '0000000000'
        if (round) {
            value = value.replace(decimalSeparator, '.') // 用户正常数字输入，首选项配置格式转换为小数点
            return (Number(value) + 1e-14).toFixed(precision)
        }
        return value.split(decimalSeparator)[0] + decimalSeparator + precValue.substring(0, precision)
    }

    /**
     * 千分符
     * @param {number} number 要转换的数据，可计算数字字符串
     * @param {boolean} isProps 是否是用户传入值，传入值按无格式数值字符串处理，即认为无千分位分隔符且小数点为 点 `.`
     */
    value4show(number: number | string, thousandSeparator: string, decimalSeparator: string, minusRight: boolean = false): string {
        if (number === '') return ''
        if (number === '0') return '0'
        let num = (number || 0).toString()
        num = '' + this.changeMinusRightPosition(num, minusRight)
        if (!isNaN(+num)) {
            num = num.replace('.', decimalSeparator) // 用户传入的正常数字'22.333'区别于千分位`.`格式化出来的数据'22.333'，小数点转换为与首选项配置格式
        }
        let [integer, decimal = ''] = num.split(decimalSeparator)
        const hasMinus = integer.includes('-')
        integer = integer.replace('-', '')
        let result = ''
        while (integer.length > 3) {
            result = thousandSeparator + integer.slice(-3) + result
            integer = integer.slice(0, integer.length - 3)
        }
        if (integer) {
            result = integer + result
            if (num == decimalSeparator || num.indexOf(decimalSeparator) == num.length - 1) {
                result = result + decimalSeparator + decimal
            } else if (decimal) {
                result = result + decimalSeparator + decimal
            }
        }
        if (hasMinus) {
            result = minusRight ? result + '-' : '-' + result
        }
        return result
    }

    /**
     * 删除输入的空格
     * @param {Number|String} value 输入数字
     */
    deleteSpaces = (value: string | number) => {
        return typeof value === 'string' ? value.replace(/\s/g, '') : value.toString();
    }

    handleChange = (value: string | number, e: React.MouseEvent<HTMLInputElement>) => {
        const {onChange, toNumber, antd, min, max, step, autoFix, round} = this.props
        const {precision, toThousands, thousandSeparator, decimalSeparator, minusRight} = this.state
        let selectionStart =
            this.inputRef?.selectionStart === undefined
                ? this.inputRef?.input.selectionStart
                : this.inputRef.selectionStart
        if (antd) {
            /** antd模式下value与e顺序对调 */
            e = value as unknown as React.MouseEvent<HTMLInputElement>
            value = (e as any).target.value as string
        }
        const originalValue = value;
        value = this.deleteSpaces(value as string)
        // if (this.inputRef.isComposition === true) return // QDJCJS-9776，禁止中文输入，否则windows下change先于composition事件触发会导致额外删除数字问题
        if (this.inputRef?.isComposition === true) {
            this.inputRef.blur()
            this.inputRef.focus()
            return
        }
        value = decimalSeparator === '.' ? value.replace(/。/g, '.') : value // QDJCJS-11472 搜狗中文输入法下，小数点和句号混淆问题
        value = decimalSeparator === ',' ? value.replace(/，/g, ',') : value // 易用性优化，小数点为逗号时全角半角均可

        const removeDotValue = value.split(decimalSeparator)
        if (removeDotValue.length > 2) {
            value = removeDotValue[0] + decimalSeparator + removeDotValue.slice(1).join('') // 移除多余小数点
        }
        const reg = new RegExp(`[^e+-\\d${thousandSeparator === '.' ? '\\.' : thousandSeparator}${decimalSeparator === '.' ? '\\.' : decimalSeparator}]+`, 'ig')
        if (reg.test(value.slice(-1))) return // 后置非法校验，修复QDJCJS-9919 用户Excel直接copy单元格数字时自带尾部空格无法粘贴问题

        if (['-', decimalSeparator].includes(value)) { // 开始仅输入负号或小数点的场景
            this.setState({
                value,
                preValue: value,
                showValue: value
            })
            return
        }

        if (value === '') {
            onChange?.(value, e)
            this.setState({
                value,
                preValue: '',
                showValue: ''
            })
            return
        }
        if (minusRight) {
            if ((value.match(/-/g)?.length ?? 0) > 1) return
        }
        let thousandth = this.isThousandth({value, thousandSeparator, decimalSeparator}) // 是否是千分位
        if (toThousands) {
            const _reg = new RegExp(thousandSeparator === '.' ? '\\.' : thousandSeparator, 'g')
            value = value.replace(_reg, '')
        }
        value = value4calc({value, thousandSeparator, decimalSeparator})
        if (isNaN(+value) && value !== decimalSeparator && value !== '-' && !thousandth) {
            // #QDJCJS-7818  手动输入非数字时 输入一位 数字框原有长度减少一位
            this.setState({
                value,
                showValue: this.value4show(value, thousandSeparator, decimalSeparator, minusRight),
                preValue: minusRight && String(value).includes('-') ? String(value).replace('-', '') + '-' : value // 增加前值记录
            })
            if (this.state.value && value.replace('' + this.state.value, '') === '-') {
                // '12' ===> '12-'或'-12' 场景,即值正负变化,需触发onChange
                onChange?.(value, e)
            }
            return
        }
        if (value.indexOf(decimalSeparator) !== -1) {
            // 小数最大值处理
            let prec = String(value.split(decimalSeparator)[1]).replace('-', '')
            if (precision === 0 && (prec === '' || prec != '')) return
            if (precision && prec.length > precision) {
                value = this.numToFixed(value, precision, round)
            }
        }
        if (autoFix && /\d/.test(value[value.length - 1])) {
            const {value: _value} = this.fixExceedNum(value)
            if (min === undefined || max === undefined) {
                value = _value
            } else {
                if (
                    (max <= 0 && +value < max) ||
                    (min >= 0 && +value > min) ||
                    (max * min < 0 && (+value < min || +value > max))
                ) {
                    value = _value
                }
            }
        }
        let plusDisabled = max !== undefined && (+value >= max || +value + +step! > max),
            minusDisabled = min !== undefined && (+value <= min || +value - step! < min)
        const _showValue = this.value4show(value, thousandSeparator, decimalSeparator, minusRight)

        const fixCaretPosition = () => {
            // 修正使用千分符时,输入光标位置错误的问题
            if (toThousands) {
                let position = selectionStart;
                let _reg = /[0-9]/;
                for (let i = 0; i < selectionStart; i++) {
                    if (!_reg.test(_showValue[i])) {
                        position += 1;
                    }
                    if (originalValue[i] !== undefined && !_reg.test(originalValue[i])) {
                        position -= 1;
                    }
                }
                setCaretPosition(this.inputRef?.input, position, true)
            }
        }

        this.setState({
            value,
            showValue: _showValue,
            preValue: value, // 更新合法的数据
            plusDisabled,
            minusDisabled
        }, fixCaretPosition)
        if (value === '-') {
            onChange?.(value, e)
        } else if (value == '.' || value.indexOf('.') == value.length - 1) {
            // 当输入小数点的时候
            onChange?.(value, e)
        } else if (value !== '0' && value[value.indexOf('.') + 1] === '0') {
            // 当输入 d.0 的时候，不转换Number
            onChange?.(value, e)
        } else {
            toNumber ? onChange?.(value ? Number(value) : '', e) : onChange?.(value, e)
        }
    }

    handleFocus = (_value: string, e: React.FocusEvent<HTMLInputElement>) => {
        this.focus = true
        const {onFocus, precision, toNumber} = this.props
        const {minusRight} = this.state
        if (onFocus) {
            // onFocus?.(this.getPrecision(this.state.value, precision), e)
            let value = this.getPrecision(this.state.value, precision)
            if (toNumber) {
                if (minusRight) {
                    value = '' + this.changeMinusRightPosition(value, minusRight)
                }
                onFocus?.(value ? Number(value) : '', e)
            } else {
                onFocus?.(value, e)
            }
        } else {
            this.inputRef?.input.focus()
        }
    }
    /**
     * 恢复科学技术法的问题
     */
    getFullNum = ({value: num, decimalSeparator, precision}: {value: string | number, decimalSeparator: string, precision?: number}): string => {
        const { roundAt = 5 } = this.props;
        // 处理非数字
        if (isNaN(+num)) {
            return num + ''
        }

        // 处理不需要转换的数字
        const str = '' + num
        if (!/e/i.test(str)) {
            return str
        }
        const reg = new RegExp(`${decimalSeparator === '.' ? '\\.' : decimalSeparator}?0+$`)
        let result = roundAt === 5 ? Number(num).toFixed(precision ?? 18) : this.customRound(num, precision ?? 18, roundAt)
        return result.replace(reg, '')
    }

    /**
     * roundAt 自定义舍入规则
     */
    customRound = (num: any, digits: number, roundUpOn: number) => {
        if (!digits && digits !== 0) return num
        let roundUpOnFinal = roundUpOn / 10;
        // 计算放大系数
        let factor = Math.pow(10, digits);
        // 放大数值到指定的小数位
        let value = num * factor;

        // 获取小数点后的数值
        let decimalPart = value && value.toString()?.split('.').length > 1 ? Number('0.' + value.toString()?.split('.')[1][0]) : 0;

        // 自定义规则：如果 decimalPart 大于等于 roundUpOn，就进位
        if (decimalPart >= roundUpOnFinal) {
            value = Math.ceil(value); // 向上取整
        } else {
            value = Math.floor(value); // 向下取整
        }

        let result = (value / factor).toFixed(digits); // 除以放大系数并返回固定小数位
        return result;
    }

    /**
     * @desc 超过最大值最小值情况处理
     * @param v 输入值
     */
    fixExceedNum = (v: string | number): {value: string; showValue: string; placeholderShow: boolean} => {
        let {max, min, displayCheckPrompt, round, precision} = this.props
        const {thousandSeparator, decimalSeparator, minusRight, local} = this.state
        if (!max && max !== 0) max = this.state.max
        if (!min && min !== 0) min = this.state.min

        let value: number | string = this.numToFixed(v, precision, round)

        if (['-', decimalSeparator].includes(value)) { // 开始仅输入负号或小数点的场景
            return {
                value,
                showValue: value,
                placeholderShow: true
            }
        }
        if (minusRight) {
            if (value.indexOf('-') != -1) {
                // 所有位置的负号转到前边
                value = value.replace('-', '')
                value = '-' + value
            }
        }
        if (isNaN(parseFloat(value))) {
            // 空字符串等
            value = 0
        } else if (typeof value === 'string' && /\D/g.test(value[value.length - 1])) {
            // 末尾非数字
            value = parseFloat(value)
        } // 其他情况不做处理，原值下传
        if ((max || max === 0) && +value > +max) {
            if (displayCheckPrompt) prompt(local.langMap.msgMax)
            value = max
        }
        if ((min || min === 0) && +value < +min) {
            if (displayCheckPrompt) prompt(local.langMap.msgMin)
            value = min
        }
        if (precision !== undefined) {
            value = this.getPrecision(value, precision)
        }
        value = value.toString()
        // if (minusRight && value.indexOf('-') != -1) {
        //     // 负号转到后边
        //     value = value.replace('-', '')
        //     value = value + '-'
        // }
        return {
            value,
            showValue: this.value4show(value, thousandSeparator, decimalSeparator, minusRight),
            placeholderShow: true
        }
    }

    /**
     * @desc 遮掩码占位码
     */
    decodeValue = (value: any, formatReg: any, hiddenChart = '*', replaceChart = '#') => {
        if (!formatReg) {
            return value
        }
        const formatRegArr = formatReg?.split('')
        const valueArr = String(value)?.split('')
        let newValue = []
        for (let index = 0; index < formatRegArr.length; index++) {
            const element = formatRegArr[index]
            if (element === replaceChart) {
                const cell = valueArr?.shift()
                if (!cell) break
                newValue.push(cell)
            } else if (element === hiddenChart) {
                const cell = valueArr?.shift()
                if (!cell) break
                newValue.push(hiddenChart)
            } else {
                newValue.push(element)
            }
        }
        if (valueArr.length > 0) {
            newValue = newValue.concat(valueArr)
        }
        return newValue.join('')
    }


    handleBlur = (v: string, e: React.FocusEvent<HTMLInputElement>) => {
        this.focus = false
        const {onBlur, onChange, toNumber, changeOnBlur = true, decimalFormat} = this.props
        const {thousandSeparator, decimalSeparator, minusRight} = this.state
        // v = this.state.value // 在onBlur的时候不需要获取输入框的值，而是要获取state中的值，因为有format。
        v = this.isEqual(this.state.value).toString()

        if (['-', decimalSeparator].includes(v)) { // 仅输入负号或小数点的场景, blur时清空
            this.setState({
                value: '',
                showValue: ''
            })
            onChange?.('')
            onBlur?.('', e)
            return
        }

        if (v === '' || !v) {
            this.setState({
                value: v,
                showValue: this.value4show(v, thousandSeparator, decimalSeparator, minusRight)
            })
            onChange?.(v)
            onBlur?.(v, e)
            return
        }
        let {value, showValue} = this.fixExceedNum(v)
        if (decimalFormat && value.indexOf('.') !== -1 && value[value.length - 1] === '0') {
            let tempShowValue = showValue.split('.');
            value = Number(value) + '';
            let tempValue = value.split('.');
            showValue = tempValue.length > 1 ? (tempShowValue[0] + '.' + tempValue[1]) : tempShowValue[0]
        }
        this.setState({
            value,
            showValue,
            placeholderShow: true
        })
        this.detailDisable(value)
        if (toNumber) {
            if (minusRight) {
                value = '' + this.changeMinusRightPosition(value, minusRight)
            }
            // onChange?.(value ? Number(value) : '') // 防止空字符串被转换为0
            changeOnBlur && onChange?.(Number(value))
            onBlur?.(value ? Number(value) : '', e)
        } else {
            // onChange?.(value, e)
            changeOnBlur && onChange?.(value, e)
            onBlur?.(value, e)
        }
    }
    // 去掉千分位
    delcommafy = ({num, thousandSeparator}: {num: string, thousandSeparator: string}) => {
        // 去除千分位中的‘，’
        if (num && num != 'undefined' && num != 'null') {
            let numS = num
            numS = numS.toString()
            let reg = new RegExp(thousandSeparator === '.' ? '\\.' : thousandSeparator, 'ig')
            numS = numS.replace(reg, '')
            return numS
        } else {
            return num
        }
    }
    /**
     * 设置增加减少按钮是否可用
     */
    detailDisable = (value: string | number) => {
        let {max, min, step} = this.props
        if (!max && max !== 0) max = this.state.max
        if (!min && min !== 0) min = this.state.min
        this.setState({
            plusDisabled: value === '' || (max !== undefined && (+value >= max || +value + +step! > max)),
            minusDisabled: value === '' || (min !== undefined && (+value <= min || +value - step! < min))
        })
    }
    /**
     * 减法
     */
    minus = (value: number, e: React.MouseEvent<HTMLElement>) => {
        let {min, max, step, onChange, toNumber} = this.props
        const {thousandSeparator, decimalSeparator, minusRight} = this.state
        if (!max && max !== 0) max = this.state.max
        if (!min && min !== 0) min = this.state.min
        if (typeof min === 'undefined') {
            value = +this.detail(value, step, 'reduce')
        } else {
            if ((min || min === 0) && value < +min) {
                value = +min
            } else {
                let reducedValue = +this.detail(value, step, 'reduce')
                if (+reducedValue >= +min) {
                    value = reducedValue
                }
            }
        }
        if (max || max === 0) {
            max = Number(max)
            if (value > max) {
                value = max
            }
        }
        this.setState(
            {
                value,
                preValue: value,
                showValue: this.value4show(value, thousandSeparator, decimalSeparator, minusRight)
            },
            () => {
                this.inputRef?.input?.focus()
            }
        )
        toNumber ? onChange?.((value || value === 0) ? Number(value) : '', e) : onChange?.(value, e)
        this.handleBtnClick('down', value)
        this.detailDisable(value)
    }
    /**
     * 加法
     */
    plus = (value: number, e: React.MouseEvent<HTMLElement>) => {
        let {max, min, step, onChange, toNumber} = this.props
        const {thousandSeparator, decimalSeparator, minusRight} = this.state
        if (!max && max !== 0) max = this.state.max
        if (!min && min !== 0) min = this.state.min
        if (typeof max === 'undefined') {
            value = +this.detail(value, step, 'add')
        } else {
            if ((max || max === 0) && value > +max) {
                value = +max
            } else {
                let addedValue = +this.detail(value, step, 'add')
                if ((max || max === 0) && addedValue <= +max) {
                    value = addedValue
                }
            }
        }
        if (min || min === 0) {
            min = Number(min)
            if (value < min) {
                value = min
            }
        }
        this.setState(
            {
                value,
                preValue: value,
                showValue: this.value4show(value, thousandSeparator, decimalSeparator, minusRight)
            },
            () => {
                this.inputRef?.input?.focus()
            }
        )
        toNumber ? onChange?.(value || value === 0 ? Number(value) : '', e) : onChange?.(value, e)
        this.handleBtnClick('up', value)
        this.detailDisable(value)
    }

    detail = (value: string | number, step: InputNumberProps['step'], type: 'add' | 'reduce') => {
        let { precision, roundAt = 5 } = this.props

        let valueFloat = this.separate(value)
        let stepFloat = step !== undefined ? this.separate(step) : ''

        let ans: number | undefined
        let stepFloatLength = stepFloat.toString().length
        let valueFloatLength = valueFloat.toString().length

        if (typeof precision === 'undefined') {
            precision = Math.max(stepFloatLength, valueFloatLength)
        }
        let coefficient = Math.pow(10, Math.abs(stepFloatLength - valueFloatLength))
        if (step !== undefined) {
            if (type === 'add') {
                ans = (+value * coefficient + step * coefficient) / coefficient
            } else {
                ans = (+value * coefficient - step * coefficient) / coefficient
            }
        }
        return roundAt === 5 ? (ans as number).toFixed(precision) : this.customRound(ans, precision, roundAt)
    }
    // 是否是千分位,支持自定义分隔符
    isThousandth = ({value, thousandSeparator, decimalSeparator}: {value: string, thousandSeparator: string, decimalSeparator: string}) => {
        thousandSeparator = thousandSeparator === '.' ? '\\.' : thousandSeparator
        decimalSeparator = decimalSeparator === '.' ? '\\.' : decimalSeparator
        // TODO：千分位为空场景正则处理
        if (!thousandSeparator) return false
        const regex = new RegExp(`(?:^[-]?[1-9]\\d{0,2}(?:$|(?:${thousandSeparator}\\d{3})*(?:$|(${decimalSeparator}\\d{1,2}$))))|(?:(?:^[0](${decimalSeparator}\\d{1,2})?)|(?:^[-][0]${decimalSeparator}\\d{1,2}))$`)
        // let regex = /(?:^[-]?[1-9]\d{0,2}(?:$|(?:,\d{3})*(?:$|(\.\d{1,2}$))))|(?:(?:^[0](\.\d{1,2})?)|(?:^[-][0]\.\d{1,2}))$/
        return regex.test(value)
    }

    /**
     * 分离小数和整数，返回小数或整数部分
     */
    separate = (value: string | number, isInt: boolean = false) => {
        const {decimalSeparator, thousandSeparator} = this.state
        if (value == null || value == undefined) {
            return ''
        } else {
            value = value.toString()
            if (isInt) {
                value = value.replace(new RegExp(thousandSeparator, 'g'), '') // 删掉千分符
                value = value.replace('-', '') // 删掉负号
            }
            if (value.indexOf(decimalSeparator) > -1) {
                const [int, decimal] = value.split(decimalSeparator)
                return isInt ? int : decimal
            } else {
                return isInt ? value : ''
            }
        }
    }

    clear = () => {
        if (this.timer) {
            clearTimeout(this.timer)
        }
    }

    // 字符串且有减号，可调整减号位置，数据类型保持不变
    changeMinusRightPosition = (value: string | number, minusRight: boolean): string | number => {
        if (minusRight) {
            if (typeof value === 'string' && value.indexOf('-') !== -1) {
                value = '-' + value.replace('-', '')
            } else if (typeof value === 'number' && value < 0) {
                value = '-' + String(value).replace('-', '')
            }
        }
        return value
    }

    handlePlusMouseDown = (e: React.MouseEvent<HTMLDivElement>) => {
        e.persist()
        e.nativeEvent.stopPropagation()
        e.nativeEvent.preventDefault()
        const {delay, disabled, readOnly} = this.props
        let {value, minusRight} = this.state
        if (disabled || readOnly) return
        value = this.isEqual(value)
        value = this.changeMinusRightPosition(value, minusRight)
        value = isNaN(parseFloat(value.toString())) ? 0 : parseFloat(value.toString())
        this.plus(value, e)
        this.clear()
        this.timer = setTimeout(() => {
            this.handlePlusMouseDown(e)
        }, delay)
    }

    handleReduceMouseDown = (e: React.MouseEvent<HTMLDivElement>) => {
        e.persist()
        e.nativeEvent.stopPropagation()
        e.nativeEvent.preventDefault()
        const {delay, disabled, readOnly} = this.props
        let {value, minusRight} = this.state
        if (disabled || readOnly) return
        value = this.isEqual(value)
        value = this.changeMinusRightPosition(value, minusRight)
        value = isNaN(parseFloat(value.toString())) ? 0 : parseFloat(value.toString())
        this.minus(value, e)
        this.clear()
        this.timer = setTimeout(() => {
            this.handleReduceMouseDown(e)
        }, delay)
    }

    onKeyDown: React.KeyboardEventHandler<HTMLInputElement> = e => {
        const {which} = e
        const {keyboard, onPressEnter, onKeyDown} = this.props

        if (which === KeyCode.ENTER) {
            this.clear()
            onPressEnter?.(e)
        }

        if (keyboard === true) {
            // 按上下箭头， step 更新值
            if (KeyCode.UP === which) {
                this.handlePlusMouseDown(e as any)
                e.preventDefault()
            } else if (KeyCode.DOWN === which) {
                this.handleReduceMouseDown(e as any)
                e.preventDefault()
            }
        }

        onKeyDown?.(e)
    }

    onKeyUp = () => {
        this.clear()
    }

    /**
     * @param value 符合数字格式的值
     */
    getPrecision = (value: InputNumberState['value'], precision: InputNumberProps['precision']) => {
        const { roundAt = 5 } = this.props;
        if (value == null || value == undefined) return value
        if (!value && value === '') return value
        const {decimalSeparator} = this.getFormat(this.props)
        value = String(value)
        value = value.indexOf('e') !== -1 ? this.getFullNum({value, decimalSeparator, precision}) : value
        if (precision == undefined || (value.indexOf('.') !== -1 && String(value.split('.')[1]).length === precision)) {
            return value
        }
        let before = value.substring(0, 1),
            len = value.length,
            after = value.substring(len - 1, len)
        before = before === '-' ? before : ''
        after = after === '-' ? after : ''
        // 是科学计数法，不replace -
        if (before) value = value.substring(1, len)
        if (after) value = value.substring(0, len - 1)
        let precV = '000000000000000000000000000000000000000000000000000000000000000000000000'
        if (value.indexOf('.') === -1) {
            precV = precV.substring(0, precision)
            precV = precV ? '.' + precV : precV
            if (!isNaN(+value) && (value.indexOf('-') != -1 || value.indexOf('+') != -1) && value.indexOf('e') != -1) {
                // 是科学计数法，不拼接0000000
            } else {
                value = value + precV
            }
        }
        let result = roundAt === 5 ? Number(value).toFixed(precision) : this.customRound(value, precision, roundAt)
        let tempValue = this.props.decimalFormat ? parseFloat(result) : result;
        return before + tempValue + after
    }

    handleBtnClick = (type: 'up' | 'down', value: number) => {
        const {onStep, handleBtnClick, step} = this.props
        handleBtnClick?.(type, value)
        onStep?.(value, {offset: step!, type})
    }
    isIE = () => {
        if (window) {
            if (!!(window as any).ActiveXObject || 'ActiveXObject' in window) return true
        }
        return false
    }
    placeholderClick = () => {
        this.inputRef?.input.focus()
        this.setState({
            placeholderShow: false
        })
    }

    isEqual = (value: InputNumberState['value']) => {
        // 如果当前数据不合法，之前合法数据替换当前数据
        const {preValue} = this.state
        if (value !== preValue && preValue !== undefined && preValue !== '') {
            value = preValue
        }
        return value
    }

    // 输入中文处理
    handleComposition = (e: React.CompositionEvent<HTMLInputElement>, composition: 'start' | 'end') => {
        const {onCompositionStart, onCompositionEnd} = this.props
        if (composition === 'start') {
            this.inputRef.isComposition = true
            onCompositionStart?.(e)
        } else if (composition === 'end') {
            this.inputRef.isComposition = false
            onCompositionEnd?.(e)
        }
    }

    // 计算数量级
    getMark = (value: string | number) => {
        const {showMark, integerMarks = defaultIntegerMarks} = this.props
        if (!showMark) return '' // 不显示数量级
        const integer = this.separate(value, true)
        const integerLength = Math.floor(Math.log10(+value4calc({value: integer}))) + 1 // 修复前置0时Mark错误问题
        if (integerLength < integerMarks[0].len) return '' // 低于最小位数，不显示
        if (integerLength > integerMarks[integerMarks.length - 1].len) return '' // 超出最大位数，不显示
        const currentMark = integerMarks.filter(item => {
            return item.len === integerLength
        })?.[0]
        if (!currentMark) return '' // 用户自定义不显示的数量级
        const {key, mark} = currentMark
        if (mark !== undefined) return mark
        const {local} = this.state
        return local.langMap[key!] // 数量级
    }

    // 生成input
    getInput = ({others, size, value, mark}: {others: InputNumberProps, size: InputNumberProps['size'], value: InputNumberState['value'], mark?: string}) => {
        const {id, fieldid, disabled, readOnly, clsPrefix} = this.props
        const inputDom = <Input
            {...omit(others, ['nid', 'uitype', 'onResize', 'onMouseEnter', 'onMouseLeave'])}
            prefix={!this.focus && mark ? <span className={`${clsPrefix}-mark`}>{mark}</span> : null}
            id={id}

            fieldid={fieldid}
            size={size}
            value={value}
            disabled={disabled}
            readOnly={readOnly}
            onBlur={this.handleBlur}
            onFocus={this.handleFocus}
            onChange={this.handleChange}
            onCompositionStart={e => {
                this.handleComposition(e, 'start')
            }}
            onCompositionEnd={e => {
                this.handleComposition(e, 'end')
            }}
            onKeyDown={this.onKeyDown}
            onKeyUp={this.onKeyUp}
            ref={(ref: HTMLInputElement) => (this.inputRef = ref)}
        />
        return inputDom
    }

    // 生成带标记Input
    getMarkInput = ({others, size, value}: {others: InputNumberProps, size: InputNumberProps['size'], value: InputNumberState['value']}) => {
        const {showMark, iconStyle} = this.props
        const mark = this.getMark(value)
        if (showMark) {
            return <Tooltip overlay={mark} placement={iconStyle === 'one' ? "topLeft" : 'top'} show={!!mark && this.focus} trigger={['click', 'focus']} overlayInnerStyle={{minWidth: 20, padding: '2px 6px 0'}}>
                {this.getInput({others, size, value, mark})}
            </Tooltip>
        } else {
            return this.getInput({others, size, value})
        }
    }

    render() {
        let {
            id,
            fieldid,
            toThousands: _toThousands,
            minusRight: _minusRight,
            precision,
            step,
            disabled,
            readOnly,
            clsPrefix,
            className,
            delay,
            onCompositionStart,
            onCompositionEnd,
            onBlur,
            onFocus,
            onKeyDown,
            onKeyUp,
            iconStyle,
            autoWidth,
            onChange,
            format,
            toNumber,
            hideActionButton,
            controls,
            handleBtnClick,
            onStep,
            addonBefore,
            addonAfter,
            displayCheckPrompt,
            onPressEnter,
            formatter,
            style,
            rootClassName,
            autoFix,
            round,
            size,
            requiredStyle,
            align,
            bordered,
            onResize,
            decimalSeparator,
            dir,
            showAmountInWords,
            inputWidth,
            showAmountLayout = 'vertical',
            onlyShowAmount,
            formatReg,
            hiddenChart,
            replaceChart,
            ...others
        } = this.props
        // ConfigProvider的context配置
        bordered = bordered ?? (this.context as React.ContextType<typeof ConfigContext>)?.bordered ?? true // 接受provider控制
        hideActionButton = hideActionButton ?? controls ?? false // 兼容antd API，并赋默认值false
        let classes = {
            [`${clsPrefix}-auto`]: autoWidth,
            [`${clsPrefix}`]: true,
            [`${clsPrefix}-rtl`]: dir === 'rtl',
            'disabled-con': disabled
        }
        let addonClasses = {
            [`${clsPrefix}-addon-${setComponentSize(size)}`]: setComponentSize(size)
        }
        const _align = align || (iconStyle === 'double' ? 'center' : undefined)

        size = setComponentSize(size, {defaultIsMd: true})
        let {value, minusDisabled, plusDisabled, showValue, toThousands, minusRight} = this.state
        value = precision != null && !this.focus ? this.getPrecision(value, precision) : value
        if (!format && formatter) format = formatter // 兼容处理
        value = String(value).indexOf('e') !== -1 ? this.getFullNum({value, decimalSeparator: this.state.decimalSeparator, precision}) : value
        if ((minusRight || dir === "rtl") && String(value).indexOf('-') !== -1) {
            value = String(value).replace('-', '') + '-'
        }
        value = String(value).replace('.', this.state.decimalSeparator) // QDJCJS-14516 千分位不处理，但小数点需换为工作台配置
        value = format && !this.focus ? format(this.state.value) : value
        const plusClass = classnames('plus', {
            disabled: plusDisabled,
            'disabled-cursor': disabled
        })
        const minusClass = classnames('reduce', {
            disabled: minusDisabled,
            'disabled-cursor': disabled
        })
        let adapterNid = getNid(this.props);
        // 金额大写功能只在中文环境下生效
        let tag = showAmountInWords && getLangInfo(this.props.locale, i18n, 'inputNumber').lang === 'zh-cn';
        let amount = tag && this.convertToChineseCurrency(this.state.value);
        value = formatReg && !this.focus ? this.decodeValue(value, formatReg, hiddenChart, replaceChart) : value;
        showValue = formatReg && !this.focus ? this.decodeValue(showValue, formatReg, hiddenChart, replaceChart) : showValue;
        const inputNumberDom = (
            <>
                {addonBefore ? (
                    <div
                        className={classnames(className && `${className}-addonBefore`, `${clsPrefix}-addonBefore`, addonClasses)}
                    >
                        {addonBefore}
                    </div>
                ) : null}
                {iconStyle === 'double' ? (
                    <InputGroup className={classnames(className, classes)}>
                        {hideActionButton ? (
                            ''
                        ) : (
                            <InputGroup.Addon
                                id={id ? id + '_minus' : undefined}
                                fieldid={fieldid ? fieldid + '_minus' : undefined}
                                className={minusClass}
                                onMouseDown={this.handleReduceMouseDown}
                                onClick={(e: MouseEvent) => e.stopPropagation()}
                                onMouseLeave={() => this.clear()}
                                onMouseUp={() => this.clear()}
                            >
                                -
                            </InputGroup.Addon>
                        )}
                        {this.getMarkInput({others, size, value: toThousands ? showValue : value})}
                        {hideActionButton ? (
                            ''
                        ) : (
                            <InputGroup.Addon
                                id={id ? id + '_plus' : undefined}
                                fieldid={fieldid ? fieldid + '_plus' : undefined}
                                className={plusClass}
                                onMouseDown={this.handlePlusMouseDown}
                                onClick={(e: MouseEvent) => e.stopPropagation()}
                                onMouseLeave={() => this.clear()}
                                onMouseUp={() => this.clear()}
                            >
                                +
                            </InputGroup.Addon>
                        )}
                    </InputGroup>
                ) : (
                    <InputGroup className={classnames(className, classes)} simple>
                        {this.isIE() && !value ? (
                            <div
                                onClick={this.placeholderClick}
                                style={{
                                    display: this.state.placeholderShow ? 'block' : 'none'
                                }}
                                className={`${clsPrefix}-placeholder`}
                            >
                                {this.props.placeholder}
                            </div>
                        ) : (
                            ''
                        )}
                        {this.getMarkInput({others, size, value: toThousands ? showValue : value})}
                        {hideActionButton ? (
                            ''
                        ) : (
                            <InputGroup.Button>
                                <div className={classnames('icon-group')}>
                                    <span
                                        id={id ? id + '_plus' : undefined}
                                        fieldid={fieldid ? fieldid + '_plus' : undefined}
                                        onMouseDown={this.handlePlusMouseDown}
                                        onClick={e => e.stopPropagation()}
                                        onMouseLeave={() => this.clear()}
                                        onMouseUp={() => this.clear()}
                                        className={plusClass}
                                    >
                                        <span className='uf uf-arrow-up' />
                                    </span>
                                    <span
                                        id={id ? id + '_minus' : undefined}
                                        fieldid={fieldid ? fieldid + '_minus' : undefined}
                                        onMouseDown={this.handleReduceMouseDown}
                                        onClick={e => e.stopPropagation()}
                                        onMouseLeave={() => this.clear()}
                                        onMouseUp={() => this.clear()}
                                        className={minusClass}
                                    >
                                        <span className='uf uf-arrow-down' />
                                    </span>
                                </div>
                            </InputGroup.Button>
                        )}
                    </InputGroup>
                )}
                {addonAfter ? (
                    <div className={classnames(className && `${className}-addonAfter`, `${clsPrefix}-addonAfter`, addonClasses)}>
                        {addonAfter}
                    </div>
                ) : null}
            </>
        )
        return (
            <div
                id={id ? id + '_input-number' : undefined}
                fieldid={fieldid ? fieldid + '_input-number' : undefined}
                className={classnames(
                    `${clsPrefix}-out`,
                    {
                        [`${clsPrefix}-out-${size}`]: size,
                        [`${clsPrefix}-out-rtl`]: dir === 'rtl',
                        [`${clsPrefix}-icon-${iconStyle}`]: true,
                        [`${clsPrefix}-out-amount`]: tag,
                        [`${clsPrefix}-out-amount-horizontal`]: showAmountLayout === 'horizontal',
                        [`${clsPrefix}-out-amount-vertical`]: showAmountLayout === 'vertical' && tag,
                        ...setComponentClass({clsPrefix, bordered, align: _align, requiredStyle}),
                    },
                    disabled && `${clsPrefix}-disabled`,
                    rootClassName
                )}
                style={style}
                {...adapterNid}
            >
                {
                    tag ? (
                        <>
                            <div className={`${clsPrefix}-amount-dom`} style={{ width: inputWidth || 'unset' }}>{inputNumberDom}</div>
                            {amount && <div className={`${clsPrefix}-amount`}>{onlyShowAmount ? '' : '大写：'}{amount}</div>}
                        </>
                    ) : (
                        inputNumberDom
                    )
                }
            </div>
        )
    }
}
InputNumber.InputNumberGroup = InputNumberGroup

export default InputNumber
