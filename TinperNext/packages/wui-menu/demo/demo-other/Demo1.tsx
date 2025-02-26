/**
 * @title 横向Menu纯菜单导航
 * @description 更简洁，更方便
 */

import {Menu, MenuProps} from "@tinper/next-ui";
import React, {Component} from 'react';
import './Demo1.scss';

const SubMenu = Menu.SubMenu;
const MenuItemGroup = Menu.ItemGroup;

interface DemoState {
	current: string;
	openKeys: string[];
}

class Demo1 extends Component<{}, DemoState> {
    constructor(props: {}) {
        super(props);
        this.state = {
            current: 'mail',
            openKeys: []
        }
    }

	handleClick: MenuProps['onClick'] = (info) => {
	    this.setState({
	        current: info.key,
	    });
	}

	onOpenChange = (openKeys: string[]) => {
	    console.log('openKeys', openKeys)
	    this.setState({ openKeys })
	}

	render() {
	    return (
	        <Menu onOpenChange={this.onOpenChange} onClick={this.handleClick} selectedKeys={[this.state.current]} mode="horizontal" arrowdown={true}>
	            <Menu.Item key="mail">
					组织 1
	            </Menu.Item>
	            <Menu.Item key="app" disabled>
					组织 2
	            </Menu.Item>
	            <SubMenu key="sub1" title={<span className="sub-title">组织 1 - 子</span>}>
	                <MenuItemGroup title="组 1">
	                    <Menu.Item key="setting:1">选项 1</Menu.Item>
	                    <Menu.Item key="setting:2">选项 2</Menu.Item>
	                </MenuItemGroup>
	                <MenuItemGroup title="组 2">
	                    <Menu.Item key="setting:3">选项 3</Menu.Item>
	                    <SubMenu key="sub2" title="Submenu">
	                        <Menu.Item key="4">选项 4</Menu.Item>
	                        <Menu.Item key="5">选项 5</Menu.Item>
	                    </SubMenu>
	                </MenuItemGroup>
	            </SubMenu>
	        </Menu>
	    )
	}
}

export default Demo1;
