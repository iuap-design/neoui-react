/**
 *
 * @title 指定状态的Step
 * @description  用step的status属性，指定当前step的状态
 *
 */

import {Steps} from "@tinper/next-ui";
import React, {Component} from 'react';

const {Step} = Steps;

class Demo5 extends Component {
    render() {
        return (
            <div>
                <Steps current={1} status="error">
                    <Step title="已完成" description="这是一段描述"/>
                    <Step title="异常态" description="这是一段描述"/>
                    <Step title="未开始" description="这是一段描述"/>
                </Steps>
            </div>
        )
    }
}

export default Demo5;
