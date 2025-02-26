/**
 *
 * @title 竖向的 Step
 * @description 通过 `direction` API设置步骤条的方向，默认是水平方向 horizontal
 *
 */

import {Steps} from "@tinper/next-ui";
import React, {Component} from 'react';

const {Step} = Steps;

class Demo4 extends Component {
    render() {
        return (
            <div>
                <Steps direction="vertical" current={1}>
                    <Step title="已完成" description="这是一段描述"/>
                    <Step title="进行中" description="这是一段描述"/>
                    <Step title="未开始" description="这是一段描述"/>
                </Steps>
            </div>
        )
    }
}

export default Demo4;
