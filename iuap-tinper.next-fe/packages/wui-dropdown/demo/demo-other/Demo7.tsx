/**
 *
 * @title 设置最大高度属性
 * @description overlayMaxHeight可设置布尔值和数字 默认为false，最大高度不超出下滑方向的区域
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
            <div className="demoPadding" style={{height: '200px'}}>
                <Dropdown
                    overlay={menu1}
                    onVisibleChange={onVisibleChange}
                    overlayMaxHeight={true}
                >
                    <Button colors='primary'>默认设置最大高度</Button>
                </Dropdown>
                <Dropdown
                    overlay={menu1}
                    onVisibleChange={onVisibleChange}
                    overlayMaxHeight={200}
                >
                    <Button colors='primary'>设置为数字</Button>
                </Dropdown>
            </div>
        )
    }
}

export default Demo1;
