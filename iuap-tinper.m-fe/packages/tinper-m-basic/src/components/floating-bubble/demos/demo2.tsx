/**
 * @title 纵横拖动
 * @description 组件示例
 */
import React from 'react'
import { FloatingBubble } from '@tinper/m'
import { Image } from '@tinper/m'
import xiaoyou from './xiaoyou.png'

export default () => {
  return (
    <div
      style={{
        textAlign: 'center',
        padding: '50vh 32px 0',
      }}
    >
      <div>
        在 x 轴、y 轴方向上都允许拖动，并且会自动磁吸到 x 轴方向上最近的一边
      </div>
      <FloatingBubble
        fieldid="demo2"
        axis='xy'
        magnetic='x'
        style={{
          '--initial-position-bottom': '0.48rem',
          '--initial-position-right': '0.48rem',
          '--edge-distance': '0.48rem',
          '--background': 'rgba(0, 0, 0, 0)',
        }}
      >
        <Image src={xiaoyou} style={{ '--width': '0.96rem', '--height': '0.9rem', background: 'rgba(0, 0, 0, 0)', '--placeholder-bg-color': 'rgba(0, 0, 0, 0)' }} />
      </FloatingBubble>
    </div>
  )
}
