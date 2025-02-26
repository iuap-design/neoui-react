/**
 *
 * @title 数字区间基础示例
 * @description 使用 InputNumberGroup
 * @type bip
 */


import {InputNumber} from '@tinper/next-ui';
import React, {Component} from 'react';

const InputNumberGroup = InputNumber.InputNumberGroup;

class Demo9 extends Component<{}, {value?: [number, number]}> {
    constructor(props: {}) {
        super(props);
        this.state = {
            value: undefined
        }
    }

	handleChange = (value: [number, number]) => {
	    console.log(value);
	    this.setState({
	        value
	    })
	}

	render() {
	    return (
	        <div className='demo9'>
	            <InputNumberGroup
	                iconStyle='double'
	                min={10}
	                max={12}
	                value={this.state.value}
	                onChange={this.handleChange}
	                placeholder={['请输入最小值', '请输入最大值']}/>
	        </div>
	    )
	}
}

export default Demo9;
