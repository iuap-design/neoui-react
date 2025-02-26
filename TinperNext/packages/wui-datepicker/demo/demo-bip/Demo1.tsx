/**
 *
 * @title 基础示例
 * @description 选择日期，周，月，季度，半年，年，日期范围基本示例
 */

import {Col, DatePicker, Row, ConfigProvider} from '@tinper/next-ui'
import React, {Component} from 'react'
import moment, {Moment} from 'moment'
import type {MouseEvent, KeyboardEvent, FocusEvent} from 'react'

const {RangePicker, HalfYearPicker} = DatePicker

interface DemoState {
    value: Moment | null
    halfYear: Moment | string | null
    year: Moment | null
    rangeValue: [Moment | null, Moment | null] | null
}

class Demo1 extends Component<{}, DemoState> {
    constructor(props: {}) {
        super(props)
        this.state = {
            value: null,
            // halfYear: '3333 FH',
            halfYear: moment().add(10, 'M'),
            year: null,
            rangeValue: null
        }
    }

    onPanelChange = (value: Moment, mode: string) => {
        console.log('onPanelChange 222--->', value, value.format(), mode)
    }
    onMouseDown = (e: MouseEvent) => {
        console.warn('onMouseDown 222--->', e)
    }
    onKeyDown = (e: KeyboardEvent<HTMLInputElement>, preventDefault: () => void) => {
        console.warn('onKeyDown 222--->', e, preventDefault)
    }
    onFocus = (e: FocusEvent<Element, Element>) => {
        console.log('focus 222--->', e)
    }
    onBlur = (e: FocusEvent, dateString: string) => {
        console.log('onBlur 222---> ', e, dateString)
    }
    onSelect = (d: Moment, dateString: string) => {
        console.warn('select 222--->', d, dateString)
        this.setState({value: d})
    }
    onChange = (d: Moment, dateString: string) => {
        console.warn('change 222--->', d, dateString)
        this.setState({value: d})
    }
    onChangeYear = (year: Moment, dateString: string) => {
        console.warn('onChangeYear--->', year, dateString)
        this.setState({year})
    }
    onChangeHalfYear = (halfYear: Moment, dateString: string, halfYearArr: string[]) => {
        console.warn('onChangeHalfYear--->', halfYear, dateString, halfYearArr)
        this.setState({halfYear})
    }
    onOpenChange = (open: boolean, d: Moment | null, dateString: string) => {
        console.warn('onOpenChange 222--->', open, d, dateString)
    }
    onOk = (d: Moment, dateString: string) => {
        console.warn('onOk 222--->', d, dateString)
        this.setState({value: d})
    }
    onRangeChange = (
        d: [Moment, Moment],
        dateString: string,
        dateStringArr?: string[] | null,
        halfYearArr?: string[][]
    ) => {
        console.warn('onRangeChange 333--->', d, dateString, dateStringArr, halfYearArr)
        this.setState({rangeValue: d})
    }
    onRangeCalendarChange = (value: [Moment, Moment], formatString: [string, string], info: {range: string}) => {
        console.warn('onCalendarChange 333--->', value, formatString, info)
    }
    onRangeSelect = (d: Moment) => {
        console.warn('onRangeSelect 333--->', d)
    }
    onRangeOk = (rangeValue: [Moment, Moment]) => {
        console.warn('onRangeOk 333--->', rangeValue)
        this.setState({rangeValue})
    }
    onStartInputBlur = (e: FocusEvent, date: string, dateString: string[]) => {
        console.log('onStartInputBlur 333---> ', e, date, dateString)
    }

