/**
 *
 * @title 预设日期范围(对象形式)
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
    activePresetKey: string;
    lastSelectDate: Moment | null
    ranges: RangePickerProps['ranges']
}

moment.locale('zh-cn')

class Demo7 extends Component<{}, DemoState> {
    constructor(props: {}) {
        super(props)
        this.state = {
            value: null,
            activePresetKey: 'currentWeek',
            lastSelectDate: null,
            ranges: [
                {
                    label: '至过去',
                    key: 'toPast',
                    value: [null, moment().startOf('day')] // allowEmpty[0]=true
                },
                {
                    label: '至未来',
                    key: 'toFuture',
                    value: [moment().startOf('day'), null] // allowEmpty[1]=true
                },
                {
                    label: '今天',
                    key: 'today',
                    value: () => [moment().startOf('day'), moment().endOf('day')]
                },
                {
                    label: '本周',
                    key: 'currentWeek',
                    value: () => [moment().startOf('week'), moment().endOf('week')]
                },
                {
                    label: '本月',
                    key: 'currentMonth',
                    value: [moment().startOf('month'), moment().endOf('month')]
                },
                {
                    label: '上月',
                    key: 'lastMonth',
                    value: [
                        moment().startOf('month').subtract(1, 'month'),
                        moment().endOf('month').subtract(1, 'month')
                    ]
                },
                {
                    label: '下月',
                    key: 'nextMonth',
                    value: [moment().startOf('month').add(1, 'month'), moment().endOf('month').add(1, 'month')]
                },
                {
                    label: '本季度',
                    key: 'currentQuarter',
                    value: [moment().startOf('quarter'), moment().endOf('quarter')]
                },
                {
                    label: '今年',
                    key: 'currentYear',
                    value: [moment().startOf('year'), moment().endOf('year')]
                },
                {
                    label: '去年',
                    key: 'lastYear',
                    value: [moment().startOf('year').subtract(1, 'year'), moment().endOf('year').subtract(1, 'year')]
                },
                {
                    label: '明年',
                    key: 'nextYear',
                    value: [moment().startOf('year').add(1, 'year'), moment().endOf('year').add(1, 'year')]
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
        if (lastSelectDate) {
            if ((item as any)?.key === 'toPast') {
                this.setState({value: [null, lastSelectDate]})
            } else if ((item as any)?.key === 'toFuture') {
                this.setState({value: [lastSelectDate, null]})
            } else {
                this.setState({value})
            }
            this.setState({lastSelectDate, activePresetKey: (item as any)?.key})
        } else {
            this.setState({value, activePresetKey: (item as any)?.key})
        }
    }

    render() {
        const {ranges, value, activePresetKey} = this.state
        return (
            <Row gutter={[10, 10]}>
                <Col md={6}>
                    <RangePicker
                        allowClear
                        activePresetKey={activePresetKey}
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
