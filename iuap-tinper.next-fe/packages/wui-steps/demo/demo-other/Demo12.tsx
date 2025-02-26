/**
 *
 * @title 数字步骤条
 * @description 设置 type 为 number。
 *
 */

import {Steps} from "@tinper/next-ui";
import React, {Component} from 'react';

const {Step} = Steps;

interface StepState {
	current: number;
}

class Demo12 extends Component<{}, StepState> {

    constructor(props: {}) {
        super(props);
        this.state = {
            current: 2
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
	            <Steps onChange={this.change} current={this.state.current} type='number'>
	                <Step title="已完成已完成已完" description="这是一段描述啊啊"/>
	                <Step title="进行中已完成已完成" description="这是一段描述啊啊啊啊"/>
	                <Step title="未开始已完成已完成已完成" description="这是一段描述啊"/>
	                <Step title="未开始" description="这是一段描述"/>
	            </Steps>
	            <br/>
	            <br/>
	            <Steps onChange={this.change} current={this.state.current} direction="vertical" type='number'>
	                <Step title="已完成" description="这是一段描述"/>
	                <Step title="进行中" description="这是一段描述"/>
	                <Step title="未开始" description="这是一段描述"/>
	                <Step disabled title="未开始" description="这是一段描述"/>
	            </Steps>
	        </>
	    )
	}
}

export default Demo12;
