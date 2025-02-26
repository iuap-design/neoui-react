/**
 * @title 垂直滚动
 * @description: 走马灯-垂直滚动
 * @compact true
 */
import React, { useState, useRef } from 'react'
import { Swiper, Toast, Button, Popup } from '@tinper/m';
import './demo.less'

const colors = ['#588CE9', '#18B681', '#FFA600', '#FF5735']

const items = colors.map((color, index) => (
  <Swiper.Item key={index}>
    <div
      className='demo-swiper-content demo-swiper-content-vertical'
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
  return (
    <>
      <h3>竖向</h3>
      <Swiper
        direction='vertical'
        style={{
          '--height': '6.28rem'
        }}
      >
        {items}
      </Swiper>

      <h3>竖向居中</h3>
      <Swiper
        direction='vertical'
        style={{
          '--height': '5.6rem'
        }}
        slideSize={80}
        trackOffset={10}
        stuckAtBoundary={false}
      >
        {items}
      </Swiper>
    </>
  )
}
