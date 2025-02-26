/**
 *
 * @title 表单模态框
 * @description 表单模态框
 *
 */

import {Button, DatePicker, Form, Input, Modal, Radio, Rate, Select} from '@tinper/next-ui';
import React, {Component} from 'react';

const Option = Select.Option;
interface DemoState {
	selectedValue?: string;
    showModal?: boolean;
    name?: string;
    education?: string;
    birthDate?: string;
}
class Demo7 extends Component <{form:any}, DemoState> {

    constructor(props: { form: any; } | Readonly<{ form: any; }>) {
        super(props);
        this.state = {
            selectedValue: "man",
            showModal: false,
            name: '',
            education: '',
            birthDate: ''

        };
    }

	close = () => {
	    this.setState({
	        showModal: false
	    });
	}

	handleClose = () => {
	    this.props.form.validateFields((err: null | Object, values: Record<string, any>) => {
	        if (err) {
	            console.log('校验失败', values);
	        } else {
	            console.log('提交成功', values)
	            this.close()
	        }
	    });
	}

	open = () => {
	    this.setState({
	        showModal: true
	    }, () => {
	        this.props.form.setFieldsValue({
	            education: 'middle'
	        })
	    });
	}

	handleChange = (state:string) => (value:string) => {
	    this.setState({
	        [state]: value
	    })
	}

	getCalendarContainer = () => {

	    return document.getElementById('demo7');
	}

	render() {
	    const {getFieldProps, getFieldError} = this.props.form;
	    const that = this;
	    const layout = {
	        labelCol: {span: 4},
	        wrapperCol: {span: 16},
	    };
	    return (
	        <div className="demo-margin" id="demo7">
	            <Button
	                bordered
	                onClick={this.open}>
					添加模态框
	            </Button>
	            <Modal
	                title='表单实践'
	                visible={this.state.showModal}
	                onCancel={this.close}
	                className="demo7-modal"
	            >
	                <Form {...layout}>
	                    <Form.Item label="姓名">
	                        <Input placeholder="请输入姓名"
	                            {...getFieldProps('name', {
	                                validateTrigger: 'onBlur',
	                                rules: [{
	                                    required: true, message: '请输入姓名',
	                                }],
	                            })}
	                        />
	                        <span className='error'>
	                            {getFieldError('name')}
	                        </span>
	                    </Form.Item>
	                    <Form.Item label="身份证号">
	                        <Input placeholder="请输入身份证号"
	                            {...getFieldProps('id', {
	                                validateTrigger: 'onBlur',
	                                rules: [{
	                                    required: true, message: '请输入身份证号',
	                                }, {
	                                    pattern: /^[1-9][0-9]{5}([1][9][0-9]{2}|[2][0][0|1][0-9])([0][1-9]|[1][0|1|2])([0][1-9]|[1|2][0-9]|[3][0|1])[0-9]{3}([0-9]|[X])$/,
	                                    message: '身份证号格式不正确'
	                                }],
	                            })}
	                        />
	                        <span className='error'>
	                            {getFieldError('id')}
	                        </span>
	                    </Form.Item>
	                    <Form.Item className='time' label="出生日期">
	                        <DatePicker
	                            {
	                                ...getFieldProps('time', {
	                                    validateTrigger: 'onBlur',
	                                    rules: [{
	                                        required: true, message: '请选择出生日期',
	                                    }, {
	                                        type: 'date', message: '日期格式不正确'
	                                    }],
	                                }
	                                )}
	                            placeholder={'请选择出生日期'}
	                            getCalendarContainer={this.getCalendarContainer}
	                        />
	                        <span className='error'>
	                            {getFieldError('time')}
	                        </span>
	                    </Form.Item>
	                    <Form.Item label="年龄">
	                        <Input placeholder="请输入年龄"
	                            {...getFieldProps('age', {
	                                validateTrigger: 'onBlur',
	                                rules: [{
	                                    required: true, message: '请输入年龄',
	                                }],
	                            })}
	                        />
	                        <span className='error'>
	                            {getFieldError('age')}
	                        </span>
	                    </Form.Item>
	                    <Form.Item label="性别">
	                        <Radio.Group
	                            selectedValue={this.state.selectedValue}
	                            {
	                                ...getFieldProps('sex', {
	                                    initialValue: 'man',
	                                    onChange(value:string) {
	                                        that.setState({selectedValue: value});
	                                    },
	                                    rules: [{required: true}]
	                                }
	                                )}
	                        >
	                            <Radio value="man">男</Radio>
	                            <Radio value="woman">女</Radio>
	                        </Radio.Group>
	                    </Form.Item>
	                    <Form.Item label="学历">
	                        <Select
	                            {
	                                ...getFieldProps('education', {
	                                    initialValue: '',
	                                    rules: [{required: true, message: '请选择学历'}]
	                                }
	                                )}
	                        >
	                            <Option value="">请选择</Option>
	                            <Option value="nothing">无</Option>
	                            <Option value="middle">初中</Option>
	                            <Option value="senior">高中</Option>
	                            <Option value="college1">专科</Option>
	                            <Option value="college2">本科</Option>
	                            <Option value="graduate">研究生及以上</Option>
	                            <Option value="other">其它</Option>
	                        </Select>
	                        <span className='error'>
	                            {getFieldError('education')}
	                        </span>
	                    </Form.Item>
	                    <Form.Item label="保密等级">
	                        <Rate
	                            {
	                                ...getFieldProps('rate', {
	                                    initialValue: 0,
	                                    rules: [{required: true}]
	                                }
	                                )}
	                        />
	                    </Form.Item>
	                    <Form.Item className="remarks" label="备注">
	                        <Input componentClass='textarea'
	                            {
	                                ...getFieldProps('remark', {}
	                                )}
	                        />
	                    </Form.Item>
	                </Form>
	            </Modal>

	        </div>
	    )
	}
}


export default Form.createForm()(Demo7);
