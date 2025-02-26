/**
 *
 * @title 步骤较多时的处理方式
 * @description more 属性可以灵活显示步骤条
 *
 */

import {Steps} from "@tinper/next-ui";
import React, {Component} from 'react';

const {Step} = Steps;

interface StepState {
	current: number;
	arrowCrt: number;
	dotCrt: number;
	numberCrt: number;
}
class Demo10 extends Component<{}, StepState> {
    constructor(props: {}) {
        super(props);
        this.state = {
            current: 10,
            arrowCrt: 10,
            dotCrt: 10,
            numberCrt: 10
        }
    }

	change = (val: number) => {
	    this.setState({
	        current: val
	    })
	}

    arrowChange = (val: number, position: string) => {
	    if (position === 'center') {
            this.setState({
                arrowCrt: val
            })
        }
    }

    render() {
	    return (
	        <div style={{position: 'relative'}} tinper-next-role='container'>
	            <Steps current={2} more onChange={() => {}}>
	                <Step title={<div>1已完成</div>} description="这是一段描述"/>
	                <Step title="2已完成" description="这是一段描述"/>
	                <Step title="3进行中" description="这是一段描述"/>
	                <Step title="4未开始"/>
	            </Steps>
	            <br/>
	            <br/>
	            <Steps onChange={this.change} current={this.state.current} more>
	                <Step title="1已完成" description="这是一段描述"/>
	                <Step title="2已完成" description="这是一段描述"/>
	                <Step title="3已完成" description="这是一段描述"/>
	                <Step title="4已完成"/>
	                <Step title="5已完成" disabled description="这是一段描述"/>
	                <Step title="6已完成" description="这是一段描述"/>
	                <Step title="7已完成" description="这是一段描述"/>
	                <Step title="8已完成" description="这是一段描述"/>
	                <Step title="9已完成" description="这是一段描述"/>
	                <Step title="10已完成" description="这是一段描述"/>
	                <Step title="11进行中" description="这是一段描述"/>
	                <Step title="12未开始"/>
	                <Step title="13未开始"/>
	                <Step title="14未开始" description="这是一段描述"/>
	                <Step title="15未开始" description="这是一段描述"/>
	                <Step title="16未开始" description="这是一段描述"/>
	                <Step title="17未开始" description="这是一段描述"/>
	                <Step title="18未开始" disabled description="这是一段描述"/>
	                <Step title="19未开始" description="这是一段描述"/>
	                <Step title="20未开始" description="这是一段描述"/>
	            </Steps>
	            <br/>
	            <br/>
	            <Steps onChange={this.arrowChange} current={this.state.arrowCrt} more type="arrow">
	                <Step title={<div>1已完成</div>} description="这是一段描述"/>
	                <Step title="2已完成" description="这是一段描述"/>
	                <Step title="3已完成" description="这是一段描述"/>
	                <Step title="4已完成"/>
	                <Step title="5已完成" disabled description="这是一段描述"/>
	                <Step title="6已完成" description="这是一段描述"/>
	                <Step title="7已完成" description="这是一段描述"/>
	                <Step title="8已完成" description="这是一段描述"/>
	                <Step title="9已完成" description="这是一段描述"/>
	                <Step title="10已完成" description="这是一段描述"/>
	                <Step title="11进行中" description="这是一段描述"/>
	                <Step title="12未开始"/>
	                <Step title="13未开始"/>
	                <Step title="14未开始" description="这是一段描述"/>
	                <Step title="15未开始" description="这是一段描述"/>
	                <Step title="16未开始" description="这是一段描述"/>
	                <Step title="17未开始" description="这是一段描述"/>
	                <Step title="18未开始" disabled description="这是一段描述"/>
	                <Step title="19未开始" description="这是一段描述"/>
	                <Step title="20未开始" description="这是一段描述"/>
	            </Steps>
                <br />
                <br />
                <Steps
                    onChange={(val: number, position: string) => {
                        if (position === 'center') {
                            this.setState({
                                dotCrt: val
                            })
                        }
                    }}
                    current={this.state.dotCrt} more type="dot">
                    <Step title={<div>1已完成</div>} description="这是一段描述" />
                    <Step title="2已完成" description="这是一段描述" />
                    <Step title="3已完成" description="这是一段描述" />
                    <Step title="4已完成" />
                    <Step title="5已完成" disabled description="这是一段描述" />
                    <Step title="6已完成" description="这是一段描述" />
                    <Step title="7已完成" description="这是一段描述" />
                    <Step title="8已完成" description="这是一段描述" />
                    <Step title="9已完成" description="这是一段描述" />
                    <Step title="10已完成" description="这是一段描述" />
                    <Step title="11进行中" description="这是一段描述" />
                    <Step title="12未开始" />
                    <Step title="13未开始" />
                    <Step title="14未开始" description="这是一段描述" />
                    <Step title="15未开始" description="这是一段描述" />
                    <Step title="16未开始" description="这是一段描述" />
                    <Step title="17未开始" description="这是一段描述" />
                    <Step title="18未开始" disabled description="这是一段描述" />
                    <Step title="19未开始" description="这是一段描述" />
                    <Step title="20未开始" description="这是一段描述" />
                </Steps>
                <br />
                <br />
                <Steps
                    onChange={(val: number, position: string) => {
                        if (position === 'center') {
                            this.setState({
                                numberCrt: val
                            })
                        }
                    }}
                    current={this.state.numberCrt} more type="number">
                    <Step title={<div>1已完成</div>} description="这是一段描述" />
                    <Step title="2已完成" description="这是一段描述" />
                    <Step title="3已完成" description="这是一段描述" />
                    <Step title="4已完成" />
                    <Step title="5已完成" disabled description="这是一段描述" />
                    <Step title="6已完成" description="这是一段描述" />
                    <Step title="7已完成" description="这是一段描述" />
                    <Step title="8已完成" description="这是一段描述" />
                    <Step title="9已完成" description="这是一段描述" />
                    <Step title="10已完成" description="这是一段描述" />
                    <Step title="11进行中" description="这是一段描述" />
                    <Step title="12未开始" />
                    <Step title="13未开始" />
                    <Step title="14未开始" description="这是一段描述" />
                    <Step title="15未开始" description="这是一段描述" />
                    <Step title="16未开始" description="这是一段描述" />
                    <Step title="17未开始" description="这是一段描述" />
                    <Step title="18未开始" disabled description="这是一段描述" />
                    <Step title="19未开始" description="这是一段描述" />
                    <Step title="20未开始" description="这是一段描述" />
                </Steps>
	        </div>
	    )
    }
}

export default Demo10;
