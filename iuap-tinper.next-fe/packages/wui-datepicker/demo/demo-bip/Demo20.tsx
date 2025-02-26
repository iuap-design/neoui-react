/**
 *
 * @title 日期格式
 * @description format不同格式示例
 */

import {Col, DatePicker, Row} from '@tinper/next-ui'
import React, {Component} from 'react'
import {Moment} from 'moment'
import type {FocusEvent} from 'react'

const {RangePicker} = DatePicker

interface DemoState {
    value: Moment | null
    year: Moment | null
    rangeValue: [Moment | null, Moment | null] | null
}

class Demo20 extends Component<{}, DemoState> {
    constructor(props: {}) {
        super(props)
        this.state = {
            value: null,
            // halfYear: '3333 FH',
            year: null,
            rangeValue: null
        }
    }
    onStartInputBlur = (e: FocusEvent, date: string, dateString: string[]) => {
        console.log('onStartInputBlur---> ', e, date, dateString)
    }
    onSelect = (d: Moment, dateString: string) => {
        console.warn('select--->', d, dateString)
        // this.setState({ value: d })
    }
    onChange = (d: Moment, dateString: string) => {
        console.warn('change--->', d, dateString)
        this.setState({value: d})
    }
    onOk = (d: Moment, dateString: string) => {
        console.warn('onOk--->', d, dateString)
        this.setState({value: d})
    }
    onRangeChange = (d: [Moment, Moment], dateString: string, dateStringArr?: string[] | null, halfYearArr?: string[][]) => {
        console.warn('onRangeChange--->', d, dateString, dateStringArr, halfYearArr)
        this.setState({rangeValue: d})
    }
    onRangeSelect = (d: Moment) => {
        console.warn('onRangeSelect--->', d)
    }
    onRangeOk = (rangeValue: [Moment, Moment]) => {
        console.warn('onRangeOk--->', rangeValue)
        this.setState({rangeValue})
    }

    render() {
        return (
            <div>
                <Row gutter={[10, 10]}>
                    <Col md={24}>format: 年月日顺序</Col>
                    <Col md={6}>
                        <RangePicker
                            format='YYYY/MM/DD'
                            placeholder={['开始', '结束']}
                            onSelect={this.onRangeSelect}
                            onOk={this.onRangeOk}
                            onChange={this.onRangeChange}
                            onStartInputBlur={this.onStartInputBlur}
                        />
                    </Col>
                    <Col md={6}>
                        <RangePicker
                            format='YYYY.MM.DD'
                            placeholder={['开始', '结束']}
                            onSelect={this.onRangeSelect}
                            onOk={this.onRangeOk}
                            onChange={this.onRangeChange}
                            onStartInputBlur={this.onStartInputBlur}
                        />
                    </Col>
                    <Col md={6}>
                        <RangePicker
                            format='YYYY-MM-DD'
                            placeholder={['开始', '结束']}
                            onSelect={this.onRangeSelect}
                            onOk={this.onRangeOk}
                            onChange={this.onRangeChange}
                            onStartInputBlur={this.onStartInputBlur}
                        />
                    </Col>
                    <Col md={24}>format: 月日年顺序</Col>
                    <Col md={6}>
                        <RangePicker
                            format='MM/DD/YYYY'
                            placeholder={['开始', '结束']}
                            onSelect={this.onRangeSelect}
                            onOk={this.onRangeOk}
                            onChange={this.onRangeChange}
                            onStartInputBlur={this.onStartInputBlur}
                        />
                    </Col>
                    <Col md={6}>
                        <RangePicker
                            format='MM.DD.YYYY'
                            placeholder={['开始', '结束']}
                            onSelect={this.onRangeSelect}
                            onOk={this.onRangeOk}
                            onChange={this.onRangeChange}
                            onStartInputBlur={this.onStartInputBlur}
                        />
                    </Col>
                    <Col md={6}>
                        <RangePicker
                            format='MM-DD-YYYY'
                            placeholder={['开始', '结束']}
                            onSelect={this.onRangeSelect}
                            onOk={this.onRangeOk}
                            onChange={this.onRangeChange}
                            onStartInputBlur={this.onStartInputBlur}
                        />
                    </Col>
                    <Col md={24}>format: 日月年顺序</Col>
                    <Col md={6}>
                        <RangePicker
                            format='DD/MM/YYYY'
                            placeholder={['开始', '结束']}
                            onSelect={this.onRangeSelect}
                            onOk={this.onRangeOk}
                            onChange={this.onRangeChange}
                            onStartInputBlur={this.onStartInputBlur}
                        />
                    </Col>
                    <Col md={6}>
                        <RangePicker
                            format='DD.MM.YYYY'
                            placeholder={['开始', '结束']}
                            onSelect={this.onRangeSelect}
                            onOk={this.onRangeOk}
                            onChange={this.onRangeChange}
                            onStartInputBlur={this.onStartInputBlur}
                        />
                    </Col>
                    <Col md={6}>
                        <RangePicker
                            format='DD-MM-YYYY'
                            placeholder={['开始', '结束']}
                            onSelect={this.onRangeSelect}
                            onOk={this.onRangeOk}
                            onChange={this.onRangeChange}
                            onStartInputBlur={this.onStartInputBlur}
                        />
                    </Col>
                    <Col md={24}>datepicker：format不同顺序及分隔符</Col>
                    <Col md={6}>
                        <DatePicker
	                        picker='date'
	                        format='DD*MM-YYYY'
	                        placeholder='选择日期'
	                    />
                    </Col>
                    <Col md={6}>
                        <DatePicker
	                        picker='date'
	                        format='MM/DD/YYYY'
	                        placeholder='选择日期'
	                    />
                    </Col>
                    <Col md={6}>
                        <DatePicker
	                        picker='date'
	                        format='YYYY-MM-DD'
	                        placeholder='选择日期'
	                    />
                    </Col>
                </Row>
            </div>
        )
    }
}

export default Demo20
