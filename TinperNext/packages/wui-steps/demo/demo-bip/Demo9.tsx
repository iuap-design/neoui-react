/**
 *
 * @title 步骤条回退机制
 * @description 步骤条可点击查看上一步，设置 onChange 后，Steps 变为可点击状态。
 *
 */

import {Steps} from "@tinper/next-ui";
import React, {Component} from 'react';

const {Step} = Steps;

interface StepState {
	current: number;
}
class Demo1 extends Component<{}, StepState> {

    constructor(props: {}) {
        super(props);
        this.state = {
            current: 1
        }
    }

	change = (val: number) => {
	    this.setState({
	        current: val
	    })
	}

	render() {
	    return (
	        <>
	            <Steps onChange={this.change} current={this.state.current} more>
	                <Step title="已完成"/>
	                <Step title="进行中"/>
	                <Step title="未开始"/>
	                <Step title="未开始"/>
	            </Steps>
	        </>
	    )
	}
}

export default Demo1;
