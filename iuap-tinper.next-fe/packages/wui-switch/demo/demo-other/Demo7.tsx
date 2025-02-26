/**
 *
 * @title fieldid
 * @description 添加fieldid属性
 * @type bip
 */
import React, { Component } from "react";
import {Row, Col, Switch} from '@tinper/next-ui';


class Demo7 extends Component {
    render() {
        return (
            <Row>
                <Col sm={2}>
                    <Switch fieldid={'field'} id={'switch'}/>
                </Col>
                <Col sm={2}>
                    <Switch loading fieldid={'field-switch-loading'}/>
                </Col>
            </Row>
        );
    }
}

export default Demo7;
