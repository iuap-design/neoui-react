/**
 *
 * @title 禁用状态
 * @description disabled 的输入控制
 *
 */


import {InputNumber} from '@tinper/next-ui';
import React, {Component} from 'react';

class Demo4 extends Component<{}, {value: number}> {
    constructor(props: {}) {
        super(props);
        this.state = {
            value: 40
        }
    }

	handleChange = (value: number) => {
	    this.setState({
	        value: value
	    })
	}

	render() {
	    return (
	        <div>
	            <InputNumber disabled precision={2} value={this.state.value} onChange={this.handleChange}/>
	        </div>
	    )
	}
}

export default Demo4;
