/**
 *
 * @title 预设范围(对象形式)
 * @description 可以对象形式传入预设的日期范围快捷选项。
 */

import {Col, DatePicker, Row} from '@tinper/next-ui'
import moment from 'moment'
import React, {Component} from 'react'
import type {Moment} from 'moment'
import type {RangePickerProps} from '@tinper/next-ui'

const {RangePicker} = DatePicker

interface DemoState {
    value: RangePickerProps['value']
    lastSelectDate: Moment | null
    ranges: RangePickerProps['ranges']
}

moment.locale('zh-cn')

class Demo7 extends Component<{}, DemoState> {
    constructor(props: {}) {
        super(props)
        this.state = {
            value: [moment('2022-11-18'), moment('2022-12-22')],
            lastSelectDate: null,
            ranges: [
                {
                    label: '至过去',
                    key: 'toPast',
                    value: [null, moment('2022-11-19').startOf('day')] // allowEmpty[0]=true
                },
                {
                    label: '至未来',
                    key: 'toFuture',
                    value: [moment('2022-11-19').startOf('day'), null] // allowEmpty[1]=true，规避今天日期变化导致的问题
                },
                {
                    label: '今天',
                    key: 'today',
                    value: () => [moment('2022-11-19').startOf('day'), moment('2022-11-19').endOf('day')]
                },
                {
                    label: '本周',
                    key: 'currentWeek',
                    value: () => [moment('2022-12-19').startOf('week'), moment('2022-12-19').endOf('week')]
                },
                {
                    label: '本月',
                    key: 'currentMonth',
                    value: [moment('2022-12-19').startOf('month'), moment('2022-12-19').endOf('month')]
                },
                {
                    label: '上月',
                    key: 'lastMonth',
                    value: [
                        moment('2022-12-19').startOf('month').subtract(1, 'month'),
                        moment('2022-12-19').endOf('month').subtract(1, 'month')
                    ]
                },
                {
                    label: '下月',
                    key: 'nextMonth',
                    value: [moment('2022-12-19').startOf('month').add(1, 'month'), moment('2022-12-19').endOf('month').add(1, 'month')]
                },
                {
                    label: '本季度',
                    key: 'currentQuarter',
                    value: [moment('2022-12-19').startOf('quarter'), moment('2022-12-19').endOf('quarter')]
                },
                {
                    label: '今年',
                    key: 'currentYear',
                    value: [moment('2022-12-19').startOf('year'), moment('2022-12-19').endOf('year')]
                },
                {
                    label: '去年',
                    key: 'lastYear',
                    value: [moment('2022-12-19').startOf('year').subtract(1, 'year'), moment('2022-12-19').endOf('year').subtract(1, 'year')]
                },
                {
                    label: '明年',
                    key: 'nextYear',
                    value: [moment('2022-12-19').startOf('year').add(1, 'year'), moment('2022-12-19').endOf('year').add(1, 'year')]
                }
            ]
        }
    }

    /**
     * @param label 触发快捷日期范围文本
     * @param value 日期范围
     * @param item 用户传入的范围项，方便用户获取点击内容
     * @param lastSelectDate 用户上次点击的日期
     */
    handlePresetChange: RangePickerProps['onPresetChange'] = (label, value, item, lastSelectDate) => {
        console.log(label, value, item, lastSelectDate)
        this.setState({value})
    }

    render() {
        const {ranges, value} = this.state
        return (
            <Row gutter={[10, 10]}>
                <Col md={6}>
                    <RangePicker
                        allowClear
                        activePresetKey='currentWeek'
                        ranges={ranges} // 快捷选项
                        value={value}
                        onPresetChange={this.handlePresetChange}
                    />
                </Col>
            </Row>
        )
    }
}

export default Demo7
