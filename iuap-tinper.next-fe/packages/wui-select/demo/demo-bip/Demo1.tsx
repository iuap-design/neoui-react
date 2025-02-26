/**
 * @title 默认设置下拉框获取焦点事件
 * @description autoFocus参数控制是否需要获取焦点
 * 同时暴露两个api  onFocus、onBlur 返回当前选中的数据
 */

import {Select} from "@tinper/next-ui";
import React, {Component} from "react";

const Option = Select.Option;

class Demo1 extends Component {
	handleChange = (value: string) => {
	    console.log(`selected ${value}`);
	};
	handFocus = () => {
	    console.log('获取焦点事件');
	};
	onBlur = () => {
	    console.log('失去焦点事件');
	};

	render() {
	    return (
	        <div>
	            <Select
	                allowClear
	                requiredStyle
	                bordered='bottom'
	                defaultValue="all"
	                style={{width: 200, marginRight: 6}}
	                onChange={this.handleChange}
	                onFocus={this.handFocus}
	                onBlur={this.onBlur}
	                autoFocus
	                size='default'
	            >
	                <Option value="all">全部</Option>
	                <Option value="confirming">待确认</Option>
	                <Option value="executing">执行中</Option>
	                <Option value="completed" disabled>
						已办结
	                </Option>
	                <Option value="termination">终止</Option>
	            </Select>
	        </div>
	    );
	}
}

export default Demo1;
