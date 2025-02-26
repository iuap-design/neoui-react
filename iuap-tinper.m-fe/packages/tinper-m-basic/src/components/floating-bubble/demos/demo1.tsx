/**
 * @title 基础用法
 * @description 组件示例
 */
import React from 'react'
import { FloatingBubble, Toast } from '@tinper/m'
import ShareFill from '@tinper/m-icons/lib/cjs/ShareFill'

export default () => {
  const onClick = () => {
    Toast.show('点击了气泡')
  }
  return (
    <div
      style={{
        textAlign: 'center',
        padding: '50vh 32px 0',
      }}
    >
      <div>尝试上下拖拽和点击气泡</div>
      <FloatingBubble
        fieldid="demo1"
        style={{
          '--initial-position-bottom': '0.48rem',
          '--initial-position-right': '0.48rem',
          '--edge-distance': '0.48rem',
        }}
        onClick={onClick}
      >
        <ShareFill style={{ width: '0.64rem', height: '0.64rem' }}/>
      </FloatingBubble>
    </div>
  )
}
