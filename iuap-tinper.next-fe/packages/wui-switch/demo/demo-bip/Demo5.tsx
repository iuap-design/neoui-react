/**
 *
 * @title 键盘操作示例
 * @description enterKeyDown 可设置是否启用键盘操作，默认是启用的。onKeyDown 是键盘回调的回调函数。详细的键盘操作请看下方文档说明。
 * @type bip
 */
import {Col, Row, Switch} from '@tinper/next-ui';
import React, {Component} from "react";


class Demo5 extends Component {

	onKeyDown = (e: React.KeyboardEvent) => {
	    console.log('onKeyDown', e)
	}

	render() {
	    return (
	        <Row>
	            <Col sm={2}>
	                <Switch onKeyDown={this.onKeyDown} enterKeyDown={true}/>
	            </Col>
	        </Row>
	    );
	}
}

export default Demo5;
