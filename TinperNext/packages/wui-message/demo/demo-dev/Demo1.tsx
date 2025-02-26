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
    Message.create({content: '单据提交成功。',
        transition: false, color: "light"});
};

class Demo1 extends Component {
    constructor(props: {}) {
        super(props);
    }

    render() {
        return (
            <div>
                <div style={{display: 'none'}}>
                    <div tinper-next-role="container" style={{display: 'none'}}></div>
                </div>
                <div className="paddingDemo">
                    <Button
                        shape="border"
                        onClick={onClick}>
                        消息
                    </Button>
                </div>
                <div tinper-next-role="container" style={{display: 'none'}}></div>
                <div style={{display: 'none'}}>
                    <div tinper-next-role="container" ></div>
                </div>
                <div style={{width: '0px', height: 0, display: 'none'}} >
                    <div id="ttt">
                        <div tinper-next-role="container" ></div>
                    </div>
                </div>
                <div>
                    <div>
                        <div tinper-next-role="container"></div>
                    </div>
                </div>
                <div>
                    <div style={{display: 'none'}}>
                        <div tinper-next-role="container"></div>
                    </div>
                </div>

            </div>
        )
    }
}


export default Demo1;
