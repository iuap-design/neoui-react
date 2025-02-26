/**
 * @title 局部水印
 * @description: 局部水印
 */
import React from 'react'
import { Image, WaterMark } from '@tinper/m'
import demoImage from '../../image/demos/image-demo.png'

export default () => {
  return (
    <>
      <h3>局部水印</h3>
      <div
        style={{
          display: 'inline-flex',
          position: 'relative',
        }}
      >
        <Image src={demoImage} />
        <WaterMark
          content={'Tinper-M'}
          gapX={12}
          gapY={24}
          fullPage={false}
        />
      </div>
      <div style={{ padding: '16px 12px' }}>把 WaterMark 放到一个 relative 定位的父元素，它会自动撑满这个父元素的范围。</div>
    </>
  )
}
