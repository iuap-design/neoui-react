import { mergeProps } from '@utils/WithDefaultProps'
import React from 'react'
import type { CSSProperties } from 'react'
import { withNativeProps } from '@utils/NativeProps'
import { GridItemProps } from './iGrid'
import WebUI from '@utils/UpdatePrefixs'



type GridItemStyle = CSSProperties &
  Record<'--item-span', GridItemProps['span']>

export const GridItem: React.FC<GridItemProps> = p => {
  const props = mergeProps({ span: 1 }, p)
  const { clsPrefix, fieldid } = props
  const classPrefix = `${clsPrefix}-grid-item`
  const itemStyle: GridItemStyle = { '--item-span': props.span }
  return withNativeProps(
    props,
    <div
      className={classPrefix}
      style={itemStyle}
      onClick={props.onClick}
      fieldid={fieldid ? fieldid + '_grid_item' : undefined}
    >
      {props.children}
    </div>
  )
}

export default WebUI({})(GridItem)
