/**
 *
 * @title 允许空值
 * @description 示例允许结束日期为空
 */

import {Col, DatePicker, Row} from '@tinper/next-ui'
import moment from 'moment'
import React, {Component} from 'react'
import type {Moment} from 'moment'
import type {FocusEvent} from 'react'

const {RangePicker} = DatePicker

interface DemoState {
	value: string | [Moment | null, Moment | null];
	defaultValue: [Moment | null, Moment | null];
	defaultPickerValue: [Moment | null, Moment | null]
	defaultTime: [Moment | null, Moment | null]
}

class Demo17 extends Component<{}, DemoState> {
    constructor(props: {} | Readonly<{}>) {
        super(props)
        this.state = {
            value: '2022-01-01 ~ 2030-05-12', // 兼容Tinper老版本String类型,推荐Array
            defaultValue: [moment('2011-11-12'), moment('2022-12-13')],
            defaultPickerValue: [moment('2311-11-12'), moment('2322-12-13')],
            defaultTime: [
                moment('09:09:09', 'HH:mm:ss'),
                moment('19:19:19', 'HH:mm:ss')
            ]
        }
    }

	onChange = (value: [Moment | null, Moment | null], formatString: string) => {
	    console.warn('change--->', value, formatString)
	}

	onPanelChange = (value: [Moment | null, Moment | null], modes?: string[]) => {
	    console.log('onPanelChange--->', value, modes)
	}

	onOpenChange = (open: boolean) => {
	    console.warn('onOpenChange--->', open)
	}

	onCalendarChange = (value: [Moment | null, Moment | null], formatString: string[], info: {range: string}) => {
	    console.warn('onCalendarChange--->', value, formatString, info)
	}

	onStartInputBlur = (e: FocusEvent<Element, Element>, startValue: string, value: [string, string]) => {
	    console.warn('onStartInputBlur--->', e, startValue, value)
	}

	onEndInputBlur = (e: FocusEvent<Element, Element>, endValue: string, value: [string, string]) => {
	    console.warn('onEndInputBlur--->', e, endValue, value)
	}

	onSelect = (date: Moment) => {
	    console.warn('onSelect--->', date)
	}

	render() {
	    const {value, defaultValue, defaultPickerValue, defaultTime} = this.state
	    return (
	        <div>
	            <Row gutter={[10, 10]}>
	                <Col md={6}>
	                    <RangePicker
	                        className='test'
	                        style={{border: '1px solid pink'}}
	                        // picker='date' // time | date | week | month | year
	                        value={value}
	                        defaultValue={defaultValue}
	                        defaultPickerValue={defaultPickerValue}
	                        allowEmpty={[false, true]}
	                        showToday={false}
	                        showTime={{
	                            showSecond: false,
	                            defaultValue: defaultTime
	                        }}
	                        use12Hours={false}
	                        order={false}
	                        onCalendarChange={this.onCalendarChange}
	                        onStartInputBlur={this.onStartInputBlur}
	                        onEndInputBlur={this.onEndInputBlur}
	                        onSelect={this.onSelect}
	                        onChange={this.onChange}
	                        onOpenChange={this.onOpenChange}
	                        onPanelChange={this.onPanelChange}
	                    />
	                </Col>
	            </Row>
	        </div>
	    )
	}
}

export default Demo17
