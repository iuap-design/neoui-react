/**
 * @title 受控模式
 * @description 组件示例
 */
import React, { useState } from 'react'
import { FloatingBubble, Divider } from '@tinper/m'
import { Image } from '@tinper/m'
import xiaoyou from './xiaoyou.png'

export default () => {
  const [offset, setOffset] = useState({ x: -24, y: -24 })

  return (
    <div
      style={{
        textAlign: 'center',
        padding: '50vh 32px 0',
      }}
    >
      <div>受控模式</div>
      <Divider />

      <div>
        <div>x: {offset.x}</div>
        <div>y: {offset.y}</div>
      </div>

      <FloatingBubble
        fieldid="demo4"
        axis='xy'
        style={{
          '--initial-position-bottom': '0',
          '--initial-position-right': '0',
          '--background': 'rgba(0, 0, 0, 0)',
        }}
        onOffsetChange={offset => {
          setOffset(offset)
        }}
        offset={offset}
      >
        <Image src={xiaoyou} style={{ '--width': '0.96rem', '--height': '0.9rem', background: 'rgba(0, 0, 0, 0)', '--placeholder-bg-color': 'rgba(0, 0, 0, 0)' }} />
      </FloatingBubble>
    </div>
  )
}
