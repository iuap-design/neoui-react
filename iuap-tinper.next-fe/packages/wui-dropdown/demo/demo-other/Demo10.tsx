/**
 *
 * @title 按钮属性使用
 * @description Dropdown.Button 支持部分button属性，可根据需求设置
 */

import {Dropdown, Icon, Menu, MenuProps, DropdownProps} from '@tinper/next-ui';
import React, {Component} from 'react';


const {Item, SubMenu} = Menu;


const onSelect: MenuProps['onSelect'] = (info) => {
    console.log(`${info.key} selected`);
}

const onVisibleChange: DropdownProps['onVisibleChange'] = (visible) => {
    console.log(visible);
}

const menu = (
    <Menu
        onSelect={onSelect}>
        <SubMenu key="sub1" title="合同类别">
            <Item key="1">借款合同</Item>
            <Item key="2">抵/质押合同</Item>
            <Item key="3">担保合同</Item>
            <Item key="4">联保合同</Item>
        </SubMenu>
        <SubMenu key="sub2" title="合同操作">
            <Item key="5">抵/质押合同跟踪</Item>
            <SubMenu key="sub3" title="合同审批">
                <Item key="6">待审批合同</Item>
                <Item key="7">已审批合同</Item>
            </SubMenu>
        </SubMenu>
    </Menu>
);

class Demo2 extends Component {
    render() {
        return (
            <div className="demoPadding">
                <Dropdown.Button
                    overlay={menu}
                    onVisibleChange={onVisibleChange}
                    type="primary"
                    size="sm"
                >
					小按钮
                </Dropdown.Button>
                <Dropdown.Button
                    overlay={menu}
                    onVisibleChange={onVisibleChange}
                    type="primary"
                    size="md"
                >
					中按钮
                </Dropdown.Button>
                <Dropdown.Button
                    overlay={menu}
                    onVisibleChange={onVisibleChange}
                    type="primary"
                    icon={<Icon type="uf-pencil"/>}
                >
					添加icon
                </Dropdown.Button>
            </div>
        );
    }
}

export default Demo2;
