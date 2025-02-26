import React, { useState, useRef, memo } from 'react'
import Modal from '../../modal/src/index'
import classNames from 'classnames'
import Close from '@tinper/m-icons/lib/cjs/Close'
import VolumeUp from '@tinper/m-icons/lib/cjs/VolumeUp'
import CheckmarkCircle from '@tinper/m-icons/lib/cjs/CheckmarkCircle'
import AlertCircle from '@tinper/m-icons/lib/cjs/AlertCircle'
import CloseCircle from '@tinper/m-icons/lib/cjs/CloseCircle'
import InforCircle from '@tinper/m-icons/lib/cjs/InforCircle'
import { mergeProps } from '@utils/WithDefaultProps'
import { withNativeProps } from '@utils/NativeProps'
import { useResizeEffect, useMutationEffect, useTimeout } from 'tne-fw-fe/hooks'
import { NoticeProps } from './iNotice'
import WebUI from '@utils/UpdatePrefixs'
import { useConfig } from '@components/config-provider/src/index'

const defaultProps = {
  mode: 'default',
  noticeModalShow: false,
  color: 'default',
  delay: 2000,
  speed: 50,
  wrap: false
}

const Notice: React.FC<NoticeProps> = memo((p: any) => {
  const { locale } = useConfig()
  const props = mergeProps(defaultProps, p)
  const { onClick, onClose, extra, delay, color, wrap, icon, speed, closeable, className, content, children, title, noticeModalShow, mode, fieldid = '', clsPrefix, style } = props

  const _clsPrefix = `${clsPrefix}-notice`

  const containerRef = useRef<HTMLSpanElement>(null)
  const textRef = useRef<HTMLSpanElement>(null)

  const [visible, setVisible] = useState(true)

  const delayLockRef = useRef(true)
  const animatingRef = useRef(false)

  function start() {
    if (delayLockRef.current || wrap) return

    const container = containerRef.current
    const text = textRef.current
    if (!container || !text) return

    if (container.offsetWidth >= text.offsetWidth) {
      animatingRef.current = false
      text.style.removeProperty('transition-duration')
      text.style.removeProperty('transform')
      return
    }

    if (animatingRef.current) return

    const initial = !text.style.transform
    text.style.transitionDuration = '0s'
    if (initial) {
      text.style.transform = 'translateX(0)'
    } else {
      text.style.transform = `translateX(${container.offsetWidth}px)`
    }
    const distance = initial
      ? text.offsetWidth
      : container.offsetWidth + text.offsetWidth
    animatingRef.current = true
    text.style.transitionDuration = `${Math.round(distance / speed)}s`
    text.style.transform = `translateX(-${text.offsetWidth}px)`
  }

  useTimeout(() => {
    delayLockRef.current = false
    start()
  }, delay)

  useResizeEffect(() => {
    start()
  }, containerRef)

  useMutationEffect(
    () => {
      start()
    },
    textRef,
    {
      subtree: true,
      childList: true,
      characterData: true,
    }
  )

  if (!visible) return null
  const classNameProps = classNames(className, `${_clsPrefix}-${mode}-container`)
  let _icon = icon
  if (!icon && icon != 'none') {
    switch (color) {
    case 'success':
      _icon = <CheckmarkCircle className={`${_clsPrefix}-left-icon`}/>
      break;
    case 'alert':
      _icon = <AlertCircle className={`${_clsPrefix}-left-icon`}/>
      break;
    case 'error':
      _icon = <CloseCircle className={`${_clsPrefix}-left-icon`}/>
      break;
    case 'info':
      _icon = <InforCircle className={`${_clsPrefix}-left-icon`}/>
      break;
    default:
      _icon = <VolumeUp className={`${_clsPrefix}-left-icon`}/>
      break;
    }
  }

  if (mode && mode === 'modal') {
    return (
      <Modal
        fieldid={`${fieldid}_noticeModal`}
        visible={noticeModalShow}
        closeOnMaskClick={false}
        title={title || 'Title'}
        className={classNameProps}
        actions={[{ key: 'ok', text: locale.Common.confirm, primary: true, onClick: () => { props.onClose() } }]}
        content={content || children}
      />
    )
  }

  return withNativeProps(
    props,
    <div
      className={classNames(className, _clsPrefix, `${_clsPrefix}-${color}`, { [`${_clsPrefix}-wrap`]: wrap, })}
      onClick={onClick}
      fieldid={fieldid}
    >
      {_icon && _icon != 'none' && (
        <span className={`${_clsPrefix}-left`} fieldid={`${fieldid}_notice${color}`}>{_icon}</span>
      )}
      <span ref={containerRef} className={`${_clsPrefix}-content`} fieldid={`${fieldid}_content`}>
        <span
          onTransitionEnd={() => {
            animatingRef.current = false
            start()
          }}
          ref={textRef}
          className={`${_clsPrefix}-content-inner`}
        >
          {content || children}
        </span>
      </span>
      {(closeable || extra) && (
        <span className={`${_clsPrefix}-right`} fieldid={`${fieldid}_notice${color}_close`}>
          {extra}
          {closeable && (
            <div
              className={`${_clsPrefix}-close`}
              onClick={() => {
                setVisible(false)
                onClose?.()
              }}
            >
              <Close className={`${_clsPrefix}-close-icon`} />
            </div>
          )}
        </span>
      )}
    </div>
  )
})

export default WebUI({ defaultProps })(Notice)
