/**
 *
 * @title 栅格等分切换
 * @description 通过设置grid, 实现栅格12、24等切换
 *
 */

import {Col, Row} from '@tinper/next-ui';
import React, {Component} from 'react';

class Demo3 extends Component {
    render() {
        return (
            <Row grid={12}>
                <Col span={3}>
                    <div className='grayDeep'>3</div>
                </Col>
                <Col span={3}>
                    <div className='gray'>3</div>
                </Col>
                <Col span={3}>
                    <div className='grayDeep'>3</div>
                </Col>
                <Col span={3}>
                    <div className='gray'>3</div>
                </Col>
            </Row>
        )
    }
}

export default Demo3;
