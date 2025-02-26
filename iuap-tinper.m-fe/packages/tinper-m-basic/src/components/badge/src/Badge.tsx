import classNames from 'classnames'
import React, { ReactNode, CSSProperties } from 'react'
import { withNativeProps } from '@utils/NativeProps'
import { BadgeProps } from './iBadge'
import WebUI from '@utils/UpdatePrefixs'

export const dot = <React.Fragment />

const defaultProps = { bordered: true }

const Badge: React.FC<BadgeProps> = props => {
  const { content, color, children, clsPrefix, fieldid } = props
  const _clsPrefix = `${clsPrefix}-badge`

  const isDot = content === dot

  const badgeClass = classNames(_clsPrefix, {
    [`${_clsPrefix}-fixed`]: !!children,
    [`${_clsPrefix}-dot`]: isDot,
    [`${_clsPrefix}-bordered`]: props.bordered,
  })

  const element =
    content || content === 0
      ? withNativeProps(
        props,
        <div
          className={badgeClass}
          style={
              { '--color': color, } as BadgeProps['style']
          }
          fieldid= { children ? `${fieldid}_data_icon` : fieldid}
        >
          {!isDot && (
            <div className={`${_clsPrefix}-content`} fieldid={`${fieldid}-content`}>{content}</div>
          )}
        </div>
      )
      : null

  return children ? (
    <div
      className={classNames(`${_clsPrefix}-wrapper`, props.wrapperClassName)}
      style={props.wrapperStyle}
      fieldid={fieldid}
    >
      {children}
      {element}
    </div>
  ) : (
    element
  )
}

export default WebUI({ defaultProps })(Badge)
