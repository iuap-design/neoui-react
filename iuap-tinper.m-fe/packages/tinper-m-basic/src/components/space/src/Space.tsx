import React from 'react'
import type { FC } from 'react'
import classNames from 'classnames'
import { withNativeProps } from '@utils/NativeProps'
import WebUI from '@utils/UpdatePrefixs'
import { SpaceProps } from './iSpace'

const defaultProps = { direction: 'horizontal' }

function Space(props: SpaceProps) {
  const { direction, onClick, clsPrefix, fieldid } = props

  const classPrefix = `${clsPrefix}-space`
  return withNativeProps(
    props,
    <div
      fieldid={fieldid}
      className={classNames(classPrefix, {
        [`${classPrefix}-wrap`]: props.wrap,
        [`${classPrefix}-block`]: props.block,
        [`${classPrefix}-${direction}`]: true,
        [`${classPrefix}-align-${props.align}`]: !!props.align,
        [`${classPrefix}-justify-${props.justify}`]: !!props.justify,
      })}
      onClick={onClick}
    >
      {React.Children.map(props.children, child => (
        child !== null &&
        child !== undefined && (
          <div className={`${classPrefix}-item`}>{child}</div>
        )
      ))}
    </div>
  )
}

export default WebUI({ defaultProps })(Space)
