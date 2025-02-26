/**
 *
 * @title 设置弹窗容器
 * @description 默认在 body 内新建div，注意：必须返回容器元素
 */

import {Col, DatePicker, Row} from '@tinper/next-ui'
import React, {Component} from 'react'

class Demo10 extends Component {
    getPopupContainer = (trigger: HTMLElement) => {
        console.log('getPopupContainer---> ', trigger)
        // return trigger
        return document.getElementById('tinperDemo') as HTMLElement
    }

    render() {
        return (
            <div>
                <Row gutter={[10, 10]}>
                    <Col md={6}>
                        <DatePicker
                            popupStyle={{
                                border: '2px solid #f07'
                            }}
                            popupClassName='myPopupClassName'
                            getPopupContainer={this.getPopupContainer}
                        />
                    </Col>
                </Row>
            </div>
        )
    }
}

export default Demo10
