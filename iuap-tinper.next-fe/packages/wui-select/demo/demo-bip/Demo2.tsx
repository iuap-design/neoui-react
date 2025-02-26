/**
 * @title 基本使用
 * @description 基本API的使用
 */

import {Select, SelectValue} from "@tinper/next-ui";
import React, {Component} from "react";

const Option = Select.Option;

class Demo2 extends Component {
	handleChange = (value: SelectValue) => {
	    console.log(value);
	};

	render() {
	    const style = {width: 120, marginRight: 20}
	    return (
	        <div>
	            <Select
	                bordered='bottom'
	                requiredStyle
	                dropdownClassName="test" getSelectAttrs={() => {
	                return {fieldId: '1'}
	            }} defaultValue="spring" style={{...style}} onChange={this.handleChange}>
	                <Option value="spring">春天</Option>
	                <Option value="summer">夏天</Option>
	                <Option value="autumn" disabled>
						秋天
	                </Option>
	                <Option value="winter">冬天</Option>
	            </Select>
	            <Select
	                bordered='bottom'
	                requiredStyle
	                defaultValue="alpha" style={{...style}} disabled>
	                <Option value="alpha">Alpha</Option>
	            </Select>
	            <Select
	                requiredStyle
	                disabled defaultValue="john" style={{...style}} loading>
	                <Option value="john">John</Option>
	            </Select>
	            <Select requiredStyle onChange={this.handleChange} defaultValue="svetlana" style={{...style}} allowClear>
	                <Option value="svetlana">Svetlana</Option>
	                <Option value={[1, 2]}>Array</Option>
	            </Select>
	        </div>
	    );
	}
}

export default Demo2;
