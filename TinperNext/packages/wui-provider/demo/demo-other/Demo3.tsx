/**
 *
 * @title 全局配置antd
 * @description 全局配置组件antd
 *
 */

import { Checkbox, ConfigProvider, Input, Switch } from "@tinper/next-ui";
import React, { ChangeEvent, Component } from 'react';

const { TextArea, Password, Search } = Input;
const CheckboxGroup = Checkbox.Group;

interface ProviderState {
	size: string;
	checkboxValue: string[];
	select: boolean;
}

class Demo1 extends Component<{}, ProviderState> {
    constructor(props: {}) {
        super(props);
        this.state = {
            size: "md",
            checkboxValue: [],
            select: false,
        }
    }

	handleSizeChange = (value: string) => {
	    console.log(value);
	    this.setState({
	        size: value
	    })
	};
	handleAntdChange = (value: boolean) => {
	    console.log(value);
	    this.setState({
	        select: value
	    })
	};
	change = (a1: string & boolean, a2?: ChangeEvent<HTMLInputElement> & React.MouseEvent & boolean) => {
	    this.setState({
	        checkboxValue: a1
	    })
	    console.log('argument1:', a1);
	    console.log('argument2:', a2);
	}

	changeCheck = (a1: React.MouseEvent | boolean, a2: React.MouseEvent | boolean) => {
	    console.log('argument1:', a1);
	    console.log('argument2:', a2);
	}

	render() {
	    const { select, checkboxValue } = this.state;
	    return (
	        <div className="demo1">
	            <div style={{ display: 'flex', alignItems: 'center', marginBottom: 20 }}>
					antd属性：<Switch onChange={this.handleAntdChange} />
	            </div>

	            <ConfigProvider antd={select}>
	                <Input onChange={this.change} />
	                <br />
	                <br />
	                <Password onChange={this.change} />
	                <br />
	                <br />
	                <Search onChange={this.change} />
	                <br />
	                <br />
	                <TextArea onChange={this.change} />

	                <div className="demo-checkbox">
	                    <Checkbox
	                        style={{ lineHeight: '60px' }}
	                        disabled
	                        className="test">
							Disabled
	                    </Checkbox>
	                    <Checkbox
	                        style={{ lineHeight: '60px' }}
	                        checked={true}
	                        className="test">
							Checked
	                    </Checkbox>
	                    <Checkbox
	                        onChange={this.changeCheck}>
							Checkbox
	                    </Checkbox>
	                </div>

	                <CheckboxGroup value={checkboxValue} onChange={this.change}>
	                    <Checkbox value='1'>1</Checkbox>
	                    <Checkbox value='2'>2</Checkbox>
	                    <Checkbox value='3'>3</Checkbox>
	                    <Checkbox value='4'>4</Checkbox>
	                    <Checkbox value='5'>5</Checkbox>
	                </CheckboxGroup>

	            </ConfigProvider>
	        </div>
	    )
	}
}

export default Demo1;
