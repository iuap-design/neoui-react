/**
 * @title 日期格式
 * @description 日期格式
 */
import React from 'react'
import { DateTimePicker } from '@tinper/m'
import { format } from 'date-fns/fp';
import './demo.less'

const Demo = () => (
  <div className="datetimepicker-demo">
    <h3>yyyy/MM/dd</h3>
    <DateTimePicker  className="demo-block" format={format('yyyy/MM/dd')} />
    <h3>yyyy.MM.dd</h3>
    <DateTimePicker className="demo-block"  format={format('yyyy.MM.dd')} />
    <h3>MM-dd-yyyy</h3>
    <DateTimePicker className="demo-block" format={format('MM-dd-yyyy')} />
    <h3>dd-MM-yyyy</h3>
    <DateTimePicker className="demo-block" format={format('dd-MM-yyyy')} />


  </div>
)

export default Demo

