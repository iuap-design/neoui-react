/**
 * @title 组件状态及组件样式
 * @description InputNumber 组件状态及组件样式相关示例
 */
import React, { Component } from 'react'
import { InputNumber } from '@tinper/m';
import './demo.less'

export default class Demo2 extends Component {
  render() {
    return (
      <div className='input-number-demo'>
        <h3>禁用</h3>
        <InputNumber defaultValue={9999} disabled/>

        <h3>只读</h3>
        <InputNumber defaultValue={899} readOnly/>

        <h3>内容位置</h3>
        <InputNumber align='left' placeholder='居左对齐'/>
        <br />
        <InputNumber align='center' placeholder='居中对齐'/>
        <br />
        <InputNumber align='right' placeholder='居右对齐'/>
      </div>
    )
  }
}
