/**
 *
 * @title 多个form
 * @description 校验示例
 */
import {Button, Form, Input, Tabs} from '@tinper/next-ui'
import React from 'react'
const { TabPane } = Tabs;
class Demo extends React.Component<any, {tabType: string}> {
    form: React.RefObject<any>;
    form1: React.RefObject<any>;
    form2: Record<number, React.RefObject<any>> = {};
    constructor(props: {}) {
        super(props)
        this.state = {
            tabType: '1'
        }
        this.form = React.createRef();
        this.form1 = React.createRef();
        [1, 2].map((_item, i) => {
            this.form2[i] = React.createRef();
        })
    }

    handleSubmit = () => {
        this.form.current.validateFields().then(
            (values: any) => {
                console.log('validateFields---values ', values)
            },
            (err: any) => {
                console.log('validateFields---errors ', err)
            })
    }

    handleSubmit1 = () => {
        this.form1.current.validateFields().then(
            (values: any) => {
                console.log('validateFields---values ', values)
            },
            (err: any) => {
                console.log('validateFields---errors ', err)
            })
    }

    handleSubmit2 = (index: number) => {
        this.form2[index].current.validateFields().then(
            (values: any) => {
                console.log('validateFields---values ', values)
            },
            (err: any) => {
                console.log('validateFields---errors ', err)
            })
    }

    reset = (ref: React.RefObject<any>) => {
        ref.current?.resetFields();
    }

    render() {
        return (
            <div className='demo2 form-other-demo2'>
                <Tabs type={this.state.tabType} defaultActiveKey="1">
	                <TabPane tab='Tab 1' key="1">
                        <Form ref={this.form}>
                            <Form.Item
                                label='姓名'
                                name='name'
                                className='form-item-style'
                                validateTrigger='onChange'
                                rules={[
                                    {
                                        required: true
                                    }
                                ]}
                            >
                                <Input placeholder='仅支持汉字/字母/数字/下划线' />
                            </Form.Item>
                            <Form.Item
                                label='地址'
                                name='address'
                                className='form-item-style'
                                validateTrigger='onChange'
                                rules={[
                                    {
                                        required: true
                                    }
                                ]}
                            >
                                <Input placeholder='仅支持汉字/字母/数字/下划线' />
                            </Form.Item>
                            <Form.Item label=' ' className='form-item-style'>
                                <Button colors='primary' onClick={this.handleSubmit}>
                                    提交
                                </Button>
                                <Button htmlType='button' onClick={() => {
                                    this.reset(this.form)
                                }}>
                                    重置
                                </Button>
                            </Form.Item>
                        </Form>
                    </TabPane>
	                <TabPane tab='Tab 2' key="2">
                        <Form ref={this.form1}>
                            <Form.Item
                                label='姓名'
                                name='name'
                                className='form-item-style'
                                validateTrigger='onChange'
                                rules={[
                                    {
                                        required: true
                                    }
                                ]}
                            >
                                <Input placeholder='仅支持汉字/字母/数字/下划线' />
                            </Form.Item>
                            <Form.Item
                                label='地址'
                                name='address'
                                className='form-item-style'
                                validateTrigger='onChange'
                                rules={[
                                    {
                                        required: true
                                    }
                                ]}
                            >
                                <Input placeholder='仅支持汉字/字母/数字/下划线' />
                            </Form.Item>
                            <Form.Item label=' ' className='form-item-style'>
                                <Button colors='primary' onClick={this.handleSubmit1}>
                                    提交
                                </Button>
                                <Button htmlType='button' onClick={() => {
                                    this.reset(this.form1)
                                }}>
                                    重置
                                </Button>
                            </Form.Item>
                        </Form>
                    </TabPane>
                    <TabPane tab='Tab 3' key="3">
                        {
                            ([1, 2]).map((_item, i) => {
                                return (<Form ref={this.form2[i]} key={i}>
                                    <Form.Item
                                        label='姓名'
                                        name='name'
                                        className='form-item-style'
                                        validateTrigger='onChange'
                                        rules={[
                                            {
                                                required: true
                                            }
                                        ]}
                                    >
                                        <Input placeholder='仅支持汉字/字母/数字/下划线' />
                                    </Form.Item>
                                    <Form.Item
                                        label='地址'
                                        name='address'
                                        className='form-item-style'
                                        validateTrigger='onChange'
                                        rules={[
                                            {
                                                required: true
                                            }
                                        ]}
                                    >
                                        <Input placeholder='仅支持汉字/字母/数字/下划线' />
                                    </Form.Item>
                                    <Form.Item label=' ' className='form-item-style'>
                                        <Button colors='primary' onClick={() => {
                                            this.handleSubmit2(i)
                                        }}>
                                            提交
                                        </Button>
                                        <Button htmlType='button' onClick={() => {
                                            this.reset(this.form2[i])
                                        }}>
                                            重置
                                        </Button>
                                    </Form.Item>
                                </Form>)
                            })
                        }
                    </TabPane>
	            </Tabs>
            </div>
        )
    }
}

export default Form.createForm()(Demo)
