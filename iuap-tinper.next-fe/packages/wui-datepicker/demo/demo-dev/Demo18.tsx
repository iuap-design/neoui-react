/**
 *
 * @title 预设范围(数组形式)
 * @description 可以预设常用的日期范围快捷选项以提高用户体验。
 */

import {Button, Col, DatePicker, Row} from '@tinper/next-ui'
import moment from 'moment'
import React, {Component} from 'react'
import type {Moment} from 'moment'
import type {FocusEvent} from 'react'

const {RangePicker} = DatePicker

interface DemoState {
    ranges: Record<string, any>
    lastSelectDate: Moment | null
    formatIndex: number
    formatList: string[]
}

moment.locale('zh-cn')

class Demo18 extends Component<{}, DemoState> {
    constructor(props: {}) {
        super(props)
        this.state = {
            formatList: ['YYYY-MM-DD', 'MM/DD/YYYY'],
            formatIndex: 0,
            lastSelectDate: null,
            ranges: {
                至过去: [undefined, moment().startOf('day')], // allowEmpty[0]=true
                至未来: [moment().startOf('day'), null], // allowEmpty[1]=true
                今天: () => [moment().startOf('day'), moment().endOf('day')],
                本周: () => [moment().startOf('week'), moment().endOf('week')],
                本月: [moment().startOf('month'), moment().endOf('month')],
                上月: [moment().startOf('month').subtract(1, 'month'), moment().endOf('month').subtract(1, 'month')],
                下月: [moment().startOf('month').add(1, 'month'), moment().endOf('month').add(1, 'month')],
                本季度: [moment().startOf('quarter'), moment().endOf('quarter')],
                今年: [moment().startOf('year'), moment().endOf('year')],
                去年: [moment().startOf('year').subtract(1, 'year'), moment().endOf('year').subtract(1, 'year')],
                明年: [moment().startOf('year').add(1, 'year'), moment().endOf('year').add(1, 'year')]
            }
        }
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

    handleSelect = (date: Moment) => {
        console.warn('select--->', date)
        const initRanges = this.state.ranges
        if (date) {
            this.setState({
                lastSelectDate: date,
                // 至过去、至未来自定义为用户选择的日期至过去、未来
                ranges: Object.assign({}, initRanges, {
                    至过去: [undefined, date.startOf('day')],
                    至未来: [date.startOf('day'), undefined]
                })
            })
        }
    }

    onFocus = (e: FocusEvent<HTMLInputElement, Element>) => {
        console.log('focus--->', e)
    }
    onBlur = (e: FocusEvent<HTMLInputElement, Element>) => {
        console.log('onBlur---> ', e)
    }
    onStartInputBlur = (e: FocusEvent<Element, Element>, date: string, dateString: string[]) => {
        console.log('onStartInputBlur---> ', e, date, dateString)
    }
    onChange = (d: (Moment | null)[] | null, dateString: string) => {
        console.warn('change--->', d, dateString)
    }
    onPresetChange = (label: string, newValue: (Moment | null)[] | null, range: any, lastSelectDate: Moment) => {
        console.warn('onPresetChange --->', label, newValue, range, lastSelectDate)
    }

    render() {
        let {ranges} = this.state
        return (
            <div>
                <Row gutter={[10, 10]}>
                    <Col md={6}>
                        <RangePicker
                            // format={formatList[formatIndex]}
                            allowClear
                            allowEmpty={[true, true]}
                            // activePresetKey='本周'
                            showRangeLabel
                            ranges={ranges} // 快捷选项
                            onSelect={this.handleSelect}
                            onChange={this.onChange}
                            onPresetChange={this.onPresetChange}
                            onFocus={this.onFocus}
                            onBlur={this.onBlur}
                            onStartInputBlur={this.onStartInputBlur}
                        />
                    </Col>
                    <Col>
                        <Button onClick={this.handleChangeFormat} style={{marginLeft: 8}}>
                            切换格式
                        </Button>
                    </Col>
                </Row>
            </div>
        )
    }
}

export default Demo18
