/**
 * @title 自定义控件、表单方法调用
 * @description 表单自定义控件、表单方法调用示例
 * @compact true
 */
import React, { useState } from 'react'
import type { FC } from 'react'
import { Form, Input, Button, Picker, Icon, Checkbox, FormInstance } from '@tinper/m'
import '@tinper/m-icons/lib/iconfont/iconfont.js'
import './demo.less'

interface MobileValue {
  preValue: string | number
  realValue: string
}

export default () => {
  const onFinish = (values: any) => {
    console.log(values)
  }

  const checkMobile = (_: any, value: MobileValue) => {
    if (value.realValue) {
      return Promise.resolve()
    }
    return Promise.reject(new Error('手机号不能为空!'))
  }

  return (
    <div className="form-demo">
      <Form
        fieldid="form-demo-9"
        className="demo-form-header-h"
        layout='vertical'
        onFinish={onFinish}
        initialValues={{
          mobile: { preValue: '86', realValue: '' },
        }}
        footer={
          <Button block type='submit' mode='primary' size='large'>
            提交
          </Button>
        }
      >
        <Form.Header>自定义控件</Form.Header>
        <Form.Item
          label='姓名'
          name='name'
          rules={[{ required: true, message: '姓名不能为空!' }]}
        >
          <Input placeholder='请输入姓名' style={{ "--mui-input-size-height-input": "0.46rem" }} />
        </Form.Item>
        <Form.Item
          label='手机号'
          name='mobile'
          rules={[{ required: true }, { validator: checkMobile }]}
        >
          <MobileField />
        </Form.Item>
      </Form>

      <RefDemo />
    </div>
  )
}

const columns = [['86', '01', '02', '03']]

interface MobileFieldProps {
  value?: MobileValue
  onChange?: (value: MobileValue) => void
}

const MobileField: FC<MobileFieldProps> = ({
  value = { preValue: '86', realValue: '' },
  onChange,
}) => {
  const [visible, setVisible] = useState(false)

  const triggerValue = (changedValue: Partial<MobileValue>) => {
    onChange?.({ ...value, ...changedValue })
  }

  const onRealValueChange = (value: string) => {
    triggerValue({ realValue: value })
  }

  const onPreValueChange = (value) => {
    const v = value[0]
    if (v === null) return
    triggerValue({ preValue: v })
  }
  return (
    <>
      <div style={{ display: 'inline-flex', alignItems: 'center' }}>
        <div onClick={() => setVisible(true)} style={{ display: 'inline-flex' }}>
          <div>+{value.preValue}</div>
          <Icon type='arcchevron-down' />
        </div>
        <Input
          placeholder='请输入手机号'
          value={value.realValue}
          onChange={onRealValueChange}
          style={{ "--mui-input-size-height-input": "0.46rem" }}
        />
      </div>
      <Picker
        columns={columns}
        visible={visible}
        onClose={() => {
          setVisible(false)
        }}
        value={[value.preValue]}
        onConfirm={onPreValueChange}
      />
    </>
  )
}

class RefDemo extends React.Component {
  formRef = React.createRef<FormInstance>()

  componentDidMount() {
    this.formRef.current?.setFieldsValue({ a: 'TinperM', b: ['2'] })
  }

  render() {
    return (
      <Form
        fieldid="form-demo-10"
        className="demo-form-header-h"
        ref={this.formRef}
        layout='horizontal'
        footer={
          <Button
            block
            mode='primary'
            onClick={() => {
              this.formRef.current?.resetFields()
            }}
            size='large'
          >
            重置
          </Button>
        }
      >
        <Form.Header>表单方法调用（Class component）</Form.Header>
        <Form.Item
          name='a'
          label='字段A'
          rules={[{ required: true, message: '字段A不能为空' }]}
        >
          <Input placeholder='请输入字段A' />
        </Form.Item>
        <Form.Item name='b' label='字段B' required className="space-vertical space-vertical-no-bg">
          <Checkbox.Group>
            <Checkbox value='1'>选项1</Checkbox>
            <Checkbox value='2'>选项2</Checkbox>
            <Checkbox value='3'>选项3</Checkbox>
          </Checkbox.Group>
        </Form.Item>
      </Form>
    )
  }
}
