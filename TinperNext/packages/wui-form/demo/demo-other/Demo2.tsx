/**
 *
 * @title 输入实时校验
 * @description 校验示例
 */
import {Button, Form, Input, InputNumber} from '@tinper/next-ui'
import React from 'react'

const Demo2 = () => {
    const [form] = Form.useForm()

    const userNameReg = (_rule: any, value: string, callback: (msg?: string) => void) => {
        const reg = /^[a-zA-Z0-9\u4e00-\u9fa5][_a-zA-Z0-9\u4e00-\u9fa5]*$/g
        if (!value) {
            callback('不能为空')
        } else if (!reg.test(value)) {
            callback('仅支持汉字/字母/数字/下划线，不能以下划线开头')
        } else if (value.length > 5) {
            callback('不能超过5个字符')
        } else {
            callback()
        }
    }

    const salaryMinReg = (_rule: any, value: number, callback: (msg?: string) => void) => {
        const {min, max} = _rule
        if (value < min) {
            callback('最小值不小于50')
        } else if (value && value > max) {
            callback('最大值不大于100')
        } else if (!value && value !== 0) {
            callback('请输入最小值')
        } else {
            callback()
        }
    }

    const salaryMaxReg = (_rule: any, value: number, callback: (msg?: string) => void) => {
        const {min, max} = _rule
        const {['demo5-salary-min']: minValue} = form.getFieldsValue(['demo5-salary-min'])
        if (!value && value !== 0) {
            callback('请输入最大值')
        } else if (value < min) {
            callback('最小值不小于100')
        } else if (value > max) {
            callback('最大值不大于200')
        } else if (minValue && value < minValue) {
            callback('第二个值必须大于等于第一个值')
        } else {
            callback()
        }
    }

    return (
        <div className='demo2 form-other-demo2'>
            <Form form={form}>
                <Form.Item
                    label='用户名'
                    name='demo5-username'
                    className='form-item-style'
                    validateTrigger='onChange'
                    rules={[
                        {
                            required: true,
                            validator: userNameReg
                        }
                    ]}
                >
                    <Input placeholder='仅支持汉字/字母/数字/下划线' />
                </Form.Item>

                <div style={{display: 'flex'}}>
                    <Form.Item
                        label='期望薪资'
                        name='demo5-salary-min'
                        className='form-item-inline-before'
                        validateTrigger='onChange'
                        rules={[
                            {
                                min: 50,
                                max: 150,
                                validator: salaryMinReg
                            }
                        ]}
                    >
                        <InputNumber placeholder={'请输入最小值'} />
                    </Form.Item>
                    <Form.Item
                        label='~'
                        name='demo5-salary-max'
                        className='form-item-inline-after'
                        validateTrigger='onChange'
                        rules={[
                            {
                                min: 100,
                                max: 200,
                                validator: salaryMaxReg
                            }
                        ]}
                    >
                        <InputNumber placeholder={'请输入最大值'} />
                    </Form.Item>
                </div>

                <Form.Item label=' ' className='form-item-style'>
                    <Button colors='secondary' style={{marginRight: '8px'}}>
                        取消
                    </Button>
                    <Button colors='primary' htmlType='submit' className='login'>
                        登录
                    </Button>
                </Form.Item>
            </Form>
        </div>
    )
}

export default Demo2
