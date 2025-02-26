/**
 *
 * @title 基础布局
 * @description 使用<Row>组件和<Col>组件进行页面栅格切分
 *
 */

import {Col, Row} from '@tinper/next-ui';
import React, {Component} from 'react';

class Demo1 extends Component {
    render() {
        return (
            <Row>
                <Col span={12}>
                    <div className='grayDeep'>12</div>
                </Col>
                <Col span={6}>
                    <div className='gray'>6</div>
                </Col>
                <Col span={6}>
                    <div className='grayLight'>6</div>
                </Col>
                <Col span={4}>
                    <div className='grayDeep'>4</div>
                </Col>
                <Col span={4}>
                    <div className='gray'>4</div>
                </Col>
                <Col span={4}>
                    <div className='grayLight'>4</div>
                </Col>
                <Col span={3}>
                    <div className='grayDeep'>3</div>
                </Col>
                <Col span={3}>
                    <div className='gray'>3</div>
                </Col>
                <Col span={3}>
                    <div className='grayLight'>3</div>
                </Col>
                <Col span={3}>
                    <div className='grayDeep'>3</div>
                </Col>
                <Col span={2}>
                    <div className='gray'>2</div>
                </Col>
                <Col sm={2}>
                    <div className='grayLight'>2</div>
                </Col>
                <Col xl={2} md={4} sm={6} xs={12}>
                    <div className='gray'>2</div>
                </Col>
                <Col lg={2} md={4} sm={6} xs={12} >
                    <div className='grayLight'>2</div>
                </Col>
                <Col md={4} sm={6} xs={12}>
                    <div className='grayDeep'>2</div>
                </Col>
            </Row>
        )
    }
}

export default Demo1;
