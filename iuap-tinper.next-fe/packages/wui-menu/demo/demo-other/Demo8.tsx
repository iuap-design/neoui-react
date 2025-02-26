/**
 * @title 键盘操作示例二：竖向手风琴Menu
 * @description 菜单展开是手风琴形式。自定义onKeyDown回调函数
 */


import {Input, Menu} from '@tinper/next-ui';
import React, {Component} from 'react';


const SubMenu = Menu.SubMenu;


class Demo3 extends Component {

	onKeyDown = (e: React.KeyboardEvent) => {
	    console.log('onKeyDown', e.keyCode);
	}

	render() {
	    return (
	        <div>
	            <Input style={{'width': '240px', 'marginBottom': '4px'}} placeholder="我是为了获得焦点"/>
	            <Menu
	                mode="inline"
	                keyboard={true}
	                style={{width: 240}}
	                onKeyDown={this.onKeyDown}
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
	        </div>

	    )
	}
}

export default Demo3;
