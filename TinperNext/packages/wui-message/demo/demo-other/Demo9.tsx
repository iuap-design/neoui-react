/**
 *
 * @title 默认的消息提醒
 * @description 通过 `color` 参数切换风格【提供 `light` 和 `dark` 两种默认风格的消息提醒】。若不设置该属性，默认值为`light`。
 * @type other
 * demo9
 */

import {Button, Message} from '@tinper/next-ui';
import React, {Component} from 'react';


const dark = function() {
    Message.destroy();
    Message.create({content: '新单据状态更新，请在审批中心查看最新状态。', color: "dark", duration: 3});
};
const light = function() {
    Message.destroy();
    Message.create({content: '单据提交成功。', color: "light"});
};

class Demo1 extends Component {
    constructor(props: {}) {
        super(props);
    }

    render() {
        return (
            <div className="paddingDemo">
                <Button
                    colors="dark"
                    onClick={dark}>
					dark
                </Button>
                <Button
                    shape="border"
                    onClick={light}>
					light
                </Button>
            </div>
        )
    }
}


export default Demo1;
