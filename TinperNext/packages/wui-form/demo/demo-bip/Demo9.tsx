/**
 *
 * @title 动态校验(Hook组件)
 * @description 表单数据校验
 */
import {Button, Checkbox, Form, Input} from '@tinper/next-ui'
import React, {useEffect, useState} from 'react'

const formItemLayout = {
    labelCol: {
        span: 4
    },
    wrapperCol: {
        span: 8
    }
}
const Demo9 = () => {
    const [form] = Form.useForm()
    const [checkNick, setCheckNick] = useState(false)

    useEffect(() => {
        form.validateFields(['nickname'])
    }, [checkNick])

    const onCheckboxChange = (checked: boolean) => {
        setCheckNick(checked)
    }

    const onCheck = async() => {
        try {
            const values = await form.validateFields()
            console.log('Success:', values)
        } catch (errorInfo) {
            console.log('Failed:', errorInfo)
        }
    }

    return (
        <Form form={form} {...formItemLayout}>
            <Form.Item
                name='demo9-username'
                label='用户名'
                rules={[
                    {
                        required: true,
                        message: '请输入用户名'
                    }
                ]}
            >
                <Input placeholder='请输入用户名'/>
            </Form.Item>
            <Form.Item
                name='nickname'
                label='昵称'
                rules={[
                    {
                        required: checkNick,
                        message: '请输入昵称'
                    }
                ]}
            >
                <Input placeholder='请输入昵称'/>
            </Form.Item>
            <Form.Item label=' '>
                <Checkbox checked={checkNick} onChange={onCheckboxChange}>
					昵称是必填项
                </Checkbox>
            </Form.Item>
            <Form.Item label=' '>
                <Button type='primary' onClick={onCheck}>
					提交
                </Button>
            </Form.Item>
        </Form>
    )
}

export default Demo9
