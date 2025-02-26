/**
 *
 * @title 动态改变 options 数据源
 * @description `onSelectOption`为下拉框选中时触发的回调函数
 *
 */
import {AutoComplete} from "@tinper/next-ui";
import React, {Component} from "react";

interface DemoState{
	value: string;
	options: string[];
	placeholder: string;
}

class Demo2 extends Component<{}, DemoState> {
    constructor(props: {}) {
        super(props);
        this.state = {
            value: "",
            options: [],
            placeholder: "查找关键字,请输入a"
        };
    }

	onFormChange = (value: string) => {
	    this.setState({
	        value: value,
	        options: !value ? [] : [value, value + value, value + value + value]
	    });
	};

	handleSelectChange = (value: string) => {
	    console.log('onSelectOption', value);
	}

	handleBlur: React.FocusEventHandler<HTMLInputElement> = (e) => {
	    console.log('blur test', e.target.value)
	}

	handleKeyDown = () => {
	    console.log('keydown test')
	}

	render() {
	    let {value, options, placeholder} = this.state;
	    return (
	        <div className="demo" style={{marginBottom: "110px"}}>
	            <AutoComplete
	                style={{width: "200px"}}
	                allowClear
	                requiredStyle
	                value={value}
	                options={options}
	                onBlur={this.handleBlur}
	                onKeyDown={this.handleKeyDown}
	                placeholder={placeholder}
	                onChange={value => this.onFormChange(value as string)}
	                onSelect={(value: any) => this.handleSelectChange(value as string)}
	                onClear={(...arg) => console.log(arg)}
	            />
	        </div>
	    );
	}
}

export default Demo2;
