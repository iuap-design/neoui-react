/**
 * @title 非满宽滑块
 * @description: 走马灯-非满宽滑块
 * @compact true
 */
import React, { useState, useRef } from 'react'
import { Swiper, Toast, Button } from '@tinper/m';
import { SwiperRef } from '@tinper/m/lib/swiper/src'
import './demo.less'

const colors = ['#588CE9', '#18B681', '#FFA600', '#FF5735']

const items = colors.map((color, index) => (
  <Swiper.Item key={index}>
    <div
      className='demo-swiper-content'
      style={{ background: color }}
      onClick={() => {
        Toast.show(`你点击了卡片 ${index + 1}`)
      }}
    >
      {index + 1}
    </div>
  </Swiper.Item>
))

export default function Demo (){
  const ref = useRef<SwiperRef>(null)
  return (
    <>
      <h3>卡在边界</h3>
      <Swiper
        trackOffset={10}
        slideSize={80}
        style={{
          '--border-radius': '8px',
        }}
        defaultIndex={0}
      >
        {items}
      </Swiper>

      <h3>允许最后一项越过边界</h3>
      <Swiper stuckAtBoundary={false} slideSize={80} defaultIndex={3}>
        {items}
      </Swiper>

      <h3>居中显示</h3>
      <Swiper slideSize={80} trackOffset={10} stuckAtBoundary={false}>
        {items}
      </Swiper>

      <h3>居中循环</h3>
      <Swiper slideSize={70} trackOffset={15} loop stuckAtBoundary={false}>
        {items}
      </Swiper>
    </>
  )
}
