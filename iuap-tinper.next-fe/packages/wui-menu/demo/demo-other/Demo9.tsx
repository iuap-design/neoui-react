/**
 * @title 多级菜单
 * @description SubMenu嵌套
 */

import {Menu, MenuProps} from "@tinper/next-ui";
import React, {Component} from 'react';

const SubMenu = Menu.SubMenu;
const MenuItemGroup = Menu.ItemGroup;

interface DemoState {
	current: string;
}
class Demo9 extends Component<{}, DemoState> {
    constructor(props: {}) {
        super(props);
        this.state = {
            current: '1'
        }
    }

	handleClick: MenuProps['onClick'] = (e) => {
	    console.log(e);
	    this.setState({
	        current: e.key,
	    });
	}

	render() {
	    return (
	        <Menu onClick={this.handleClick} style={{width: 240}} defaultOpenKeys={['demo3sub1']}
				  selectedKeys={[this.state.current]} mode="inline">
	            <SubMenu key="sub1" title={<span><span>组织 1</span></span>}>
	                <MenuItemGroup title="组 1">
	                    <Menu.Item key="1">选项 1</Menu.Item>
	                    <Menu.Item key="2">选项 2</Menu.Item>
	                </MenuItemGroup>
	                <MenuItemGroup title="组 2">
	                    <Menu.Item key="3">选项 3</Menu.Item>
	                    <Menu.Item key="4">选项 4</Menu.Item>
	                </MenuItemGroup>
	                <SubMenu key="sub11" title={<span><span>组织 11</span></span>}>
	                    <Menu.Item key="15">选项 15</Menu.Item>
	                    <Menu.Item key="16">选项 16</Menu.Item>
	                    <SubMenu key="sub111" title="子项">
	                        <Menu.Item key="17">选项 17</Menu.Item>
	                        <Menu.Item key="18">选项 18</Menu.Item>
	                        <SubMenu key="sub1111" title={<span><span>组织 111</span></span>}>
	                            <Menu.Item key="115">选项 115</Menu.Item>
	                            <Menu.Item key="116">选项 116</Menu.Item>
	                            <SubMenu key="demo3sub3" title="子项">
	                                <Menu.Item key="117">选项 117</Menu.Item>
	                                <Menu.Item key="118">选项 118</Menu.Item>
	                            </SubMenu>
	                        </SubMenu>
	                    </SubMenu>
	                </SubMenu>
	            </SubMenu>
	            <SubMenu key="sub2" title={<span><span>组织 2</span></span>}>
	                <Menu.Item key="5">选项 5</Menu.Item>
	                <Menu.Item key="6">选项 6</Menu.Item>
	                <SubMenu key="demo3sub3" title="子项">
	                    <Menu.Item key="7">选项 7</Menu.Item>
	                    <Menu.Item key="8">选项 8</Menu.Item>
	                </SubMenu>
	            </SubMenu>
	            <SubMenu key="sub3" title={<span><span>组织 3</span></span>}>
	                <Menu.Item key="9">选项 9</Menu.Item>
	                <Menu.Item key="10">选项 10</Menu.Item>
	                <Menu.Item key="11">选项 11</Menu.Item>
	                <Menu.Item key="12">选项 12</Menu.Item>
	            </SubMenu>
	        </Menu>
	    )
	}
}

export default Demo9;
