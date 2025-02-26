/**
 *
 * @title fieldid
 * @description 给节点添加fieldid属性
 *
 */

import React, { Component } from 'react';
import { Steps } from "@tinper/next-ui";
const {Step} = Steps;
class Demo14 extends Component {
    render() {
        return (
            <>
                <Steps current={2} fieldid={'field'} id={'steps'}>
                    <Step id={'finish'} title="1已完成" description="这是一段描述" />
                    <Step title="2已完成" description="这是一段描述" />
                    <Step title="3进行中" description="这是一段描述" />
                    <Step fieldid={'last'} title="4未开始" />
                </Steps>
            </>
        )
    }
}

export default Demo14;
