/**
 *
 * @title 不同尺寸的 Step
 * @description size 可设置为 small，默认是 default
 *
 */

import {Steps} from "@tinper/next-ui";
import React, {Component} from 'react';

const {Step} = Steps;

class Demo6 extends Component {
    render() {
        return (
            <div>
                <Steps current={1} size="small">
                    <Step title="已完成" description="这是一段描述"/>
                    <Step title="进行中" description="这是一段描述"/>
                    <Step title="未开始" description="这是一段描述"/>
                </Steps>
            </div>
        )
    }
}

export default Demo6;
