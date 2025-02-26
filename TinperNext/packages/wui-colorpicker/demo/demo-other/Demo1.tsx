/**
 *
 * @title 取色板
 * @description 提供预制色板的取色板组件(包含fieldid)
 *
 */
import {ColorPicker} from '@tinper/next-ui';
import React, {Component} from 'react';

class Demo1 extends Component <{}, {value:string}> {
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
	            fieldid="demo_pick"
	            label="颜色"
	            placeholder="请输入十六进制色值"
	            value={this.state.value}
	            onChange={this.handleChange}
	        />
	    )
	}
}

export default Demo1
