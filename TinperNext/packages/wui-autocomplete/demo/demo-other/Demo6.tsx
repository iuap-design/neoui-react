/**
 * @title 下划线模式
 * @description 设置bordered='bottom'
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
	                style={{width: "200px"}}
	                bordered={false}
	                align="center"
	                value={value}
	                onSearch={(value) => console.log('222222', value)}
	                options={options}
	                placeholder='无边框'
	                onChange={value => this.onFormChange(value as string)}
	                notFoundContent={<span>暂无数据</span>}
	            />
	            <br />
	            <AutoComplete
	                style={{width: "200px"}}
	                bordered='bottom'
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
