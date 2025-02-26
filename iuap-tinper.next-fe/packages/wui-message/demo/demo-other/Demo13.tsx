/**
 *
 * @title getPopupContainer
 * @description getPopupContainer
 *
 */

import {Button, Message} from '@tinper/next-ui';
import React, {Component} from 'react';


const onClick = function() {
    Message.destroy();
    Message.create({content: '单据提交成功。', duration: 10, color: "light", getPopupContainer: ()=> document.querySelector('.paddingDemo1')});
};

class Demo13 extends Component {
    constructor(props: {}) {
        super(props);
    }

    render() {
        return (
            <div className="paddingDemo paddingDemo1">
                <Button
                    shape="border"
                    onClick={onClick}>
					消息
                </Button>
            </div>
        )
    }
}


export default Demo13;
