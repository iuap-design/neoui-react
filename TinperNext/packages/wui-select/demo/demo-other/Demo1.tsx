/**
 * @title 下划线模式
 * @description 设置bordered='bottom'
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
	                bordered='bottom'
	                align="center"
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
