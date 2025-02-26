/**
 *
 * @title 自适应高度
 * @description autoAdjustOverflowHeight设置为true时，可是弹层不遮挡触发元素自动调整高度
 */

import {Button, Popover} from '@tinper/next-ui';
import React, {Component} from 'react';

class Demo5 extends Component {
    constructor(props: {}) {
        super(props);
    }

    render() {
        let content = (
            <div>
                <h3 style={{marginTop: 0, marginBottom: 4}}>消息</h3>
                <ul>
                    <li>您的服务器已宕机，请处理。</li>
                    <li>您的手机已停机，请续费。</li>
                    <li>你的工资已到账，请查收。</li>
                    <li>您的服务器已宕机，请处理。</li>
                    <li>您的手机已停机，请续费。</li>
                    <li>你的工资已到账，请查收。</li>
                    <li>您的服务器已宕机，请处理。</li>
                    <li>您的手机已停机，请续费。</li>
                    <li>你的工资已到账，请查收。</li>
                </ul>
            </div>
        );
        const btnStyle = {
            marginRight: '8px',
            marginBottom: '8px'
        }
        return (
            <div className="demo1">
                <div>
                    <Popover trigger='click' placement="topLeft" content={content} autoAdjustOverflowHeight>
                        <Button colors="primary" style={btnStyle}>自适应高度</Button>
                    </Popover>
                </div>
            </div>
        )
    }
}

export default Demo5;
