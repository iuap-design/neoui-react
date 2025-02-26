/**
 * @title 复杂逻辑
 * @description 复杂逻辑示例
 * @compact true
 */
import React, { useState } from 'react'
import {
  Form,
  Input,
  Button,
  Dialog,
  Checkbox,
  DatePicker,
  Icon,
  TextArea
} from '@tinper/m'
import dayjs from 'dayjs'
import '@tinper/m-icons/lib/iconfont/iconfont.js'
import './demo.less'

export default () => {
  const [form] = Form.useForm()
  const onSubmit = () => {
    const values = form.getFieldsValue()
    Dialog.alert({
      content: <TextArea readOnly value={JSON.stringify(values, null, 2)} autoSize={{ minRows: 4, maxRows: 10 }}></TextArea>,
    })
  }

  return (
    <div className="form-demo">
      <Form
        fieldid="form-demo-8"
        form={form}
        initialValues={{
          a: 'aaa',
          b: [],
        }}
        footer={
          <Button block mode='primary' onClick={onSubmit} size='large'>
            提交
          </Button>
        }
        className="demo-form-header-h"
      >
        <Form.Header>复杂逻辑</Form.Header>
        <Form.Item name='a' label='字段A' help={'描述内容'}>
          <Input placeholder='请输入' style={{ "--mui-input-size-height-input": "0.46rem" }} />
        </Form.Item>
        <Form.Item name='b' label='字段B' required className="space-vertical">
          <Checkbox.Group>
            <Checkbox value='1'>选项1</Checkbox>
            <Checkbox value='2'>选项2</Checkbox>
            <Checkbox value='3' disabled>
              选项3
            </Checkbox>
          </Checkbox.Group>
        </Form.Item>
        <Form.Item
          label='表单联动-字段B'
          description='相关描述内容'
          shouldUpdate={(prevValues, curValues) => prevValues.b !== curValues.b}
        >
          {({ getFieldValue }) => JSON.stringify(getFieldValue('b'))}
        </Form.Item>
        <DatePickerInputItem />
      </Form>
    </div>
  )
}

const DatePickerInputItem = () => {
  const [pickerVisible, setPickerVisible] = useState(false)

  return (
    <Form.Item
      noStyle
      shouldUpdate={(prevValues, curValues) =>
        prevValues.birthday !== curValues.birthday
      }
    >
      {({ getFieldValue, setFieldsValue }) => (
        <Form.Item
          name='birthday'
          label='带清除图标的时间选择器'
          trigger='onConfirm'
          arrow={
            getFieldValue('birthday') ? (
              <Icon
                type='arcclose-circle-Fill'
                onClick={e => {
                  e.stopPropagation()
                  setFieldsValue({ birthday: null })
                }}
                style={{
                  color: '#111',
                  width: '0.32rem',
                  height: '0.32rem',
                }} />
            ) : (
              true
            )
          }
          onClick={() => {
            setPickerVisible(true)
          }}
        >
          <DatePicker
            visible={pickerVisible}
            onClose={() => {
              setPickerVisible(false)
            }}
          >
            {value =>
              value ? dayjs(value).format('YYYY-MM-DD') : '请选择日期'
            }
          </DatePicker>
        </Form.Item>
      )}
    </Form.Item>
  )
}
