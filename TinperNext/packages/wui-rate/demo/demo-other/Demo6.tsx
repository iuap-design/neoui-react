/**
 *
 * @title 清除
 * @description 支持允许或者禁用清除。
 *
 */

import {Rate} from "@tinper/next-ui";
import React, {Component} from 'react';

interface RateState {
	v1: number;
	v2: number;
}
class Demo6 extends Component<{}, RateState> {
    constructor(props: {}) {
        super(props);
        this.state = {
            v1: 3,
            v2: 3,
        };
    }

	handChange = (value: number, type: number) => {
	    switch (type) {
	    case 1:
	        this.setState({
	            v1: value
	        });
	        break;
	    case 2:
	        this.setState({
	            v2: value
	        });
	        break;
	        default:
		            break;
	    }
	}

	render() {
	    return (
	        <>
	            <Rate value={this.state.v1} onChange={(v) => {
	                this.handChange(v, 1)
	            }}/>
	            <span className="wui-rate-text">allowClear: true</span>
	            <br/>
	            <Rate allowClear={false} value={this.state.v2} onChange={(v) => {
	                this.handChange(v, 2)
	            }}/>
	            <span className="wui-rate-text">allowClear: false</span>
	        </>
	    )
	}
}

export default Demo6;
