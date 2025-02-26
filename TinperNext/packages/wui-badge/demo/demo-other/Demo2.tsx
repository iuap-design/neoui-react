/**
 * @title 图标Badge
 * @description 在子元素里自定义内容
 */

import {Badge, Icon} from '@tinper/next-ui';
import React, {Component} from 'react';


class Demo2 extends Component {
    render() {
        return (
            <div>
                <Badge count={4} dataBadgePlacement="bottom">
                    <Icon style={{color: '#505766'}} type="uf-xiaoxi"/>
                </Badge>
                <Badge count={4} colors="warning" style={{marginLeft: 20}}>
                    <Icon style={{color: '#505766'}} type="uf-xiaoxi"/>
                </Badge>
                <br/>
                <br/>
                <Badge dot offset={[6, 0]} colors="primary">
					下拉树
                </Badge>
                <Badge dot colors="warning" style={{marginLeft: 20}}>
                    <Icon style={{color: '#505766'}} type="uf-xiaoxi"/>
                </Badge>
            </div>
        )
    }
}

export default Demo2;
