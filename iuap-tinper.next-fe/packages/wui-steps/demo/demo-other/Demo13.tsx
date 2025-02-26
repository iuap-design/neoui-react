/**
 *
 * @title 箭头步骤条
 * @description 指定 type: 'arrow'， 可以使用箭头类型的步骤条。注意：仅支持水平步骤条
 *
 */

import {Icon, Steps} from "@tinper/next-ui";
import React, {Component} from 'react';

const {Step} = Steps;

interface StepState {
	current: number;
	current2: number;
}
class Demo12 extends Component<{}, StepState> {

    constructor(props: {}) {
        super(props);
        this.state = {
            current: 2,
            current2: 2
        }
    }

	change = (val: number) => {
	    this.setState({
	        current: val
	    })
	}
	change2 = (val: number) => {
	    this.setState({
	        current2: val
	    })
	}

	render() {
	    return (
	        <>
	            <Steps onChange={this.change} current={this.state.current} type='arrow'>
	                <Step title="已完成" subTitle="12:30:00" description="这是一段描述啊啊"/>
	                <Step title="进行中已完成已完成" description="这是一段描述啊啊啊啊这是一段描述啊啊啊啊这是一段描述啊啊啊啊这是一段描述啊啊啊啊这是一段描述啊啊啊啊"/>
	                <Step status='error' title="未开始已完成已完成已完成"/>
	                <Step title="未开始" description="这是一段描述"/>
	            </Steps>
	            <br/>
	            <br/>
	            <Steps onChange={this.change2} current={this.state.current2} type='arrow' size='small'>
	                <Step title="已完成已完成已完" description="这是一段描述啊啊"/>
	                <Step title="进行中已完成已完成" description="这是一段描述啊啊啊啊这是一段描述啊啊啊啊这是一段描述啊啊啊啊这是一段描述啊啊啊啊这是一段描述啊啊啊啊"/>
	                <Step title="未开始已完成已完成已完成"/>
	                <Step title="未开始" description="这是一段描述"/>
	            </Steps>
	            <br/>
	            <br/>
	            <Steps type='arrow' size='small'>
	                <Step status="finish" title="登录" subTitle="这是副标题" stepNumber={<Icon type="uf-users-o"/>}/>
	                <Step status="finish" title="身份认证" stepNumber={<Icon type="uf-personin-o"/>}/>
	                <Step status="process" title="支付" stepNumber={<Icon type="uf-creditcard"/>}/>
	                <Step status="wait" title="交易完成" stepNumber={<Icon type="uf-correct-2"/>}/>
	            </Steps>
	        </>
	    )
	}
}

export default Demo12;
