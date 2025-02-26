/**
 * @title 指示器
 * @description: 走马灯-指示器
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
      <h3>指示器颜色</h3>
      <Swiper
        indicatorProps={{
          color: 'white',
        }}
        defaultIndex={1}
      >
        {items}
      </Swiper>

      <h3>指示器在滑块外</h3>
      <Swiper
        style={{
          '--track-padding': ' 0 0 0.32rem',
        }}
      >
        {items}
      </Swiper>

      <h3>自定义指示器</h3>
      <Swiper
        indicator={(total, current) => (
          <div className='customIndicator'>
            {`${current + 1} / ${total}`}
          </div>
        )}
      >
        {items}
      </Swiper>

      <h3>无指示器</h3>
      <Swiper
        indicator={() => null}
      >
        {items}
      </Swiper>
    </>
  )
}
