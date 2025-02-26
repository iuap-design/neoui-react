/**
 *
 * @title 不同样子的下拉菜单
 * @description 通过不同的子组件搭配，组成不同形式的菜单
 * @type bip
 */

import {Dropdown, Menu, Tooltip, MenuProps, DropdownProps} from "@tinper/next-ui";
import React, {Component} from "react";

const {Item, Divider, SubMenu, ItemGroup} = Menu;

const onSelect: MenuProps['onSelect'] = (info) => {
    console.log(`${info.key} selected`);
}

const onVisibleChange: DropdownProps['onVisibleChange'] = (visible) => {
    console.log(visible);
}

const menu1 = (
    <Menu onSelect={onSelect}>
        <Item key="1">借款合同</Item>
        <Item key="2">抵/质押合同</Item>
        <Item key="3">担保合同</Item>
        <Item key="4">联保合同</Item>
        <Divider/>
        <Item key="5">合同审批</Item>
        <Item key="6">抵/质押合同跟踪</Item>
    </Menu>
);

const menu2 = (
    <Menu onSelect={onSelect}>
        <ItemGroup title="合同类别">
            <Item key="1">借款合同</Item>
            <Item key="2">抵/质押合同</Item>
            <Item key="3">担保合同</Item>
            <Item key="4">联保合同</Item>
        </ItemGroup>
        <ItemGroup title="合同操作">
            <Item key="5">合同审批</Item>
            <Item key="6">抵/质押合同跟踪</Item>
        </ItemGroup>
    </Menu>
);
const menu3 = (
    <Menu onSelect={onSelect}>
        <SubMenu key="sub1" title="合同类别">
            <Item key="1">借款合同</Item>
            <Item key="2">抵/质押合同</Item>
            <Item key="3">担保合同</Item>
            <Item key="4">联保合同</Item>
        </SubMenu>
        <SubMenu key="sub2" title="合同操作">
            <Item key="5">抵/质押合同跟踪</Item>
            <Item key="51">抵/质押合同跟踪</Item>
            <Item key="52">抵/质押合同跟踪</Item>
            <Item key="53">抵/质押合同跟踪</Item>
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
                    overlay={menu1}
                    onVisibleChange={onVisibleChange}
                    type="primary"
                >
					带有分割线的下拉
                </Dropdown.Button>

                <Dropdown.Button
                    overlay={menu2}
                    onVisibleChange={onVisibleChange}
                    type="primary"
                >
					带有小标题的下拉
                </Dropdown.Button>
                <Dropdown.Button
                    overlay={menu3}
                    onVisibleChange={onVisibleChange}
                    type="primary"
                >
					多级下拉
                </Dropdown.Button>
                <Dropdown.Button
                    overlay={menu3}
                    onVisibleChange={onVisibleChange}
                    type="primary"
                    triggerType="icon"
                    buttonsRender={([leftButton, rightButton]) => [
                        <Tooltip title="tooltip" key="leftButton">
                            {leftButton}
                        </Tooltip>,
                        React.cloneElement(rightButton as React.ReactElement, {loading: true}),
                    ]}
                >
					自定义按钮
                </Dropdown.Button>
            </div>
        );
    }
}

export default Demo2;
