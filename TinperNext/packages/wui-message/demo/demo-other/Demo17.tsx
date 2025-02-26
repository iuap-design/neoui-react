/**
 *
 * @title 当前通知唯一标志
 * @description 通过 key 设置当前通知唯一标志。
 *
 */

import {Button, Message} from '@tinper/next-ui';
import React, {Component} from 'react';


const onClick = function() {
    Message.destroy();
    Message.create({content: '单据提交成功1。', color: "light", key: 'a', duration: 5});
    Message.create({content: '单据提交成功2。', color: "light", key: 'b', duration: 5});
    Message.create({content: '单据提交成功3。', color: "light", key: 'c', duration: 5});
    Message.create({content: '单据提交成功4。', color: "light", duration: 5});

};
const onClick2 = function() {
    Message.destroy('b');
};
const onClick3 = function() {
    Message.destroy();
};
class Demo17 extends Component {
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
                <Button
                    shape="border"
                    onClick={onClick2}>
					destroy(“b”)
                </Button>
                <Button
                    shape="border"
                    onClick={onClick3}>
					destroy()
                </Button>
            </div>
        )
    }
}


export default Demo17;
