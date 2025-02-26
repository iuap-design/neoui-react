/**
 *
 * @title 表单方法调用（Class组件）
 * @description class组件下，可通过ref获取数据域
 */
import {Button, DatePicker, Form, Input, Select} from '@tinper/next-ui'
import React, {Component} from 'react'

const {Option} = Select
const {RangePicker} = DatePicker
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
// @ts-ignore
const Demo7 = Form.create()(
    class Demo extends Component {
        constructor(props: {}) {
            super(props)
        }

		formRef: React.RefObject<any> = React.createRef()

		onGenderChange = (value: any) => {
		    switch (value) {
		    case 'male':
		        this.formRef.current?.setFieldsValue({hobby: '玩具总动员!'})
		        return
		    case 'female':
		        this.formRef.current?.setFieldsValue({hobby: '冰雪奇缘!'})
		        return
		        default:
		            break;
		    }
		}

		onFinish = (values: any) => {
		    console.log(values)
		}

		onReset = () => {
		    this.formRef.current?.resetFields()
		}

		onFill = () => {
		    this.formRef.current?.setFieldsValue({
		        hobby: '飞屋环游记!',
		        gender: 'male',
		        date: '2022-02-02',
		        range: ['2011-01-01', '3033-03-03']
		    })
		}

		render() {
		    return (
		        <Form
		            ref={this.formRef}
		            {...formItemLayout}
		            name='control-ref-class'
		            onFinish={this.onFinish}
		        >
		            <Form.Item
		                label='爱好'
		                name='hobby'
		                colon
		                rules={[{required: true}]}
		            >
		                <Input/>
		            </Form.Item>

		            <Form.Item
		                label='性别'
		                name='gender'
		                colon
		                rules={[{required: true}]}
		            >
		                <Select onChange={this.onGenderChange} allowClear>
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
		                <DatePicker/>
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
		                <Button type='primary' htmlType='submit'>
							Submit
		                </Button>
		                <Button htmlType='button' onClick={this.onReset}>
							Reset
		                </Button>
		                <Button type='link' htmlType='button' onClick={this.onFill}>
							Fill form
		                </Button>
		            </Form.Item>
		        </Form>
		    )
		}
    }
)

export default Demo7
