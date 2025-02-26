import { useIsomorphicLayoutEffect } from 'tne-fw-fe/hooks'
import React, { useImperativeHandle, useRef, useState, useEffect } from 'react'
import { withNativeProps } from '@utils/NativeProps'
import { usePropsValue } from '@hooks/UsePropsValue'
import { devError } from '@utils/DevLog'
import { TextAreaProps, TextAreaRef } from './iTextArea'
import CloseCircleFill from '@tinper/m-icons/lib/cjs/CloseCircleFill'
import WebUI from '@utils/UpdatePrefixs'
import classNames from 'classnames'

const defaultProps = {
  showCount: false as NonNullable<TextAreaProps['showCount']>,
  autoSize: false as NonNullable<TextAreaProps['autoSize']>,
  defaultValue: '',
}

const TextArea = React.forwardRef<TextAreaRef, TextAreaProps>(
  (props: TextAreaProps, ref) => {
    const { autoSize = false, showCount = false, maxLength, fieldid, clsPrefix, isHTML, showClose } = props
    const _clsPrefix = clsPrefix + '-text-area';
    const [_focus, setFocus] = useState(false)

    const initialValue = props.value != null ? props.value : props.defaultValue != null ? props.defaultValue : '';
    const [value, setValue] = useState(initialValue);

    if (props.value === null) {
      devError(
        'TextArea',
        '`value` prop on `TextArea` should not be `null`. Consider using an empty string to clear the component.'
      )
    }
    const nativeTextAreaRef = useRef<HTMLTextAreaElement>(null)
    const heightRef = useRef<string>('auto')
    const hiddenTextAreaRef = useRef<HTMLTextAreaElement>(null)

    useEffect(() => {
      let initialValue = props.value != null ? props.value : props.defaultValue != null ? props.defaultValue : '';
      if (maxLength) {
        initialValue = Array.from(initialValue).slice(0, maxLength).join('')
      }
      setValue(initialValue)
    }, [props.value]);

    useImperativeHandle(ref, () => ({
      clear: () => {
        setValue('')
      },
      focus: () => {
        nativeTextAreaRef.current?.focus()
      },
      blur: () => {
        nativeTextAreaRef.current?.blur()
      },
      get nativeElement() {
        return nativeTextAreaRef.current
      },
    }))

    const heightCalculation = () => {
      if (!autoSize) return
      const textArea = nativeTextAreaRef.current
      const hiddenTextArea = hiddenTextAreaRef.current
      if (!textArea) return
      const updateHeight = () => {
        textArea.style.height = heightRef.current
        if (!hiddenTextArea) return
        let height = hiddenTextArea.scrollHeight
        if (typeof autoSize === 'object') {
          const computedStyle = window.getComputedStyle(textArea)
          const lineHeight = parseFloat(computedStyle.lineHeight)
          if (autoSize.minRows) {
            height = Math.max(height, autoSize.minRows * lineHeight)
          }
          if (autoSize.maxRows) {
            height = Math.min(height, autoSize.maxRows * lineHeight)
          }
        }
        heightRef.current = `${height}px`
        textArea.style.height = `${height}px`
      }
      // 延迟执行获取高度，防止高度不正确
      const timerId = setTimeout(updateHeight, 50);

      return () => {
        clearTimeout(timerId);
      };
    }

    useEffect(heightCalculation, [])

    const compositingRef = useRef(false)

    let count
    const valueLength = Array.from(value).length;
    if (typeof showCount === 'function') {
      count = showCount(valueLength, maxLength)
    } else if (showCount) {
      count = (
        <div className={`${_clsPrefix}-count`}>
          {maxLength === undefined
            ? valueLength
            : valueLength + '/' + maxLength}
        </div>
      )
    }
    const getHTMLElement = () => {
      const { value } = props;
      try {
        const createElement = <div dangerouslySetInnerHTML={{ __html: value || '' }} />;
        const newElement = React.cloneElement(createElement, { className: 'html-content' });
        return newElement;
      } catch (e) {
        console.log(e);
        return null
      }
    };

    const _onClickClear = () => {
      const { onChange, onClickClear } = props;
      onClickClear?.(value)
      onChange?.('');
      setValue('')
    }

    const _onFocus = (e: any) => {
      const value = e?.target?.value || '';
      const { onFocus } = props;
      onFocus?.(value);
      setFocus(true)
    };

    const _onBlur = (e: any) => {
      const value = e?.target?.value || '';
      const { onBlur } = props;
      onBlur?.(value);
      setTimeout(() => {
        setFocus(false)
      }, 200);
    };

    let rows = props.rows || 3;
    if (typeof autoSize === 'object') {
      // rows表示固定显示几行，不能小于这个行数，且超出行数滚动显示
      // autosize表示最小最大显示行数，在这个中间自适应
      // 这两个属性不应该一起使用，所以当用户传入autosize时，rows传值应该被忽略，且此时的rows取最小行数
      // 若用户直接传入maxRows，没有传minRows，这个使用是不合理的，但是为了兼容这个问题，判断默认rows（3）和最大行数大小，取小一点的行数作为初始行数
      // 此处仅为了控制高度
      if (autoSize.minRows) {
        rows = autoSize.minRows
      } else if (autoSize.maxRows && rows > autoSize.maxRows) {
        rows = autoSize.maxRows
      }
    }

    heightCalculation()

    return isHTML ? (
      getHTMLElement()
    ) : (withNativeProps(
      props,
      <div className={`${_clsPrefix}-layout`}>
        <div className={classNames(_clsPrefix, showClose && _focus && `${_clsPrefix}-showClose`)} fieldid={fieldid ? `${fieldid}_textarea` : undefined}>
          <textarea
            fieldid={fieldid ? `${fieldid}_textarea_element` : undefined}
            ref={nativeTextAreaRef}
            className={`${_clsPrefix}-element`}
            rows={props.rows || 3}
            value={value}
            placeholder={props.placeholder}
            onChange={e => {
              let v = e.target.value
              if (maxLength && !compositingRef.current) {
                v = v.substring(0, maxLength)
              }
              props.onChange?.(e ? e.target.value : '')
              setValue(v)
            }}
            id={props.id}
            onCompositionStart={e => {
              compositingRef.current = true
              props.onCompositionStart?.(e)
            }}
            onCompositionEnd={e => {
              compositingRef.current = false
              if (maxLength) {
                const slicedValue = Array.from(value).slice(0, maxLength).join('')
                setValue(slicedValue)
              }
              props.onCompositionEnd?.(e)
            }}
            autoComplete={props.autoComplete}
            disabled={props.disabled}
            readOnly={props.readOnly}
            onFocus={_onFocus}
            onBlur={_onBlur}
            name={props.name}
            onClick={props.onClick}
            autoFocus={props.autoFocus}
          />
          {showClose && (
            <div
              className={`${_clsPrefix}-clear-box`}
              onClick={_onClickClear}
              fieldid={fieldid ? fieldid + '_textarea_clear' : undefined}
              style={{ display: _focus ? 'flex' : 'none' }}
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
                fieldid={fieldid ? fieldid + '_textarea_clear_icon' : undefined}
              />
            </div>
          )}

          {autoSize && (
            <textarea
              ref={hiddenTextAreaRef}
              className={`${_clsPrefix}-element ${_clsPrefix}-element-hidden`}
              value={value}
              rows={rows}
              aria-hidden
              readOnly
            />
          )}
        </div>
        {count}

      </div>
    ))
  }
)

export default WebUI({ defaultProps })(TextArea)
