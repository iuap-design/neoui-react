/**
 * @title 模式为dropdown
 * @description mode = dropdown,下拉样式的menu,搭配Dropdown和popover使用
 */

import {Button, Dropdown, Popover, Menu, Icon, Divider} from '@tinper/next-ui';
import React, {Component} from 'react';
import './Demo12.scss';

const {Item} = Menu;

class Demo12 extends Component {
    state = {
        visible: false,
        visible2: false
    }
    handleSelect = () => {
        this.setState({
            visible: false,
        })
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

    handleHide2 = (visible: boolean) => {
        this.setState({
            visible2: visible,
        })
    }

    handleShow2 = () => {
        this.setState({
            visible2: true
        })
    }

    buttonClick = () => {
        console.log('button click !');
    }

    render() {

        const overlay1 = (
            <div style={{background: '#FFFFFF'}}>
                <Menu mode={'dropdown'} onSelect={this.handleSelect}>
                    <Item key="1">借款合同</Item>
                    <Item key="2">抵/质押合同</Item>
                    <Item key="3">担保合同</Item>
                    <Item key="4">联保合同</Item>
                    <Item key="5">合同审批</Item>
                    <Item key="6">抵/质押合同跟踪</Item>
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
        const overlay2 = (
            <div style={{background: '#FFFFFF'}}>
                <Menu multiple mode={'dropdown'}>
                    <Item key="1"><Icon type="uf-todolist"/>借款合同</Item>
                    <Item key="2"><Icon type="uf-personin"/>抵/质押合同</Item>
                    <Item key="3"><Icon type="uf-ticket"/>担保合同</Item>
                    <Item key="4"><Icon type='uf-listsearch'/>联保合同</Item>
                    <Item key="5"><Icon type='uf-seal'/>合同审批</Item>
                    <Item key="6"><Icon type='uf-bullseye'/>抵/质押合同跟踪</Item>
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
                <Popover
                    trigger={['click']}
                    placement="bottomLeft"
                    overlayClassName={'overlay-classname'}
                    content={overlay2}
                    show={this.state.visible2}
                    onVisibleChange={this.handleHide2}
                    destroyTooltipOnHide={false}
                >
                    <Button
                        onClick={this.handleShow2}
                        colors='primary'>
                        Popover+多选
                    </Button>
                </Popover>
            </div>
        )
    }
}

export default Demo12;

