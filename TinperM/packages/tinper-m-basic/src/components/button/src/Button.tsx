import React, { ReactNode } from 'react'
import classnames from 'classnames'
import WebUI from '@utils/UpdatePrefixs'
import SpinLoading from '@common/spin-loading/src'
import { ButtonProps } from './iButton'
import { useIcon } from '@hooks/UseIcon';

const defaultProps = {
  size: 'middle',
  mode: 'default',
  visible: true,
  disabled: false,
  iconPosition: 'left',
  shape: 'default'
}

function Button (props: ButtonProps) {
  const {
    children,
    className,
    disabled,
    size,
    mode,
    iconPosition,
    block,
    loading,
    loadingText,
    style,
    clsPrefix,
    fieldid,
    visible,
    shape
  } = props

  const icon = useIcon({ icon: props.icon, fieldid: `${fieldid}_icon` })
  const loadingIcon = useIcon({ icon: props.loadingIcon, fieldid: `${fieldid}_loading_icon` }) || <SpinLoading style={{ '--size': '0.3rem' }} fieldid={fieldid ? `${fieldid}_loadingIcon` : undefined}/>

  const _clsPrefix = `${ clsPrefix}-button`
  const btnCls = classnames(
    _clsPrefix,
    `${_clsPrefix}-${size}`,
    `${_clsPrefix}-${mode}`,
    shape !== 'default' &&`${_clsPrefix}-${shape}`,
    {
      [`${_clsPrefix}-block`]: block,
      [`${_clsPrefix}-disabled`]: disabled,
      [`${_clsPrefix}-with-icon`]: Boolean(icon),
      [`${_clsPrefix}-with-icon-${iconPosition}`]: Boolean(icon),
      [`${_clsPrefix}-with-icon-only`]: (Boolean(icon) && !children),
    },
    className
  )

  if (visible === false) return null
  return (
    <button
      onTouchStart={props.onTouchStart}
      onTouchEnd={props.onTouchEnd}
      onMouseDown={props.onMouseDown}
      onClick={props.onClick}
      disabled={disabled}
      style={style}
      className={btnCls}
      fieldid={fieldid}
    >
      {loading
        ? <>{ loadingIcon}{loadingText}</>
        : <>{icon}<span>{children}</span></>
      }
    </button>
  )
}

export default WebUI({ defaultProps })(Button)
