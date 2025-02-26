/**
 *
 * @title 基础下拉菜单
 * @description 下拉菜单提供click，hover和focus事件触发。
 * @type bip
 */

import {Button, Dropdown, Icon, Menu, MenuProps, DropdownProps} from '@tinper/next-ui';
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
        const menu2 = (
            <Menu
                onSelect={onSelect}>
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
                    overlay={menu1}
                    onVisibleChange={onVisibleChange}
                    type="primary"
                >
					新增
                </Dropdown.Button>
                <Dropdown.Button
                    overlay={menu1}
                    onVisibleChange={onVisibleChange}
                    triggerType="icon"
                    type="primary"
                >
					新增
                </Dropdown.Button>
                <Dropdown
                    overlay={menu2}
                    onVisibleChange={onVisibleChange}
                >
                    <Button colors='primary'>鼠标滑过显示</Button>
                </Dropdown>
                <Dropdown
                    overlay={menu2}
                    onVisibleChange={onVisibleChange}
                >
                    <a className="dropdown-link" onClick={e => e.preventDefault()}>
						鼠标滑过显示 <Icon type="uf-gridcaretdown"/>
                    </a>
                </Dropdown>
                <Dropdown.Button
                    overlay={menu1}
                    onVisibleChange={onVisibleChange}
                    type="plainText"
                >
					新增
                </Dropdown.Button>
            </div>
        )
    }
}

export default Demo1;
