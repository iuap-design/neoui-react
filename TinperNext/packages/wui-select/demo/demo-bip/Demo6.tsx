/**
 * @title 自定义自动填充单选
 * @description 常用邮箱后缀自动填充
 */

import {Select} from "@tinper/next-ui";
import React, {Component} from "react";

const Option = Select.Option;

class Demo6 extends Component<{}, {options: React.ReactNode[]}> {
    constructor(props: {}) {
        super(props);
        this.state = {
            options: []
        };
    }

	handleChange = (value: string) => {
	    let options: React.ReactNode[];
	    if (!value || value.indexOf("@") >= 0) {
	        options = [];
	    } else {
	        options = ["gmail.com", "163.com", "qq.com"].map(domain => {
	            const email = `${value}@${domain}`;
	            return <Option key={email}>{email}</Option>;
	        });
	    }
	    this.setState({options});
	};

	render() {
	    return (
	        <Select
	            mode='combobox'
	            style={{width: 200}}
	            onChange={this.handleChange}
	            filterOption={false}
	            placeholder="Enter the account name"
	        >
	            {this.state.options}
	        </Select>
	    );
	}
}

export default Demo6;
