/**
 * @title 渐变用法
 * @description 结合onHeightChange实现透明度变化
 */
import React, { useEffect, useRef } from 'react'
import { FloatingPanel } from '@tinper/m'

const anchors = [100, window.innerHeight * 0.2, window.innerHeight * 0.8]
const minHeight = anchors[0]
const maxHeight = anchors[anchors.length - 1]

export default () => {
  const targetRef = useRef<HTMLDivElement>(null)

  const onHeightChange = (height: number) => {
    const ratio = height / maxHeight
    const target = targetRef.current
    if (!target) return
    target.style.height = '100%'
    target.style.width = '100%'
    target.style.backgroundImage = `linear-gradient(rgba(185,147,214,${ratio}),rgba(140,166,219,${ratio}))`
  }

  useEffect(() => {
    onHeightChange(minHeight)
  }, [])

  return (
    <div
      style={{
        padding: 12,
      }}
    >
      <div style={{ padding: '16px 12px' }}>结合onHeightChange实现透明度变化</div>

      <FloatingPanel anchors={anchors} onHeightChange={onHeightChange}>
        <div ref={targetRef} />
      </FloatingPanel>
    </div>
  )
}
