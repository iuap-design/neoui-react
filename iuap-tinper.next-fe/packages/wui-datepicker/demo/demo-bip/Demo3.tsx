/**
 *
 * @title 输入框只读
 * @description 禁止用户输入日期
 */

import {Col, DatePicker, Row} from '@tinper/next-ui'
import moment from 'moment'
import React, {Component} from 'react'
import type {Moment} from 'moment'

interface DemoState {
    value: Moment
}

class Demo3 extends Component<{}, DemoState> {
    constructor(props: {}) {
        super(props)
        this.state = {
            value: moment()
        }
    }

	change = (m: Moment, v: string) => {
	    console.log('change-moment', m)
	    console.log('change-str', v)
	}

	select = (m: Moment) => {
	    console.log('select', m)
	}

	render() {
	    return (
	        <div>
	            <Row gutter={[10, 10]}>
	                <Col md={6}>
	                    <DatePicker
	                        picker='date'
	                        format='YYYY-MM-DD HH:mm:ss'
	                        placeholder='选择日期'
	                        inputReadOnly
	                        onChange={this.change}
	                        onSelect={this.select}
	                        showTime
	                    />
	                </Col>
	            </Row>
	        </div>
	    )
	}
}

export default Demo3
