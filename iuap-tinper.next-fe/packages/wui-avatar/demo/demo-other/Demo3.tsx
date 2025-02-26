/**
 * @title 带徽标的头像
 * @description 通常用于消息提示。
 */

import {Avatar, Badge, Icon} from '@tinper/next-ui';
import React, {Component} from 'react';


class Demo3 extends Component {
    render() {
        return (
            <div>
                <span style={{marginRight: '24px'}}>
                    <Badge count={1}>
                        <Avatar shape="square" icon={<Icon type="uf-caven"/>}/>
                    </Badge>
                </span>
                <span>
                    <Badge dot>
                        <Avatar shape="square" icon={<Icon type="uf-caven"/>}/>
                    </Badge>
                </span>
            </div>
        )
    }
}

export default Demo3;
