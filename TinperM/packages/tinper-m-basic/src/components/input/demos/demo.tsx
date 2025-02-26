/**
 * @title 基础用法
 * @description Input组件类型相关示例
 */
import React, { Component } from 'react'
import { Button, Input, Image } from '@tinper/m';
import dynamicCode from '@assets/dynaminCode.png'
import { Icon } from '@tinper/m'
import '@tinper/m-icons/lib/iconfont/iconfont.js'
import './demo.less'

export default class Demo0 extends Component<any, { visible: boolean, val: string }> {
  constructor(props: any) {
    super(props);
    this.state = {
      visible: false,
      val: '12'
    }
  }

  onClickClear = (val: string) => {
    console.log('clear value: ', val)
  }
  getSuffix1 = () => (
    <Button size='small' mode='primary'>操作按钮</Button>
  )
  getSuffix2 = () => (
    <Icon type="arcicon-scanning" color='#767777' />
  )
  getSuffix3 = () => (
    <div className='demo0-suffix1'>￥</div>
  )
  getSuffix4 = () => (
    <span className='demo0-suffix1'>个</span>
  )
  getSuffix5 = () => (
    <Image src={dynamicCode} height='0.54rem' width='1.32rem' fit='contain' style={{ display: 'flex' }} />
  )
  getSuffix6 = () => (
    <div style={{ color: 'var(--mui-color-info)', width: '1.4rem' }}>发送验证码</div>
  )

  getTips1 = () => (
    <div className='demo0-length'>
        最大输入10个字
    </div>
  )

  onFocus = (val: string) => {
    console.log('onFocus: ', val)
  }

  onBlur = (val: string) => {
    console.log('onBlur:', val)
  }

  onChange = (val: string) => {
    this.setState({ val })
    console.log('onChange: ', val)
  }

  onSuffixClick = (e: React.MouseEvent) => {
    console.log('onSuffixClick: ', e)
  }

  onEnterPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    console.log('onEnterPress: ', e)
  }

  render() {
    const { val } = this.state;
    return (
      <div className='input-demo'>
        <h3>基础用法</h3>
        <Input placeholder='请输入文字' fieldid='fieldid-input-17'/>

        <h3>带清除按钮</h3>
        <Input placeholder='带清除按钮示例' showClose defaultValue='内容录入中' onClickClear={this.onClickClear} fieldid='fieldid-input-18'/>

        <h3>带字数限制的输入框</h3>
        <Input placeholder='请输入文字' maxLength={10} tips={this.getTips1()} showClose onlyShowClearWhenFocus={false} fieldid='fieldid-input-19'/>

        <h3>带操作的输入框</h3>
        <Input placeholder='请输入文字' suffix={this.getSuffix1()} onSuffixClick={this.onSuffixClick} fieldid="fieldid-input-20"/>
        <Input placeholder='请输入文字' suffix={this.getSuffix2()} fieldid='fieldid-input-21' showClose name='name-i' id='id-id' updatePlaceholder />

        <h3>后缀图标</h3>
        <Input placeholder='请输入文字' suffix={this.getSuffix3()} onFocus={this.onFocus} onBlur={this.onBlur} onEnterPress={this.onEnterPress} fieldid='fieldid-input-22'/>

        <h3>后缀文字</h3>
        <Input placeholder='请输入文字' suffix={this.getSuffix4()} mode='number' value={val} max={20} min={2} onChange={this.onChange} fieldid='fieldid-input-23'/>

        <h3>特定类型输入框</h3>
        <Input placeholder='请输入密码' mode='password' fieldid='fieldid-input-24'/>
        <Input placeholder='请输入验证码' suffix={this.getSuffix5()} fieldid='fieldid-input-25'/>
        <Input placeholder='请输入' suffix={this.getSuffix6()} fieldid='fieldid-input-26'/>
      </div>
    )
  }
}
