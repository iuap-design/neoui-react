/**
 *
 * @title 输入实时校验
 * @description 校验示例
 */
import {Button, Form, Input, InputNumber} from '@tinper/next-ui'
import React, {Component} from 'react'

const {InputNumberGroup} = InputNumber

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

const salaryReg = (_rule: any, value: number[], callback: (msg?: string) => void) => {
    const {min, max} = _rule
    if (value[0] < min) {
        callback('最小值不小于100')
    } else if (value[1] && value[1] > max) {
        callback('最大值不大于200')
    } else if (value[0] && value[1] && value[1] < value[0]) {
        callback('第二个值必须大于等于第一个值')
    } else {
        callback()
    }
}

const Demo5 = Form.createForm()(
    class Demo5 extends Component {
        render() {
            const layout = {
                labelCol: {span: 4},
                wrapperCol: {span: 8}
            }
            return (
                <div className='demo5'>
                    <Form {...layout}>
                        <Form.Item
                            label='用户名'
                            name='demo5-username'
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

                        <Form.Item
                            label='期望薪资'
                            name='demo5-salary'
                            validateTrigger='onChange'
                            rules={[
                                {
                                    min: 100,
                                    max: 200,
                                    validator: salaryReg
                                }
                            ]}
                        >
                            <InputNumberGroup placeholder={['请输入最小值', '请输入最大值']} />
                        </Form.Item>

                        <Form.Item label=' '>
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
    }
)
export default Demo5
