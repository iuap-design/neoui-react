/**
 *
 * @title 步骤较多时的处理方式
 * @description more 属性可以灵活显示步骤条
 *
 */

import {Steps} from "@tinper/next-ui";
import React, {Component} from 'react';

const {Step} = Steps;

class Demo8 extends Component {
    render() {
        return (
            <>
                <Steps current={2} more>
                    <Step title="1已完成"/>
                    <Step title="2已完成"/>
                    <Step title="3进行中"/>
                    <Step title="4未开始"/>
                </Steps>
                <br/>
                <br/>
                <Steps current={10} more>
                    <Step title="1已完成"/>
                    <Step title="2已完成"/>
                    <Step title="3已完成"/>
                    <Step title="4已完成"/>
                    <Step title="5已完成"/>
                    <Step title="6已完成"/>
                    <Step title="7已完成"/>
                    <Step title="8已完成"/>
                    <Step title="9已完成"/>
                    <Step title="10已完成"/>
                    <Step title="11进行中"/>
                    <Step title="12未开始"/>
                    <Step title="13未开始"/>
                    <Step title="14未开始"/>
                    <Step title="15未开始"/>
                    <Step title="16未开始"/>
                    <Step title="17未开始"/>
                    <Step title="18未开始"/>
                    <Step title="19未开始"/>
                    <Step title="20未开始"/>
                </Steps>
            </>
        )
    }
}

export default Demo8;
