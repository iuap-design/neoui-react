/**
 *
 * @title 自定义图标
 * @description
 *
 */

import {Icon, Steps} from "@tinper/next-ui";
import React, {Component} from 'react';

const {Step} = Steps;

class Demo2 extends Component {
    render() {
        return (
            <>
                <Steps>
                    <Step status="finish" title="登录" icon={<Icon type="uf-users-o"/>}/>
                    <Step status="finish" title="身份认证" icon={<Icon type="uf-personin-o"/>}/>
                    <Step status="process" title="支付" icon={<Icon type="uf-creditcard"/>}/>
                    <Step status="wait" title="交易完成" icon={<Icon type="uf-correct-2"/>}/>
                </Steps>
                <br/>
                <br/>
                <Steps>
                    <Step status="finish" title="合并部门信息" icon={<Icon type="uf-hebingbumenxinxi"/>}/>
                    <Step status="process" title="合并职位信息" icon={<Icon type="uf-hebingzhiweixinxi"/>}/>
                    <Step status="wait" title="合并人员信息" icon={<Icon type="uf-hebingrenyuanxinxi"/>}/>
                </Steps>
            </>
        )
    }
}

export default Demo2;
