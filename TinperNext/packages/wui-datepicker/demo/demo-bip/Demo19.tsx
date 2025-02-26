/**
 * @title 时间、日期、星期、月、季度、半年、年范围选择
 * @description 设置 RangePicker的 picker
 */

import {Col, DatePicker, RangePickerProps, Row} from '@tinper/next-ui'
import React, {Component} from 'react'
import type {FocusEvent} from 'react'

const {RangePicker} = DatePicker

class Demo19 extends Component<any, {halfYearValue: RangePickerProps['value']}> {
    constructor(props: any) {
        super(props)
        this.state = {
            // halfYearValue: ['2023-01-01', '2025-07-01']
            halfYearValue: ['2023-上半年', '2025-下半年']
        }
    }

    onEndInputBlur = (e: FocusEvent<Element, Element>, endValue: string, value: string[]) => {
        console.warn('onEndInputBlur--->', e, endValue, value)
    }

    onHalfYearChange: RangePickerProps['onChange'] = (value, formatString, valueStrArr, halfYearArr) => {
        console.log('halfYearChange------>', value, formatString, valueStrArr, halfYearArr)
        this.setState({
            halfYearValue: valueStrArr
        })
    }

    render() {
        return (
            <div>
                <Row gutter={[10, 10]}>
                    <Col md={8}>
                        <DatePicker
                            picker='range'
                            format={['YYYY-MM-DD日', 'YYYY年M月D日']}
                            placeholder={['开始日期(picker=range)', '结束日期(picker=range)']}
                            separator='至'
                            onEndInputBlur={this.onEndInputBlur}
                        />
                    </Col>

                    <Col md={8}>
                        <RangePicker
                            picker='date'
                            placeholder={['开始日期(RangePicker)', '结束日期(RangePicker)']}
                            separator='至'
                            onEndInputBlur={this.onEndInputBlur}
                        />
                    </Col>

                    <Col md={8}>
                        <RangePicker
                            picker='week'
                            placeholder={['开始星期', '结束星期']}
                            separator='至'
                            value={['2023-26', '2023-27']}
                            onEndInputBlur={this.onEndInputBlur}
                        />
                    </Col>

                    <Col md={8}>
                        <RangePicker
                            picker='month'
                            placeholder={['开始月', '结束月']}
                            separator='至'
                            onEndInputBlur={this.onEndInputBlur}
                        />
                    </Col>

                    <Col md={8}>
                        <RangePicker
                            picker='quarter'
                            placeholder={['开始季度', '结束季度']}
                            separator='至'
                            onEndInputBlur={this.onEndInputBlur}
                        />
                    </Col>

                    <Col md={8}>
                        <RangePicker
                            picker='halfYear'
                            placeholder={['开始半年', '结束半年']}
                            separator='至'
                            value={this.state.halfYearValue}
                            onChange={this.onHalfYearChange}
                            onEndInputBlur={this.onEndInputBlur}
                        />
                    </Col>

                    <Col md={8}>
                        <RangePicker
                            picker='year'
                            placeholder={['开始年', '结束年']}
                            separator='至'
                            onEndInputBlur={this.onEndInputBlur}
                        />
                    </Col>

                    <Col md={8}>
                        <DatePicker
                            picker='range'
                            format='YYYY年M月D日 H时m分'
                            placeholder={['日期时间(picker=range)', '日期时间(picker=range)']}
                            separator='至'
                            showTime={{showSecond: false, use12Hours: true}}
                            onEndInputBlur={this.onEndInputBlur}
                        />
                    </Col>

                    <Col md={8}>
                        <RangePicker
                            picker='date'
                            placeholder={['开始日期时间(RangePicker)', '结束日期时间(RangePicker)']}
                            separator='至'
                            showTime
                            onEndInputBlur={this.onEndInputBlur}
                        />
                    </Col>
                </Row>
            </div>
        )
    }
}

export default Demo19
