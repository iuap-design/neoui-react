/**
 * @title SubMenu支持分割模式
 * @description 左右分割，左边部分增加点击事件OnSubMenuClick
 */

import {Button, Dropdown, Menu, Divider} from '@tinper/next-ui';
import React, {Component} from 'react';
import '../demo-other/Demo12.scss';

const {SubMenu} = Menu;

class Demo12 extends Component {
    state = {
        visible: false,
        selectedKeys: []
    }
    handleSelect = (item: any) => {
        this.setState({
            visible: false,
            selectedKeys: [item.key]
        })
        console.log('fdsafdas', item)
    }

    handleHide = (visible: boolean) => {
        this.setState({
            visible: visible,
        })
    }

    handleShow = () => {
        this.setState({
            visible: true
        })
    }

    buttonClick = () => {
        console.log('button click !');
    }

    render() {

        const overlay1 = (
            <div style={{background: '#FFFFFF'}}>
                <Menu
                    onSubMenuClick={this.handleSelect}
                    selectedKeys={this.state.selectedKeys}
                    mode={'dropdown'}
                    onSelect={this.handleSelect}>
                    <SubMenu key="sub2" title={<span><span>组织 2</span></span>}>
	                    <Menu.Item key="5">选项 5</Menu.Item>
	                    <Menu.Item key="6">选项 6</Menu.Item>
	                </SubMenu>
	                <SubMenu key="sub4" title={<span><span>组织 3</span></span>}>
	                    <Menu.Item key="9">选项 9</Menu.Item>
	                    <Menu.Item key="10">选项 10</Menu.Item>
	                    <Menu.Item key="11">选项 11</Menu.Item>
	                    <Menu.Item key="12">选项 12</Menu.Item>
	                </SubMenu>
                </Menu>
                <Divider style={{ margin: 0 }}/>
                <div style={{ padding: 8 }}>
                    <Button
                        onClick={this.buttonClick}
                        colors='primary'>
                        扩展button
                    </Button>
                </div>
            </div>
        );
        return (
            <div className="demoPadding">
                <Dropdown
                    trigger={['click']}
                    overlay={overlay1}
                    visible={this.state.visible}
                    onVisibleChange={this.handleHide}
                >
                    <Button
                        onClick={this.handleShow}
                        colors='primary'>
                        Dropdown + 单选
                    </Button>
                </Dropdown>
            </div>
        )
    }
}

export default Demo12;
