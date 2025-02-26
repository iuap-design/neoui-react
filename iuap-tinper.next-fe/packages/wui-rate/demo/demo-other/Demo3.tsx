/**
 *
 * @title 评分加显示文案
 * @description onChange和onHoverChange的使用
 *
 */

import {Rate} from "@tinper/next-ui";
import React, {Component} from 'react';

interface RateState {
	value: number;
}

class Demo3 extends Component<{}, RateState> {
    constructor(props: {}) {
        super(props);
        this.state = {
            value: 3
        };
    }

	handleChange = (value: number) => {
	    this.setState({
	        value: value
	    })
	}

	render() {
	    return (
	        <div>
	            <Rate value={this.state.value} onChange={this.handleChange} count={8}/>
	            <span style={{display: 'inline-block', verticalAlign: 'middle'}}>{this.state.value}</span>
	        </div>
	    )
	}
}

export default Demo3;
