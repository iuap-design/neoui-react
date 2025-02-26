/**
 * @title 按月和季度选择
 * @description 按月和季度选择
 */
import { Calendar } from '@tinper/m';
import React, { useState } from 'react';


function SelectedMonth() {
  const renderDate = (date: Date) => <span>{(date.getMonth() + 1).toString()+'月'}</span>

  return (
    <Calendar mode="month" renderDate={renderDate} defaultValue={[new Date('2024-01-08'), new Date('2024-02-08')]} selectionMode='range' onPageChange={(year, month) => console.log(`${year}年-${month}月`)} />

  )
}

function SelectedQuarter() {

  const [value, setValue] = useState<[Date, Date] | null>([new Date('2024-01-04'), new Date('2024-09-04')])
  return (
    <Calendar mode="quarter" value={value} onChange={setValue}  selectionMode='range' onPageChange={(year, month) => console.log(`${year}年-${month}月`)} />

  )
}








const Demo = () => (
  <div >
    <>
      <h3>按月选择</h3>
      <SelectedMonth/>
      <h3>按季度选择</h3>
      <SelectedQuarter/>
    </>
  </div>
)

export default Demo

