import React, { ReactNode, useMemo } from 'react'
import classNames from 'classnames'
import CheckmarkCircle from '@tinper/m-icons/lib/cjs/CheckmarkCircle'
import CloseCircle from '@tinper/m-icons/lib/cjs/CloseCircle'
import AlertCircle from '@tinper/m-icons/lib/cjs/AlertCircle'
import Mask from '../../mask/src/index'
import { mergeProps } from '@utils/WithDefaultProps'
import { ToastProps } from './iToast'
import AutoCenter from '@common/auto-center'
import SpinLoading from '@common/spin-loading/src'
import WebUI from '@utils/UpdatePrefixs'

const defaultProps = {
  maskClickable: true,
  stopPropagation: ['click'],
}

const InternalToast: React.FC<ToastProps> = p => {
  const props = mergeProps(defaultProps, p)
  const { className, visible, getContainer, afterClose, maskStyle, maskClassName, stopPropagation, maskClickable, content, icon, position, fieldid = '', clsPrefix } = props
  const _clsPrefix = `${clsPrefix}-toast`

  const iconElement = useMemo(() => {
    if (icon === null || icon === undefined) return null
    switch (icon) {
    case 'success':
      return <CheckmarkCircle style={{ width: '0.8rem', height: '0.8rem' }}/>
    case 'fail':
      return <CloseCircle style={{ width: '0.8rem', height: '0.8rem' }}/>
    case 'alert':
      return <AlertCircle style={{ width: '0.8rem', height: '0.8rem' }}/>
    case 'loading':
      return (
        <SpinLoading style={{ '--size': '0.8rem' }} className={`${_clsPrefix}-loading`} />
      )
    default:
      return icon
    }
  }, [icon])

  const top = useMemo(() => {
    switch (position) {
    case 'top':
      return '20%'
    case 'bottom':
      return '80%'
    default:
      return '50%'
    }
  }, [position])

  return (
    <Mask
      visible={visible}
      destroyOnClose
      disableScrollLock={props.disableScrollLock} // 兼容 mdf 特殊场景，详见 QDJCJS-25447 ，mdf 沟通人员: 何艳阳
      opacity={0}
      disableBodyScroll={!maskClickable}
      getContainer={getContainer}
      afterClose={afterClose}
      style={{
        pointerEvents: maskClickable ? 'none' : 'auto',
        ...maskStyle,
      }}
      className={classNames(`${_clsPrefix}-mask`, maskClassName)}
      stopPropagation={stopPropagation}
      fieldid={fieldid}
    >
      <div className={classNames(`${_clsPrefix}-wrap`, className)}>
        <div
          style={{ top }}
          className={classNames(
            `${_clsPrefix}-main`,
            icon ? `${_clsPrefix}-main-icon` : `${_clsPrefix}-main-text`
          )}
        >
          {iconElement && (
            <div className={`${_clsPrefix}-icon`}>{iconElement}</div>
          )}
          <AutoCenter clsPrefix={clsPrefix} className={`${_clsPrefix}-loading-title`}>{content}</AutoCenter>
        </div>
      </div>
    </Mask>
  )
}

export default WebUI({ defaultProps })(InternalToast)
