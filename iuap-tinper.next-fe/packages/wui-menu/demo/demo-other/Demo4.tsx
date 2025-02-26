/**
 * @title 子菜单呼出形式Menu
 * @description 子菜单在左右侧呼出形式显示。
 */

import {Menu, MenuProps} from "@tinper/next-ui";
import React, {Component} from 'react';

const SubMenu = Menu.SubMenu;
const MenuItemGroup = Menu.ItemGroup;


class Demo4 extends Component {

	handleClick: MenuProps['onClick'] = (e) => {
	    console.log('click', e);
	}

	render() {
	    return (
	        <div style={{overflow: 'hidden'}}>
	            <Menu onClick={this.handleClick} style={{width: 240, float: 'left'}} mode="vertical"
					  position="rightTop">
	                <SubMenu key="sub1" title={<span><span>组织 1</span></span>}>
	                    <MenuItemGroup title="Item 1">
	                        <Menu.Item key="1">选项 1</Menu.Item>
	                        <Menu.Item key="2">选项 2</Menu.Item>
	                    </MenuItemGroup>
	                    <MenuItemGroup title="Iteom 2">
	                        <Menu.Item key="3">选项 3</Menu.Item>
	                        <Menu.Item key="4">选项 4</Menu.Item>
	                    </MenuItemGroup>
	                </SubMenu>
	                <SubMenu key="sub2" title={<span><span>组织 2</span></span>}>
	                    <Menu.Item key="5">选项 5</Menu.Item>
	                    <Menu.Item key="6">选项 6</Menu.Item>
	                    <SubMenu key="sub3" title="Submenu">
	                        <Menu.Item key="7">选项 7</Menu.Item>
	                        <Menu.Item key="8">选项 8</Menu.Item>
	                    </SubMenu>
	                </SubMenu>
	                <SubMenu key="sub4" title={<span><span>组织 3</span></span>}>
	                    <Menu.Item key="9">选项 9</Menu.Item>
	                    <Menu.Item key="10">选项 10</Menu.Item>
	                    <Menu.Item key="11">选项 11</Menu.Item>
	                    <Menu.Item key="12">选项 12</Menu.Item>
	                </SubMenu>
	            </Menu>
	            <Menu onClick={this.handleClick} style={{width: 240, float: 'right'}} mode="vertical"
					  position="leftTop">
	                <SubMenu key="sub1" title={<span><span>组织 1</span></span>}>
	                    <MenuItemGroup title="Item 1">
	                        <Menu.Item key="1">选项 1</Menu.Item>
	                        <Menu.Item key="2">选项 2</Menu.Item>
	                    </MenuItemGroup>
	                    <MenuItemGroup title="Iteom 2">
	                        <Menu.Item key="3">选项 3</Menu.Item>
	                        <Menu.Item key="4">选项 4</Menu.Item>
	                    </MenuItemGroup>
	                </SubMenu>
	                <SubMenu key="sub2" title={<span><span>组织 2</span></span>}>
	                    <Menu.Item key="5">选项 5</Menu.Item>
	                    <Menu.Item key="6">选项 6</Menu.Item>
	                    <SubMenu key="sub3" title="Submenu">
	                        <Menu.Item key="7">选项 7</Menu.Item>
	                        <Menu.Item key="8">选项 8</Menu.Item>
	                    </SubMenu>
	                </SubMenu>
	                <SubMenu key="sub4" title={<span><span>组织 3</span></span>}>
	                    <Menu.Item key="9">选项 9</Menu.Item>
	                    <Menu.Item key="10">选项 10</Menu.Item>
	                    <Menu.Item key="11">选项 11</Menu.Item>
	                    <Menu.Item key="12">选项 12</Menu.Item>
	                </SubMenu>
	            </Menu>
	        </div>
	    )
	}
}

export default Demo4;
