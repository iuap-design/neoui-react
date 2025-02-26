/**
 *
 * @title 默认的消息提醒
 * @description 默认的消息提醒。
 *
 */

import {Button, Message} from '@tinper/next-ui';
import React, {Component} from 'react';


const onClick = function() {
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
                    shape="border"
                    onClick={onClick}>
					消息
                </Button>
            </div>
        )
    }
}


export default Demo1;
