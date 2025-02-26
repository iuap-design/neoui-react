/**
 * @title 基础用法
 * @description 基础用法
 */
import { DateTimePicker } from '@tinper/m'
import { useState } from 'react';
import './demo.less'

const handleOk = (date: Date) => {
  console.log(`dateTimePicker ok: ${date}`)
}
const handleClose = () => {
  console.log(`dateTimePicker close`)
}
//基础样式
function BasicUsage() {

  return (
    <DateTimePicker
      onOk={handleOk}
      onDismiss={handleClose}
      onClearReturn={() => console.log('clear')}
      fieldid="dateTimePicker" className="demo-block" placeholder="请选择日期时间"   />
  )
}

function ControlMode() {

  const [value, setValue] = useState<Date | null>(null);
  return (
    <DateTimePicker
      value={value}
      onOk={setValue}
      onDismiss={handleClose}
      onClearReturn={() => console.log('clear')}
      fieldid="dateTimePicker" className="demo-block" placeholder="请选择日期时间"   />
  )
}

function Readonly() {

  return (
    <DateTimePicker
      className="demo-block"
      placeholder="请选择日期时间"
      value="2024-01-01"
      readOnly

    />
  );
}

function Disabled() {

  return (
    <DateTimePicker className="demo-block" placeholder="请选择日期时间" defaultValue={new Date()} disabled onOk={handleOk} onDismiss={handleClose} />
  )
}


function YearMode() {

  return (
    <DateTimePicker
      className="demo-block"
      placeholder="请选择年"
      mode="year"
      onOk={console.log}
    />
  );
}

function YearMonthMode() {

  return (
    <DateTimePicker
      className="demo-block"
      placeholder="请选择日期时间"
      mode="month"
    />
  );
}

function YearMonthDayMode() {

  return (
    <DateTimePicker className="demo-block" placeholder="请选择日期时间" mode="day" />
  );
}



function YearMonthDayHourMinuteMode() {

  return (
    <DateTimePicker
      className="demo-block"
      use12Hours
      placeholder="请选择日期时间"
      mode="minute"
    />
  );
}

function YearMonthDayHourMinuteSecondMode() {

  return (
    <DateTimePicker
      className="demo-block"
      use12Hours
      placeholder="请选择日期时间"
      mode="second"
    />
  );
}

function TimeMode() {

  return (
    <DateTimePicker
      className="demo-block"
      popTitle="时间选择"
      placeholder="请选择日期时间"
      mode="time"
      use12Hours
    />
  );
}



function DateTimeRange() {
  return (
    <DateTimePicker
      className="demo-block"
      placeholder="请选择日期时间"
      minDate="2024-02-04"
      maxDate="2024-07-04"
    />
  );
}







const Demo = () => (
  <div className="datetimepicker-demo">
    <h3>基础用法</h3>
    <BasicUsage/>
    <h3>受控</h3>
    <ControlMode/>
    <h3>只读</h3>
    <Readonly/>
    <h3>禁用</h3>
    <Disabled/>
    <h3>年</h3>
    <YearMode/>
    <h3>月</h3>
    <YearMonthMode/>
    <h3>日</h3>
    <YearMonthDayMode/>

    <h3>分</h3>
    <YearMonthDayHourMinuteMode/>
    <h3>秒</h3>
    <YearMonthDayHourMinuteSecondMode/>
    <h3>时间</h3>
    <TimeMode/>
    <h3>日期范围</h3>
    <DateTimeRange/>

  </div>
)

export default Demo

