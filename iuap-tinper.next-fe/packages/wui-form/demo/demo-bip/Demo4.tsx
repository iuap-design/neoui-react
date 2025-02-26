/**
 *
 * @title 表单布局
 * @description 表单有三种布局。
 */
import {Button, Form, Input, Radio} from '@tinper/next-ui'
import React, {useState} from 'react'

const FormLayoutDemo = () => {
    const [form] = Form.useForm()
    const [formLayout, setFormLayout] = useState('inline')

    const onFormLayoutChange = ({layout}: {layout: string}) => {
        setFormLayout(layout)
    }

    const formItemLayout =
        formLayout === 'horizontal'
            ? {
                labelCol: {span: 4},
                wrapperCol: {span: 8}
            }
            : formLayout === 'vertical'
                ? {
                    labelCol: {span: 4, offset: 4},
                    wrapperCol: {span: 8, offset: 4}
                }
                : null

    return (
        <Form {...formItemLayout} layout={formLayout} form={form} onValuesChange={onFormLayoutChange}>
            <Form.Item label='Form Layout' name='layout'>
                <Radio.Group value={formLayout}>
                    <Radio.Button value='horizontal'>Horizontal</Radio.Button>
                    <Radio.Button value='vertical'>Vertical</Radio.Button>
                    <Radio.Button value='inline'>Inline</Radio.Button>
                </Radio.Group>
            </Form.Item>
            <Form.Item label='Field A'>
                <Input placeholder='input placeholder' />
            </Form.Item>
            <Form.Item label='Field B'>
                <Input placeholder='input placeholder' />
            </Form.Item>
            <Form.Item label='Field c'>
                <Input placeholder='input placeholder' />
            </Form.Item>
            <Form.Item label='Field d'>
                <Input placeholder='input placeholder' />
            </Form.Item>
            <Form.Item label='Field e'>
                <Input placeholder='input placeholder' />
            </Form.Item>
            <Form.Item label='Field f'>
                <Input placeholder='input placeholder' />
            </Form.Item>
            <Form.Item label='Field g'>
                <Input placeholder='input placeholder' />
            </Form.Item>
            <Form.Item label=' '>
                <Button type='primary' htmlType='submit'>
                    Submit
                </Button>
            </Form.Item>
        </Form>
    )
}
export default FormLayoutDemo
