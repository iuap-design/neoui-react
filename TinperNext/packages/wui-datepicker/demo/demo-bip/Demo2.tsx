/**
 *
 * @title 动态的改变时间
 * @description 以「日期时间」为基本单位，基础的日期时间选择控件
 */

import {Button, Col, DatePicker, Row, Radio} from '@tinper/next-ui'
import moment from 'moment'
import React, {Component} from 'react'
import type {Moment} from 'moment'

const {RangePicker} = DatePicker

const format = 'YYYY-MM-DD HH:mm:ss'
const dateInputPlaceholder = '选择日期'

interface DemoState {
	rangeType: string;
	rangeValue: [Moment, Moment] | null;
    value: Moment | null
}

class Demo2 extends Component<{}, DemoState> {
    constructor(props: {}) {
        super(props)
        this.state = {
            rangeType: 'currentYear',
            rangeValue: [moment().set('M', 2), moment().set('M', 10)],
            value: moment()
        }
    }

	handleChange = (value: Moment) => {
	    this.setState({
	        value
	    })
	}
	onSelect = (d: Moment, dateString: string) => {
	    console.warn('select--->', d, dateString)
	    // this.setState({ value: d })
	}

	handlerChangeDate = () => {
	    this.setState({
	        value: moment().second() % 3 ? moment() : null
	    })
	}

	handleChangeRange = (rangeValue: any) => {
	    this.setState({
	        rangeValue
	    })
	}

	handleChangeRangeType = (rangeType: string) => {
	    this.setState({
	        rangeType,
	        rangeValue: rangeType === 'currentYear'
	                ? [moment().startOf('y'), moment().endOf('y')]
	                : [moment().subtract(1, 'quarter').startOf('quarter'), moment().subtract(1, 'quarter').endOf('quarter')]
	    })
	}

	render() {
	    return (
	        <div>
	            <Row gutter={[10, 10]}>
	                <Col md={6}>
	                    <DatePicker
	                        picker='date'
	                        format={format}
	                        onSelect={this.onSelect}
	                        onChange={this.handleChange}
	                        value={this.state.value}
	                        placeholder={dateInputPlaceholder}
	                        showToday
	                        showTime
	                        use12Hours
	                    />
	                </Col>
	                <Col md={3}>
	                    <Button onClick={this.handlerChangeDate}>改变时间</Button>
	                </Col>
	                <Col md={6}>
	                    <RangePicker
	                        onChange={this.handleChangeRange}
	                        value={this.state.rangeValue}
	                    />
	                </Col>
	                <Col md={3}>
	                    <Radio.Group
	                        options={[
	                            { label: '今年', value: 'currentYear' },
	                            { label: '上个季度', value: 'lastQuarter' },
	                        ]}
	                        onChange={this.handleChangeRangeType}
	                        value={this.state.rangeType}
	                        optionType="button"
	                    />
	                </Col>
	            </Row>
	        </div>
	    )
	}
}

export default Demo2
