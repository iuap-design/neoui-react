/**
 * @title 常用多选
 * @description 多选，从已有条目中选择
 */

import {Select} from "@tinper/next-ui";
import React, {Component} from "react";

const Option = Select.Option;

const ComponentChildren: React.ReactNode[] = [];
for (let i = 10; i < 36; i++) {
    ComponentChildren.push(<Option value={i}>{i}</Option>);
}

class Demo3 extends Component {

	handleChange = (value: string, node: object) => {
	    console.log('onchange', value, node);
	};

	handleSelect = (value: string, node: object) => {
	    console.log('onSelect', value, node);
	};

	handleDeselect = (value: string, node: object) => {
	    console.log('onDeselect', value, node);
	};


	render() {
	    return (
	        <Select
	            mode="multiple"
	            style={{width: 425}}
	            placeholder="请选择"
	            allowClear
	            onPopupScroll={() => {
	                console.log('滚动中...')
	            }}
	            onChange={this.handleChange}
	            onSelect={this.handleSelect}
	            onDeselect={this.handleDeselect}
	        >
	            {ComponentChildren}
	        </Select>
	    );
	}
}

export default Demo3;
