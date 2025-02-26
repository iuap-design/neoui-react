/**
 *
 * @title 默认开关
 * @description
 * @type bip
 */
import {Col, Row, Switch} from '@tinper/next-ui';
import React, {Component} from "react";

interface SwitchState {
	checked: boolean;
}

class Demo1 extends Component<{}, SwitchState> {
    constructor(props: {}) {
        super(props);
        this.state = {
            checked: true
        };
    }

	onChange = () => {
	    this.setState({
	        checked: !this.state.checked
	    });
	};

	onKeyDown = (e: React.KeyboardEvent) => {
	    console.log('onKeyDown', e)
	};

	render() {
	    return (
	        <Row>
	            <Col sm={2}>
	                <Switch/>
	            </Col>
	            <Col sm={2}>
	                <Switch
	                    checked={this.state.checked}
	                    onChange={this.onChange}
	                />
	            </Col>
	            <Col sm={2}>
	                <Switch defaultChecked enterKeyDown={false} colors={"primary"} onKeyDown = {this.onKeyDown} />
	            </Col>
	        </Row>
	    );
	}
}

export default Demo1;
