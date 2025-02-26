/**
 *
 * @title 偏移的栅格
 * @description 使用mdOffset lgOffset smOffset xsOffset来设置栅格偏移的量
 *
 */

import {Col, Row} from '@tinper/next-ui';
import React, {Component} from 'react';

class Demo2 extends Component {
    render() {
        return (
            <Row>
                <Col span={3} offset={3}>
                    <div className='grayDeep'>3 offset-3</div>
                </Col>
                <Col span={3} offset={3}>
                    <div className='gray'>3 offset-3</div>
                </Col>
                <Col span={6} offset={6}>
                    <div className='grayLight'>6 offset-6</div>
                </Col>
                <Col span={4} offset={2}>
                    <div className='gray'>4 offset-2</div>
                </Col>
                <Col span={4} offset={2}>
                    <div className='grayLight'>4 offset-2</div>
                </Col>
                <Col span={6} offset={2}>
                    <div className='grayDeep'>6 offset-2</div>
                </Col>
            </Row>
        )
    }
}

export default Demo2;
