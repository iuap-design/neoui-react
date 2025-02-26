/**
 *
 * @title 自定义日期面板样式
 * @description 自定义日期面板样式
 */

import {Col, DatePicker, Row} from '@tinper/next-ui'
import moment from 'moment'
import React, {Component} from 'react'
import type {Moment} from 'moment'

class Demo20 extends Component<{}, {value: Moment}> {
    constructor(props: {}) {
        super(props)
        this.state = {
            value: moment().add(3, 'days')
        }
    }

    render() {
        return (
            <div>
                <Row gutter={[10, 10]}>
                    <Col md={6}>
                        <DatePicker
                            format='MM/DD/YYYY'
                            className='my-picker'
                            style={{
                                marginRight: '3vw'
                            }}
                            popupClassName='my-picker-dropdown'
                            dropdownAlign='bottomRight'
                            popupStyle={{
                                border: '2px solid #f07'
                            }}
                            value={this.state.value}
                        />
                    </Col>
                </Row>
            </div>
        )
    }
}

export default Demo20
