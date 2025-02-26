/**
 * @title 基本样式展示
 * @description 基本样式展示
 */

import {Avatar, Icon} from '@tinper/next-ui';
import React, {Component} from 'react';


class Demo1 extends Component {
    render() {
        return (
            <div >
                <div className="avatar-group">
                    <Avatar size={64} icon={<Icon type="uf-caven"/>}/>
                    <Avatar size="large" icon={<Icon type="uf-caven"/>}/>
                    <Avatar icon={<Icon type="uf-caven"/>}/>
                    <Avatar size="small" icon={<Icon type="uf-caven"/>}/>
                </div>
                <div className="avatar-group">
                    <Avatar shape="square" size={64} icon={<Icon type="uf-caven"/>}/>
                    <Avatar shape="square" size="large" icon={<Icon type="uf-caven"/>}/>
                    <Avatar shape="square" icon={<Icon type="uf-caven"/>}/>
                    <Avatar shape="square" size="small" icon={<Icon type="uf-caven"/>}/>
                </div>
            </div>
        )
    }
}

export default Demo1;
