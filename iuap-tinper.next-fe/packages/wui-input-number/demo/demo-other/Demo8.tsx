/**
 *
 * @title 基础示例
 * @description 最简单输入控制
 *
 */


import {InputNumber} from '@tinper/next-ui';
import React, {Component} from 'react';

class Demo8 extends Component<{}, {value: number | string}> {
    constructor(props: {}) {
        super(props);
        this.state = {
            value: '1'
        }
    }

	handleChange = (value: number) => {
	    console.log(value);
	    this.setState({
	        value: value
	    })
	}

	render() {
	    return (
	        <div>
	            <InputNumber precision={2} value={this.state.value} onChange={this.handleChange}/>
	        </div>
	    )
	}
}

export default Demo8;
