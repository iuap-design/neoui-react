/**
 *
 * @title 自定义文字
 * @description 提供自定义文字的取色板组件
 *
 */
import {ColorPicker} from '@tinper/next-ui';
import React, {Component} from 'react';

class Demo6 extends Component <{}, {value:string}> {
	state = {
	    value: "#E14C46",
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
	            label="颜色"
	            placeholder="请输入十六进制色值"
	            value={this.state.value}
	            title='自定义标题'
	            cacelBtn='自定义取消按钮文字'
	            confirmBtn='自定义确认按钮提示'
	            onChange={this.handleChange}
	        />
	    )
	}
}

export default Demo6
