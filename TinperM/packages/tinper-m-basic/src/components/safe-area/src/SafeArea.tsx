import React from 'react'
import type { FC } from 'react'
import WebUI from '@utils/UpdatePrefixs'
import { withNativeProps } from '@utils/NativeProps'
import { SafeAreaProps } from './iSafeArea';
import classNames from 'classnames'

const defaultProps = { position: 'bottom' }

function SafeArea (props: SafeAreaProps) {
  const { position, fieldid, clsPrefix } = props
  const classPrefix = `${clsPrefix}-safe-area`
  return withNativeProps(
    props,
    <div
      fieldid={fieldid}
      className={classNames(
        classPrefix,
        `${classPrefix}-position-${position}`
      )}
    />
  )
}

export default WebUI({ defaultProps })(SafeArea)
