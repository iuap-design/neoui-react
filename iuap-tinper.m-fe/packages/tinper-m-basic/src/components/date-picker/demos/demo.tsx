/**
 * @title 基础用法
 * @description 基础用法
 */
import React, { useState } from 'react'
import { Button, DatePicker } from '@tinper/m';
import './demo.less';

const now = new Date()

// 基础用法
function BasicUsage() {
  const [visible, setVisible] = useState(false)
  const fieldId = 'date-picker-basic-usage'
  return (
    <>
      <DatePicker title='时间选择'
        visible={visible}
        fieldid={fieldId}
        onClose={() => setVisible(false)}
        onConfirm={(val) => alert(val)}
      />
      <Button onClick={() => setVisible(true)}>选择</Button>
    </>
  )
}


// 渲染所选值
function RenderSelectedValue() {
  const [visible, setVisible] = useState(false)

  return (
    <>
      <Button onClick={() => setVisible(true)}>选择</Button>
      <DatePicker title='时间选择'
        visible={visible}
        defaultValue={now}
        max={now}
        onSelect={console.log}
        onClose={() => setVisible(false)}
      >
        {(value) => value?.toDateString()}
      </DatePicker>
    </>
  )
}

//格式化
function Format() {
  const [visible, setVisible] = useState(false)
  const formatDate = (date: Date | null) => {
    const dateFormatOptions = {
      year: 'numeric',
      month: 'numeric',
      day: 'numeric',
      hour: 'numeric',
      minute: 'numeric',
      hour12: false,
    } as const;

    if (date === null)
      return

    const dateFormatter = new Intl.DateTimeFormat('zh-CN', dateFormatOptions);
    const formattedDate = dateFormatter.format(date);
    return  formattedDate.replace(/\//g, '-');

  }
  return (
    <>
      <Button onClick={() => setVisible(true)}>选择</Button>
      <DatePicker title='时间选择'
        visible={visible}
        defaultValue={now}
        precision='minute'
        max={now}
        onClose={() => setVisible(false)}
      >
        { formatDate }
      </DatePicker>
    </>
  )

}

function TimeZone() {
  const [visible, setVisible] = useState(false)
  const [timeZone, setTimeZone] = useState < string | undefined>()
  const formatDate = (date: Date) => {
    const dateFormatOptions = {
      year: 'numeric',
      month: 'numeric',
      day: 'numeric',
      hour: 'numeric',
      minute: 'numeric',
      hour12: false,
      timeZone: timeZone
    } as const;

    const dateFormatter = new Intl.DateTimeFormat('zh-CN', dateFormatOptions);
    const formattedDate = dateFormatter.format(date);
    return formattedDate.replace(/\//g, '-');

  }

  const onButtonClick = (timeZone: string) => {
    setVisible(true)
    setTimeZone(timeZone)
  }
  return (
    <>
      <DatePicker title='日期选择'
                  visible={visible}
                  onClose={() => setVisible(false)}
      >
        {(date) => {

          return (
            <>
              <div className='flex'>
                <Button onClick={() => onButtonClick('+01:00')} size="middle">(UTC+01:00)伦敦</Button>
                <Button onClick={() => onButtonClick('+08:00')} size="middle">(UTC+08:00)北京</Button>
              </div>
             {date && formatDate(date)}
            </>


          )
        }}
        </DatePicker>

    </>
  )
}

const Demo = () => (
  <div className="date-picker-demo">
    <>
      <h3>基础用法</h3>
      <BasicUsage/>
    </>
    <>
      <h3>渲染所选值</h3>
      <RenderSelectedValue />
    </>
    <>
      <h3>格式化选项</h3>
      <Format />
    </>
    <>
      <h3>时区设置</h3>
      <TimeZone />
    </>
  </div>
)

export default Demo
