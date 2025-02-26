/**
 * @title 其他属性展示
 * @description multiple, onTitleClick, forceSubMenuRender【子菜单展示之前就渲染进 DOM，子菜单未展示前dom结构内容已生成】
 * @type other
 * demo2
 */

import {Menu, MenuProps, SubMenuProps} from "@tinper/next-ui";
import React, {Component} from "react";

const SubMenu = Menu.SubMenu;
const MenuItemGroup = Menu.ItemGroup;

class Demo2 extends Component {

	handleClick: MenuProps['onClick'] = (e) => {
	    console.log(e);
	};

	onTitleClick: SubMenuProps['onTitleClick'] = (e) => {
	    console.log(e);
	}

	render() {
	    return (
	        <Menu
	            multiple
	            forceSubMenuRender
	            onClick={this.handleClick}
	            style={{width: 240}}
	            mode="inline"
	            triggerSubMenuAction="hover"
	        >
	            <SubMenu
	                key="sub1"
	                title={
	                    <span>
	                        <span>组织 1</span>
	                    </span>
	                }
	            >
	                <MenuItemGroup title="组 1">
	                    <Menu.Item key="1">选项 1</Menu.Item>
	                    <Menu.Item key="2">选项 2</Menu.Item>
	                </MenuItemGroup>
	                <MenuItemGroup title="组 2">
	                    <Menu.Item key="3">选项 3</Menu.Item>
	                    <Menu.Item key="4">选项 4</Menu.Item>
	                </MenuItemGroup>
	            </SubMenu>
	            <SubMenu
	                key="sub2"
	                title={
	                    <span>
	                        <span>组织 2</span>
	                    </span>
	                }
	            >
	                <Menu.Item key="5">选项 5</Menu.Item>
	                <Menu.Item key="6">选项 6</Menu.Item>
	                <SubMenu onTitleClick={this.onTitleClick} key="sub3" title="子项">
	                    <Menu.Item key="7">选项 7</Menu.Item>
	                    <Menu.Item key="8">选项 8</Menu.Item>
	                </SubMenu>
	            </SubMenu>
	            <SubMenu
	                key="sub4"
	                title={
	                    <span>
	                        <span>组织 3</span>
	                    </span>
	                }
	            >
	                <Menu.Item key="9">选项 9</Menu.Item>
	                <Menu.Item key="10">选项 10</Menu.Item>
	                <Menu.Item key="11">选项 11</Menu.Item>
	                <Menu.Item key="12">选项 12</Menu.Item>
	            </SubMenu>
	        </Menu>
	    );
	}
}

export default Demo2;
