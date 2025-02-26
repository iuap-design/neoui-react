/**
 * @title 基础用法
 * @description Radio 单选框
 */

import React from 'react'
import { Radio, Icon, FormItemWrapper } from '@tinper/m'
import '@tinper/m-icons/lib/iconfont/iconfont.js'

import './demo1.less'

export default function Demo1() {
  const selectData = [
    { value: 1, text: '选项一' },
    { value: 2, text: '选项二' },
    { value: 3, text: '选项三', disabled: true },
    { value: 4, text: '选项四' },
  ]

  const selectDataTag = [
    { value: 1, text: '选项一长文字显示内容长文字显示内容' },
    { value: 2, text: '选项二长文字显示内容长文字显示内容' },
    { value: 3, text: '选项三长文字显示内容长文字显示内容', disabled: true },
    { value: 4, text: '选项四长文字显示内容长文字显示内容' },
    { value: 5, text: '选项五长文字显示内容长文字显示内容' },
    { value: 6, text: '选项六长文字显示内容长文字显示内容' },
  ]

  return (
    <div className='radio-demos'>
      <h3>基础用法</h3>
      <div className="radio-item">
        <div>
          <Radio fieldid="radio0">单选项框</Radio>
        </div>
      </div>

      <h3>选项组</h3>
      <div className="space-vertical">
        <Radio.Group defaultValue='2'>
          <Radio value='1'>第一项</Radio>
          <Radio value='2'>第二项</Radio>
          <Radio value='3'>第三项</Radio>
        </Radio.Group>
      </div>

      <h3>占满整行宽度</h3>
      <Radio.Group>
        <div className="radio-item margin-0">
          <Radio value='1' block className="blockIndicator">
            块级元素
          </Radio>
        </div>
        <div className="radio-item">
          <Radio value='2' className="blockIndicator">
            非块级元素
          </Radio>
        </div>
      </Radio.Group>

      <h3>禁用状态</h3>
      <div className="space-vertical">
        <Radio.Group defaultValue='2'>
          <Radio value='1' disabled>
            第一项
          </Radio>
          <Radio value='2' disabled>第二项</Radio>
        </Radio.Group>
      </div>

      <h3>自定义大小</h3>
      <div className="space-vertical">
        <Radio.Group defaultValue='1'>
          <Radio
            value='small'
            style={{
              '--icon-size': '0.28rem',
              '--font-size': '0.3rem',
              '--gap': '0.08rem',
            }}
          >
            小
          </Radio>
          <Radio
            value='middle'
            style={{
              '--icon-size': '0.36rem',
              '--font-size': '0.3rem',
              '--gap': '0.16rem',
            }}
          >
            中
          </Radio>
          <Radio
            value='large'
            style={{
              '--icon-size': '0.44rem',
              '--font-size': '0.3rem',
              '--gap': '0.16rem',
            }}
          >
            大
          </Radio>
        </Radio.Group>
      </div>

      <h3>自定义图标</h3>
      <div className="space-vertical">
        <Radio.Group
          defaultValue='radio1'
        >
          <Radio
            value='radio1'
            icon={(checked: boolean) =>
              checked ? (
                <Icon type='arcradio-button-on-Fill' color='#EE2233' />
              ) : (
                <Icon type='arcradio-button-off' color='#BFBFBF' />
              )
            }
          >
            单选框一
          </Radio>
          <Radio
            value='radio2'
            icon={(checked: boolean) =>
              checked ? (
                <Icon type='arcradio-button-on-Fill' color='#EE2233' />
              ) : (
                <Icon type='arcradio-button-off' color='#BFBFBF' />
              )
            }
          >
            单选框二
          </Radio>
        </Radio.Group>
      </div>

      <h3>单行单选</h3>
      <div>
        <FormItemWrapper splitLine={false}>
          <Radio.Control dataSource={selectData} label='单选框' mode='list' showCloseButton title="标题文本">
          </Radio.Control>
        </FormItemWrapper>
      </div>

      <h3>单行多选</h3>
      <div>
        <FormItemWrapper splitLine={false}>
          <Radio.Control dataSource={selectData} label='单选框' mode='list' multiple title="标题文本">
          </Radio.Control>
        </FormItemWrapper>
      </div>

      <h3>Tag 模式示例1</h3>
      <div className="item">
        <div title='RadioControl'>
          <Radio.Control dataSource={selectData} label='tag模式' mode='tag' className="radio-tag-demo2">
          </Radio.Control>
        </div>
      </div>

      <h3>Tag 模式示例2</h3>
      <div className="item">
        <div title='RadioControl'>
          <Radio.Control className="radio-tag-demo2" dataSource={selectDataTag} label='tag模式' mode='tag'>
          </Radio.Control>
        </div>
      </div>
    </div>

    
  )
}
