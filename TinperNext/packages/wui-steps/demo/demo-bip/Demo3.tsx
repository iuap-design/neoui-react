/**
 *
 * @title 结合切换事件的 Step
 * @description 点击next，Step的流程跟进
 *
 */
import {Button, Message, Steps} from '@tinper/next-ui';
import React, {Component} from 'react';

interface StepState {
	current: number;
}

const {Step} = Steps;

const steps = [{
    title: '填写申请信息',
    content: '第一步：填写申请信息',
}, {
    title: '上传资料',
    content: '第二步：上传资料',
}, {
    title: '提交申请',
    content: '第三步：提交申请',
}];

class Demo3 extends Component<{}, StepState> {
    constructor(props: {}) {
        super(props);
        this.state = {
            current: 0,
        };
    }

    next() {
        const current = this.state.current + 1;
        this.setState({current});
    }

    prev() {
        const current = this.state.current - 1;
        this.setState({current});
    }

    alertDone() {
        Message.success({content: '完成'});
    }

    render() {
        const {current} = this.state;
        return (
            <div>
                <Steps current={current}>
                    {steps.map(item => <Step key={item.title} title={item.title}/>)}
                </Steps>
                <div className="steps-content">{steps[this.state.current].content}</div>
                <div className="steps-action">
                    {
                        this.state.current > 0
						&&
						<Button bordered style={{marginRight: 8}} onClick={() => this.prev()}>
							上一步
						</Button>
                    }
                    {
                        this.state.current < steps.length - 1
						&&
						<Button colors="primary" onClick={() => this.next()}>下一步</Button>
                    }
                    {
                        this.state.current === steps.length - 1
						&&
						<Button colors="primary" onClick={() => this.alertDone()}>完成</Button>
                    }
                </div>
            </div>
        );
    }
}

export default Demo3;
