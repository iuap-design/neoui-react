/**
 *
 * @title 使用normal格式化
 * @description 配合form 使用normal格式化，以 picker='month' 为例
 */

import {Button, Col, DatePicker, Form, Row} from '@tinper/next-ui'
import moment from 'moment'
import React, {Component} from 'react'
import type {Moment} from 'moment'

class Demo12 extends Component<{form: any}> {
	submit = () => {
	    this.props.form.validateFields((err: any, values: any) => {
	        if (err) {
	            console.log('校验失败', values)
	        } else {
	            console.log('提交成功', values)
	        }
	    })
	}

	render() {
	    const {getFieldDecorator} = this.props.form
	    return (
	        <div>
	            <Row gutter={[10, 10]}>
	                <Col md={6}>
	                    {getFieldDecorator('date', {
	                        validateTrigger: 'onBlur',
	                        initialValue: null,
	                        normalize: (value: Moment) => {
	                            if (value) {
	                                return moment(value, 'YYYY年M月').format('YYYY年M月')
	                            }
	                        },
	                        rules: [
	                            {
	                                required: true,
	                                message: '请输入日期'
	                            }
	                        ]
	                    })(<DatePicker picker='month' format='YYYY-MM'/>)}
	                </Col>
	                <Button onClick={this.submit}>获得值</Button>
	            </Row>
	        </div>
	    )
	}
}

export default Form.createForm()(Demo12)
