/**
 * @title 基础用法、必选填
 * @description 表单基础用法、必选填示例
 * @compact true
 */
import React from 'react'
import { Form, Input, Radio, DateTimePicker, TextArea } from '@tinper/m'
import '@tinper/m-icons/lib/iconfont/iconfont.js'
import './demo.less'

export default () => {

  const selectData = [
    { value: 1, text: '物料' },
    { value: 2, text: '设备' },
    { value: 3, text: '服务' },
    { value: 4, text: '外包' },
  ]

  const handleOk = (date: Date) => {
    console.log(`dateTimePicker ok: ${date}`)
  }
  const handleClose = () => {
    console.log(`dateTimePicker close`)
  }
  return (
    <div className="demo1-form form-demo">
      <h3>基础用法</h3>
      <Form layout='horizontal' className="demo1-form-1" fieldid="form-demo-1">
        <Form.Item label='申请人' fieldid="form-demo-1-item-1">
          <Input placeholder='请输入' />
        </Form.Item>
        <Form.Item label='申请类型' fieldid="form-demo-1-item-2">
          <Radio.Control dataSource={selectData} label='单选框' mode='list' showCloseButton title="申请类型" placeholder='请选择'>
          </Radio.Control>
        </Form.Item>
        <Form.Item label='申请日期' fieldid="form-demo-1-item-3">
          <DateTimePicker
            placeholder="请选择日期时间"
            defaultValue="2023-08-10"
            onOk={handleOk}
            onDismiss={handleClose}
          />
        </Form.Item>
      </Form>
      <h3 style={{ marginBottom: '0.12rem' }}>三种必选填方式</h3>
      <Form layout='horizontal' requiredMarkStyle='asterisk' fieldid="form-demo-4">
        <Form.Header>星号</Form.Header>
        <Form.Item name='name' label='申请人' rules={[{ required: true }]}>
          <Input placeholder='请输入' defaultValue='李三四' />
        </Form.Item>
        <Form.Item name='address' label='申请类型'>
          <Radio.Control dataSource={selectData} label='单选框' mode='list' showCloseButton title="申请类型" placeholder='请选择'>
          </Radio.Control>
        </Form.Item>
        <Form.Item name='date' label='申请日期'>
          <DateTimePicker
            placeholder="请选择日期时间"
            defaultValue="2023-08-10"
            onOk={handleOk}
            onDismiss={handleClose}
          />
        </Form.Item>
      </Form>
      <Form requiredMarkStyle='text-required' fieldid="form-demo-5">
        <Form.Header>文字-必填</Form.Header>
        <Form.Item name='name' label='申请人' rules={[{ required: true }]}>
          <Input placeholder='请输入' defaultValue='李三四' style={{ "--mui-input-size-height-input": "0.46rem" }} />
        </Form.Item>
        <Form.Item name='address' label='申请类型'>
          <Radio.Control dataSource={selectData} label='单选框' mode='list' showCloseButton title="申请类型" placeholder='请选择'>
          </Radio.Control>
        </Form.Item>
        <Form.Item name='date' label='申请日期'>
          <DateTimePicker
            placeholder="请选择日期时间"
            defaultValue="2023-08-10"
            onOk={handleOk}
            onDismiss={handleClose}
          />
        </Form.Item>
      </Form>
      <Form requiredMarkStyle='text-optional' fieldid="form-demo-6">
        <Form.Header>文字-选填</Form.Header>
        <Form.Item name='name' label='申请人' rules={[{ required: true }]}>
          <Input placeholder='请输入' defaultValue='李三四' style={{ "--mui-input-size-height-input": "0.46rem" }} />
        </Form.Item>
        <Form.Item name='address' label='申请类型'>
          <Radio.Control dataSource={selectData} label='单选框' mode='list' showCloseButton title="申请类型" placeholder='请选择'>
          </Radio.Control>
        </Form.Item>
        <Form.Item name='date' label='申请日期'>
          <DateTimePicker
            placeholder="请选择日期时间"
            defaultValue="2023-08-10"
            onOk={handleOk}
            onDismiss={handleClose}
          />
        </Form.Item>
      </Form>

      <h3>不展示必填标识</h3>
      <Form requiredMarkStyle='none' layout='horizontal' className="demo-form-no-mark" fieldid="form-demo-7">
        <Form.Item name='name0' label='标题示意' rules={[{ required: true }]}>
          <Input defaultValue="录入内容" readOnly />
        </Form.Item>
        <Form.Item name='name1' label='标题示意' rules={[{ required: true }]}>
          <Input defaultValue="--" readOnly />
        </Form.Item>
        <Form.Item name='name2' label='标题示意' rules={[{ required: true }]}>
          <Input defaultValue="录入内容" readOnly />
        </Form.Item>
        <Form.Item name='name3' label='最多单行六字' rules={[{ required: true }]}>
          <TextArea defaultValue="需要显示的内容非常多直接折行显示需要显示的内容非常多" readOnly rows={2} />
        </Form.Item>
      </Form>

    </div>
  )
}
