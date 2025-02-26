/**
 * @title 四种样式
 * @description 共有`success`、`info`、`warning`、`danger`四种样式
 */

import {Alert} from "@tinper/next-ui";
import React, {Component} from "react";

class Demo2 extends Component {
    constructor(props: {}) {
        super(props);
        this.state = {
            showAlert: false,
        };
    }

	handleAlertDismiss: React.MouseEventHandler<HTMLDivElement> = e => {
	    console.log(e);
	    this.setState({showAlert: false});
	};
	handerAlertShow = () => {
	    this.setState({showAlert: true});
	};

	render() {
	    return (
	        <div className="demo-alert" style={{display: "flex", flexDirection: 'row', columnGap: '10px'}}>
	            <Alert type="info" onClose={this.handleAlertDismiss}>这是一条常规提示语</Alert>
	            <Alert type="success">这是一条成功提示语</Alert>
	            <Alert type="danger">这是一条危险提示语</Alert>
	            <Alert type="warning">这是一条警示提示语</Alert>
	        </div>
	    );
	}
}

export default Demo2;
