/**
 *
 * @title 事件开关
 * @description 点击开关触发事件
 *
 */

import {Col, Row, Switch} from '@tinper/next-ui';
import React, {Component} from "react";

interface SwitchState {
	checked: boolean;
	switch: string;
}

class Demo3 extends Component<{}, SwitchState> {
    constructor(props: {}) {
        super(props);
        this.state = {
            switch: "",
            checked: false
        };
    }

	onChange = (e: boolean) => {
	    this.setState({
	        switch: `${e}`,
	        checked: !this.state.checked
	    });
	};

	render() {
	    return (
	        <Row>
	            <Col sm={2}>
	                <Switch
	                    size="lg"
	                    checked={this.state.checked}
	                    onChange={this.onChange}
	                    checkedChildren={"on"}
	                    unCheckedChildren={"off"}
	                />
	            </Col>
	            <Col sm={2}>
	                <span>{this.state.switch}</span>
	            </Col>
	        </Row>
	    );
	}
}

export default Demo3;
