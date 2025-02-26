import React from 'react'
import { withNativeProps } from '@utils/NativeProps'
import { GridProps } from './iGrid'
import WebUI from '@utils/UpdatePrefixs'

function toCSSLength(val: string | number) {
  return typeof val === 'number' ? `${val}px` : val
}

const Grid: React.FC<GridProps> = props => {
  const { clsPrefix, fieldid } = props
  const classPrefix = `${clsPrefix}-grid`
  const style: GridProps['style'] & Record<'--columns', string> = { '--columns': props.columns.toString() }
  const { gap } = props
  if (gap !== undefined) {
    if (Array.isArray(gap)) {
      style['--gap-horizontal'] = toCSSLength(gap[0])
      style['--gap-vertical'] = toCSSLength(gap[1])
    } else {
      style['--gap'] = toCSSLength(gap)
    }
  }

  return withNativeProps(
    props,
    <div className={classPrefix} style={style} fieldid={fieldid ? fieldid + '_grid' : undefined}>
      {props.children}
    </div>
  )
}

export default WebUI({})(Grid)
