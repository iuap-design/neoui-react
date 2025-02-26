/**
 * @title 选择日期范围
 * @description 选择日期范围
 */

import React from 'react'
import { CalendarPickerView } from '@tinper/m'




export default () => {
  const onChange = (value: any) => {
    console.log(value)
  }
  return (

    <CalendarPickerView selectionMode="range" defaultValue={['2024-01-10', '2024-01-13']} onChange={onChange}/>
  )
}
