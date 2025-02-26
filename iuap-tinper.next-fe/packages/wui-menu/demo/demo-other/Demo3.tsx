/**
 * @title 竖向手风琴Menu
 * @description 菜单展开是手风琴形式。
 */


import {Menu, MenuProps} from "@tinper/next-ui";
import React, {Component} from 'react';

const SubMenu = Menu.SubMenu;

interface DemoState {
	current: string;
	openKeys: string[];
}
class Demo3 extends Component<{}, DemoState> {
    constructor(props: {}) {
        super(props);
        this.state = {
            current: '1',
            openKeys: []
        }
    }

	handleClick: MenuProps['onClick'] = (info) => {
	    console.log('Clicked: ', info);
	    this.setState({current: info.key});
	}
	onOpenChange = (openKeys: string[]) => {
	    const state = this.state;

	    const latestOpenKey = this.myfilter(openKeys, state.openKeys);
	    const latestCloseKey = this.myfilter(state.openKeys, openKeys);

	    let nextOpenKeys = [];
	    if (latestOpenKey) {
	        nextOpenKeys = this.getAncestorKeys(latestOpenKey).concat(latestOpenKey);
	    }
	    if (latestCloseKey) {
	        nextOpenKeys = this.getAncestorKeys(latestCloseKey);
	    }
	    this.setState({openKeys: nextOpenKeys});
	}

	// IE下 array.find（）方法不可用
	myfilter = (arr1: string[], arr2: string[]) => {
	    if (arr2.length === 0 || !arr2) {
	        return arr1[0];
	    }

	    for (let i = 0; i < arr1.length; i++) {
	        if (arr2.indexOf(arr1[i].toString()) === -1) {
	            return arr1[i];
	        }
	    }
	    return false;
	}

	getAncestorKeys = (key: string) => {
	    const map = {
	        sub3: ['sub2'],
	    };
	    return map[key] || [];
	}

	render() {
	    return (
	        <Menu
	            mode="inline"
	            openKeys={this.state.openKeys}
	            selectedKeys={[this.state.current]}
	            style={{width: 240}}
	            onOpenChange={this.onOpenChange}
	            onClick={this.handleClick}
	        >
	            <SubMenu key="sub1" title={<span><span>组织 1</span></span>}>
	                <Menu.Item key="1">选项 1</Menu.Item>
	                <Menu.Item key="2">选项 2</Menu.Item>
	                <Menu.Item key="3">选项 3</Menu.Item>
	                <Menu.Item key="4">选项 4</Menu.Item>
	            </SubMenu>
	            <SubMenu key="sub2" title={<span><span>组织 2</span></span>}>
	                <Menu.Item key="5">选项 5</Menu.Item>
	                <Menu.Item key="6">选项 6</Menu.Item>
	                <SubMenu key="sub3" title="子项">
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
	    )
	}
}

export default Demo3;
