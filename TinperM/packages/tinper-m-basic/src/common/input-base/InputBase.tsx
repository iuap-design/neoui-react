import React, { Component, ReactNode } from 'react';
import classnames from 'classnames';
import { Icon } from '@tinper/m'
import WebUI from '@utils/UpdatePrefixs'
import './InputBase.less'

interface InputBaseProps {
  mode?: 'text' | 'number' | 'tel' | 'password'
  inputmode?: 'text' | 'decimal'
  check?: boolean
  showClose?: boolean
  pattern?: RegExp // 输入过程中的校验规则
  finalPattern?: RegExp | Array<{ reg: RegExp, text: string }> // 输入结束的校验规则
  value?: string
  defaultValue?: string
  textAlign?: 'left' | 'right' | 'center'
  placeholder?: string
  required?: boolean
  disabled?: boolean
  readOnly?: boolean
  customCheck?: (value: string, final?: boolean) => boolean
  onFocus?: (value: string) => void
  onBlur?: (value: string) => void
  onChange?: (value: string) => void
  onError?: (value: string, pattern: { reg?: RegExp, text?: string }) => void
  onSuccess?: (value: string) => void
  onClickClear?: (value: string) => void
  inputStyle?: React.CSSProperties
  className?: string
  style?: React.CSSProperties
  inputIdentity?: boolean
  fieldid?: string
  maxLength?: number
  prefix?: ReactNode
  suffix?: ReactNode,
  clsPrefix?: string,
  muiPrefix?: string
}
interface InputBaseState {
  _value: string
  _focus: boolean
}
const defaultProps = {
  mode: 'text',
  inputmode: 'text',
  check: true,
};
@WebUI({ name: 'input', defaultProps })
export default class InputBase extends Component<
InputBaseProps,
InputBaseState
> {

  state = {
    _value: this.props.value || this.props.defaultValue,
    _focus: false,
  };

  shouldComponentUpdate (nextProps) {
    if (this.props.value !== nextProps.value) {
      this.checkValue(nextProps.value, !this.state._focus);
      this.setState({ _value: nextProps.value || '', });
    }
    return true;
  }

  checkValue = (value: string, final?: boolean) => {
    const {
      pattern,
      finalPattern,
      required,
      customCheck,
      onError,
      onSuccess,
      check,
      readOnly,
      disabled,
    } = this.props;
    if (!check || readOnly || disabled) return true;
    // 用户自定义检查
    if (customCheck && !customCheck(value, final)) {
      console.log('customCheck error', value);
      onError?.(value, { text: '' });
      return false;
    }
    // 输入过程校验
    if (!final && pattern && !pattern.test(value)) {
      console.log('pattern error');
      onError?.(value, { text: '' });
      return false;
    }
    if (final) {
      // 必填校验
      if (!value && required) {
        onError?.(value, { text: '' });
        console.log('require error');
        return false;
      }
      // 输入结束校验
      const _finalPattern =
        finalPattern && !Array.isArray(finalPattern)
          ? [{ reg: finalPattern }]
          : finalPattern;
      if (value && _finalPattern) {
        for (let i = 0; i < _finalPattern.length; i++) {
          if (!_finalPattern[i].reg.test(value)) {
            onError?.(value, _finalPattern[i]);
            console.log('final pattern error');
            return false;
          }
        }
      }
    }
    onSuccess?.(value);
    return true;
  };

  _onChange = (event) => {
    const val = event ? event.target.value : '';
    const { onChange } = this.props;
    onChange?.(val);
    // if (this.props.value === undefined) {
    this.checkValue(val);
    this.setState({ _value: val, });
    // }
  };

  _onBlur = () => {
    const { _value } = this.state;
    const { onBlur } = this.props;
    onBlur?.(_value);
    this.checkValue(_value, true);
    setTimeout(() => {
      this.setState({ _focus: false, });
    }, 200);
  };

  _onFocus = () => {
    const { _value } = this.state;
    const { onFocus } = this.props;
    onFocus?.(_value);
    this.checkValue(_value, true);
    this.setState({ _focus: true, });
  };

  _onClickClear = () => {
    const { _value } = this.state;
    const { value, onChange, onClickClear } = this.props;
    onClickClear?.(_value);
    onChange?.('');
    if (value === undefined) {
      this.checkValue('', true);
      this.setState({ _value: '', });
    }
  };

  render () {
    const {
      textAlign,
      inputStyle,
      className,
      style,
      mode,
      inputmode,
      placeholder,
      disabled,
      readOnly,
      value,
      inputIdentity,
      fieldid = '',
      maxLength,
      prefix,
      suffix,
      showClose,
      clsPrefix,
      muiPrefix
    } = this.props;
    const { _value, _focus } = this.state;
    const _inputStyle: React.CSSProperties = { textAlign, ...inputStyle };
    const _clsPrefix = `${clsPrefix}-input-base`
    const cls = classnames(
      className,
      _clsPrefix,
      disabled ? `${_clsPrefix}-disabled` : undefined,
      readOnly ? `${_clsPrefix}-readonly` : undefined
    );

    return (
      <div className={cls} style={style} fieldid={fieldid ? fieldid + '_inputbase' : undefined}>
        {prefix && (
          <span
            fieldid={fieldid ? fieldid + '_inputbase_prefix' : undefined}
            className={`${_clsPrefix}-simple-prefix`}
          >
            {prefix}
          </span>
        )}
        <input
          className={`${_clsPrefix}-box`}
          style={_inputStyle}
          type={mode}
          inputMode={inputmode}
          value={inputIdentity ? value : _value}
          onChange={this._onChange}
          onBlur={this._onBlur}
          onFocus={!readOnly && this._onFocus}
          placeholder={!(readOnly || disabled) && placeholder}
          readOnly={readOnly}
          disabled={disabled}
          spellCheck={false}
          fieldid={fieldid ? fieldid + '_inputbase_box' : undefined}
          maxLength={maxLength}
        />
        {
          showClose &&
          <Icon
            color='#B8B8B8'
            style={{ display: _focus && _value ? 'block' : 'none', width: '0.36rem', height: '0.36rem', marginLeft: '0.08rem' }}
            fieldid={fieldid ? fieldid + '_inputbase_clear' : undefined}
            className={`${muiPrefix}-clear`}
            type='arcclose-circle-Fill'
            onClick={this._onClickClear}
          />
        }
        {suffix && (
          <span
            className={`${_clsPrefix}-simple-suffix`}
            fieldid={fieldid ? fieldid + '_inputbase_suffix' : undefined}
          >
            {suffix}
          </span>
        )}
      </div>
    );
  }
}
