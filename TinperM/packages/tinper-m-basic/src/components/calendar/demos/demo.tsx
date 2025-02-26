/**
 * @title 基础用法
 * @description 基础用法
 */
import React, { useCallback, useState } from 'react'
import { Calendar, CalendarRef } from '@tinper/m'
import { isToday } from 'date-fns';

const defaultSingle = new Date('2024-01-18')
const defaultRange: [Date, Date] = [
  new Date('2024-01-05'),
  new Date('2024-01-08'),
]

//基础样式
function BasicUsage() {
  const [visible, setVisible] = useState(false)

  return (
    <Calendar />
  )
}

// 自定义导航
function CustomNavigation() {

  return (
    <Calendar
      prevMonthButton={<span>上一月</span>}
      nextMonthButton={<span>下一月</span>}
      prevYearButton={<span>上一年</span>}
      nextYearButton={<span>下一年</span>}
      shouldDisableDate={date => date.getDay() === 0 || date.getDay() === 6}
    />
  )
}

// from 1 to 9 -> 01 to 09
function CustomDateRender() {
  const renderDate = (date: Date) => <span>{date.getDate().toString().padStart(2, '0')}</span>

  return (
        <Calendar renderDate={renderDate} onPageChange={(year, month) => console.log(`${year}年-${month}月`)} />
  )
}


//选择某一天
function SelectSingle() {

  return (
    <>
        <Calendar
          selectionMode='single'
          defaultValue={defaultSingle}
          onChange={val => {
            console.log(val)
          }}
        />
    </>
  )
}



//选择日期范围
function SelectRange() {

  const [value, setValue] = useState<[Date, Date] | null>(defaultRange)
  return (
    <>
        <Calendar
          selectionMode='range'
          value={value}
          onChange={setValue}
        />
    </>
  )
}

// 受控模式
function ControlMode() {
  const today = new Date()
  const begin = new Date(today.getFullYear(), today.getMonth(), 8)
  const end = new Date(today.getFullYear(), today.getMonth(), 20)
  const [val, setVal] = useState<[Date, Date] | null>(() => [
    begin,
    end
  ])
  return (
        <Calendar
          selectionMode='range'
          value={val}
          onChange={val => {
            setVal(val)
          }}
        />
  )
}


// 周一作为每周第一天
function WeekStartOnMonday() {

  return (
        <Calendar weekStartsOn="Monday" selectionMode='single'  allowClear={false}     />
  )
}

//自定义文案
function CustomDateLabel() {
  return (
    <>
        <Calendar selectionMode='range'  renderLabel={date => {
          const day = date.getDay()
          if (isToday(date)) return '今天'
          if ([0, 6].includes(day)) return '周末'
        }}  />
    </>
  )
}

//限制日期范围
function DateRangeLimit() {
  const min = new Date()
  const max = new Date()
  min.setDate(10)
  max.setDate(20)
  return (
    <>
        <Calendar  min={min} max={max} selectionMode='range'   />
    </>
  )
}

// 限制可切换的page
function DatePageLimit() {
  const minPage = { year: 2023, month: 3 }
  const maxPage = { year: 2024, month: 6 }
  return (
    <>
        <Calendar  minPage={minPage} maxPage={maxPage} selectionMode='range'   />
    </>
  )
}

// 默认展示4月
function DateDefaultDisplay() {
  const ref = useCallback((calendarRef:CalendarRef) => {
    calendarRef.jumpTo({ year: 2024, month: 4 })
  }, [])
  return (
    <>
        <Calendar ref={ref}   selectionMode='range'   />
    </>
  )
}

// 修改选中日期圆角
function ChangeStyle() {
  const style = { '--cell-selected-border-radius': 0, }
  return (
        <Calendar
          selectionMode='range'
          defaultValue={defaultRange}
          onChange={val => {
            console.log(val)
          }}
          style={style}
        />
  )
}


const Demo = () => (
  <div>
    <>
      <h3>基础样式</h3>
      <BasicUsage/>
    </>
    <>
      <h3>自定义导航</h3>
      <CustomNavigation/>
    </>
    <>
      <h3>自定义日期渲染</h3>
      <CustomDateRender/>
    </>
    <>
      <h3>选择某一天</h3>
      <SelectSingle/>
    </>
    <>
      <h3>选择日期范围</h3>
      <SelectRange/>
    </>
    <>
      <h3>受控模式</h3>
      <ControlMode/>
    </>
    <>
      <h3>周一作为每周第一天</h3>
      <WeekStartOnMonday/>
    </>
    <>
      <h3>自定义文案</h3>
      <CustomDateLabel />
    </>
    <>
      <h3>限制日期范围</h3>
      <DateRangeLimit />
    </>
    <>
      <h3>限制可切换的page (2023.3 - 2024.6)</h3>
      <DatePageLimit />
    </>
    <>
      <h3>默认展示4月</h3>
      <DateDefaultDisplay />
    </>
    <>
      <h3>修改样式</h3>
      <ChangeStyle />
    </>

  </div>
)

export default Demo

