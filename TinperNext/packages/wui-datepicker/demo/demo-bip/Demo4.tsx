/**
 *
 * @title 禁用
 * @description 设置 disabled
 */

import {Col, DatePicker, Row} from '@tinper/next-ui'
import moment from 'moment'
import React, {Component} from 'react'
import type {Moment} from 'moment'

const {RangePicker} = DatePicker

interface DemoState {
    value: [Moment | null, Moment | null]
}

class Demo4 extends Component<{}, DemoState> {
    constructor(props: {}) {
        super(props)
        this.state = {
            value: [moment('2019-11-12'), null]
        }
    }

	onSelect = (d: Moment) => {
	    console.log(d)
	}

	onChange = (d: Moment, dataString: string) => {
	    console.log(d, dataString)
	}

	onEndInputBlur = (e: React.FocusEvent<Element, Element>, endValue: string, value: [string, string]) => {
	    console.warn('onEndInputBlur--->', e, endValue, value)
	}

	render() {
	    return (
	        <div>
	            <Row gutter={[10, 10]}>
	                <Col md={6}>
	                    <DatePicker
	                        onSelect={this.onSelect}
	                        onChange={this.onChange}
	                        disabled
	                        defaultValue={moment('2020-05-01')}
	                    />
	                </Col>

	                <Col md={6}>
	                    <RangePicker
	                        picker='date' // time | date | week | month | year
	                        value={this.state.value}
	                        format={['YYYY-MM-DD日', 'YYYY年M月D日']}
	                        placeholder={['开始日期', '结束日期']}
	                        separator='至'
	                        disabled
	                        onEndInputBlur={this.onEndInputBlur}
	                    />
	                </Col>
	            </Row>
	        </div>
	    )
	}
}

export default Demo4
