/**
 * @title 使用下拉菜单功能
 * @description 使用overlay 定义菜单内容，dropdownProps定义dropdown配置
 */

import {Breadcrumb, Menu} from "@tinper/next-ui";
import React, {Component} from 'react';

const {Item} = Menu;

class Demo4 extends Component {

    render() {

        const menu = (
            <Menu>
                <Item key="1">借款合同</Item>
                <Item key="2">抵/质押合同</Item>
                <Item key="3">担保合同</Item>
            </Menu>
        );

        return (
            <Breadcrumb style={{height: 100}}>
                <Breadcrumb.Item target="_blank" href="https://yondesign.yonyou.com/homepage/#/">
					Home
                </Breadcrumb.Item>
                <Breadcrumb.Item overlay={menu}>
					Library
                </Breadcrumb.Item>
                <Breadcrumb.Item active>
					Data
                </Breadcrumb.Item>
            </Breadcrumb>
        )
    }
}

export default Demo4;
