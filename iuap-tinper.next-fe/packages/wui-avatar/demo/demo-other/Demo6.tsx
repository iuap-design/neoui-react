/**
 * @title 多余头像触发方式
 * @description maxPopoverTrigger设置多余头像展示触发方式，超出气泡展示
 */

import {Avatar, Icon, Tooltip, Button} from '@tinper/next-ui';
import React, {Component} from 'react';


class Demo6 extends Component<{}, {trigger: 'hover' | 'click' | 'focus'}> {
    constructor(props: {}) {
        super(props);
        this.state = {
            trigger: 'hover'
        };
    }
    handleHover = () => {
        this.setState({ trigger: 'hover' })
    }
    handleClick = () => {
        this.setState({ trigger: 'click' })
    }
    handleFocus = () => {
        this.setState({ trigger: 'focus' })
    }
    render() {
        return (
            <div>
                <p style={{marginBottom: '15px'}}>
                    <Button onClick={this.handleHover}>hover</Button>
                    <Button onClick={this.handleClick}>click</Button>
                    <Button onClick={this.handleFocus}>focus</Button>
                </p>
                <Avatar.Group fieldid="avatar-group" maxPopoverPlacement="bottom" maxCount={4} maxPopoverTrigger={this.state.trigger}
							  maxStyle={{color: '#f56a00', backgroundColor: '#fde3cf'}} size="large">
                    <Avatar fieldid="avatar1" src="https://img0.baidu.com/it/u=1705694933,4002952892&fm=253&fmt=auto&app=138&f=JPEG?w=500&h=281"/>
                    <Avatar>Bobo</Avatar>
                    <Avatar style={{backgroundColor: '#f56a00'}}>Kevin</Avatar>
                    <Tooltip title="BIP User" placement="top">
                        <Avatar style={{backgroundColor: '#18b681'}} icon={<Icon type="uf-caven"/>}/>
                    </Tooltip>
                    <Avatar style={{backgroundColor: '#ffa600'}} icon={<Icon type="uf-lexi"/>}/>
                </Avatar.Group>
            </div>
        )
    }
}

export default Demo6;
