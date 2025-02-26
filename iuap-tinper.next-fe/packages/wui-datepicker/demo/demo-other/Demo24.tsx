/**
 * @title 左右面板解耦
 * @description 设置 RangePicker的 linkedPanels
 */

import {Col, DatePicker, Row} from '@tinper/next-ui'
import React, {Component} from 'react'

const {RangePicker} = DatePicker

class Demo24 extends Component {
    render() {
        return (
            <div>
                <Row gutter={[10, 10]}>
                    <Col md={8}>
                        <DatePicker
                            picker='range'
                            format={['YYYY-MM-DD', 'YYYY年M月D日']}
                            placeholder={['开始日期(picker=range)', '结束日期(picker=range)']}
                            separator='至'
                            linkedPanels={false}
                        />
                    </Col>

                    <Col md={8}>
                        <RangePicker
                            picker='date'
                            locale='en'
                            placeholder={['start date(RangePicker)', 'end date(RangePicker)']}
                            separator='to'
                            linkedPanels={false}
                        />
                    </Col>

                    <Col md={8}>
                        <RangePicker
                            picker='week'
                            placeholder={['开始星期', '结束星期']}
                            separator='至'
                            linkedPanels={false}
                        />
                    </Col>

                    <Col md={8}>
                        <RangePicker
                            picker='month'
                            placeholder={['开始月', '结束月']}
                            separator='至'
                            linkedPanels={false}
                        />
                    </Col>

                    <Col md={8}>
                        <RangePicker
                            picker='quarter'
                            placeholder={['开始季度', '结束季度']}
                            separator='至'
                            linkedPanels={false}
                        />
                    </Col>

                    <Col md={8}>
                        <RangePicker
                            picker='halfYear'
                            placeholder={['开始半年', '结束半年']}
                            separator='至'
                            linkedPanels={false}
                        />
                    </Col>

                    <Col md={8}>
                        <RangePicker
                            picker='year'
                            placeholder={['开始年', '结束年']}
                            separator='至'
                            linkedPanels={false}
                        />
                    </Col>

                    <Col md={8}>
                        <DatePicker
                            picker='range'
                            format='YYYY年M月D日 H时m分'
                            placeholder={['日期时间(picker=range)', '日期时间(picker=range)']}
                            separator='至'
                            showTime={{showSecond: false, use12Hours: true}}
                            linkedPanels={false}
                        />
                    </Col>

                    <Col md={8}>
                        <RangePicker
                            picker='date'
                            placeholder={['开始日期时间(RangePicker)', '结束日期时间(RangePicker)']}
                            separator='至'
                            showTime
                            linkedPanels={false}
                        />
                    </Col>
                </Row>
            </div>
        )
    }
}

export default Demo24
