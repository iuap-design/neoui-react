/**
 *
 * @title 可控制的消息提醒
 * @description 通过设置 `duration:3` 来设置显示时间，`duration:null`为手动关闭。
 *
 */

import {Button, Message} from '@tinper/next-ui';
import React, {Component} from 'react';


const automatic = function() {
    Message.destroy();
    Message.create({
        content: '新单据状态更新，请在审批中心查看最新状态。',
        color: "dark",
        duration: 3
    });
};
const manual = function() {
    Message.destroy();
    Message.create({
        content: '新单据状态更新，请在审批中心查看最新状态。',
        color: "dark",
        duration: null
    });
};

class Demo6 extends Component {
    constructor(props: {}) {
        super(props);
    }

    render() {
        return (
            <div className="paddingDemo">
                <Button
                    colors="dark"
                    onClick={automatic}>
					自动关闭
                </Button>
                <Button
                    shape="border"
                    onClick={manual}>
					手动关闭
                </Button>
            </div>
        )
    }
}


export default Demo6;
