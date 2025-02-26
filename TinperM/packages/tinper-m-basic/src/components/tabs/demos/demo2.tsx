/**
 * @title 特殊使用案例
 * @description 特殊使用案例
 * @compact true
 */
import React, { useRef, useState } from 'react'
import { Tabs, Swiper, Button } from '@tinper/m'
import { SwiperRef } from '../../swiper/src/iSwiper'
import classNames from 'classnames'
import { GroupIcon } from './Group.tsx'
import './demo.less'

const tabItems = [
  { key: 'o', title: '页签选项0' },
  { key: 't', title: '页签选项1' },
  { key: 'th', title: '页签选项2' },
]

const tabItems1 = [
  { key: '0', title: '页签选项0' },
  { key: '1', title: '页签选项1' },
  { key: '2', title: '页签选项2' },
  { key: '3', title: '页签选项3' },
  { key: '4', title: '页签选项4' },
  { key: '5', title: '页签选项5' },
  { key: '6', title: '超长文字页签显示6' },
  { key: '7', title: '超长文字页签显示7' },
  { key: '8', title: '超长文字页签显示8' },
]

export default () => {
  const [activeIndex, setActiveIndex] = useState(0)
  const swiperRef = useRef<SwiperRef>(null)

  const [activeIndex1, setActiveIndex1] = useState(0)
  const [visible, setVisible] = useState(false)

  const handleClick = (item) => {
    setActiveIndex1(item.key)
    setVisible(false)
  }
  return (
    <div className='tabs-demo tabs-demo2'>
      <h3>配合 Swiper 实现手势滑动</h3>
      <Tabs
        fieldid='fieldid-tabs-10'
        activeKey={tabItems[activeIndex].key}
        onChange={key => {
          const index = tabItems.findIndex(item => item.key === key)
          setActiveIndex(index)
          swiperRef.current?.swipeTo(index)
        }}
      >
        {tabItems.map(item => (
          <Tabs.Tab title={item.title} key={item.key} />
        ))}
      </Tabs>
      <Swiper
        direction='horizontal'
        loop
        indicator={() => null}
        ref={swiperRef}
        defaultIndex={activeIndex}
        onIndexChange={index => {
          setActiveIndex(index)
        }}
      >
        <Swiper.Item>
          <div className="tabs-swiper-demos">页签选项0</div>
        </Swiper.Item>
        <Swiper.Item>
          <div className="tabs-swiper-demos">页签选项1</div>
        </Swiper.Item>
        <Swiper.Item>
          <div className="tabs-swiper-demos">页签选项2</div>
        </Swiper.Item>
      </Swiper>

      <h3>拓展图标展开全部选项</h3>
      <div style={{ position: "relative" }}>
        <Tabs
          style={{ '--content-padding': '0.32rem' }}
          activeKey={tabItems1[activeIndex1].key}
          onChange={key => {
            const index = tabItems1.findIndex(item => item.key === key)
            setActiveIndex1(index)
          }}
          className="tabs-group-demo"
        >
          {tabItems1.map(item => (
            <Tabs.Tab title={item.title} key={item.key}>
              <div className="tabs-content-demo">
                {'content' + item.key}
              </div>
            </Tabs.Tab>
          ))}
        </Tabs>
        <span className="image-of-tabs-demo" onClick={() => setVisible(!visible)}><GroupIcon /></span>
        <div className="tabs-inner-wrapper" style={{ display: visible ? 'flex' : 'none' }}>
          {tabItems1.map(item => (
            <Button
              className={classNames("tabs-inner-button", { ["tabs-inner-button-active"]: Number(item.key) == activeIndex1 })}
              mode="default"
              size="small"
              onClick={() => handleClick(item)}
            >{item.title}</Button>
          ))}
        </div>
      </div>
    </div >
  )
}