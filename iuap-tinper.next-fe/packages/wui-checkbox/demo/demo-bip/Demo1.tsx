/**
 * @title 基本用法
 * @description `checked` 参数设置是否选中，`disabled`设置是否可用，`onDoubleClick`定义双击事件。
 */


import {Checkbox} from "@tinper/next-ui";
import React, {Component} from 'react';

class Demo1 extends Component<{}, {checkedFlag: boolean}> {
    constructor(props: {}) {
        super(props);
        this.state = {
            checkedFlag: true
        }
        this.onChange = this.onChange.bind(this);
    }

    onChange(_str: string, e: React.ChangeEvent<HTMLInputElement>) {
        console.log(e.target.checked);
        this.setState({checkedFlag: e.target.checked});
    }

	handleDblClick: React.MouseEventHandler<HTMLInputElement> = (state) => {
	    console.log(state);
	}

	render() {
	    return (
	        <div className="demo-checkbox">
	            <Checkbox
	                style={{lineHeight: '60px'}}
	                disabled
	                title="1"
	                className="test">
					Checkbox
	            </Checkbox>
	            <Checkbox
	                style={{lineHeight: '60px'}}
	                checked={true}
	                className="test">
					Checked
	            </Checkbox>
	            <Checkbox
	                antd
	                checked={this.state.checkedFlag}
	                onClick={(e: React.ChangeEvent<HTMLInputElement>) => this.onChange('hello', e)}>
	                <a
	                    href="https://www.baidu.com"
	                    target="_blank"
	                    rel="noreferrer"
	                >
						baidu link
	                </a>
	            </Checkbox>
	        </div>
	    )
	}
}

export default Demo1;
