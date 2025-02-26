/**
 * @title 精度
 * @description 精度
 */
import React from 'react'
import { TimeRangePicker } from '@tinper/m'
import './demo.less'


const handleOk = (date: Date) => {
  console.log(`dateTimePicker ok: ${date}`)
}
const handleClose = () => {
  console.log(`dateTimePicker close`)
}
//基础样式

function YearMode() {

  return (
    <TimeRangePicker className="item"  defaultValue={["2024-01-01", "2023-04-01"]}  mode="year" onOk={handleOk} onDismiss={handleClose} />
  )
}


function YearMonthMode() {

  return (
    <TimeRangePicker
      className="item"
      defaultValue={["2024-01", new Date()]}
      mode="month"
    />
  );
}

function YearMonthDayMode() {

  return (
    <TimeRangePicker
      className="item"
      defaultValue={["2024-02-08", new Date()]}
      mode="day"
    />
  );
}



function YearMonthDayHourMinuteMode() {

  return (
    <TimeRangePicker
      className="item"
      defaultValue={["2024-01-01 12:00", new Date()]}
      mode="minute"
    />
  );
}

function YearMonthDayHourMinuteSecondMode() {

  return (
    <TimeRangePicker
      className="item"
      defaultValue={["2024-01-01 12:00", new Date()]}
      mode="second"
    />
  );
}

function TimeMode() {

  return (
    <TimeRangePicker
      className="item"
      defaultValue={["12:00", "14:00"]}
      popTitle="时间选择"
      placeholder="开始时间-结束时间"
      mode="hms"
    />
  );
}

function WeekMode() {

  return (
    <TimeRangePicker
      className="item"
      defaultValue={["2024-01-01 12:00", new Date()]}
      popTitle="周选择"
      placeholder="请选择周"
      mode="week"
    />
  );
}

const Demo = () => (
  <div className="date-time-picker-demo">
    <>
      <h3>年</h3>
      <YearMode/>
    </>
    <>
      <h3>月</h3>
      <YearMonthMode/>
    </>
    <>
      <h3>日</h3>
      <YearMonthDayMode/>
    </>

    <>
      <h3>分</h3>
      <YearMonthDayHourMinuteMode/>
    </>
    <>
      <h3>秒</h3>
      <YearMonthDayHourMinuteSecondMode/>
    </>
    <>
      <h3>时间</h3>
      <TimeMode/>
    </>
    <>
      <h3>周</h3>
      <WeekMode/>
    </>
  </div>
)

export default Demo

