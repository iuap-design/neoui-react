/**
 *
 * @title 保留两位小数
 * @description precision={2} 设置小数点后保留两位，失去焦点时数据会格式化为两位小数
 * @type bip
 */

import {InputNumber} from '@tinper/next-ui';
import React, {Component} from 'react';

class Demo6 extends Component<{}, {value: number}> {
    constructor(props: {}) {
        super(props);
        this.state = {
            value: 20
        }
    }

	handleChange = (value: number) => {
	    console.log(value)
	    this.setState({
	        value: value
	    })
	}

	render() {
	    return (
	        <InputNumber
	            iconStyle="one"
	            precision={2}
	            value={this.state.value}
	            onChange={this.handleChange}
	        />
	    )
	}
}

export default Demo6;
