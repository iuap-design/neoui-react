/**
 *
 * @title 支持选中半星
 * @description 将allowHalf设置为true即可
 *
 */

import {Rate} from "@tinper/next-ui";
import React, {Component} from 'react';

interface RateState {
	value: number;
}
class Demo2 extends Component<{}, RateState> {
    constructor(props: {}) {
        super(props);
        this.state = {
            value: 3
        };
    }

	handChange = (value: number) => {
	    this.setState({
	        value
	    })
	}

	render() {
	    return (
	        <Rate allowHalf={true} value={this.state.value} onChange={this.handChange}/>
	    )
	}
}

export default Demo2;
