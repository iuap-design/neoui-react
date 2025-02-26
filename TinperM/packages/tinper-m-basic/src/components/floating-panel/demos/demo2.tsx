/**
 * @title 地图用法
 * @description 结合地图使用
 */
import React, { useState, useRef } from 'react'
import {
  FloatingPanel,
  SearchBar,
  List,
} from '@tinper/m'
import type { FloatingPanelRef } from '../src'
import {
  Checkmark,
  ArrowIosDown
} from '@tinper/m-icons'

import './demo2.less'


const nearbyList = [
  {
    icon: <Checkmark style={{ color: '#EE2233' }}/>,
    name: '用友产业园8栋C座3层6708',
    desc: '北京海淀区北清路68号用友产业园'
  },
  {
    icon: null,
    name: '用友产业园西区',
    desc: '海淀区'
  },
  {
    icon: null,
    name: '用友产业园北分办公大楼',
    desc: '北京市朝阳区'
  },
  {
    icon: null,
    name: '用友产业园中区',
    desc: '北京海淀区北清路68号用友产业园'
  },
  {
    icon: null,
    name: '用友产业园',
    desc: '北京海淀区北清路68号用友产业园'
  }
]

const anchors = [72, 72 + 119, window.innerHeight * 0.8]

export default () => {
  const [focus, setFocus] = useState(false)
  const ref = useRef<FloatingPanelRef>(null)

  return (
    <>
      <iframe src='https://amap.com' className='map' />

      <FloatingPanel anchors={anchors} ref={ref}>
        <div className='search'>
          <div className='location'>
            <div>北京</div>
            <ArrowIosDown />
          </div>
          <SearchBar
            style={{ width: '100%', margin: 0 }}
            placeholder='搜索地点'
            showCancelButton
            onFocus={() => {
              setFocus(true)
            }}
            onBlur={() => {
              setFocus(false)
            }}
          />
        </div>
        <List header='搜索附近'>
          {nearbyList.map(item => (
            <List.Item description={item.desc} arrow={item.icon} key={item.name}>
              {item.name}
            </List.Item>
          ))}
        </List>
      </FloatingPanel>
    </>
  )
}
