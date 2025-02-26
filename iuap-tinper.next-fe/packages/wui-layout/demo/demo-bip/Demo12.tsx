/**
 *
 * @title wrap不换行
 * @description wrap默认为true，设置false,col不换行
 *
 * Demo11
 */

import {Col, Row} from '@tinper/next-ui';
import React, {Component} from 'react';


class Demo extends Component {
    render() {
        return (
            <Row wrap={false}>
                <Col span={6}>
                    <div className='grayDeep'>col-1</div>
                </Col>
                <Col span={6}>
                    <div className='gray'>col-2</div>
                </Col>
                <Col span={6}>
                    <div className='grayLight'>col-3</div>
                </Col>
                <Col span={6}>
                    <div className='grayDeep'>col-4</div>
                </Col>
                <Col span={6}>
                    <div className='grayDeep'>col-5</div>
                </Col>
                <Col span={6}>
                    <div className='grayDeep'>col-6</div>
                </Col>
                <Col span={6}>
                    <div className='grayDeep'>col-7</div>
                </Col>
            </Row>
        )
    }
}

export default Demo;
