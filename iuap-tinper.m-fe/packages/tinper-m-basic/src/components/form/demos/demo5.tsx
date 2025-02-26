/**
 * @title Form.Array 新增表单项、错误提示特殊场景
 * @description 新增表单项示例
 * @compact true
 */
import React, { useState } from 'react'
import { Form, Input, Button, Icon } from '@tinper/m'
import '@tinper/m-icons/lib/iconfont/iconfont.js'
import './demo.less'

export default () => {
    const [requiredFocus, setRequiredFocus] = useState(true)
    const [requiredFocus1, setRequiredFocus1] = useState(true)

    const onFinish = (values: any) => {
        console.log(values)
    }

    return (
        <div className="form-demo">
            <h3>新增表单项</h3>
            <Form
                fieldid="form-demo-13"
                className="demo5-form"
                onFinish={onFinish}
                initialValues={{
                    contacts: [{}],
                }}
                footer={
                    <Button block type='submit' mode='primary' size='large'>
                        提交
                    </Button>
                }
                mode='card'
            >
                <Form.Item name={'name'} label='客户名称'>
                    <Input placeholder='请输入客户名称' style={{ "--mui-input-size-height-input": "0.46rem" }} />
                </Form.Item>

                <Form.Array
                    name='contacts'
                    onAdd={operation => operation.add({ name: '张三' })}
                    renderAdd={() => (
                        <span className="demo5-add-span-wrapper">
                            <Icon type='arcplus-circle' style={{ width: '0.36rem', height: '0.36rem' }} />
                            <span className="demo5-add-span">添加</span>
                        </span>
                    )}
                    renderHeader={({ index }, { remove }) => (
                        <>
                            <span>联系人{index + 1}</span>
                            <a onClick={() => remove(index)} style={{ float: 'right' }}>
                                删除
                            </a>
                        </>
                    )}
                >
                    {fields =>
                        fields.map(({ index }) => (
                            <>
                                <Form.Item
                                    name={[index, 'name']}
                                    label='姓名'
                                    rules={[{ required: true, message: '姓名不能为空' }]}
                                >
                                    <Input placeholder='请输入姓名' style={{ "--mui-input-size-height-input": "0.46rem" }} />
                                </Form.Item>
                                <Form.Item name={[index, 'address']} label='地址'>
                                    <Input placeholder='请输入地址' style={{ "--mui-input-size-height-input": "0.46rem" }} />
                                </Form.Item>
                            </>
                        ))
                    }
                </Form.Array>
            </Form>

            <h3>错误提示</h3>
            <Form
                layout='horizontal'
                footer={
                    <Button block type='submit' mode='primary' size='large'>
                        提交
                    </Button>
                }
            >
                <Form.Item
                    name='a'
                    label='字段A'
                    rules={[{ required: true, message: '字段A不能为空' }]}
                    showErrorIcon={requiredFocus}
                    showFeedbackError={!requiredFocus}
                >
                    <Input
                        placeholder='请输入字段A'
                        onFocus={() => setRequiredFocus(false)}
                        onBlur={() => setRequiredFocus(true)} />
                </Form.Item>
                <Form.Item
                    name='b'
                    label='字段B'
                    rules={[{ required: true, message: '字段B不能为空' }]}
                    showErrorIcon={requiredFocus1}
                    showFeedbackError={!requiredFocus1}
                >
                    <Input
                        placeholder='请输入字段B'
                        onFocus={() => setRequiredFocus1(false)}
                        onBlur={() => setRequiredFocus1(true)} />
                </Form.Item>
            </Form>
        </div>
    )
}