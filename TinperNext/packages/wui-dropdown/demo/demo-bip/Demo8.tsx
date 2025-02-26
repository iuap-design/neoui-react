/**
 *
 * @title getPopupContainer
 * @description 菜单渲染父节点，默认渲染到 body 上
 * @type bip
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

        const menu1 = (
            <Menu
                onSelect={onSelect}>
                <Item key="1">借款合同</Item>
                <Item key="2">抵/质押合同</Item>
                <Item key="3">担保合同</Item>
                <Item key="4">联保合同</Item>
                <Item key="5">合同审批</Item>
                <Item key="6">抵/质押合同跟踪</Item>
                <Item key="43">联保合同</Item>
                <Item key="534">合同审批</Item>
                <Item key="64">抵/质押合同跟踪</Item>
                <Item key="45">联保合同</Item>
                <Item key="56">合同审批</Item>
                <Item key="67">抵/质押合同跟踪</Item>
            </Menu>
        );
        return (
            <div>
                <Dropdown
                    overlay={menu1}
                    onVisibleChange={onVisibleChange}
                    getPopupContainer={() => document.querySelector('#dropdown-btn') as HTMLElement}
                >
                    <Button colors='primary' id="dropdown-btn">定位节点</Button>
                </Dropdown>
            </div>
        )
    }
}

export default Demo1;
