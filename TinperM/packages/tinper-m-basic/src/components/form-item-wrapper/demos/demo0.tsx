/**
 * @title 基础用法
 * @description: 表单标题
 * @compact true
 */
import React, { useState } from 'react'
import { FormItemWrapper, Input, TextArea, Button, Radio } from '@tinper/m';
import IconScanning from '@tinper/m-icons/lib/cjs/IconScanning'
import People from '@tinper/m-icons/lib/cjs/People'
import './demo.less'


const selectData = [
  {value: 1, text: '全部'},
  {value: 2, text: '开立'},
  {value: 3, text: '审核中'},
  {value: 4, text: '已审核'},
  {value: 5, text: '已完成'},
  {value: 6, text: '已关闭'}
]

export default function Demo (){
  return (
    <>
      <h3>基础用法</h3>
      <FormItemWrapper label='标题示意' >
        <Input placeholder='请输入' />
      </FormItemWrapper>

      <FormItemWrapper label='禁用示意' disabled>
        <Input disabled value='录入内容' />
      </FormItemWrapper>

      <FormItemWrapper label='禁用（空)' disabled>
      <Input disabled value='--' />
      </FormItemWrapper>

      <h3>浏览态</h3>
      <div style={{ margin: '0 0.16rem', padding: '0.08rem 0', borderRadius: '0.16rem', background: 'var(--mui-color-background)' }}>
      <FormItemWrapper label='标题示意' readOnly>
        <Input readOnly value='录入内容' />
      </FormItemWrapper>

      <FormItemWrapper label='标题示意' readOnly>
      <Input readOnly value='--' />
      </FormItemWrapper>

      <FormItemWrapper label='标题示意' readOnly>
        <Input readOnly value='录入内容' />
      </FormItemWrapper>

      <FormItemWrapper label='最多单行六字' readOnly>
        <TextArea
          readOnly
          value='需要显示的内容非常多直接折行显示需要显示'
          style={{
            width: '100%'
          }}
        />
      </FormItemWrapper>
      </div>

      <h3>数据显示</h3>
      <FormItemWrapper label='标题文字过多折行显示' >
        <Input placeholder='请输入' value='录入内容' />
      </FormItemWrapper>

      <h3>无标题</h3>
      <FormItemWrapper >
        <Input placeholder='请输入' showClose />
      </FormItemWrapper>

      <h3>标题在上</h3>
      <FormItemWrapper singleLine={false} label='FormItemWrapper'>
        <Input placeholder='placeholder' showClose />
      </FormItemWrapper>

      {/* <FormItemWrapper singleLine={false} label='时间区间' >
        <Input placeholder='placeholder' showClose />
      </FormItemWrapper> */}

      <FormItemWrapper singleLine={false} label='单据状态' className='demo-radio-tag' >
        <Radio.Control defaultValue='2' dataSource={selectData} label='tag模式' mode='tag' />
      </FormItemWrapper>

      <FormItemWrapper label='备注' singleLine={false}>
        <TextArea
          style={{
            width: '100%'
          }}
          placeholder='请输入'
          autoSize={{ minRows: 3, maxRows: 5 }}
          showCount
          maxLength={200}
        />
      </FormItemWrapper>

      <h3>功能按钮</h3>
      <FormItemWrapper label='验证码' >
        <Input placeholder='请输入' />
        <Button mode="text" onClick={() => console.log('send verification code')} style={{color: 'var(--mui-color-info)', minWidth: 'unset', padding: 0}}>发送验证码</Button>
      </FormItemWrapper>
      <FormItemWrapper label='银行卡号' rightIcon={<IconScanning onClick={() => console.log('scanning')} style={{width: '0.44rem', height: '0.44rem'}}/>}>
        <Input placeholder='请输入' />
      </FormItemWrapper>
      <FormItemWrapper label='我的亲友' rightIcon={<People onClick={() => console.log('contacts')} style={{width: '0.44rem', height: '0.44rem'}} />}>
        <Input placeholder='请输入' />
      </FormItemWrapper>
    </>
  )
}
