/**
 *
 * @title 可拖拽面板
 * @description 设置resizable属性控制面板可拖拽
 */

import {Button, Popover} from '@tinper/next-ui';
import React, {Component} from 'react';

class Demo6 extends Component {
    constructor(props: {}) {
        super(props);
    }

    render() {
        let content = (
            <div style={{width: '300px', height: '100px'}}>
                <h3 style={{marginTop: 0, marginBottom: 4}}>消息</h3>
                <ul>
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
            <div className="demo1" style={{margin: '0 0 100px 0'}}>
                <Popover placement="bottomLeft" content={content} trigger='click' resizable resizeStyle={{minHeight: 200, minWidth: 300}}>
                    <Button colors="primary" style={btnStyle}>拖拽</Button>
                </Popover>
            </div>
        )
    }
}

export default Demo6;
