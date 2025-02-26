/**
 *
 * @title 下拉多选
 * @description 结合menu 组件multiple属性实现菜单多选功能
 * @type bip
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

class Demo1 extends Component {

    render() {

        const menu3 = (
            <Menu onSelect={onSelect} multiple>
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
        const menu2 = (
            <Menu
                onSelect={onSelect} multiple>
                <Item key="1"><Icon type="uf-todolist"/>借款合同</Item>
                <Item key="2"><Icon type="uf-personin"/>抵/质押合同</Item>
                <Item key="3"><Icon type="uf-ticket"/>担保合同</Item>
                <Item key="4"><Icon type='uf-listsearch'/>联保合同</Item>
                <Item key="5"><Icon type='uf-seal'/>合同审批</Item>
                <Item key="6"><Icon type='uf-bullseye'/>抵/质押合同跟踪</Item>
            </Menu>
        );
        return (
            <div className="demoPadding">
                <Dropdown.Button
                    overlay={menu2}
                    onVisibleChange={onVisibleChange}
                    type="primary"
                >
					单级多选
                </Dropdown.Button>
                <Dropdown.Button
                    overlay={menu3}
                    onVisibleChange={onVisibleChange}
                    type="primary"
                >
					多级多选
                </Dropdown.Button>
            </div>
        )
    }
}

export default Demo1;
