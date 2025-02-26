import React, { useEffect, useRef } from 'react'
import Toast from '../../toast/src'
import SpinLoading from '@common/spin-loading/src'
import ProgressBar from '@components/progress-bar/src'
import DotLoading from '@common/dot-loading/src'
import classnames from 'classnames'
import { LoadingProps } from './iLoading'
import WebUI from '@utils/UpdatePrefixs'

const defaultProps = {
  size: '0.48rem',
  show: true,
  type: 'toast',
  percent: 50
}

const Loading: React.FC<LoadingProps> = props => {
  let loading: any
  const toastHandler = useRef<any>(null)

  const { content, size, color, show, type, percent, className, style, loadingStyle, fieldid = '', clsPrefix } = props

  useEffect(() => {
    toastLoadingHandler()
  }, [show]);

  const toastLoadingHandler = () => {
    const { type, show, content, duration = 0, showBackDrop = true, className, singleton, maskClassName } = props
    if (type === 'progress' || type === 'spinloading' || type === 'dotloading') return
    if (show) {
      toastHandler.current = Toast.show({
        className: className,
        icon: 'loading',
        fieldid: `${fieldid}-toast`,
        content,
        disableScrollLock: props.disableScrollLock, // 兼容 mdf 特殊场景，详见 QDJCJS-25447 ，mdf 沟通人员: 何艳阳
        duration: duration,
        maskClickable: false,
        maskStyle: showBackDrop ? { background: 'rgba(0, 0, 0, 0)' } : undefined,
        maskClassName: maskClassName,
        singleton: singleton
      })
    } else {
      toastHandler.current?.close()
    }
  }

  const _clsPrefix = `${clsPrefix}-loading`
  const wrapperCls = classnames(_clsPrefix)
  const cls = classnames(`${_clsPrefix}-${type}`, className)
  switch (type) {
  case 'progress': {
    loading = show && <ProgressBar fieldid={`${fieldid}_progressBar`} className={className} style={{ '--track-color': 'transparent' }} percent={percent} />
    break
  }
  case 'spinloading': {
    loading = show && <div className={cls} style={style}><SpinLoading fieldid={`${fieldid}_spinLoading`} style={{ '--size': size, '--color': color, ...loadingStyle }} />{content}</div>
    break
  }
  case 'dotloading': {
    loading = show && <div className={cls} style={style}><DotLoading fieldid={`${fieldid}_dotLoading`} style={{ '--size': size, '--color': color, ...loadingStyle }} />{content}</div>
    break
  }
  case 'toast':
  default: {
    break
  }
  }
  return (
    <div className={wrapperCls} fieldid={fieldid} style={style}>
      {loading}
    </div>
  )
}


export default WebUI({ defaultProps })(Loading)
