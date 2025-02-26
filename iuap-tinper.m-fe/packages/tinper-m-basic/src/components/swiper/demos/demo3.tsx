/**
 * @title 全屏引导
 * @description: 走马灯-全屏引导
 * @compact true
 */
import React, { useState, useRef } from 'react'
import { Swiper, Toast, Button, Popup } from '@tinper/m';
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
  const [visible, setVisible] = useState(false)
  return (
    <>
      <div style={{display: 'flex', justifyContent: 'center'}}>
        <Button
          mode='default'
          onClick={() => {
            setVisible(true)
          }}
        >
          显示弹出层
        </Button>
      </div>

      <Popup position='bottom' visible={visible} destroyOnClose>
        <Swiper
          loop={false}
          indicatorProps={{
            color: 'white',
          }}
        >
          <Swiper.Item>
            <div
              className={'contentFull'}
              style={{ background: 'rgba(88, 140, 233, 0.5)' }}
            >
              你好
            </div>
          </Swiper.Item>
          <Swiper.Item>
            <div
              className={'contentFull'}
              style={{ background: 'rgba(24, 182, 129, 0.5)' }}
            >
              hello
            </div>
          </Swiper.Item>
          <Swiper.Item>
            <div
              className={'contentFull'}
              style={{ background: 'rgba(255, 166, 0, 0.5)' }}
            >
              <Button
                mode='ghost'
                style={{
                  '--text-color-default': '#fff',
                  '--border-color-replica': '#fff'
                }}
                onClick={() => {
                  setVisible(false)
                }}
              >
                开始使用
              </Button>
            </div>
          </Swiper.Item>
        </Swiper>
      </Popup>
    </>
  )
}
