/**
 * @title 组件校验
 * @description Input组件校验相关示例
 */
import React, { Component } from 'react'
import { Input } from '@tinper/m';
import './demo.less'

export default class Demo3 extends Component {
  onError1 = (v1: string, v2: { reg?: RegExp, text?: string }) => {
    console.log('pattern error: ', v1, v2.reg)
  }
  onError2 = (v1: string, v2: { reg?: RegExp, text?: string }) => {
    console.log('finalPattern error: ', v1, v2)
  }
  onError3 = () => {
    console.log('required error')
  }
  onError4 = (v1: string) => {
    console.log('customCheck error: customCheck should return true', v1)
  }
  customCheck = (v1: string) => v1 === 'test'
  render() {
    return (
      <div className='input-demo'>
        <h3>输入过程中的校验</h3>
        <Input placeholder='输入过程中应满足/^[0-9xX]*$/}' check onError={this.onError1} pattern={/^[0-9xX]*$/} fieldid='fieldid-input-13'/>

        <h3>输入结束的校验</h3>
        <Input placeholder='输入结束时应满足/^[0-9xX]*$/}' check onError={this.onError2} finalPattern={/^[0-9xX]*$/} fieldid='fieldid-input-14'/>

        <h3>必填校验</h3>
        <Input placeholder='必填校验' check onError={this.onError3} required defaultValue='必填' fieldid='fieldid-input-15'/>

        <h3>自定义校验规则</h3>
        <Input placeholder='输入 test 校验通过' check onError={this.onError4} customCheck={this.customCheck} fieldid='fieldid-input-16'/>
      </div>
    )
  }
}
