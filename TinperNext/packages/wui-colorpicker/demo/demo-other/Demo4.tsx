/**
 *
 * @title 不可用状态
 * @description 添加 disabled 属性即可让取色板处于不可用状态
 *
 */
import {ColorPicker} from '@tinper/next-ui';
import React, {Component} from 'react';

class Demo4 extends Component <{}, {value:string}> {
	state = {
	    value: "#E14C46"
	}

	handleChange = (v:{class: string; rgba: string; hex: string;}) => {
	    console.log("选择的色彩信息 ：", v);
	    this.setState({
	        value: v.hex || ''
	    })
	}

	render() {
	    return (
	        <ColorPicker
	            disabled
	            label="颜色"
	            placeholder="请输入十六进制色值"
	            value={this.state.value}
	            onChange={this.handleChange}
	        />
	    )
	}
}

export default Demo4
