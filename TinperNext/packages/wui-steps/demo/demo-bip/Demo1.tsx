/**
 *
 * @title 基础 Step
 * @description current 标记当前进行哪一步
 *
 */

import {Steps} from "@tinper/next-ui";
import React, {Component} from 'react';

const {Step} = Steps;

class Demo1 extends Component {
    render() {
        return (
            <Steps current={1}>
                <Step title="已完成" description="这是一段描述"/>
                <Step title="进行中" description="这是一段描述"/>
                <Step title="未开始" description="这是一段描述"/>
            </Steps>
        )
    }
}

export default Demo1;
