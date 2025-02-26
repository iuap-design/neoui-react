/**
 * @title 自动分词
 * @description 给Select设置tokenSeparators，复制词组字符串到输入框中，将自动分词。如复制"Savic,Julita"，将得到"Savic"和"Julita"两个选项值。只在tags模式下可用。
 */

import {Select} from "@tinper/next-ui";
import React, {Component} from "react";

const Option = Select.Option;

const ComponentChildren = ['Maria', 'Enzo'];

class Demo9 extends Component {
	handleChange = (value: string) => {
	    console.log(`selected ${value}`);
	};

	render() {
	    return (
	        <Select
	            mode="tags"
	            style={{width: 400}}
	            placeholder="请粘贴一个以逗号分隔的字符串，例如a,b"
	            onChange={this.handleChange}
	            tokenSeparators={[',']}
	        >
	            {ComponentChildren.map((value) => {
	                return <Option key={value}>{value}</Option>
	            })}
	        </Select>
	    );
	}
}

export default Demo9;
