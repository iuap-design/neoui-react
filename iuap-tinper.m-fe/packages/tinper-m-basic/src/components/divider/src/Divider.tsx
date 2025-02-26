import React from 'react'
import classNames from 'classnames'
import { withNativeProps } from '@utils/NativeProps'
import { mergeProps } from '@utils/WithDefaultProps'
import { DividerProps } from './iDivider'
import WebUI from '@utils/UpdatePrefixs'

const defaultProps = {
  contentPosition: 'center',
  direction: 'horizontal',
  visible: true
}

const Divider: React.FC<DividerProps> = p => {
  const props = mergeProps(defaultProps, p)
  const { clsPrefix, fieldid, visible } = props
  const classPrefix = `${clsPrefix}-divider`;
  if (!visible) return null;
  return withNativeProps(
    props,
    <div
      className={classNames(
        classPrefix,
        `${classPrefix}-${props.direction}`,
        `${classPrefix}-${props.contentPosition}`
      )}
      fieldid={fieldid}
    >
      {props.children && (
        <div className={`${classPrefix}-content`} fieldid={`${fieldid}_content`}>{props.children}</div>
      )}
    </div>
  )
}

export default WebUI({ defaultProps })(Divider)
