/**
 *
 * @title maxCount 设置最大消息显示数
 * @description 最大显示数,超过限制时,最早的消息会被自动关闭
 *
 */

import {Button, Message} from '@tinper/next-ui';
import React, {Component} from 'react';


const maxCount = function() {
    Message.config({
        maxCount: 4
    });
    Message.create({content: '新单据状态更新，请在审批中心查看最新状态。', color: "dark", duration: 20});
};

class Demo16 extends Component {
    constructor(props: {}) {
        super(props);
    }

    render() {
        return (
            <div className="paddingDemo">
                <Button
                    colors="dark"
                    onClick={maxCount}>
					maxCount(4)
                </Button>
            </div>
        )
    }
}


export default Demo16;
