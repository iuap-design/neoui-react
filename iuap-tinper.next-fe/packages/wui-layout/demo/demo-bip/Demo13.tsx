/**
 *
 * @title 排列方式
 * @description 分为水平排列(justify)和垂直方向排列(align)
 *
 */

import {Col, Row} from '@tinper/next-ui';
import React, {Component} from 'react';


class Demo extends Component {
    render() {
        return (
            <div>
                <Row justify="end" align="top" style={{height: '100px', background: '#eee'}}>
                    <Col span={6}>
                        <div style={{background: '#cdd9e6', height: '60px'}}>col-1</div>
                    </Col>
                    <Col span={6}>
                        <div style={{background: '#e1e8f0', height: '60px'}}>col-2</div>
                    </Col>
                </Row>
                <br/>
                <Row justify="center" align="middle" style={{height: '100px', background: '#eee'}}>
                    <Col span={6}>
                        <div style={{background: '#cdd9e6', height: '60px'}}>col-1</div>
                    </Col>
                    <Col span={6}>
                        <div style={{background: '#e1e8f0', height: '60px'}}>col-2</div>
                    </Col>
                </Row>
                <br/>
                <Row justify="space-between" align="bottom" style={{height: '100px', background: '#eee'}}>
                    <Col span={6}>
                        <div style={{background: '#cdd9e6', height: '60px'}}>col-1</div>
                    </Col>
                    <Col span={6}>
                        <div style={{background: '#e1e8f0', height: '60px'}}>col-2</div>
                    </Col>
                    <Col span={6}>
                        <div style={{background: '#cdd9e6', height: '60px'}}>col-2</div>
                    </Col>
                </Row>
            </div>
        )
    }
}

export default Demo;