    render() {
        return (
            <ConfigProvider>
                <div>
                    <Row gutter={[10, 10]}>
                        <Col md={6}>
                            <DatePicker
                                defaultValue='2036-04-23'
                                format='YYYY-MM-DD'
                                placeholder='选择日期'
                                showToday
                                onChange={this.onChange}
                            />
                        </Col>
                        <Col md={6}>
                            <DatePicker
                                showTime={{defaultValue: '00:00:00'}}
                                format={[
                                    'YYYY-MM-DD HH:mm:ss',
                                    'YYYY/MM/DD HH:mm:ss',
                                    'YYYY.MM.DD HH:mm:ss',
                                    'YYYYMMDD HH:mm:ss',
                                    'MM-DD-YYYY HH:mm:ss',
                                    'MM/DD/YYYY HH:mm:ss',
                                    'DD.MM.YYYY HH:mm:ss'
                                ]}
                                placeholder='选择日期时刻'
                                onSelect={this.onSelect}
                                onChange={this.onChange}
                                onPanelChange={this.onPanelChange}
                                onMouseDown={this.onMouseDown}
                                onKeyDown={this.onKeyDown}
                                onFocus={this.onFocus}
                                onBlur={this.onBlur}
                                onOk={this.onOk}
                            />
                        </Col>
                        <Col md={6}>
                            <DatePicker
                                picker='week'
                                placeholder='选择周'
                                onSelect={this.onSelect}
                                onChange={this.onChange}
                                onPanelChange={this.onPanelChange}
                                onMouseDown={this.onMouseDown}
                                onKeyDown={this.onKeyDown}
                                onFocus={this.onFocus}
                                onBlur={this.onBlur}
                            />
                        </Col>
                        <Col md={6}>
                            <DatePicker
                                picker='month'
                                format='YYYY-MM'
                                placeholder='选择年月'
                                allowClear={false}
                                autoFocus
                                value={this.state.value}
                                onChange={this.onChange}
                            />
                        </Col>
                        <Col md={6}>
                            <DatePicker
                                picker='quarter'
                                locale={{locale: 'zh-cn', quarterFormat: '第Q季度'}}
                                format='YYYY-Q季度'
                                placeholder='选择季度'
                                value={this.state.value}
                                onChange={this.onChange}
                            />
                        </Col>
                        <Col md={6}>
                            <HalfYearPicker
                                // picker='halfYear'
                                // 半年的面板值取自locale多语 firstHalfYear/secondHalfYear，输入框值取自 format 函数
                                locale='zh-cn'
                                placeholder='选择半年'
                                value={this.state.halfYear}
                                onChange={this.onChangeHalfYear}
                                onOpenChange={this.onOpenChange}
                                onSelect={this.onSelect}
                                onPanelChange={this.onPanelChange}
                                onMouseDown={this.onMouseDown}
                                onKeyDown={this.onKeyDown}
                                onFocus={this.onFocus}
                                onBlur={this.onBlur}
                                onOk={this.onOk}
                            />
                        </Col>
                        <Col md={6}>
                            <DatePicker
                                picker='year'
                                format='YYYY'
                                placeholder='选择年'
                                value={this.state.year}
                                onChange={this.onChangeYear}
                            />
                        </Col>
                        <Col md={6}>
                            <RangePicker
                                value={this.state.rangeValue}
                                placeholder={['开始', '结束']}
                                onCalendarChange={this.onRangeCalendarChange}
                                onSelect={this.onRangeSelect}
                                onOk={this.onRangeOk}
                                onChange={this.onRangeChange}
                                onStartInputBlur={this.onStartInputBlur}
                            />
                        </Col>
                        <Col md={6}>
                            <RangePicker
                                value={this.state.rangeValue}
                                format='YYYY/MM/DD HH:mm:ss'
                                placeholder={['开始', '结束']}
                                disabled={[true, false]}
                                showTime={{
                                    // defaultValue: [moment().set({h: 2, m: 0, s: 0}), moment().set({h: 23, m: 59, s: 59})]
                                    // defaultValue: [moment('00:05', 'HH:mm:ss'), moment('23:30', 'HH:mm:ss')]
                                    defaultValue: ['00:00:00', '23:59:59']
                                }}
                                onCalendarChange={this.onRangeCalendarChange}
                                onSelect={this.onRangeSelect}
                                onOk={this.onRangeOk}
                                onChange={this.onRangeChange}
                                onStartInputBlur={this.onStartInputBlur}
                            />
                        </Col>
                        <Col md={6}>
                            <RangePicker
                                picker='halfYear'
                                value={this.state.rangeValue}
                                placeholder={['开始半年', '结束半年']}
                                onSelect={this.onRangeSelect}
                                onOk={this.onRangeOk}
                                onChange={this.onRangeChange}
                                onStartInputBlur={this.onStartInputBlur}
                            />
                        </Col>
                    </Row>
                </div>
            </ConfigProvider>
        )
    }
}

export default Demo1
