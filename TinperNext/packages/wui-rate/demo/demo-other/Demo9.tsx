/**
 *
 * @title fieldid
 * @description 自动化测试专用属性
 *
 */

import {Rate} from "@tinper/next-ui";
import React, {Component} from 'react';

interface RateState {
	value: number;
	fieldId?: string;
}
class Demo1 extends Component<{}, RateState> {
    constructor(props: {}) {
        super(props);
        this.state = {
            value: 3,
            fieldId: 'rate'
        };
    }

	handChange = (value: number) => {
	    this.setState({
	        value,
	        fieldId: value ? 'rate' + value : undefined
	    })
	}

	render() {
	    return (
	        <Rate fieldid={this.state.fieldId} value={this.state.value} onChange={this.handChange}/>
	    )
	}
}

export default Demo1;
