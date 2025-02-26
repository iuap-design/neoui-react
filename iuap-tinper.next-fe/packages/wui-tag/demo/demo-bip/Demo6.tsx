/**
 *
 * @title  状态标签
 * @description 包含语意色标签，可以在不同场景使用。
 * @type bip
 */

import {Tag} from '@tinper/next-ui';
import React, {Component} from 'react';

class Demo6 extends Component {

    render() {
        return (
            <div className="demoPadding">
                <Tag color="info">审批中</Tag>
                <Tag color="warning">已退回</Tag>
                <Tag color="success">已完成</Tag>
                <Tag color="danger">不通过</Tag>
                <Tag color="invalid">失效</Tag>
                <Tag color="start">开始</Tag>
                <Tag>默认</Tag>
                <Tag color="dark">深色</Tag>
                <br />
                <br />
                <Tag type='filled' color="info">审批中</Tag>
                <Tag type='filled' color="warning">已退回</Tag>
                <Tag type='filled' color="success">已完成</Tag>
                <Tag type='filled' bordered color="danger">不通过</Tag>
                <Tag type='filled' bordered color="invalid">失效</Tag>
                <Tag type='filled' bordered color="start">开始</Tag>
                <br />
                <br />
                <Tag type='bordered' color="info">审批中</Tag>
                <Tag type='bordered' color="warning">已退回</Tag>
                <Tag type='bordered' color="success">已完成</Tag>
                <Tag type='bordered' bordered color="danger">不通过</Tag>
                <Tag type='bordered' bordered color="invalid">失效</Tag>
                <Tag type='bordered' bordered color="start">开始</Tag>
                <Tag type='bordered'>默认</Tag>
            </div>
        )
    }
}

export default Demo6;
