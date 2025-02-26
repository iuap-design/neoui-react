/**
 * @title 基础用法
 * @description 基础用法
 */
import React, { useState } from 'react'
import { DatePickerView } from '@tinper/m'

import { weekdayToZh } from './weekdayToZh'
import {DatePickerFilter} from "../../date-picker/src";

const now = new Date()

export default () => {
  const [value, setValue] = useState<Date>(now)

  return (
    <>
      <h3>基础用法</h3>
      <DatePickerView defaultValue={now} fieldid="date-picker-view"/>

      <h3>自定义高度</h3>
      <DatePickerView defaultValue={now} style={{'--height': '500px'}}/>

      <h3>受控模式</h3>
      <DatePickerView
        value={value}
        onChange={val => {
          setValue(val)
          console.log('onChange', val)
        }}
      />

      <h3>自定义每列的渲染内容</h3>
      <DatePickerView defaultValue={now} renderLabel={labelRenderer}/>

      <h3>周选择器</h3>
      <DatePickerView
        onChange={val => console.log('onChange', val)}
        precision='week-day'
        defaultValue={now}
        renderLabel={weekdayLabelRenderer}
      />
      <h3>季度选择器</h3>
      <DatePickerView
        onChange={val => console.log('onChange', val)}
        precision='quarter'
        defaultValue={now}
        renderLabel={quarterLabelRenderer}
      />

      <h3>过滤可供选择的时间</h3>
      <DatePickerView
        defaultValue={now}
        precision='hour'
        renderLabel={labelRenderer}
        filter={dateFilter}
      />


    </>
  )
}

const labelRenderer = (type: string, data: number) => {
  switch (type) {
    case 'year':
      return data + '年'
    case 'month':
      return data + '月'
    case 'day':
      return data + '日'
    case 'hour':
      return data + '时'
    case 'minute':
      return data + '分'
    case 'second':
      return data + '秒'
    default:
      return data
  }
}

const weekdayLabelRenderer = (type: string, data: number) => {
  switch (type) {
    case 'year':
      return data + '年'
    case 'week':
      return data + '周'
    case 'week-day':
      return weekdayToZh(data)
    default:
      return data
  }
}

const quarterLabelRenderer = (type: string, data: number) => {
  switch (type) {
    case 'year':
      return data + '年'
    case 'quarter':
      return data + '季度'
    default:
      return data
  }
}
const dateFilter: DatePickerFilter = {
  day: (val, { date }) => {
    // 去除所有周末
    if (date.getDay() > 5 || date.getDay() === 0) {
      return false
    }
    return true
  },
  hour: (val: number) => {
    // 只保留每天的14点到18点
    if (val < 14 || val > 18) {
      return false
    }
    return true
  },
}
