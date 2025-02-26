/**
 *
 * @title 表单方法调用（Hook组件）
 * @description 通过Form.useForm对表单数据进行交互，基于React Hook实现，仅适用于函数组件，class组件参见上面示例。
 */
import {Button, DatePicker, Form, Input, Select} from '@tinper/next-ui'
import React from 'react'

const {RangePicker} = DatePicker
const {Option} = Select
const formItemLayout = {
    labelCol: {
        xs: {span: 4},
        sm: {span: 4}
    },
    wrapperCol: {
        xs: {span: 8},
        sm: {span: 8}
    }
}

const initialValues = {
    hobby: 'go home',
    gender: 'female',
    date: '1990:12:08 12:12:12',
    range: ['1980-04-12', '2030-04-12']
}

const validateMessages = {
    required: '必填项没填写完全'
}

const Demo2 = () => {
    const [form] = Form.useForm()

    const onGenderChange = (value: string) => {
        switch (value) {
            case 'male':
                form.setFieldsValue({hobby: '玩具总动员!'})
                return
            case 'female':
                form.setFieldsValue({hobby: '冰雪奇缘!'})
                return
            default:
		            break;
        }
    }

    const onFinish = (values: any) => {
        console.log('AAA-onFinish', values)
    }

    const onFieldsChange = (changedFields: any, allFields: any) => {
        console.log('AAA-onFieldsChange-onFieldsChange', changedFields);
        console.log('AAA-onFieldsChange-allFields', allFields);
    }

    const onValuesChange = (changedFields: any, allFields: any) => {
        console.log('AAA-onValuesChange-onFieldsChange', changedFields);
        console.log('AAA-onValuesChange-allFields', allFields);
    }

    const onFinishFailed = (value: any) => {
        console.log('AAA-onFinishFailed', value)
    }

    const onReset = () => {
        form.resetFields()
    }

    const onFill = () => {
        form.setFieldsValue({
            hobby: '飞屋环游记!',
            gender: 'male',
            date: '2022-02-02 11:11:11',
            range: ['2011-01-01', '3033-03-03']
        })
    }

    const submit = () => {
        form.submit()
        console.log('AAA-form.submit')
    }

    return (
        <Form
            form={form}
            {...formItemLayout}
            name='control-ref-hook'
            onFinish={onFinish}
            onFieldsChange={onFieldsChange}
            onValuesChange={onValuesChange}
            onFinishFailed={onFinishFailed}
            initialValues={initialValues}
            validateMessages={validateMessages}
        >
            <Form.Item label='爱好' name='hobby' colon rules={[{required: true}]}>
                <Input showClose />
            </Form.Item>

            <Form.Item label='性别' name='gender' colon rules={[{required: true}]}>
                <Select onChange={onGenderChange} allowClear>
                    <Option value='male'>男</Option>
                    <Option value='female'>女</Option>
                </Select>
            </Form.Item>

            <Form.Item
                name='date'
                label='DatePicker'
                rules={[
                    {
                        required: true,
                        message: 'Please select your date!'
                    }
                ]}
            >
                <DatePicker showTime format='YYYY-MM-DD HH:mm:ss'/>
            </Form.Item>

            <Form.Item
                name='range'
                label='RangePicker'
                rules={[
                    {
                        required: true,
                        message: 'Please select your RangePicker!',
                        type: 'array'
                    }
                ]}
            >
                <RangePicker/>
            </Form.Item>

            <Form.Item label=' '>
                <Button type='primary' htmlType='submit' style={{marginRight: 10}}>
					Submit
                </Button>
                <Button htmlType='button' onClick={onReset} style={{marginRight: 10}}>
					Reset
                </Button>
                <Button htmlType='button' onClick={submit} style={{marginRight: 10}}>
					Form Submit
                </Button>
                <Button type='link' htmlType='button' onClick={onFill}>
					Fill form
                </Button>
            </Form.Item>
        </Form>
    )
}

export default Demo2
