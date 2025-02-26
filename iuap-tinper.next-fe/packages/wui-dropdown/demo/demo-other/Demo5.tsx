/**
 *
 * @title 使用键盘操作示例
 * @description
 *
 */

import {Button, Dropdown, Input, Menu, MenuProps, DropdownProps} from '@tinper/next-ui';
import React, {Component} from 'react';


const {Item} = Menu;


class Demo5 extends Component {

	state = {
	    visible: false
	}

	onSelect: MenuProps['onSelect'] = ({key}) => {
	    console.log(`${key} selected`);
	}

	onVisibleChange: DropdownProps['onVisibleChange'] = (visible) => {
	    this.setState({visible}, () => {
	        window.setTimeout(() => {
	            document.getElementById('menu')!.focus()
	        }, 100)
	    })
	}

	render() {
	    const {visible} = this.state;
	    const menu1 = (
	        <Menu
	            id="menu"
	            // keyboard={true}
	            onSelect={this.onSelect}
	        >
	            <Item key="1">借款合同</Item>
	            <Item key="2">抵/质押合同</Item>
	            <Item key="3">担保合同</Item>
	            <Item key="4">联保合同</Item>
	            <Item key="5">合同审批</Item>
	            <Item key="6">抵/质押合同跟踪</Item>
	        </Menu>
	    );
	    return (
	        <div className="demoPadding">
	            <Input style={{'width': '240px', 'marginBottom': '4px'}} placeholder="我是为了获得焦点"/>
	            <Dropdown
	                trigger={['click']}
	                overlay={menu1}
	                onVisibleChange={this.onVisibleChange}
	                visible={visible}
	                getPopupContainer={dom => dom}
	            >
	                <Button colors='primary'>点击显示</Button>
	            </Dropdown>
	        </div>
	    )
	}
}

export default Demo5;
