/**
 * @title 组件状态
 * @description Input组件状态相关示例
 */
import React, { Component } from 'react'
import { Input } from '@tinper/m';
import './demo.less'

export default class Demo1 extends Component<any, { temp: string, success: boolean }> {
  constructor(props: any) {
    super(props);
    this.state = {
      temp: '',
      success: false
    }
  }
  getTips1 = () => {
    const { success, temp } = this.state;
    if (!success) {
      console.log('请输入合适的内容：', temp)
      return (
        <div className='demo1-mode'>
          请输入合适的内容参照ipAddress(例：198.0.0.1)
        </div>
      )
    }
  }
  onError = (_val1: string, val2: { reg?: string, text?: string }) => {
    this.setState({ temp: val2.reg, success: false })
  }
  onSuccess = () => {
    this.setState({ success: true })
  }
  render() {
    return (
      <div className='input-demo'>
        <h3>错误提示</h3>
        <Input  placeholder='请输入文字' tips={this.getTips1()} mode='ipAddress' check onError={this.onError} onSuccess={this.onSuccess} defaultValue='should be ipAddress' fieldid='fieldid-input-0'/>

        <h3>禁用</h3>
        <Input placeholder='禁用按钮' defaultValue='需要显示的内容' disabled fieldid='fieldid-input-1'/>

        <h3>只读</h3>
        <Input placeholder='只读按钮' defaultValue='需要显示的内容' readOnly fieldid='fieldid-input-2'/>

        <h3>信息超长显示</h3>
        <Input placeholder='请输入文字' defaultValue='已经输入的长内容过长，导致显示不全，结尾将截断处理' fieldid='fieldid-input-3'/>

        <h3>移动端弹出不同的小键盘</h3>
        <Input placeholder='inputmode: text' inputmode='text' fieldid='fieldid-input-4'/>
        <Input placeholder='inputmode: decimal' inputmode='decimal' fieldid='fieldid-input-5'/>

      </div>
    )
  }
}
