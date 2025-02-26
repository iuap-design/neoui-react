import React, { FC } from 'react'
import { NativeProps, withNativeProps } from '../../utils/NativeProps'
import WebUI from '../../utils/UpdatePrefixs'


export type AutoCenterProps = NativeProps

const AutoCenter: React.FC<AutoCenterProps> = props => {
  const { clsPrefix, className } = props
  const _clsPrefix = `${clsPrefix}-auto-center`
  return withNativeProps(
    props,
    <div className={_clsPrefix}>
      <div className={`${_clsPrefix}-content`}>{props.children}</div>
    </div>
  )
}

export default WebUI({})(AutoCenter)
