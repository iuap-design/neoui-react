import React, { useState, useRef, forwardRef, useImperativeHandle } from 'react';
import classnames from 'classnames';
import WebUI from '@utils/UpdatePrefixs'
import SearchIcon from '@tinper/m-icons/lib/cjs/Search';
import IconScanning from '@tinper/m-icons/lib/cjs/IconScanning'
import { SearchProps } from './iSearchBar'
import Input, { InputRef } from '../../input/src'
import Button from '../../button/src'
import { useConfig } from '@components/config-provider/src/index';


const defaultProps = {
  showCancelButton: false,
  isRightIn: true,
  clearOnCancel: true,
  clearable: true,
}

const Search: React.FC<SearchProps> = forwardRef((props, ref) => {
  const { locale } = useConfig()
  const {
    fieldid,
    style,
    showCancelButton,
    placeholder = locale.Search.placeholder,
    cancelText = locale.Common.cancel,
    clearOnCancel,
    clearable,
    onlyShowClearWhenFocus,
    leftIcon,
    onLeftIconClick,
    rightIcon,
    onRightIconClick,
    isRightIn,
    autoFocus,
    clsPrefix,
    className,
    value,
    defaultValue,
    disabled,
    onBlur,
    onCancel,
    onChange,
    onFocus,
    onSubmit,
    onSearch,
    maxLength,
    onClear
  } = props

  const [ focused, setFocus ] = useState(false)

  const inputRef = useRef<InputRef>(null)
  const searchRef = useRef<HTMLDivElement>(null)

  useImperativeHandle(ref, () => ({
    clear: () => inputRef.current?.clear(),
    focus: () => inputRef.current?.focus(),
    blur: () => inputRef.current?.blur(),
    get nativeElement() {
      return searchRef.current
    },
    get value() {
      return inputRef.current?.nativeElement.value
    }
  }))

  const _clsPrefix = `${clsPrefix}-search`
  const searchCls = classnames(
    _clsPrefix,
    { [`${_clsPrefix}-active`]: focused },
    className
  )

  const _onFocus = (e: React.FocusEvent<HTMLInputElement>) => {
    onFocus?.(e)
    setFocus(true)
  }

  const _onBlur = () => {
    onBlur?.()
    setTimeout(() => {
      setFocus(false)
    }, 100)
  }
  const _onSubmit = () => {
    const value = inputRef.current?.nativeElement.value
    onSubmit?.(value)
    onSearch?.(value)
    setFocus(false)
  }

  const _clear = (v: string) => {
    inputRef.current?.clear?.()
    onClear?.(v)
    // setFocus(false)
  }

  const onClickCancelBtn = () => {
    if (clearOnCancel) {
      inputRef.current?.clear?.()
    }
    inputRef.current?.blur?.()
    onCancel?.()
  }

  const isShowCancelButton = () => typeof showCancelButton === 'function'
    ? (showCancelButton())
    : focused && showCancelButton

  const renderLeft = () => {
    const icon = leftIcon !== undefined ? leftIcon : <SearchIcon fieldid={fieldid + '_icon_search'} onClick={onLeftIconClick} />
    return <div className={`${_clsPrefix}-left`} >
      {icon}
    </div>
  }

  const renderRight = () => {
    const rightCls = classnames(`${_clsPrefix}-right`, { [`${_clsPrefix}-right-in`]: isRightIn })
    const icon = rightIcon !== undefined ? rightIcon : <IconScanning fieldid={fieldid + '_icon_scanning'} onClick={onRightIconClick} />
    return icon ? <div className={rightCls} >
      {icon}
    </div> : null
  }

  const inputAreaCls = classnames(`${_clsPrefix}-input-area`, { [`${_clsPrefix}-input-area-focused`]: focused })

  return <div
    className={searchCls}
    style={style}
    fieldid={fieldid}
    ref={searchRef}
  >
    <div className={inputAreaCls}>
      {renderLeft()}
      <form action='javascript: return true' className={`${_clsPrefix}-search-form`} >
        <Input
          ref={inputRef}
          autoFocus={autoFocus}
          showClose={clearable}
          onlyShowClearWhenFocus={onlyShowClearWhenFocus}
          style={{ backgroundColor: 'transparent' }}
          className={`${_clsPrefix}-input`}
          placeholder={placeholder}
          mode='search'
          value={value}
          defaultValue={defaultValue}
          fieldid={fieldid + '_input'}
          disabled={disabled}
          maxLength={maxLength}
          onChange={onChange}
          onFocus={_onFocus}
          onBlur={_onBlur}
          onClickClear={_clear}
          onEnterPress={_onSubmit}
        />
      </form>
      {isRightIn && renderRight()}
    </div>
    {!isRightIn && renderRight()}
    { isShowCancelButton() ? <Button
      className={`${_clsPrefix}-cancel-btn`}
      mode='text'
      fieldid={fieldid + '_cancel_btn'}
      onClick={onClickCancelBtn}
      onMouseDown={(e: any) => {
        e.preventDefault()
      }}>{cancelText}</Button> : null }
  </div>
})

export default WebUI({ defaultProps })(Search)
