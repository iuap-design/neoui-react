/**
 *
 * @title 根据输入框的内容，进行自动匹配列表显示
 * @description 通过`options`设置自动完成的数据源。支持光标操作，回车事件。
 *
 */
import {AutoComplete} from "@tinper/next-ui";
import React, {Component} from "react";

interface DemoState{
	value: string;
	options: string[];
	placeholder: string;
}

class Demo1 extends Component<{}, DemoState> {
    constructor(props: {}) {
        super(props);
        this.state = {
            value: "",
            options: ["10000", "10001", "10002", "11000", "12010"],
            placeholder: "查找关键字,请输入1",
        };
    }

	onFormChange = (value: string) => {
	    console.log('onFormChange', value);
	    this.setState({
	        value: value
	    });
	};

	render() {
	    let {value, options, placeholder} = this.state;
	    return (
	        <div className="demo" style={{marginBottom: "90px"}}>
	            <AutoComplete
	                disabled
	                requiredStyle
	                allowClear
	                style={{width: "200px"}}
	                value={value}
	                onSearch={(value) => console.log('222222', value)}
	                options={options}
	                placeholder={placeholder}
	                onChange={value => this.onFormChange(value as string)}
	                notFoundContent={<span>暂无数据</span>}
	            />
	        </div>
	    );
	}
}

export default Demo1;
