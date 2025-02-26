/**
 *
 * @title 第二种iconStyle不可用状态
 * @description 自定义max=12,min=5,step=2 且设置 disabled 处理
 * @type bip
 */

import {InputNumber} from '@tinper/next-ui';
import React, {Component} from 'react';

class Demo5 extends Component<{}, {value: number}> {
    constructor(props: {}) {
        super(props);
        this.state = {
            value: 8
        }
    }

	handleChange = (value: number) => {
	    this.setState({
	        value: value
	    })
	}

	render() {
	    return (
	        <InputNumber
	            disabled
	            iconStyle="one"
	            max={12}
	            min={-10}
	            step={2}
	            value={this.state.value}
	            onChange={this.handleChange}
	        />
	    )
	}
}

export default Demo5;
