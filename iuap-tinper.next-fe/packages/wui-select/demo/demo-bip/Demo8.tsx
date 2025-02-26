/**
 * @title 设置options数组对象来自动生成option
 * @description 必须有value属性。根据需要设置disabed
 */

import {Select, SelectProps} from "@tinper/next-ui";
import React, {Component} from "react";

interface DemoState {
	DataSource: SelectProps<string>['data'];
}

let selectDataSource: SelectProps<string>['options'] = [
    {
        key: "zhangsan",
        label: "张三",
        value: "zhangsan",
        disabled: true,
        id: '01'
    },
    {
        key: "lisi",
        label: "李四",
        value: "lisi",
        id: '02'
    },
    {
        key: "wangwu",
        label: "王五",
        value: "wangwu",
        id: '03'
    }
];

class Demo8 extends Component<{}, DemoState> {

	handleChange = (value: string) => {
	    console.log(value);
	}

	render() {
	    return (
	        <div>
	            <Select
	                style={{width: 200}}
	                placeholder="Select a person"
	                onChange={this.handleChange}
	                options={selectDataSource}
	                id="test"
	            />
	            {/* <Select
	                style={{width: 200, marginLeft: "5px"}}
	                placeholder="Select a person"
	                data={this.state.DataSource} // 旧API，建议使用options
	            /> */}
	        </div>
	    );
	}
}

export default Demo8;
