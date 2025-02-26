/**
 * @title 类型
 * @description 支持三种类型：图片、Icon 以及字符，其中 Icon 和字符型可以自定义图标颜色及背景色。
 */

import {Avatar, Icon} from '@tinper/next-ui';
import React, {Component} from 'react';


class Demo2 extends Component {
    render() {
        return (
            <div className="avatar-group">
                <Avatar icon={<Icon type="uf-caven"/>}/>
                <Avatar>Bobo</Avatar>
                <Avatar size={40}>Kevin</Avatar>
                <Avatar src="https://img0.baidu.com/it/u=1705694933,4002952892&fm=253&fmt=auto&app=138&f=JPEG?w=500&h=281"/>
                <Avatar style={{color: '#fff', backgroundColor: '#f56a00'}}>S</Avatar>
                <Avatar style={{backgroundColor: '#18b681'}} icon={<Icon type="uf-caven"/>}/>
            </div>
        )
    }
}

export default Demo2;
