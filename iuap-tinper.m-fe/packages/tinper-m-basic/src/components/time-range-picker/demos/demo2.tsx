/**
 * @title 12小时制
 * @description 12小时制
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




function YearMonthDayHourMinuteModeWith12Hours() {
  const rangeDate =["2024-01-01 12:00", new Date()]
  return (
    <TimeRangePicker
      className="item"
      defaultValue={rangeDate}
      use12Hours
      mode="minute"
    />
  );
}

function YearMonthDayHourMinuteSecondModeWith12Hours() {
  const rangeDate =[new Date(), "2024-12-13"]
  return (
    <TimeRangePicker
      className="item"
      defaultValue={rangeDate}
      use12Hours
      mode="second"
    />
  );
}

function TimeModeMinuteWith12hour() {

  const rangeDate =["12:00", "18:00"]
  return (
    <TimeRangePicker
      className="item"
      defaultValue={rangeDate}
      popTitle="时间选择"
      placeholder="开始时间-结束时间"
      use12Hours
      mode="time"
    />
  );
}

function TimeModeSecondWith12Hours() {
  const rangeDate =["12:00", "18:00"]

  return (
    <TimeRangePicker
      className="item"
      defaultValue={rangeDate}
      popTitle="时间选择"
      placeholder="开始时间-结束时间"
      use12Hours
      mode="hms"
    />
  );
}









const Demo = () => (
  <div className="date-time-picker-demo">
    <>
      <h3>日期-12小时制-分</h3>
      <YearMonthDayHourMinuteModeWith12Hours/>
    </>
    <>
      <h3>日期-12小时制-秒</h3>
      <YearMonthDayHourMinuteSecondModeWith12Hours/>
    </>
    <>
      <h3>时间-12小时制-分</h3>
      <TimeModeMinuteWith12hour/>
    </>
    <>
      <h3>时间-12小时制-秒</h3>
      <TimeModeSecondWith12Hours/>
    </>
  </div>
)

export default Demo

