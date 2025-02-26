/**
 * @title 固定位置
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
      <div>只允许在左下角和右下角</div>
      <FloatingBubble
        fieldid="demo3"
        axis='x'
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
