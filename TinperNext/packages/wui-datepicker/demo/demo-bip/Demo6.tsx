/**
 *
 * @title 选择不超过七天的范围
 * @description 举例如何用 onCalendarChange 和 disabledDate 来限制动态的日期区间选择，如初始值为非法，将被清空并触发onChange回调。
 */

import {Col, DatePicker, Row} from '@tinper/next-ui'
import React, {Component} from 'react'
import moment, {Moment} from 'moment'

const {RangePicker} = DatePicker

interface DemoState {
    dates: [Moment | null, Moment | null] | [] | null
    value: [Moment | null, Moment | null] | null
    dates2: [Moment | null, Moment | null] | [] | null
    value2: [Moment | null, Moment | null] | null
}

class Demo6 extends Component<{}, DemoState> {
    constructor(props: {}) {
        super(props)
        this.state = {
            dates: [moment(), moment().add(5, 'd')],
            value: [moment(), moment().add(5, 'd')],
            dates2: [moment(), moment().add(15, 'd')],
            value2: [moment(), moment().add(15, 'd')]
        }
    }

    disabledDate = (current: Moment) => {
        const {dates} = this.state
        if (!dates || dates.length === 0) {
            return false
        }
        const tooLate = dates && dates?.[0] && current.diff(dates[0], 'days') > 7
        const tooEarly = dates && dates?.[1] && dates[1].diff(current, 'days') > 7

        return !!(tooEarly || tooLate)
    }

    disabledDate2 = (current: Moment) => {
        const {dates2: dates} = this.state
        if (!dates || dates.length === 0) {
            return false
        }
        const tooLate = dates && dates?.[0] && current.diff(dates[0], 'days') > 7
        const tooEarly = dates && dates?.[1] && dates[1].diff(current, 'days') > 7

        return !!(tooEarly || tooLate)
    }

    render() {
        const {value, value2} = this.state
        return (
            <div>
                <Row gutter={[10, 10]}>
                    <Col md={6}>
                        <RangePicker
                            placeholder='合法默认值'
                            value={value}
                            disabledDate={this.disabledDate}
                            onCalendarChange={val => {
                                this.setState({dates: val})
                            }}
                            onChange={val => this.setState({value: val})}
                        />
                    </Col>

                    <Col md={6}>
                        <RangePicker
                            placeholder='非法默认值会被清空'
                            value={value2}
                            disabledDateValid={false} // 清空被禁用的默认值
                            disabledDate={this.disabledDate2}
                            onCalendarChange={val => {
                                this.setState({dates2: val})
                            }}
                            onChange={val => this.setState({value2: val, dates2: val})}
                        />
                    </Col>
                </Row>
            </div>
        )
    }
}

export default Demo6
