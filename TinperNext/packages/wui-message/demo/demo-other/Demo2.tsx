/**
 *
 * @title 通栏样式
 * @description 顶部通栏消息提醒。通过 `style` 参数给 Message 组件添加样式。
 *
 */

import {Button, Message} from '@tinper/next-ui';
import React, {Component} from 'react';


const success1 = function() {
    Message.destroy();
    Message.create({
        content: '新单据状态更新，请在审批中心查看最新状态。',
        color: "success",
        duration: 30,
        style: {width: '100%', top: 0, left: 0, transform: 'none'}
    });
};
const success2 = function() {
    Message.destroy();
    Message.create({
        content: '新单据状态更新，请在审批中心查看最新状态。',
        color: "success",
        position: 'bottom',
        duration: 30,
        style: {width: '100%', bottom: 0, left: 0, transform: 'none'}
    });
};

class Demo2 extends Component {
    constructor(props: {}) {
        super(props);
    }

    render() {
        return (
            <div className="paddingDemo">
                <Button
                    bordered
                    onClick={success1}>
					顶部通栏
                </Button>
                <Button
                    bordered
                    onClick={success2}>
					底部通栏
                </Button>
            </div>
        )
    }
}


export default Demo2;
