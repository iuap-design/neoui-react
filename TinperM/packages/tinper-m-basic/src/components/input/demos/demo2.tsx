/**
 * @title 组件样式
 * @description Input组件样式相关示例
 */
import React, { Component } from 'react'
import { Input } from '@tinper/m';
import './demo.less'

export default class Demo2 extends Component {
  render() {
    return (
      <div className='input-demo'>
        <h3>内容位置</h3>
        <Input placeholder='居左对齐' textAlign='left' fieldid='fieldid-input-6'/>
        <Input placeholder='居中对齐' textAlign='center' fieldid='fieldid-input-7'/>
        <Input placeholder='居右对齐' textAlign='right' fieldid='fieldid-input-8'/>

        <h3>描边样式</h3>
        <Input placeholder='描边样式' style={{ border: '0.02rem solid #979797' }} fieldid='fieldid-input-9'/>

        <h3>下边线样式</h3>
        <Input placeholder='下边线样式' style={{ borderBottom: '0.02rem solid #979797', borderRadius: '0.08rem 0.08rem 0 0' }} fieldid='fieldid-input-10'/>

        <h3>无边线样式</h3>
        <Input placeholder='无边线样式' fieldid='fieldid-input-11'/>

        <h3>inputStyle样式</h3>
        <Input value='inputStyle样式' inputStyle={{ color: '#c4d0e7' }} fieldid='fieldid-input-12'/>
      </div>
    )
  }
}
