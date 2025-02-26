import React, { useEffect, useState, useRef } from 'react';
import classnames from 'classnames';
import WebUI from '@utils/UpdatePrefixs'
import { InputNumberProps, IntegerMarksType } from './iInputNumber'
import CloseCircleFill from '@tinper/m-icons/lib/cjs/CloseCircleFill'
import { usePropsValue } from '@hooks/UsePropsValueNumber'
import { useConfig } from '@components/config-provider/src/index';

const defaultProps = {
  min: Number.MIN_SAFE_INTEGER,
  max: Number.MAX_SAFE_INTEGER,
  onlyShowClearWhenFocus: true,
  roundAt: 5
} as InputNumberProps

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

const InputNumber = (props: InputNumberProps) => {
  const {
    children,
    disabled,
    min,
    max,
    readOnly,
    value,
    defaultValue,
    precision,
    // async,
    className,
    style,
    format,
    onBlur,
    onFocus,
    onChange,
    clsPrefix,
    addonBefore,
    addonAfter,
    align,
    showClose,
    inputStyle,
    showUnit,
    tips,
    onlyShowClearWhenFocus,
    placeholder,
    fieldid,
    name,
    id,
    maxLength = 15,
    check = false,
    autoSelect = false,
    toThousands,
    toThousandsFormat,
    roundAt = 5,
    decimalFormat,
    formatReg,
    hiddenChart = '*',
    replaceChart = '#',
    autoCorrectCase,
    invalidCaseError,
    ...restProps
  } = props

  const [focused, setFocused] = useState(false)
  const inputRef = useRef<HTMLInputElement>(null)
  const { locale } = useConfig()
  const prevValueRef = React.useRef(null);
  const [maxValue, setMaxValue] = useState(autoCorrectCase ? Number.MAX_SAFE_INTEGER : max)
  const [minValue, setMinValue] = useState(autoCorrectCase ? Number.MIN_SAFE_INTEGER : min)

  const [shadowValue, setShadowValue] = usePropsValue<number | null | string | undefined>({
    value: typeof value === 'string' ? parseFloat(value) : value,
    defaultValue:
      typeof defaultValue === 'string'
        ? parseFloat(defaultValue)
        : defaultValue,
    finalValue: null,
    onChange: (value) => { },
  })

  useEffect(() => {
    const initialValue = props.value != null ? props.value : props.defaultValue != null ? props.defaultValue : '';
    checkValue(initialValue, true);
    if (autoCorrectCase && Number(initialValue) > max || Number(initialValue) < min) {
      invalidCaseError?.();
    }
  }, []);

  useEffect(() => {
    setShadowValue(typeof value === 'string' ? parseFloat(value) : value);
    if (autoCorrectCase && !focused) {
      if (autoCorrectCase && Number(props.value) > max || Number(props.value) < min) {
        invalidCaseError?.();
      }
      setMaxValue(Number.MAX_SAFE_INTEGER);
      setMinValue(Number.MIN_SAFE_INTEGER);
    }
  }, [props.value]);

  // roundAt 自定义舍入规则 
  // decimalFormat 省略小数后无用的0
  const customRound = (num: any, digits: number, roundUpOn: number) => {
    if (!digits && digits !== 0) return num
    let roundUpOnFinal = roundUpOn / 10;
    let factor = Math.pow(10, digits);  // 计算放大系数
    let value = num * factor;           // 放大数值到指定的小数位

    // 获取小数点后的数值
    let decimalPart = value && value.toString()?.split('.').length > 1 ? Number('0.' + value.toString()?.split('.')[1][0]) : 0;

    // 自定义规则：如果 decimalPart 大于等于 roundUpOn，就进位
    if (decimalPart >= roundUpOnFinal) {
      value = Math.ceil(value);  // 向上取整
    } else {
      value = Math.floor(value); // 向下取整
    }

    let result = (value / factor).toFixed(digits); // 除以放大系数并返回固定小数位
    return decimalFormat ? parseFloat(result) : result;
  }

  // 遮掩码占位码
  const decodeValue = (value: any, formatReg: any, hiddenChart = '*', replaceChart = '#') => {
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

  // 数量级显示处理
  const handleUnit = (val: string | number | null | undefined) => {
    const { integerMarks = defaultIntegerMarks } = props;
    if (val && Number(val)) {
      const str = String(val).replace(/[+-]/g, '');
      const unitIndex = Math.floor(Math.log10(Number(str)));
      const currentMark = integerMarks.filter(item => {
        return item.len === (unitIndex + 1)
      })?.[0];
      if (!currentMark) return null
      const { key, mark } = currentMark;
      if (mark !== undefined) return mark
      return key ? locale.InputNumber[key] : null
    }
  }
  const [unit, setUnit] = useState(handleUnit(shadowValue))

  // 最大最小值处理
  const bound = (value: number | null | undefined, min: number, max: number) => {
    let res = props.precision && value != undefined && value !== '' ? customRound(Number(value), props.precision, roundAt) : value;
    if (min !== undefined && res) {
      res = Math.max(Number(min), res)
    }
    if (max !== undefined && res) {
      res = Math.min(Number(max), res)
    }
    if (checkValue && value !== res && !Number.isNaN(Number(value))) checkValue(res, true);
    return (res || res === 0) ? res : ''
  }

  const formatThousands = (tempValue: any) => {
    let format = (!toThousandsFormat || toThousandsFormat.indexOf(']') === -1 || toThousandsFormat.indexOf('###') === -1) ? '#,###[.]###' : toThousandsFormat;
    let value = tempValue + '';
    const start = value.search(/\d/);
    const end = value.split('').reverse().join('').search(/\d/);
    const parts = [value.slice(0, start), value.slice(start, value.length - end), value.slice(value.length - end)]
    let middle = parts[1].split('.');
    let Integer = middle[0].replace(/\B(?=(\d{3})+(?!\d))/g, ',');
    let Decimal = middle.length > 1 ? middle[1] : '';
    const split1 = format[format.indexOf('###') - 1];
    const split2 = format[format.indexOf(']') - 1];
    let result = parts[0] + Integer.replace(/,/g, split1) + (Decimal ? (split2 + Decimal) : '') + parts[2];
    return result
  }

  // 格式化处理
  const formatValue = (value: number | null | string | undefined): string => {
    // 千分符添加
    if (value === null || value === '') return format ? format('') : ''
    // 如果超过 min 或 max, 需要纠正
    if (typeof value === 'string') value = parseFloat(value)
    let fixedValue = bound(value, Number(minValue), Number(maxValue))
    if (format && (fixedValue || fixedValue === 0)) {
      let result = format(precision ? customRound(fixedValue, precision, roundAt).toString() : fixedValue);
      result = toThousands ? formatThousands(result) : result;
      result = formatReg ? decodeValue(result, formatReg, hiddenChart, replaceChart) : result;
      return result;
    }
    if (precision && (fixedValue || fixedValue === 0)) {
      let result = customRound(fixedValue, precision, roundAt).toString();
      result = toThousands ? formatThousands(result) : result
      result = formatReg ? decodeValue(result, formatReg, hiddenChart, replaceChart) : result;
      return result;
    }
    let result = toThousands ? formatThousands(fixedValue) : ((fixedValue || fixedValue === 0) ? fixedValue.toString() : '');
    result = formatReg ? decodeValue(result, formatReg, hiddenChart, replaceChart) : result;
    return result
  }
  const [inputValue, setInputValue] = useState(formatValue(shadowValue))

  useEffect(() => {
    if (!focused) {
      setInputValue(formatValue(shadowValue))
    }
  }, [formatValue(shadowValue)])

  useEffect(() => {
    // QDJCJS-25451 + 数字精度示例
    if (prevValueRef.current !== props.value && props.value && focused && shadowValue) {
      prevValueRef.current = props.value;
      // QDJCJS-25451
      let valueStr = typeof props.value === 'number' ? props.value + '' : (props.value || '')
      let [first, second = ''] = valueStr.split('.');
      if ((precision || precision === 0) && second.length > precision) {
        let temp = second === '' ? '' : '.' + second.slice(0, precision)
        valueStr = first + temp;
      }
      setInputValue(valueStr)
    }
    if (!focused) {
      setInputValue(formatValue(shadowValue))
    }
  }, [shadowValue, value])

  useEffect(() => {
    if (!focused) {
      setShadowValue(bound((shadowValue || shadowValue === 0) ? Number(shadowValue) : shadowValue as number | null | undefined, Number(minValue), Number(maxValue)))
      setInputValue(formatValue(shadowValue))
      setUnit(handleUnit(shadowValue))
    }
  }, [focused, shadowValue])

  useEffect(() => {
    if (precision && shadowValue && focused) {
      setInputValue(customRound(Number(shadowValue), precision, roundAt).toString())
    }
  }, [focused])

  const _onClickClear = () => {
    props.onClickClear?.(inputValue)
    setInputValue('')
    onChange?.('', { target: { value: '' } })
    setUnit('')
    checkValue('', true)
    setShadowValue(null)
  }

  const parseValue = (text: string) => {
    if (text === '') return null
    if (text === '-') return null
    return text
  }

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { integerMarks = defaultIntegerMarks } = props;
    if (!/[^\d\+\-e.]/.test(e.target.value) || e.target.value === '-') {
      // 显示数量级
      if (Number(e.target.value)) {
        const str = e.target.value.replace(/[+-]/g, '');
        const unitIndex = Math.floor(Math.log10(Number(str)));
        const currentMark = integerMarks.filter(item => {
          return item.len === (unitIndex + 1)
        })?.[0];
        if (!currentMark) {
          setUnit('')
        } else {
          const { key, mark } = currentMark;
          mark !== undefined ? setUnit(mark) : (key ? setUnit(locale.InputNumber[key]) : setUnit(''))
        }
      } else {
        setUnit('')
      }
      setInputValue(precision !== undefined && e.target.value.toString().match(/\.(\d+)/)?.[1].length > precision ? customRound(parseFloat(e.target.value || '0'), precision, roundAt) : e.target.value)
      let valueStr = parseValue(e.target.value)
      if (valueStr === null) {
        setShadowValue(null)
      } else {
        setShadowValue(precision !== undefined ? customRound(parseFloat(valueStr || '0'), precision, roundAt) : valueStr as any)
      }
      // if (!async) {
      let [first, second = ''] = (valueStr || '').split('.');
      if ((precision || precision === 0) && second.length > precision) {
        let temp = second === '' ? '' : '.' + second.slice(0, precision)
        valueStr = first + temp;
      }
      onChange?.(valueStr, e)
      checkValue(parseValue(e.target.value));
      // }
    }

  }

  const handleFocus = (e: React.FocusEvent<HTMLInputElement>) => {
    setFocused(true)
    if (autoSelect) {
      inputRef.current?.select()
    } else {
      setInputValue(
        shadowValue || shadowValue === 0
          ? bound(Number(shadowValue), Number(minValue), Number(maxValue)).toString()
          : ''
      )
    }
    onFocus && onFocus(e)
    checkValue(e.target.value, true);
  }

  const handleMouseUp = () => {
    setTimeout(() => {
      const selectionStart = inputRef.current?.selectionStart;
      const selectionEnd = inputRef.current?.selectionEnd;
      const valueLength = inputRef.current?.value.length;
      if (autoSelect && !(selectionStart === 0 && selectionEnd === valueLength)) {
        setInputValue(
          shadowValue || shadowValue === 0
            ? bound(Number(shadowValue), Number(minValue), Number(maxValue)).toString()
            : ''
        )
      }
    }, 0)

  }

  const handleBlur = (e: React.FocusEvent<HTMLInputElement>) => {
    let tempMax = max || max === 0 ? max : maxValue;
    let tempMin = min || min === 0 ? min : minValue;
    setMaxValue(max);
    setMinValue(min);
    onBlur && onBlur(e, (tempMax || tempMin) && e.target.value != "" ? bound(Number(e.target.value), Number(tempMin), Number(tempMax)) : e.target.value)
    checkValue(e.target.value, true);
    // setTimeout(() => {
    setFocused(false)
    // }, 100);

  }

  const checkValue = (value: any, final?: boolean) => {
    const { readOnly, disabled, pattern, required, finalPattern, onError, onSuccess, customCheck } = props;
    if (!check || readOnly || disabled) return true;
    // 用户自定义检查
    if (customCheck && !customCheck(value, final) && !final) {
      onError?.(value, { text: '' });
      return false
    }
    // 输入过程的校验
    if (!final && pattern && !pattern.test(value)) {
      onError?.(value, { reg: pattern, text: '' });
      return false;
    }
    if (final) {
      // 用户自定义检查
      if (customCheck && !customCheck(value, final)) {
        onError?.(value, { text: '' });
        return false
      }
      // 必填校验
      if (!value && required) {
        onError?.('required', { text: '' })
        return false
      }
      // 输入结束校验
      const _finalPattern = finalPattern && (!Array.isArray(finalPattern) ? [{ reg: finalPattern }] : finalPattern);
      if (value && _finalPattern) {
        for (let i = 0; i < _finalPattern.length; i++) {
          if (!_finalPattern[i].reg.test(value)) {
            onError?.(value, _finalPattern[i]);
            return false
          }
        }
      }
    }
    onSuccess?.(value)
    return true;
  }

  const _clsPrefix = `${clsPrefix}-input-number`;
  const _inputStyle: React.CSSProperties = { textAlign: align, ...inputStyle };
  const cls = classnames(
    _clsPrefix,
    className,
    disabled ? `${_clsPrefix}-wrapper-disabled` : undefined,
    readOnly ? `${_clsPrefix}-wrapper-readonly` : undefined,
    align ? `${_clsPrefix}-align-${align}` : undefined
  );
  const clsSuffix = classnames(
    `${_clsPrefix}-addonafter`,
    disabled ? `${_clsPrefix}-addonafter-disabled` : null,
    readOnly ? `${_clsPrefix}-addonafter-readonly` : null
  );
  const clsOfPrefix = classnames(
    `${_clsPrefix}-addonbefore`,
    disabled ? `${_clsPrefix}-addonbefore-disabled` : null,
    readOnly ? `${_clsPrefix}-addonbefore-readonly` : null
  );
  const clsTips = classnames(
    `${_clsPrefix}-tips`,
    disabled ? `${_clsPrefix}-tips-disabled` : null,
    readOnly ? `${_clsPrefix}-tips-readonly` : null
  );
  // 控制清除按钮的显隐
  let isShowClose;
  if (!showClose || !inputValue || readOnly || disabled) {
    isShowClose = false
  } else if (onlyShowClearWhenFocus) {
    isShowClose = focused
  } else {
    isShowClose = true
  }
  const unitTemp = unit === handleUnit(shadowValue) ? unit : handleUnit(shadowValue)
  return (
    <div className={cls} style={style} fieldid={fieldid ? fieldid + '_input_number' : undefined} {...restProps}>
      <div className={`${_clsPrefix}-wrap-no-tips`} fieldid={fieldid ? fieldid + '_input_number_wrap_no_tips' : undefined}>
        <div className={`${_clsPrefix}-content`} fieldid={fieldid ? fieldid + '_input_number_content' : undefined}>
          {
            addonBefore ? (
              <div
                className={clsOfPrefix}
                fieldid={fieldid ? fieldid + '_input_number_addonbefore' : undefined}
              >
                {addonBefore}
              </div>
            ) : null
          }
          <div className={`${_clsPrefix}-inner`} >
            <input
              name={name}
              id={id}
              maxLength={maxLength}
              ref={inputRef}
              onMouseUp={handleMouseUp}
              inputMode="text"
              style={_inputStyle}
              disabled={disabled}
              readOnly={readOnly}
              placeholder={placeholder}
              value={inputValue}
              className={`${_clsPrefix}-box`}
              onInput={handleInputChange}
              onBlur={handleBlur}
              onFocus={handleFocus}
              fieldid={fieldid ? fieldid + '_input_number_box' : undefined}
            />
            {
              showUnit && unit ? (
                <span className={`${_clsPrefix}-showunit`} fieldid={fieldid ? fieldid + '_input_number_unit' : undefined}>{unitTemp}</span>
              ) : null
            }
          </div>
          {
            <div
              className={`${_clsPrefix}-clear-box`}
              onClick={_onClickClear}
              style={{ display: isShowClose ? 'flex' : 'none' }}
              fieldid={fieldid ? fieldid + '_input_number_clear' : undefined}
              onMouseDown={e => {
                e.preventDefault()
              }}
              onTouchStart={e => {
                e.preventDefault()
              }}
            >
              <CloseCircleFill
                color='#B8B8B8'
                style={{ width: '0.36rem', height: '0.36rem' }}
                className={`${_clsPrefix}-clear`}
                fieldid={fieldid ? fieldid + '_input_number_clear_icon' : undefined}
              />
            </div>
          }
          {
            addonAfter ? (
              <div
                className={clsSuffix}
                fieldid={fieldid ? fieldid + '_input_number_addonafter' : undefined}
              >
                {addonAfter}
              </div>
            ) : null
          }
        </div>
        {
          showUnit && unit ? (
            <div className={`${_clsPrefix}-showunit-blank`}></div>
          ) : null
        }
      </div>
      {
        tips ? (
          <div
            className={clsTips}
            fieldid={fieldid ? fieldid + '_input_number_tips' : undefined}
          >
            {tips}
          </div>
        ) : null
      }
    </div>
  )
}

export default WebUI({ defaultProps })(InputNumber)
