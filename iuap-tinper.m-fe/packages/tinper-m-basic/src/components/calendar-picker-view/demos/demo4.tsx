/**
 * @title 自定义文案
 * @description 自定义文案
 */

import React from 'react'
import { CalendarPickerView } from '@tinper/m'




export default () => {

  const renderBottom = (date: Date) =>
    [0, 6].includes(date.getDay()) && "周末";
  const renderDate = (date: Date) => date.getDate().toString().padStart(2, '0')
  const renderTop = (date: Date) => date.getDay() === 1 && '工作日'

  return (

    <CalendarPickerView title="请选择日期" weekStartsOn="Monday" selectionMode="range" renderTop={renderTop} renderBottom={renderBottom} renderDate={renderDate} />
  )
}
