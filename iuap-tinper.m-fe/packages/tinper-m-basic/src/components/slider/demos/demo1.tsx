/**
 * @title 基础用法
 * @description Slider 滑动输入条
 */

import React, { Component, useState, useRef } from 'react';
import { Slider, Icon } from '@tinper/m';
import '@tinper/m-icons/lib/iconfont/iconfont.js'
import { styles } from './demoStyles';

const marks = {
  0: 0,
  50: 50,
  100: 100,
  150: 150,
  200: 200,
  250: 250,
}

export default function Demo1() {
  const toastValue = (value: number | number[]) => {
    let text = ''
    if (typeof value === 'number') {
      text = `${value}`
    } else {
      text = `[${value.join(',')}]`
    }
    console.log(`当前选中值为：${text}`)
  }
  const onChange = (value: number | number[]) => {
    console.log('slider onChange')
    toastValue(value)
  }

  const [afterValue, setAfterValue] = useState(40);

  return (
    <div style={{ backgroundColor: 'var(--mui-color-background)' }}>
      <h3>基础用法</h3>
      <div>
        <Slider fieldid="sliderDemo1" defaultValue={30} onChange={onChange} />
      </div>

      <h3>显示刻度并指定步距</h3>
      <div>
        <Slider
          fieldid="sliderDemo2"
          ticks
          step={20}
          defaultValue={30}
          onChange={onChange} />
      </div>

      <h3>传入刻度标记</h3>
      <div>
        <Slider
          fieldid="sliderDemo3"
          ticks
          marks={marks}
          min={0}
          max={250}
          defaultValue={80}
          onChange={onChange} />
      </div>

      <h3>最大/最小值</h3>
      <div>
        <Slider
          fieldid="sliderDemo4"
          step={50}
          min={0}
          max={250}
          ticks
          defaultValue={80}
          onChange={onChange} />
      </div>

      <h3>默认值</h3>
      <div>
        <Slider
          fieldid="sliderDemo5"
          defaultValue={30}
          onChange={onChange} />
      </div>

      <h3>在拖动时显示悬浮提示</h3>
      <div>
        <Slider
          fieldid="sliderDemo6"
          defaultValue={30}
          popover
          onChange={onChange} />
      </div>

      <h3>{`拖拽结束监听 (最终拖拽值${afterValue})`}</h3>
      <div>
        <Slider
          fieldid="sliderDemo7"
          defaultValue={30}
          onAfterChange={(value) => setAfterValue(value)}
          onChange={onChange} />
      </div>

      <h3>双滑块</h3>
      <div>
        <Slider
          fieldid="sliderDemo8"
          marks={marks}
          ticks
          range
          min={0}
          max={250}
          defaultValue={[0, 80]}
          onAfterChange={toastValue}
          onChange={onChange} />
      </div>

      <h3>禁用状态</h3>
      <div>
        <Slider
          fieldid="sliderDemo9"
          marks={marks}
          ticks
          range
          disabled
          min={0}
          max={250}
          value={80}
          onChange={onChange} />
      </div>

      <h3>自定义样式</h3>
      <div>
        <Slider
          fieldid="sliderDemo10"
          style={{ '--fill-color': '#10B83E', '--fill-icon': '#10B83E', '--fill-dot': '#10B83E' }}
          className="custom-style"
          defaultValue={30}
          onChange={onChange} />
      </div>

      <h3>自定义滑块图标</h3>
      <div>
        <Slider
          fieldid="sliderDemo11"
          defaultValue={30}
          style={{ '--fill-color': '#0A8CF7', '--fill-icon': '#0A8CF7', '--fill-dot': '#0A8CF7' }}
          icon={<Icon type='arcclock'
            color="#0A8CF7"
            style={{ width: '0.4rem', height: '0.4rem', margin: '0.04rem' }} />}
          onChange={onChange} />
      </div>
    </div>
  )
}
