/**
 * @title Form.Subscribe 动态说明文字
 * @description 表单动态说明文字示例
 * @compact true
 */
import React from 'react'
import { Form, Input, Button, Radio } from '@tinper/m'
import './demo.less'

export default function () {
  const [form] = Form.useForm()

  return (
    <div className="form-demo">
      <Form
        fieldid="form-demo-12"
        className="demo-form-header-h demo4-form"
        form={form}
        layout='horizontal'
        initialValues={{
          loginMethod: 'mobile',
          account: '1961234123',
        }}
        footer={
          <>
            <Form.Subscribe to={['loginMethod', 'account']}>
              {({ loginMethod, account }) => (
                <div
                  style={{
                    marginBottom: '0.26rem',
                    fontSize: '0.3rem',
                    lineHeight: '0.46rem',
                    overflow: 'hidden',
                    wordWrap: 'break-word',
                    textOverflow: 'ellipsis',
                    color: 'var(--mui-color-weak)',
                  }}
                >
                  你将使用 {loginMethod === 'mobile' ? '手机号' : '邮箱'}{' '}
                  {account} 登录
                </div>
              )}
            </Form.Subscribe>
            <Button block type='submit' mode='primary' size='large'>
              提交
            </Button>
          </>
        }
      >
        <Form.Header>动态说明文字</Form.Header>
        <Form.Item name='loginMethod' label='登录方式'>
          <Radio.Group>
            <Radio value='mobile'>手机号</Radio>
            <Radio value='email'>邮箱</Radio>
          </Radio.Group>
        </Form.Item>

        <Form.Subscribe to={['loginMethod']}>
          {({ loginMethod }) => (
            <>
              {loginMethod === 'mobile' && (
                <Form.Item name='account' label='手机号'>
                  <Input placeholder='请输入手机号' />
                </Form.Item>
              )}
              {loginMethod === 'email' && (
                <Form.Item name='account' label='邮箱'>
                  <Input placeholder='请输入邮箱' />
                </Form.Item>
              )}
            </>
          )}
        </Form.Subscribe>
      </Form>

      <UseWatch />

      <WarningOnlyDemo />
    </div>
  )
}

const WarningOnlyDemo = () => {
  const onFinish = (values: any) => {
    console.log(values)
  }

  return (
    <Form
      fieldid="form-demo-11"
      className="demo-form-header-h"
      onFinish={onFinish}
      footer={
        <Button block type='submit' mode='primary' size='large'>
          提交
        </Button>
      }
    >
      <Form.Header >非阻塞校验</Form.Header>
      <Form.Item
        name='email'
        label='邮箱'
        rules={[
          { required: true },
          { type: 'string', min: 6 },
          { type: 'email', warningOnly: true },
        ]}
      >
        <Input placeholder='请输入邮箱' style={{ "--mui-input-size-height-input": "0.46rem" }} />
      </Form.Item>
    </Form>
  )
}

type FieldType = { account?: string; loginMethod?: 'mobile' | 'email' }

const UseWatch =  () => {
  const [form] = Form.useForm<FieldType>()
  const account = Form.useWatch('account', form)
  const loginMethod = Form.useWatch('loginMethod', form)

  return (
    <Form
      form={form}
      className="demo-form-header-h demo4-form"
      layout='horizontal'
      initialValues={{ loginMethod: 'mobile', account: '123' }}
      footer={
        <>
          <div
            style={{
              marginBottom: '0.26rem',
              fontSize: '0.3rem',
              lineHeight: '0.46rem',
              color: 'var(--mui-color-weak)',
            }}
          >
            你将使用 {loginMethod === 'mobile' ? '手机号' : '邮箱'} {account}{' '}
            登录
          </div>
          <Button block type='submit' mode='primary' size='large'>
            提交
          </Button>
        </>
      }
    >
      <Form.Header>useWatch</Form.Header>
      <Form.Item name='loginMethod' label='登录方式'>
        <Radio.Group>
            <Radio value='mobile'>手机号</Radio>
            <Radio value='email'>邮箱</Radio>
        </Radio.Group>
      </Form.Item>

      <>
        {loginMethod === 'mobile' && (
          <Form.Item name='account' label='手机号'>
            <Input placeholder='请输入手机号' />
          </Form.Item>
        )}
        {loginMethod === 'email' && (
          <Form.Item name='account' label='邮箱'>
            <Input placeholder='请输入邮箱' />
          </Form.Item>
        )}
      </>
    </Form>
  )
}