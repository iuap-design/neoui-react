/**
 *
 * @title 设置延迟显示/隐藏
 * @description 提供三个参数控制延迟时间：delay、mouseEnterDelay、mouseLeaveDelay。单位：毫秒。如 `delay={800}` 表示延迟时间为 0.8 秒。
 *
 */

import {Button, Dropdown, Menu, MenuProps, DropdownProps} from '@tinper/next-ui';
import React, {Component} from 'react';


const {Item} = Menu;

const onSelect: MenuProps['onSelect'] = (info) => {
    console.log(`${info.key} selected`);
}

const onVisibleChange: DropdownProps['onVisibleChange'] = (visible) => {
    console.log(visible);
}

class Demo1 extends Component {

    render() {
        const menu = (
            <Menu
                onSelect={onSelect}>
                <Item key="1">借款合同</Item>
                <Item key="2">抵/质押合同</Item>
                <Item key="3">担保合同</Item>
                <Item key="4">联保合同</Item>
                <Item key="5">合同审批</Item>
                <Item key="6">抵/质押合同跟踪</Item>
            </Menu>
        );
        return (
            <div className="demoPadding">
                <Dropdown
                    trigger={['hover']}
                    mouseEnterDelay={800}
                    overlay={menu}
                    onVisibleChange={onVisibleChange}>
                    <Button colors='primary'>鼠标移入0.8秒后显示</Button>
                </Dropdown>
                <Dropdown
                    trigger={['hover']}
                    mouseLeaveDelay={800}
                    overlay={menu}
                    onVisibleChange={onVisibleChange}>
                    <Button colors='primary'>鼠标移出0.8秒后收起</Button>
                </Dropdown>
                <Dropdown
                    trigger={['hover']}
                    delay={800}
                    overlay={menu}
                    onVisibleChange={onVisibleChange}>
                    <Button colors='primary'>延迟0.8秒</Button>
                </Dropdown>
            </div>
        )
    }
}

export default Demo1;
