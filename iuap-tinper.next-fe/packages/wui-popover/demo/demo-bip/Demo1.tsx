/**
 *
 * @title 气泡卡片默认样式
 * @description 支持12个位置
 */

import {Button, Popover} from '@tinper/next-ui';
import React, {Component} from 'react';

class Demo1 extends Component {
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
                </ul>
            </div>
        );
        const buttonWidth = 72;
        const btnStyle = {
            marginRight: '8px',
            marginBottom: '8px'
        }
        return (
            <div className="demo1" style={{margin: '100px 0 100px 250px'}}>
                <div style={{marginLeft: buttonWidth, whiteSpace: 'nowrap'}}>
                    <Popover placement="topLeft" content={content} trigger='click'>
                        <Button colors="primary" style={btnStyle}>上左</Button>
                    </Popover>
                    <Popover placement="top" content={content} trigger='click'>
                        <Button colors="primary" style={btnStyle}>上</Button>
                    </Popover>
                    <Popover placement="topRight" content={content}>
                        <Button colors="primary" style={btnStyle}>上右</Button>
                    </Popover>
                </div>
                <div style={{width: buttonWidth, float: 'left'}}>
                    <Popover placement="leftTop" content={content}>
                        <Button colors="primary" style={btnStyle}>左上</Button>
                    </Popover>
                    <Popover placement="left" content={content} trigger='click'>
                        <Button colors="primary" style={btnStyle}>左</Button>
                    </Popover>
                    <Popover placement="leftBottom" content={content}>
                        <Button colors="primary" style={btnStyle}>左下</Button>
                    </Popover>
                </div>
                <div style={{width: buttonWidth, marginLeft: 256}}>
                    <Popover placement="rightTop" content={content} trigger='click'>
                        <Button colors="primary" style={btnStyle}>右上</Button>
                    </Popover>
                    <Popover placement="right" content={content}>
                        <Button colors="primary" style={btnStyle}>右</Button>
                    </Popover>
                    <Popover placement="rightBottom" content={content}>
                        <Button colors="primary" style={btnStyle}>右下</Button>
                    </Popover>
                </div>
                <div style={{marginLeft: buttonWidth, clear: 'both', whiteSpace: 'nowrap'}}>
                    <Popover placement="bottomLeft" content={content}>
                        <Button colors="primary" style={btnStyle}>下左</Button>
                    </Popover>
                    <Popover placement="bottom" content={content}>
                        <Button colors="primary" style={btnStyle}>下</Button>
                    </Popover>
                    <Popover placement="bottomRight" content={content}>
                        <Button colors="primary" style={btnStyle}>下右</Button>
                    </Popover>
                </div>
            </div>
        )
    }
}

export default Demo1;
