/**
 *
 * @title 被禁用开关
 * @description
 * @type bip
 */
import {Button, Col, Row, Switch} from '@tinper/next-ui';
import React, {Component} from "react";

interface SwitchState {
	defaultDisabled: boolean;
}

class Demo4 extends Component<{}, SwitchState> {
    constructor(props: {}) {
        super(props);
        this.state = {
            defaultDisabled: true
        };
    }

	onChange = () => {
	    this.setState({
	        defaultDisabled: !this.state.defaultDisabled
	    });
	};

	render() {
	    return (
	        <Row>
	            <Col sm={2}>
	                <Switch className="switch" disabled={this.state.defaultDisabled}/>
	            </Col>
	            <Col sm={2}>
	                <Button onClick={this.onChange}>toggle disabled</Button>
	            </Col>
	        </Row>
	    );
	}
}

export default Demo4;
