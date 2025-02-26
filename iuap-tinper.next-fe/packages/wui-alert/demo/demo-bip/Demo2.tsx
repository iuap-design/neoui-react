/**
 * @title 按钮触发`Alert`
 * @description 业务场景，通过点击触发按钮动作。控制`Alert`显示与否
 */

import {Alert, Button} from "@tinper/next-ui";
import React, {Component} from "react";

interface DemoState {
	showAlert: boolean
}

class Demo2 extends Component<{}, DemoState> {
    constructor(props: {}) {
        super(props);
        this.state = {
            showAlert: false,
        };
    }

	handleAlertDismiss = () => {
	    this.setState({showAlert: false});
	};
	handerAlertShow = () => {
	    this.setState({showAlert: true});
	};

	render() {
	    return (
	        <div>
	            <Button colors="warning" onClick={this.handerAlertShow}>
					点击显示
	            </Button>
	            {this.state.showAlert ? (
	                <Alert
	                    type="warning"
	                    onClose={this.handleAlertDismiss}
	                    style={{margin: "20px 0"}}
	                    afterClose={()=>console.log('afterclose')}
	                >
						这是一条很有深意的警示
	                </Alert>
	            ) : null}
	        </div>
	    );
	}
}

export default Demo2;
