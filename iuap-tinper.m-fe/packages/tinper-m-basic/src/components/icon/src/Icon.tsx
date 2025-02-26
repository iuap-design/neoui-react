import React from 'react'
import classNames from 'classnames'
import WebUI from '@utils/UpdatePrefixs'
import { IconProps } from './iIcon'

function Icon (props: IconProps) {
  const { clsPrefix, className, style, type, size = 'md', color, fieldid = '', onClick } = props
  const _clsPrefix = `${clsPrefix}-icon`
  const cls = classNames(_clsPrefix, className, `${_clsPrefix}-${size}`)
  return (
    <svg className={cls} style={{ color: color, ...style }} fieldid={fieldid} onClick={onClick}>
      <use xlinkHref={`#${type}`} />
    </svg>
  )
}

export default WebUI({ name: 'icon' })(Icon)
