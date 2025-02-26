/**
 *
 * @title form校验样式
 * @description 注册示例， 目前推荐使用form注入，如果需要用旧版本，不能通过props取form只能通过refs去取
 */
import {Button, Checkbox, DatePicker, Form, Icon, Input, InputNumber, TimePicker} from '@tinper/next-ui'
import React, {Component} from 'react'

const {RangePicker} = DatePicker

const Demo3 = Form.createForm()(
    class Demo extends Component<{}, {}> {
        form: React.RefObject<any>

        constructor(props: {}) {
            super(props)
            this.form = React.createRef()
        }

        submit = (e: React.MouseEvent) => {
            e.preventDefault()
            this.form.current
                .validateFields()
                .then((...val: string[]) => {
                    console.log(val)
                })
                .catch((errInfo: string) => {
                    console.log(errInfo)
                })
        }
        handleConfirmPassword = (_rule: any, value: string, callback: (e?: any) => void) => {
            const {getFieldValue} = this.form.current
            if (value && value !== getFieldValue('password')) {
                callback(
                    //  支持string、ReactElement
                    <span>
                        <Icon type='uf-exc-t'></Icon>
                        <span>两次输入不一致！</span>
                    </span>
                )
            }
            callback()
        }

        onFieldsChange = (changedFields: Object[], allFields: Object[]) => {
            console.log(changedFields, allFields)
        }

        render() {
            const layout = {
                labelCol: {span: 4},
                wrapperCol: {span: 18}
            }
            return (
                <div className='demo3'>
                    <Form
                        ref={this.form}
                        {...layout}
                        onFieldsChange={this.onFieldsChange}
                        initialValues={{checkbox: true}}
                    >
                        <Form.Item
                            size='xs'
                            label='用户名'
                            name={['user', 'name']}
                            validateStatus='error'
                            hasFeedback
                            extra='我是extra配置的文本'
                            help='我是help信息'
                            rules={[
                                {
                                    required: true,
                                    message: '请输入用户名'
                                },
                                {
                                    pattern: /^[a-zA-Z0-9]+$/,
                                    message: '用户名格式错误'
                                }
                            ]}
                        >
                            <Input showClose placeholder='请输入用户名(仅支持数字、字母)' size='xs' />
                        </Form.Item>

                        <Form.Item
                            size='xs'
                            label='地址'
                            name={['user', 'address']}
                            validateStatus='warning'
                            hasFeedback
                            rules={[
                                {
                                    required: true,
                                    message: '请输入地址'
                                }
                            ]}
                        >
                            <Input placeholder='请输入地址' size='xs' />
                        </Form.Item>

                        <Form.Item
                            label='密码'
                            name='demo3-password'
                            validateStatus='validating'
                            hasFeedback
                            rules={[
                                {
                                    required: true,
                                    message: <span>请输入密码</span>
                                }
                            ]}
                        >
                            <Input placeholder='请输入密码' type='password' />
                        </Form.Item>

                        <Form.Item
                            label='再次输入密码'
                            name='password2'
                            validateStatus='validating'
                            hasFeedback
                            rules={[
                                {
                                    required: true,
                                    message: <span>请再次输入密码</span>
                                },
                                {
                                    validator: this.handleConfirmPassword
                                }
                            ]}
                        >
                            <Input placeholder='请再次输入密码' type='password' />
                        </Form.Item>

                        <Form.Item
                            size='xs'
                            label='幸运数字'
                            name='demo3-inputNumber'
                            validateStatus='validating'
                            hasFeedback
                            rules={[
                                {
                                    required: true,
                                    message: (
                                        <div>
                                            <span>请输入幸运数</span>
                                        </div>
                                    )
                                }
                            ]}
                        >
                            <InputNumber placeholder='请输入幸运数字' size='xs' />
                        </Form.Item>

                        <Form.Item
                            label='邮箱'
                            name='email'
                            validateStatus='success'
                            hasFeedback
                            rules={[
                                {
                                    required: true,
                                    message: '请输入邮箱'
                                },
                                {
                                    type: 'email',
                                    message: '邮箱格式不正确'
                                }
                            ]}
                        >
                            <Input placeholder='请输入邮箱' />
                        </Form.Item>

                        <Form.Item
                            label='手机号'
                            name='phone'
                            rules={[
                                {
                                    required: true,
                                    message: '请输入手机号'
                                },
                                {
                                    pattern: /^\d{11}$/,
                                    message: '手机号格式不正确'
                                }
                            ]}
                        >
                            <Input placeholder='请输入手机号' />
                        </Form.Item>

                        <Form.Item
                            size='xs'
                            label='日期'
                            name='demo3-date'
                            validateStatus='warning'
                            hasFeedback
                            rules={[
                                {
                                    required: true,
                                    message: (
                                        <div>
                                            <span>请选择日期</span>
                                        </div>
                                    )
                                }
                            ]}
                        >
                            <DatePicker size='xs' />
                        </Form.Item>

                        <Form.Item
                            size='xs'
                            label='日期范围'
                            name='dateRange'
                            validateStatus='success'
                            hasFeedback
                            rules={[
                                {
                                    required: true,
                                    message: (
                                        <div>
                                            <span>请选择日期范围</span>
                                        </div>
                                    )
                                }
                            ]}
                        >
                            <RangePicker size='xs' />
                        </Form.Item>

                        <Form.Item
                            size='xs'
                            label='时间'
                            name='time'
                            validateStatus='warning'
                            hasFeedback
                            rules={[
                                {
                                    required: true,
                                    message: (
                                        <div>
                                            <span>请选择时间</span>
                                        </div>
                                    )
                                }
                            ]}
                        >
                            <TimePicker format='HH:mm:ss' use12Hours placeholder='选择时间' size='xs' />
                        </Form.Item>

                        <Form.Item
                            size='xs'
                            label='建议'
                            name='suggestion'
                            validateStatus='error'
                            hasFeedback
                            rules={[
                                {
                                    required: true,
                                    message: '请输入建议'
                                }
                            ]}
                        >
                            <Input type='textarea' placeholder='请输入建议' size='xs' />
                        </Form.Item>

                        <Form.Item label=' ' name='checkbox'>
                            <Checkbox>我已经阅读并同意相关条款</Checkbox>
                        </Form.Item>
                        <Form.Item label=' '>
                            <Button colors='secondary' className='reset' style={{marginRight: '8px'}}>
                                取消
                            </Button>
                            <Button colors='primary' className='login' htmlType='submit'>
                                注册
                            </Button>
                            <Button colors='primary' className='login' onClick={this.submit}>
                                注册
                            </Button>
                        </Form.Item>
                    </Form>
                </div>
            )
        }
    }
)
export default Demo3
