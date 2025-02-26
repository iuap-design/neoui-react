import React, { memo } from 'react'
import type { ReactElement } from 'react'
import { withNativeProps } from '@utils/NativeProps'
import classNames from 'classnames'
import WebUI from '@utils/UpdatePrefixs'
import { PageIndicatorProps } from './iPageIndicator'


const defaultProps = {
  color: 'primary',
  direction: 'horizontal',
}

export function PageIndicator(props: PageIndicatorProps) {
  const { clsPrefix, fieldid } = props
  const classPrefix = `${clsPrefix}-page-indicator`
  const dots: ReactElement[] = []
  for (let i = 0; i < props.total; i++) {
    dots.push(
      <div
        key={i}
        className={classNames(`${classPrefix}-dot`, {
          [`${classPrefix}-dot-active`]: props.current === i,
        })}
      />
    )
  }

  return withNativeProps(
    props,
    <div
      fieldid={fieldid}
      className={classNames(
        classPrefix,
        `${classPrefix}-${props.direction}`,
        `${classPrefix}-color-${props.color}`
      )}
    >
      {dots}
    </div>
  )
}

export default WebUI({ defaultProps })(PageIndicator)
