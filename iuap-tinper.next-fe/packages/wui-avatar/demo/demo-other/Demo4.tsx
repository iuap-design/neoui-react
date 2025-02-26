/**
 * @title 展示数量设置
 * @description 设置展示数量，超出气泡展示
 */

import {Avatar, Icon, Tooltip} from '@tinper/next-ui';
import React, {Component} from 'react';


class Demo4 extends Component {
    render() {
        return (
            <div>
                <Avatar.Group>
                    <Avatar src="https://img0.baidu.com/it/u=1705694933,4002952892&fm=253&fmt=auto&app=138&f=JPEG?w=500&h=281"/>
                    <Avatar>Bobo</Avatar>
                    <Avatar style={{backgroundColor: '#f56a00'}}>Kevin</Avatar>
                    <Tooltip title="BIP User" placement="top">
                        <Avatar style={{backgroundColor: '#18b681'}} icon={<Icon type="uf-caven"/>}/>
                    </Tooltip>
                    <Avatar style={{backgroundColor: '#ffa600'}} icon={<Icon type="uf-lexi"/>}/>
                </Avatar.Group>
                <br/>
                <Avatar.Group fieldid="avatar-group" maxPopoverPlacement="bottom" maxCount={2} maxStyle={{color: '#f56a00', backgroundColor: '#fde3cf'}}>
                    <Avatar fieldid="avatar1" src="https://img0.baidu.com/it/u=1705694933,4002952892&fm=253&fmt=auto&app=138&f=JPEG?w=500&h=281"/>
                    <Avatar>Bobo</Avatar>
                    <Avatar style={{backgroundColor: '#f56a00'}}>Kevin</Avatar>
                    <Tooltip title="BIP User" placement="top">
                        <Avatar style={{backgroundColor: '#18b681'}} icon={<Icon type="uf-caven"/>}/>
                    </Tooltip>
                    <Avatar style={{backgroundColor: '#ffa600'}} icon={<Icon type="uf-lexi"/>}/>
                </Avatar.Group>
                <h3>反向叠加</h3>
                <Avatar.Group reverse>
                    <Avatar src="https://img0.baidu.com/it/u=1705694933,4002952892&fm=253&fmt=auto&app=138&f=JPEG?w=500&h=281" />
                    <Avatar>Bobo</Avatar>
                    <Avatar style={{ backgroundColor: '#f56a00' }}>Kevin</Avatar>
                    <Avatar style={{ backgroundColor: '#18b681' }} icon={<Icon type="uf-caven" />} />
                    <Avatar style={{backgroundColor: '#ffa600'}} icon={<Icon type="uf-lexi"/>}/>
                </Avatar.Group>
                <br />
                <Avatar.Group fieldid="avatar-group" maxPopoverPlacement="bottom" maxCount={2} reverse
                    maxStyle={{ color: '#f56a00', backgroundColor: '#fde3cf' }}>
                    <Avatar fieldid="avatar1" src="https://img0.baidu.com/it/u=1705694933,4002952892&fm=253&fmt=auto&app=138&f=JPEG?w=500&h=281" />
                    <Avatar>Bobo</Avatar>
                    <Avatar style={{ backgroundColor: '#f56a00' }}>Kevin</Avatar>
                    <Avatar style={{ backgroundColor: '#18b681' }} icon={<Icon type="uf-caven" />} />
                    <Avatar style={{backgroundColor: '#ffa600'}} icon={<Icon type="uf-lexi"/>}/>
                </Avatar.Group>
            </div>
        )
    }
}

export default Demo4;
