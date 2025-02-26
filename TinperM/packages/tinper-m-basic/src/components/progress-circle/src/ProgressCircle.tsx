import React from 'react'
import { withNativeProps } from '@utils/NativeProps'
import { mergeProps } from '@utils/WithDefaultProps'
import { ProgressCircleProps } from './iProgressCircle'
import WebUI from '@utils/UpdatePrefixs'


const ProgressCircle: React.FC<ProgressCircleProps> = p => {
  const props = mergeProps({ percent: 0 }, p)
  const { clsPrefix, fieldid } = props
  const classPrefix = `${clsPrefix}-progress-circle`
  const style: React.CSSProperties & Record<'--percent', string> = { '--percent': props.percent.toString(), }
  return withNativeProps(
    props,
    <div className={`${classPrefix}`} style={style} fieldid={fieldid}>
      <div className={`${classPrefix}-content`}>
        <svg className={`${classPrefix}-svg`}>
          <circle className={`${classPrefix}-track`} fill='transparent' />
          <circle className={`${classPrefix}-fill`} fill='transparent' />
        </svg>
        <div className={`${classPrefix}-info`}>{props.children}</div>
      </div>
    </div>
  )
}

export default WebUI({})(ProgressCircle)
