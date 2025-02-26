/**
 * @title 受控的Select
 * @description open参数控制下拉框展开收起
 */

import {Button, Select} from '@tinper/next-ui';
import React, {Component} from "react";

interface DemoState {
	open: boolean
}

const Option = Select.Option;

class Demo10 extends Component<{}, DemoState> {
    constructor(props: {}) {
        super(props);
        this.state = {
            open: true
        }
    }

	changeOpen = () => {
	    this.setState({open: !this.state.open});
	}

	render() {
	    const {open} = this.state
	    const style = open ? {height: 140} : {} // 防止遮盖源码
	    return (
	        <div className="demo14-container" style={{...style, position: 'relative'}}>
	            <Button onClick={this.changeOpen} style={{marginRight: 20 + 'px'}}>{`${!open ? "展开" : "收起"}`}</Button>
	            <Select
	                defaultValue="all"
	                style={{width: 200, marginRight: 6}}
	                onChange={this.changeOpen}
	                open={open}
	                getPopupContainer={() => document.querySelector(".demo14-container") as HTMLElement}
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

export default Demo10;
