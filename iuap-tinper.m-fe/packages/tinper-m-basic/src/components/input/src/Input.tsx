import React, { useEffect, useState, useRef, useImperativeHandle } from 'react';
import classnames from 'classnames';
import WebUI from '@utils/UpdatePrefixs'
import { InputProps, InputRef } from './iInput'
import CloseCircleFill from '@tinper/m-icons/lib/cjs/CloseCircleFill'
import Eye from '@tinper/m-icons/lib/cjs/Eye'
import EyeOff from '@tinper/m-icons/lib/cjs/EyeOff'
const defaultProps = { onlyShowClearWhenFocus: true }

const Input = React.forwardRef<InputRef, InputProps>((props, ref) => {
  const nativeInputRef = useRef<HTMLInputElement>(null)
  const initialValue = props.value != null ? props.value : props.defaultValue != null ? props.defaultValue : '';
  const [_value, setValue] = useState(initialValue);
  const [_focus, setFocus] = useState(false);
  const [_placeholder, setPlaceholder] = useState(props.placeholder);
  const [_password, setPassword] = useState(0)

  // 使用useImperativeHandle hook让父组件可以通过ref调用这些方法
  useImperativeHandle(ref, () => ({
    clear: () => {
      setValue('')
    },
    focus: () => {
      nativeInputRef.current?.focus()
    },
    blur: () => {
      nativeInputRef.current?.blur()
    },
    get nativeElement() {
      return nativeInputRef.current
    },
  }))

  useEffect(() => {
    checkValue(props.value || props.defaultValue || '', true);
  }, []);

  useEffect(() => {
    const initialValue = props.value != null ? props.value : props.defaultValue != null ? props.defaultValue : '';
    setValue(initialValue)
  }, [props.value]);

  useEffect(() => {
    if ('placeholder' in props) {
      setPlaceholder(props.placeholder)
    }
  }, [props.placeholder])

  useEffect(() => {
    if (props.finalPattern) checkValue(finalValue === undefined ? '' : finalValue, true);
  }, [props.finalPattern]);

  useEffect(() => {
    if (props.pattern === null) checkValue(finalValue === undefined ? '' : finalValue, true);
  }, [props.pattern]);

  useEffect(() => {
    if (props.customCheck) checkValue(finalValue === undefined ? '' : finalValue, true);
  }, [props.customCheck]);

  const _onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { onChange, placeholder, updatePlaceholder } = props;
    const val = e ? e.target.value : '';
    onChange?.(val);
    if (onChange?.(val) !== false) {
      setValue(val);
    }
    checkValue(val);
    if (placeholder && updatePlaceholder) {
      setPlaceholder(_value)
    }
  }

  const _onFocus = () => {
    const { onFocus } = props;
    onFocus?.(_value);
    checkValue(_value, true);
    setFocus(true)
  }

  // 最大最小值的校验
  const _checkNumber = () => {
    const { min, max, mode } = props;
    if (mode === 'number' && _value != null) {
      let temp = parseFloat(_value)
      if (min) temp = Math.max(temp, min)
      if (max) temp = Math.min(temp, max)
      if (temp || temp === 0) setValue(temp.toString())
    }
  }

  const _onBlur = () => {
    const { onBlur } = props;
    _checkNumber();
    onBlur?.(_value);
    checkValue(_value, true);
    setTimeout(() => {
      setFocus(false)
    }, 200)
  }

  const _onClickClear = () => {
    const { value, onChange, onClickClear, placeholder, updatePlaceholder } = props;
    onClickClear?.(_value)
    onChange?.('');
    checkValue('', true)
    setValue('')

    if (placeholder && updatePlaceholder) {
      setPlaceholder(_value)
    }
  }

  // value值校验
  const checkValue = (value: string, final?: boolean) => {
    const { check, readOnly, disabled, required, pattern, finalPattern, onError, onSuccess, customCheck, mode } = props;
    if (!check || readOnly || disabled) return true;
    let patternTemp = null;
    let finalPatternTemp = null;
    if (mode) {
      switch (mode) {
      case 'idCard':
        patternTemp = /^[0-9xX]*$/,
        finalPatternTemp = [
          {
            reg: /^[1-9]\d{5}(?:18|19|20)\d{2}(?:(?:0[1-9])|(?:1[0-2]))(?:(?:[0-2][1-9])|10|20|30|31)\d{3}[0-9Xx]$/,
            text: ''
          },
        ]
        break
      case 'ipAddress':
        patternTemp = /^[0-9.]*$/,
        finalPatternTemp = [
          {
            reg: /^(?:25[0-5]|2[0-4]\d|1\d\d|[1-9]\d|\d)(?:\.(?:25[0-5]|2[0-4]\d|1\d\d|[1-9]\d|\d)){3}$/,
            text: ''
          },
        ]
        break
      case 'bankCard16':
        patternTemp = /^[0-9]*$/,
        finalPatternTemp = [
          {
            reg: /^\d{16}$/,
            text: ''
          },
        ]
        break
      case 'bankCard19':
        patternTemp = /^[0-9]*$/,
        finalPatternTemp = [
          {
            reg: /^\d{19}$/,
            text: ''
          },
        ]
        break
      case 'password':
        break
      default:
        break
      }
      // 输入过程的校验
      if (!final && patternTemp && !patternTemp.test(value)) {
        // console.log("mode error", patternTemp);
        onError?.(value, { reg: patternTemp, text: '' });
        return false;
      }
      // 输入结果的校验
      if (final && finalPatternTemp && value) {
        for (let i = 0; i < finalPatternTemp.length; i++) {
          if (!finalPatternTemp[i].reg.test(value)) {
            onError?.(value, finalPatternTemp[i]);
            // console.log('modeFinal error', finalPatternTemp[i]);
            return false
          }
        }
      }
    }
    // 用户自定义检查
    if (customCheck && !customCheck(value, final) && !final) {
      // console.log("customCheck error", value);
      onError?.(value, { text: '' });
      return false
    }
    // 输入过程的校验
    if (!final && pattern && !pattern.test(value)) {
      // console.log("pattern error");
      onError?.(value, { reg: pattern, text: '' });
      return false;
    }
    if (final) {
      // 用户自定义检查
      if (customCheck && !customCheck(value, final)) {
        // console.log("customCheck error", value);
        onError?.(value, { text: '' });
        return false
      }
      // 必填校验
      if (!value && required) {
        // console.log("required error");
        onError?.('required', { text: '' })
        return false
      }
      // 输入结束校验
      const _finalPattern = finalPattern && (!Array.isArray(finalPattern) ? [{ reg: finalPattern }] : finalPattern);
      if (value && _finalPattern) {
        for (let i = 0; i < _finalPattern.length; i++) {
          if (!_finalPattern[i].reg.test(value)) {
            onError?.(value, _finalPattern[i]);
            // console.log('finalPattern error');
            return false
          }
        }
      }
    }
    onSuccess?.(value)
    return true;
  }

  const _onKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (props.onEnterPress && (e.code === 'Enter' || e.keyCode === 13)) {
      props.onEnterPress(e)
    }
    props.onKeyDown?.(e)
  }

  const {
    textAlign,
    inputStyle,
    className,
    clsPrefix,
    style,
    fieldid,
    disabled,
    readOnly,
    maxLength,
    showClose,
    inputmode,
    id,
    onlyShowClearWhenFocus,
    prefix,
    suffix,
    onSuffixClick,
    name,
    mode,
    tips
  } = props;
  const _clsPrefix = `${clsPrefix}-input`
  const _inputStyle: React.CSSProperties = { textAlign, ...inputStyle };
  const cls = classnames(
    className,
    _clsPrefix,
    disabled ? `${_clsPrefix}-wrapper-disabled` : undefined,
    readOnly ? `${_clsPrefix}-wrapper-readonly` : undefined,
    textAlign ? `${_clsPrefix}-align-${textAlign}` : undefined
  );
  const clsPassword = classnames(
    `${_clsPrefix}-password`,
    disabled ? `${_clsPrefix}-password-disabled` : null,
    readOnly ? `${_clsPrefix}-password-readonly` : null
  );
  const clsSuffix = classnames(
    `${_clsPrefix}-suffix`,
    disabled ? `${_clsPrefix}-suffix-disabled` : null,
    readOnly ? `${_clsPrefix}-suffix-readonly` : null
  );
  const clsOfPrefix = classnames(
    `${_clsPrefix}-prefix`,
    disabled ? `${_clsPrefix}-prefix-disabled` : null,
    readOnly ? `${_clsPrefix}-prefix-readonly` : null
  );
  const clsTips = classnames(
    `${_clsPrefix}-tips`,
    disabled ? `${_clsPrefix}-tips-disabled` : null,
    readOnly ? `${_clsPrefix}-tips-readonly` : null
  );

  // 密码框时控制显隐图标状态
  if (mode === 'password' && _password === 0) {
    setPassword(2)
  }

  let typeMode = 'text'
  if (mode === 'password' || mode === 'text' || mode === 'number' || mode === 'tel' || mode === 'email' || mode === 'search') {
    typeMode = mode
  } else if (mode === 'bankCard16' || mode === 'bankCard19') {
    typeMode = 'number'
  } else {
    typeMode = 'text'
  }

  // 控制清除按钮的显隐
  let isShowClose;
  if (!showClose || _value == null || _value === '' || readOnly || disabled) {
    isShowClose = false
  } else if (onlyShowClearWhenFocus) {
    isShowClose = _focus
  } else {
    isShowClose = true
  }

  // 完全受控状态，内部不对显示值做任何处理 identifyValue(暂时文档没有公示，还需要再做修改)
  let finalValue = props.identifyValue ? (props.value === undefined ? props.defaultValue : props.value) : (_value == null ? '' : _value)

  return (
    <div className={cls} style={style} fieldid={fieldid ? fieldid + '_input' : undefined}>
      <div className={`${_clsPrefix}-wrap-no-tips`} fieldid={fieldid ? fieldid + '_input_wrap_no_tips' : undefined}>
        <div className={`${_clsPrefix}-content`} fieldid={fieldid ? fieldid + '_input_content' : undefined}>
          {
            prefix ? (
              <div
                className={clsOfPrefix}
                fieldid={fieldid ? fieldid + '_input_prefix' : undefined}
              >
                {prefix}
              </div>
            ) : null
          }
          <input
            // {...props}
            autoFocus={props.autoFocus}
            ref={nativeInputRef}
            id={id}
            type={_password === 1 ? 'text' : typeMode}
            className={`${_clsPrefix}-box`}
            style={_inputStyle}
            value={finalValue}
            placeholder={_placeholder}
            disabled={disabled}
            readOnly={readOnly}
            maxLength={maxLength}
            onChange={_onChange}
            onFocus={_onFocus}
            onBlur={_onBlur}
            inputMode={inputmode}
            onKeyDown={_onKeyDown}
            name={name}
            fieldid={fieldid ? fieldid : undefined}
          />
          {
            <div
              className={`${_clsPrefix}-clear-box`}
              onClick={_onClickClear}
              fieldid={fieldid ? fieldid + '_input_clear' : undefined}
              style={{ display: isShowClose ? 'flex' : 'none' }}
              onMouseDown={e => {
                e.preventDefault()
              }}
              onTouchStart={e => {
                e.preventDefault()
              }}
            >
              <CloseCircleFill
                style={{ width: '0.36rem', height: '0.36rem' }}
                className={`${_clsPrefix}-clear`}
                fieldid={fieldid ? fieldid + '_input_clear_icon' : undefined}
              />
            </div>
          }
          {
            mode === 'password' && _password !== 0 ? (
              <div className={clsPassword} fieldid={fieldid ? fieldid + '_input_password' : undefined}>
                {
                  _password === 1 ? (
                    <Eye
                      style={{ width: '0.48rem', height: '0.48rem' }}
                      className={`${_clsPrefix}-password-icon`}
                      onClick={(disabled || readOnly) ? null : () => setPassword(2)}
                      fieldid={fieldid ? fieldid + '_input_password_eye' : undefined}
                    />
                  ) : (
                    <EyeOff
                      style={{ width: '0.48rem', height: '0.48rem' }}
                      className={`${_clsPrefix}-password-icon`}
                      onClick={(disabled || readOnly) ? null : () => setPassword(1)}
                      fieldid={fieldid ? fieldid + '_input_password_eyeoff' : undefined}
                    />
                  )
                }
              </div>
            ) : null
          }
          {
            suffix ? (
              <div
                className={clsSuffix}
                onClick={onSuffixClick}
                fieldid={fieldid ? fieldid + '_input_suffix' : undefined}
              >
                {suffix}
              </div>
            ) : null
          }
        </div>
      </div>
      {
        tips ? (
          <div
            className={clsTips}
            fieldid={fieldid ? fieldid + '_input_tips' : undefined}
          >
            {tips}
          </div>
        ) : null
      }
    </div>
  );
})

export default WebUI({ defaultProps })(Input)
