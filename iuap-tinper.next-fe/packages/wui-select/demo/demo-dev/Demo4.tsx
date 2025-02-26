/**
 * @title 标签模式多选
 * @description 用户在框内输入自定义内容，Select将输入的内容自动纳入下拉选项中
 */

import {Select} from "@tinper/next-ui";
import React, {Component} from "react";

const Option = Select.Option;

const ComponentChildren: React.ReactNode[] = [];
for (let i = 10; i < 36; i++) {
    ComponentChildren.push(<Option key={i.toString(36) + i}>{i.toString(36) + i}</Option>);
}

class Demo4 extends Component {
	handleChange = (value: string) => {
	    console.log(`selected ${value}`);
	};

	render() {
	    return (
	        <Select
	            dropdownMatchSelectWidth={false}
	            mode="tags"
	            style={{width: 425}}
	            placeholder="请选择"
	            fieldid="sakanovic|90&ccc/ui-+=@$%^&*()!_+@../,.12"
	            removeIcon={<span>x</span>}
	            onChange={this.handleChange}
	        >
	            {ComponentChildren}
	        </Select>
	    );
	}
}

export default Demo4;
