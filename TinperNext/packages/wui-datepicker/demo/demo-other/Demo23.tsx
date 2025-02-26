/**
 *
 * @title fieldid示例
 * @description fieldid相关示例
 */

import {Row, Col, DatePicker, Icon} from '@tinper/next-ui'
import moment from 'moment'
import React, {Component} from 'react'
import type {Moment} from 'moment'

const {RangePicker} = DatePicker

moment.locale('zh-cn')

type RangeItem = {
	key: string;
	label: string;
	value: [Moment, Moment]
}
class Demo23 extends Component<{}, {ranges: RangeItem[]}> {
    constructor(props: {}) {
        super(props)
        this.state = {
            ranges: [
                {
                    label: '本周',
                    key: 'currentWeek',
                    value: [moment().startOf('week'), moment().endOf('week')]
                },
                {
                    label: '本月',
                    key: 'currentMonth',
                    value: [moment().startOf('month'), moment().endOf('month')]
                }
            ]
        }
    }

    render() {
        return (
            <div>
                <Row gutter={[10, 10]}>
                    <Col md={6}>
                        <DatePicker
                            id='demo23-DatePicker-id1'
                            fieldid='demo23-DatePicker-fieldid1'
                            allowClear
                            showToday
                            locale={'en'}
                            suffixIcon={<Icon type='uf-cart' />}
                        />
                    </Col>
                    <Col md={6}>
                        <DatePicker
                            id='demo23-DatePicker-id2'
                            fieldid='demo23-DatePicker-fieldid2'
                            allowClear
                            clearIcon={() => <Icon type='uf-bell-o' />}
                            suffixIcon={<Icon type='uf-cart' />}
                            prevIcon={<Icon type='uf-triangle-left' />}
                            nextIcon={<Icon type='uf-triangle-right' />}
                            superPrevIcon={<Icon type='uf-arrow-c-o-left' />}
                            superNextIcon={<Icon type='uf-arrow-c-o-right' />}
                        />
                    </Col>
                    <Col md={6}>
                        <RangePicker
                            id='demo23-RangePicker-id'
                            fieldid='demo23-RangePicker-fieldid'
                            allowClear
                            activePresetKey='currentWeek'
                            ranges={this.state.ranges} // 快捷选项
                        />
                    </Col>
                    <Col md={6}>
                        <DatePicker
                            id='demo23-DatePicker-id4'
                            fieldid='demo23-DatePicker-fieldid4'
                            showTime
                            allowClear
                            use12Hours
                        />
                    </Col>
                    <Col md={6}>
                        <RangePicker
                            id='demo23-RangePicker-id5'
                            fieldid='demo23-RangePicker-fieldid5'
                            showTime
                            allowClear
                            activePresetKey='currentWeek'
                            ranges={this.state.ranges} // 快捷选项
                        />
                    </Col>
                </Row>
            </div>
        )
    }
}

export default Demo23
