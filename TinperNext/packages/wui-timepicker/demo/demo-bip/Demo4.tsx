/**
 *
 * @title 使用Form
 * @description 配合form使用，并使用normal格式化
 *
 */

import {Button, Form, TimePicker, FormInstance} from '@tinper/next-ui';
import React, {Component} from 'react';

class Demo3 extends Component<{form: FormInstance}, {}> {

	submit = () => {
	    this.props.form.validateFields((err: any, values: any) => {
	        if (err) {
	            console.log('校验失败', values);
	        } else {
	            console.log('提交成功', values);
	        }
	    });
	}

	render() {
	    const {getFieldProps} = this.props.form;
	    return (
	        <div>
	            <TimePicker
	                format={'HH:mm:ss'}
	                {...getFieldProps('date', {
	                    validateTrigger: 'onBlur',
	                    initialValue: '12:13:14',
	                    normalize: (value: { format: (arg0: string) => any; }) => {
	                        if (value && value.format) {
	                            return value.format('HH:mm:ss')
	                        } else {
	                            return value
	                        }
	                    },
	                    rules: [{
	                        required: true, message: '请输入日期',
	                    }],
	                })}
	            />
	            <Button onClick={this.submit}>获得值</Button>
	        </div>
	    )
	}
}

export default Form.createForm()(Demo3);
