/**
 * @title 基础用法
 * @description 基础用法
 */
import React, { useState } from 'react';
import { TimeRangePicker, Toast } from '@tinper/m';
import './demo.less'

//基础样式
function BasicUsage() {
  return <TimeRangePicker
    className="item"
    fieldid="time-range-picker-basic-usage"
    onOk={range => console.log(range)}
    onDismiss={() => console.log("dismiss")}
    onClearReturn={() => console.log("clear")}
  />;
}

function Readonly() {
  return (
    <TimeRangePicker
      readOnly
      className="item"
      value={["2024-01-01", new Date()]}
    />
  );
}

function Disabled() {
  return (
    <TimeRangePicker
      disabled
      className="item"
      defaultValue={["2024-01-01", new Date()]}
    />
  );
}

function ControlMode() {
  const [range, setRange] = useState(["2024-01-01", new Date()]);
  return <TimeRangePicker className="item" value={range} onOk={setRange} onClearReturn={() => setRange([])}/>;
}

function DateTimeRange() {

  return (
    <TimeRangePicker
      className="item"
      onOk={(
        range
      ) => {
        const [start, end] = range;
        Toast.show(`${start ?? '至今'} - ${end ?? '至今'}`);
      }}
      minDate="2024-02-04"
      maxDate="2025-07-04"
    />
  );
}

function MinuteStep() {
  return (
    <TimeRangePicker
      className="item"
      mode="minute"
      minuteStep={5}
    />
  );
}

function Filter() {
  const filterValue = {
    year: (y: number, {date}: { date: Date }) => y % 2 === 0,
    month: (m: number, {date}: { date: Date }) => m % 2 === 0,
    day: (d: number, {date}: { date: Date }) => d % 3 === 0,
    hour: (h: number, {date}: { date: Date }) => h % 4 === 0,
    minute: (m: number, {date}: { date: Date }) => m % 6 === 0,
    second: (s: number, {date}: { date: Date }) => s % 5 === 0,
  };
  return (
    <>
      <TimeRangePicker
        className="item"
        filter={filterValue}
        mode="second"
      />
    </>
  );
}

const Demo = () => (
  <div className="date-time-picker-demo">
    <>
      <h3>基础用法</h3>
      <BasicUsage/>
    </>
    <>
      <h3>只读</h3>
      <Readonly/>
    </>
    <>
      <h3>禁用</h3>
      <Disabled/>
    </>

    <>
      <h3>受控</h3>
      <ControlMode/>
    </>

    <>
      <h3>分钟数递增</h3>
      <MinuteStep/>
    </>

    <>
      <h3>过滤日期时间</h3>
      <Filter/>
    </>

    <>
      <h3>日期范围 (2024-2-4 ~ 2025-7-4)</h3>
      <DateTimeRange/>
    </>
  </div>
);

export default Demo;
