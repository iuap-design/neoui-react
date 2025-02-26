/**
 *
 * @title Message.config 自定义默认设置
 * @description 通过 `config` API自定义默认设置。
 *
 */

import {Button, Message} from '@tinper/next-ui';
import React, {Component} from 'react';


const dark1 = function() {
    Message.destroy();
    Message.config({
        top: 200,
        duration: 3,
    });
    Message.create({content: '新单据状态更新，请在审批中心查看最新状态。', color: "dark"});
};
const dark2 = function() {
    Message.destroy();
    Message.config({
        width: 500
    });
    Message.create({content: '单据提交成功。', color: "dark", position: 'bottomLeft'});
};

class Demo5 extends Component {
    constructor(props: {}) {
        super(props);
    }

    render() {
        return (
            <div className="paddingDemo">
                <Button
                    colors="dark"
                    onClick={dark1}>
					自定义 top
                </Button>
                <Button
                    shape="border"
                    onClick={dark2}>
					自定义 width
                </Button>
            </div>
        )
    }
}


export default Demo5;
