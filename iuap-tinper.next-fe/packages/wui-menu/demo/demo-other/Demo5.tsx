/**
 * @title 缩起内嵌菜单
 * @description 内嵌菜单可以被缩起/展开。
 * @type other
 * demo6
 */

import {Button, Icon, Menu} from '@tinper/next-ui';
import React from 'react';
// import { Menu } from '../src/index';

const {SubMenu} = Menu;

class Demo5 extends React.Component {
	state = {
	    collapsed: false,
	};

	toggleCollapsed = () => {
	    this.setState({
	        collapsed: !this.state.collapsed,
	    });
	};

	render() {
	    return (
	        <div style={{width: 256}}>
	            <Button type="primary" onClick={this.toggleCollapsed} style={{marginBottom: 16}}>
	                {this.state.collapsed ? '展开' : '收起'}
	            </Button>
	            <Menu
	                defaultSelectedKeys={['1']}
	                defaultOpenKeys={['sub1']}
	                mode="inline"
	                theme="dark"
	                inlineCollapsed={this.state.collapsed}
	            >
	                <Menu.Item key="1" icon={<Icon type="uf-4square-3"/>}>
						Option 1
	                </Menu.Item>
	                <Menu.Item key="2" icon={<Icon type="uf-9square-2"/>}>
						Option 2
	                </Menu.Item>
	                <Menu.Item key="3" title="Option3-title" icon={<Icon type="uf-navmenu"/>}>
						Option 3
	                </Menu.Item>
	                <SubMenu key="sub1" icon={<Icon type="uf-search-light-2"/>} title="Navigation One">
	                    <Menu.Item key="5">Option 5</Menu.Item>
	                    <Menu.Item key="6">Option 6</Menu.Item>
	                    <Menu.Item key="7">Option 7</Menu.Item>
	                    <Menu.Item key="8">Option 8</Menu.Item>
	                </SubMenu>
	                <SubMenu key="sub2" icon={<Icon type="uf-group-2"/>} title="Navigation Two">
	                    <Menu.Item key="9">Option 9</Menu.Item>
	                    <Menu.Item key="10">Option 10</Menu.Item>
	                    <SubMenu key="sub3" title="Submenu">
	                        <Menu.Item key="11">Option 11</Menu.Item>
	                        <Menu.Item key="12">Option 12</Menu.Item>
	                    </SubMenu>
	                </SubMenu>
	            </Menu>
	        </div>
	    );
	}
}

export default Demo5;
