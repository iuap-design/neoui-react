/**
 *
 * @title 支持两位小数显示
 * @description
 *
 */

import {Rate, InputNumber} from "@tinper/next-ui";
import React, {Component} from 'react';

interface RateState {
	value: number;
}
class Demo10 extends Component<{}, RateState> {
    constructor(props: {}) {
        super(props);
        this.state = {
            value: 4.35
        };
    }

	onChange = (value:number) => {
	    this.setState({
	        value
	    })
	}

	render() {
	    return (
	        <div style={{width: 300}}>
	            <Rate allowHalf value={this.state.value} onChange={this.onChange} />
	            <br />
	            <br />
	            <InputNumber max={5} min={0} iconStyle="one" precision={2} value={this.state.value} onChange={this.onChange}/>
	        </div>
	    )
	}
}

export default Demo10;
