/**
 *
 * @title 不同大小的开关
 * @description 通过`size`属性控制开关的大小
 *
 */

import {Col, Row, Switch} from '@tinper/next-ui';
import React, {Component} from "react";


class Demo2 extends Component {
    render() {
        return (
            <Row>
                <Col sm={2}>
                    <Switch size=""/>
                </Col>
                <Col sm={2}>
                    <Switch size="sm"/>
                </Col>
                <Col sm={2}>
                    <Switch size="lg"/>
                </Col>
            </Row>
        );
    }
}

export default Demo2;
