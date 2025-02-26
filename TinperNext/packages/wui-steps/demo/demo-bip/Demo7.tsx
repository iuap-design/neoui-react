/**
 *
 * @title 点状步骤条
 * @description 包含步骤点的进度条
 *
 */

import {Steps} from "@tinper/next-ui";
import React, {Component} from 'react';

const {Step} = Steps;

class Demo2 extends Component {
    render() {
        return (
            <>
                <Steps progressDot current={1}>
                    <Step title="Finished" description="This is a description."/>
                    <Step title="In Progress" description="This is a description."/>
                    <Step title="Waiting" description="This is a description."/>
                </Steps>
                <br/>
                <br/>
                <Steps progressDot current={1} direction="vertical">
                    <Step title="Finished" description="This is a description. This is a description."/>
                    <Step title="Finished" description="This is a description. This is a description."/>
                    <Step title="In Progress" description="This is a description. This is a description."/>
                    <Step title="Waiting" description="This is a description."/>
                    <Step title="Waiting" description="This is a description."/>
                </Steps>
            </>
        )
    }
}

export default Demo2;
