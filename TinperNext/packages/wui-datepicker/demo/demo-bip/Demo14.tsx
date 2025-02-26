/**
 * @title 面板开关
 * @description open设置面板展开收起
 */

import {Button, Col, DatePicker, Form, Row, DatePickerProps} from '@tinper/next-ui'
import React, {Component} from 'react'
import type {Moment} from 'moment'

interface DemoProps {
	form: any
}

interface DemoState {
    value: Moment | string,
	open: boolean,
	formatIndex: number,
	formatList: string[]
}

class Demo14 extends Component<DemoProps, DemoState> {
    constructor(props: DemoProps) {
        super(props)
        this.state = {
            formatList: ['YYYY-MM-DD', 'MM/DD/YYYY'],
            formatIndex: 0,
            value: '',
            open: false
        }
    }

	iconClick: React.MouseEventHandler = e => {
	    console.log('iconClick---> ', e)
	}
	onOpenChange: DatePickerProps['onOpenChange'] = (open, value, str) => {
	    console.warn('onOpenChange--->', open, value, str)
	}
	handleChangeFormat = () => {
	    this.setState(
	        {
	            formatIndex: 1 - this.state.formatIndex
	        },
	        () => {
	            this.forceUpdate()
	        }
	    )
	}
	handleOpen = () => {
	    this.setState({
	        open: !this.state.open
	    })
	}
	handleSubmit = () => {
	    this.props.form.validateFields((err: any, values: { inputdate: any; }) => {
	        if (err) {
	            console.log('校验失败', values)
	        } else {
	            console.log('提交成功', values, values.inputdate)
	        }
	    })
	}

	render() {
	    let {getFieldDecorator} = this.props.form
	    let {open, formatList, formatIndex} = this.state
	    return (
	        <div>
	            <Row gutter={[10, 10]}>
	                <Col md={6}>
	                    {getFieldDecorator('inputdate', {
	                        getValueFromEvent: (date: Moment) => {
	                            return date // 表单中存放日期格式字符串
	                        }
	                    })(
	                        <DatePicker
	                            format={formatList[formatIndex]}
	                            open={open}
	                            iconClick={this.iconClick}
	                            onOpenChange={this.onOpenChange}
	                        />
	                    )}
	                </Col>
	                <Col>
	                    <Button onClick={this.handleOpen}>展开/收起面板</Button>
	                    <Button onClick={this.handleChangeFormat} style={{marginLeft: 8}}>
							切换格式
	                    </Button>
	                    <Button onClick={this.handleSubmit} style={{marginLeft: 8}}>
							获得表单值
	                    </Button>
	                </Col>
	            </Row>
	        </div>
	    )
	}
}

export default Form.createForm()(Demo14)
