/**
 * @title 基本样式展示
 * @description 基本样式展示
 * @type bip
 */

import {Avatar, Icon} from '@tinper/next-ui';
import React, {Component} from 'react';


class Demo extends Component {
    render() {
        return (
            <div className="avatar-group">
                <Avatar size={64} icon={<Icon type="uf-caven"/>}/>
                <Avatar size="large" icon={<Icon type="uf-caven"/>}/>
                <Avatar icon={<Icon type="uf-caven"/>}/>
                <Avatar size="small" icon={<Icon type="uf-caven"/>}/>
            </div>
        )
    }
}

export default Demo;
