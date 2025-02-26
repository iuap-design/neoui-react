/**
 *
 * @title 平移的栅格
 * @description 通过设置mdPull, mdPush来控制平移的量
 *
 */

import {Col, Row} from '@tinper/next-ui';
import React, {Component} from 'react';

class Demo3 extends Component {
    render() {
        return (
            <Row>
                <Col md={8} mdPush={4} xs={8} xsPush={4} sm={8} smPush={4}>
                    <div className='grayDeep'>8 push-4</div>
                </Col>
                <Col span={4} pull={8}>
                    <div className='gray'>4 pull-8</div>
                </Col>
            </Row>
        )
    }
}

export default Demo3;
