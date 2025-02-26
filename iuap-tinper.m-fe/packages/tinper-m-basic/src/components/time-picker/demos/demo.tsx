/**
 * @title 基础用法
 * @description 基础用法
 */
import React from 'react';
import { TimePicker } from '@tinper/m';
import { format } from 'date-fns';
import './demo.less'

//基础样式
function BasicUsage() {
  return <TimePicker className="demo-block" placeholder="请选择时间" fieldid="time-picker-basic-usage" />;
}

function Readonly() {
  return (
    <TimePicker
      className="demo-block"
      value="14:12"
      subuitype="HH:mm"
      readOnly
      placeholder="请选择时间"
    />
  );
}

function Disabled() {
  return (
    <TimePicker
      className="demo-block"
      defaultValue={new Date()}
      disabled
      placeholder="请选择时间"
    />
  );
}

function FormatUsage() {
  const handleOk = (date: Date | null) => {
    console.log(`TimePicker ok: ${date}`);
  };
  const handleClose = () => {
    console.log(`TimePicker close`);
  };
  return (
    <TimePicker
      className="demo-block"
      placeholder="请选择时间"
      subuitype="HH:mm"
      onOk={handleOk}
      onDismiss={handleClose}
      onClearReturn={() => console.log('clear')}

    />
  );
}

function Customformat() {


  return <TimePicker className="demo-block" placeholder="请选择时间" format={val => format(val ?? new Date() ,'hh:mm:ss')} />;

}

function Time12Hour() {
  return <TimePicker className="demo-block" placeholder="请选择时间" use12Hours format={val => format(val ?? new Date() ,'hh:mm:ss a')} />;
}

function HourStep() {
  return (
    <TimePicker
      className="demo-block"
      placeholder="请选择时间"
      use12Hours
      hourStep={2}
    />
  );
}

function MinuteStep() {
  return (
    <TimePicker
      className="demo-block"
      placeholder="请选择时间"
      use12Hours
      hourStep={2}
      minuteStep={5}
    />
  );
}

function SecondStep() {
  return (
    <TimePicker
      className="demo-block"
      placeholder="请选择时间"
      hourStep={2}
      minuteStep={5}
      secondStep={10}
    />
  );
}

function TimeDisabled() {
  return <TimePicker className="demo-block" placeholder="请选择时间" disabled />;
}

const Demo = () => (
  <div className="timepicker-demo">
    <h3>基础用法</h3>
    <BasicUsage />
    <h3>只读</h3>
    <Readonly />
    <h3>禁用</h3>
    <Disabled />
    <h3>精度</h3>
    <FormatUsage />
    <h3>格式化</h3>
    <Customformat />
    <h3>12小时制</h3>
    <Time12Hour />
    <h3>小时数递增步长设置</h3>
    <HourStep />
    <h3>分钟数递增步长设置</h3>
    <MinuteStep />
    <h3>秒数递增步长设置</h3>
    <SecondStep />
    <h3>禁用</h3>
    <TimeDisabled />
  </div>
);

export default Demo;
