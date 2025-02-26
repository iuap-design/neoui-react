/**
 *
 * @title 表单禁用
 * @description 设置表单组件禁用，仅对 tinper 组件有效。
 */

import {
    Button,
    DatePicker,
    Form,
    InputNumber,
    Select,
    TimePicker,
    Input,
    Switch,
} from '@tinper/next-ui'
import React, {useState} from 'react'

const {Option} = Select
const {RangePicker} = DatePicker

const formItemLayout = {
    labelCol: {span: 4},
    wrapperCol: {span: 8}
}

const Demo3 = () => {
    const [status, setStatus] = useState(true)

    const change = (b: boolean) => {
        setStatus(b)
    }

    return (
        <>
            <div style={{marginLeft: 50, marginBottom: 20}}>disabled: <Switch checked={status} onChange={change} /></div>
            <Form
                name='validate_other'
                {...formItemLayout}
                initialValues={{
                    input: 'luma',
                    'input-number': 3,
                    rate: 3.5,
                    time: '12:20:25',
                    date: '2021-05-15'
                }}
                disabled={status}
            >

                <Form.Item label='input' name='input'
                    rules={[{required: true, message: 'Please enter content!'}]}
                >
                    <Input placeholder={'Please enter content...'} />
                </Form.Item>
                <Form.Item label='InputNumber' name='input-number'
                    rules={[{required: true, message: 'Please enter content!'}]}
                >
                    <InputNumber min={1} max={10}/>
                </Form.Item>

                <Form.Item name='time' label='TimePicker'>
                    <TimePicker/>
                </Form.Item>

                <Form.Item
                    name='select'
                    label='Select'
                    rules={[{required: true, message: 'Please select your country!'}]}
                >
                    <Select placeholder='Please select a country'>
                        <Option value='usa'>U.S.A</Option>
                        <Option value='china'>China</Option>
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
                </Form.Item>
            </Form>
        </>
    )
}
export default Demo3
