/**
 * @title 基本使用
 * @description 基本API的使用
 */

import {Select, SelectValue} from "@tinper/next-ui";
import React, {Component} from "react";

const Option = Select.Option;

class Demo1 extends Component {
	handleChange = (value: SelectValue) => {
	    console.log(value);
	};

	render() {
	    const style = {width: 120, marginRight: 20}
	    return (
	        <div>
	            <Select dropdownClassName="test" getSelectAttrs={() => {
	                return {fieldId: '1'}
	            }} defaultValue="spring" style={{...style}} onChange={this.handleChange}>
	                <Option value="spring"><div>春天</div></Option>
	                <Option value="summer"><div>夏天</div></Option>
	                <Option value="autumn" disabled>
	                    <div>秋天</div>
	                </Option>
	                <Option value="winter"><div>冬天</div></Option>
	            </Select>
	            <Select defaultValue="alpha" style={{...style}} disabled>
	                <Option value="alpha">Alpha</Option>
	            </Select>
	            <Select defaultValue="john" style={{...style}} loading>
	                <Option value="john">John</Option>
	            </Select>
	            <Select onChange={this.handleChange} defaultValue="svetlana" style={{...style}} allowClear>
	                <Option value="svetlana">Svetlana</Option>
	                <Option value={[1, 2]}>Array</Option>
	            </Select>
	        </div>
	    );
	}
}

export default Demo1;
