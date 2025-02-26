/**
 *
 * @title 默认Rate
 * @description 最简单的用法
 *
 */

import {Rate} from "@tinper/next-ui";
import React, {Component} from 'react';

interface RateState {
	value: number;
}
class Demo1 extends Component<{}, RateState> {
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
	        <Rate autoFocus value={this.state.value} onChange={this.handChange}/>
	    )
	}
}

export default Demo1;
