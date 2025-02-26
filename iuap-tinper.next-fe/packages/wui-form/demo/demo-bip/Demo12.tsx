/**
 *
 * @title validator
 * @description 注册新用户。
 */
import React from 'react'
import {Button, Form, Input, Select, Checkbox} from '@tinper/next-ui'
const {Option} = Select

const formItemLayout = {
    labelCol: {span: 4},
    wrapperCol: {span: 8}
}
const tailFormItemLayout = {
    wrapperCol: {
        xs: {
            span: 4,
            offset: 0
        },
        sm: {
            span: 8,
            offset: 4
        }
    }
}

const App: React.FC = () => {
    const [form] = Form.useForm()

    const onFinish = (values: any) => {
        console.log('Received values of form: ', values)
    }

    return (
        <Form {...formItemLayout} form={form} name='register' onFinish={onFinish} scrollToFirstError>
            <Form.Item
                name='email'
                label='E-mail'
                rules={[
                    {
                        type: 'email',
                        message: 'The input is not valid E-mail!'
                    },
                    {
                        required: true,
                        message: 'Please input your E-mail!'
                    }
                ]}
            >
                <Input />
            </Form.Item>

            <Form.Item
                name='password'
                label='Password'
                rules={[
                    {
                        required: true,
                        message: 'Please input your password!'
                    }
                ]}
                hasFeedback
            >
                <Input.Password />
            </Form.Item>

            <Form.Item
                name='confirm'
                label='Confirm Password'
                dependencies={['password']}
                hasFeedback
                rules={[
                    {
                        required: true,
                        message: 'Please confirm your password!'
                    },
                    ({getFieldValue}) => ({
                        validator(_, value) {
                            if (!value || getFieldValue('password') === value) {
                                return Promise.resolve()
                            }
                            return Promise.reject(new Error('The two passwords that you entered do not match!'))
                        }
                    })
                ]}
            >
                <Input.Password />
            </Form.Item>

            <Form.Item
                name='nickname'
                label='Nickname'
                tooltip='What do you want others to call you?'
                rules={[
                    {
                        validator: (_, value) =>
                            value ? Promise.resolve() : Promise.reject(new Error('Please input your nickname!'))
                    }
                ]}
            >
                <Input />
            </Form.Item>

            <Form.Item name='intro' label='Intro' rules={[{required: true, message: 'Please input Intro'}]}>
                <Input.TextArea showMaxLabel maxLength={100} />
            </Form.Item>

            <Form.Item name='gender' label='Gender' rules={[{required: true, message: 'Please select gender!'}]}>
                <Select placeholder='select your gender'>
                    <Option value='male'>Male</Option>
                    <Option value='female'>Female</Option>
                    <Option value='other'>Other</Option>
                </Select>
            </Form.Item>

            <Form.Item
                name='agreement'
                valuePropName='checked'
                rules={[
                    {
                        validator: (_, value) =>
                            value ? Promise.resolve() : Promise.reject(new Error('Should accept agreement'))
                    }
                ]}
                {...tailFormItemLayout}
            >
                <Checkbox>
                    I have read the <a href=''>agreement</a>
                </Checkbox>
            </Form.Item>
            <Form.Item {...tailFormItemLayout}>
                <Button type='primary' htmlType='submit'>
                    Register
                </Button>
            </Form.Item>
        </Form>
    )
}

export default App
