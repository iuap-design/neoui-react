/**
 * @title 基础用法
 * @description: 走马灯
 * @compact true
 */
import React, { useState, useRef } from 'react'
import { Swiper, Toast, Button } from '@tinper/m';
import { SwiperRef } from '@tinper/m/lib/swiper/src'
import bg1 from './1.png'
import bg2 from './2.png'
import bg3 from './3.png'
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

const bgItems = [bg1, bg2, bg3].map((item, index) => <Swiper.Item key={index} style={{width: '100%', height: '2.26rem'}}>
  <img style={{width: '100%', height: '100%', objectFit: 'fill'}} draggable={false} src={item} />
</Swiper.Item>)

export default function Demo (){
  const ref = useRef<SwiperRef>(null)
  return (
    <>
      <h3>基础用法</h3>
      <Swiper defaultIndex={0}>{items}</Swiper>

      <h3>自动播放</h3>
      <Swiper defaultIndex={1} autoplay>{items}</Swiper>

      <h3>循环播放</h3>
      <Swiper
        loop
        autoplay
        defaultIndex={2}
        onIndexChange={i => {
          console.log(i, 'onIndexChange1')
        }}
      >{items}</Swiper>

      <h3>手动控制</h3>
      <Swiper defaultIndex={3} allowTouchMove={false} ref={ref} loop>
      {items}
      </Swiper>
      <div style={{ display: 'flex', justifyContent: 'flex-start', padding: '0.2rem 0' }}>
        <Button
          mode='default'
          size='middle'
          onClick={() => {
            ref.current?.swipePrev()
          }}
        >
          上一张
        </Button>
        <Button
          mode='default'
          size='middle'
          style={{ marginLeft: '0.24rem' }}
          onClick={() => {
            ref.current?.swipeNext()
          }}
        >
          下一张
        </Button>
      </div>

      <h3>自定义样式</h3>
      <Swiper
        loop
        autoplay
        style={{
          '--border-radius': '0.12rem'
        }}
        onIndexChange={i => {
          console.log(i, 'onIndexChange1')
        }}
      >{items}</Swiper>

      <h3>走马灯</h3>
        <Swiper
          loop
          autoplay
          style={{
            'track-padding': '-0.12rem'
          }}
        >{bgItems}</Swiper>
    </>
  )
}
