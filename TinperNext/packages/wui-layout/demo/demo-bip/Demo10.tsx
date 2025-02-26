/**
 *
 * @title flex填充
 * @description 使用<Row>组件和<Col>组件进行页面栅格切分
 *
 * Demo10
 */

import {Col, Row} from '@tinper/next-ui';
import React, {Component} from 'react';


class Demo10 extends Component {
    render() {
        return (
            <div>
                <Row>
                    <Col className='grayDeep' flex={2}>2 / 5</Col>
                    <Col className='gray' flex={3}>3 / 5</Col>
                </Row>
                <Row>
                    <Col className='grayDeep' flex="100px">100px</Col>
                    <Col className='gray' flex="auto">Fill Rest</Col>
                </Row>
            </div>
        )
    }
}

export default Demo10;
