/**
 *
 * @title 使用fieldid
 * @description 使用fieldid。
 *
 */

import {Button, Message} from '@tinper/next-ui';
import React, {Component} from 'react';


const onClick = function() {
    Message.destroy();
    Message.create({content: <div>单据提交成功</div>, color: "light", fieldid: "demo"});
};

class Demo12 extends Component {
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


export default Demo12;
