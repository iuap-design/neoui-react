/**
 *
 * @title Drawer基本示例
 * @description 弹出文字
 * @type bip
 */

import {Button, Drawer, Dropdown, Icon, Menu, Tooltip, DrawerProps} from '@tinper/next-ui';
import React, {Component} from 'react';

const {Item} = Menu;

interface DrawerState1 {
	placement: string;
	showDrawer: boolean;
	title: string;
	visible: boolean;
	visible1: boolean;
}

class Demo1 extends Component<{}, DrawerState1> {
	dRef: HTMLElement | null
	constructor(props: {}) {
	    super(props);
	    this.state = {
	        placement: 'right',
	        showDrawer: false,
	        title: 'Basic Drawer',
	        visible: false,
	        visible1: false
	    };
	    this.fPopDrawer = this.fPopDrawer.bind(this);
	    this.fCloseDrawer = this.fCloseDrawer.bind(this);
	    this.dRef = null
	}

	fPopDrawer() {
	    this.setState({
	        showDrawer: true
	    })
	}

	fCloseDrawer() {
	    this.setState({
	        showDrawer: false
	    })
	}

	show = () => {
	    console.log('this.dRef', this.dRef)
	    this.setState({
	        visible: !this.state.visible
	    })
	}

	handleSelect = () => {
	    this.setState({
	        visible1: false
	    })
	}

	handleShow = () => {
	    this.setState({
	        visible1: true
	    })
	}

	render() {
	    let tip = (
	        <div>
				这是一个很强的提醒
	        </div>
	    )

	    const menu1 = (
	        <Menu
	            onSelect={this.handleSelect}>
	            <Item key="1">借款合同</Item>
	            <Item key="2">抵/质押合同</Item>
	            <Item key="3">担保合同</Item>
	            <Item key="4">联保合同</Item>
	            <Item key="5">合同审批</Item>
	            <Item key="6">抵/质押合同跟踪</Item>
	        </Menu>
	    );

	    let {placement, showDrawer, title} = this.state;
	    let container = document.querySelector('.container') === null ? 'body' : document.querySelector('.container') // 为了示例中drawer覆盖区域在导航栏下面
	    return (
	        <div className="demoPadding">
	            <div className="btnc">
	                <Button onClick={this.fPopDrawer} colors="primary">打开</Button>
	            </div>
	            <Drawer zIndex={1000} mask={false} getPopupContainer={container as DrawerProps['container']} closeIcon={<Icon type="uf-close"/>}
	                closable={true} className={'demo1'} title={title} visible={showDrawer} placement={placement}
	                onClose={this.fCloseDrawer}>
	                <div className="con">
	                    <p>这是第一行文字</p>
	                    <p>这是第二行文字</p>
	                    <p>这是第三行文字，啦啦啦~</p>
	                </div>

	                <Tooltip arrowPointAtCenter trigger="click" placement="bottom" rootClose overlay={tip}
							 visible={this.state.visible}
							 ref={ref => this.dRef = ref}>
	                    <Button colors="primary" onClick={this.show}>
							点击显示
	                    </Button>
	                </Tooltip>

	                <br/>
	                <br/>

	                <Dropdown
	                    trigger={['click']}
	                    overlay={menu1}
	                    transitionName="slide-up"
	                    visible={this.state.visible1}
	                >
	                    <Button
	                        onClick={this.handleShow}
	                        colors='primary'>
							受控制的下拉
	                    </Button>
	                </Dropdown>
	            </Drawer>
	        </div>
	    )
	}
}

export default Demo1;
