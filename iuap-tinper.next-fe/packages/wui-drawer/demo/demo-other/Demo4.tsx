/**
 *
 * @title Drawer多层抽屉示例
 * @description 弹出多层抽屉,push属性验证
 *
 */

import {Button, Drawer, DrawerProps} from '@tinper/next-ui';
import React, {Component} from 'react';

interface DrawerState4 {
	placement: string;
	showDrawer: boolean;
	title: string;
	secondTitle: string;
	showSecondDrawer: boolean;
	secondPlacement: string;
	push?: boolean | {
		distance?: string;
	};
}

class Demo4 extends Component<{}, DrawerState4> {
    constructor(props: {}) {
        super(props);
        this.state = {
            placement: 'right',
            showDrawer: false,
            title: 'Basic Drawer',
            secondTitle: 'Second Drawer',
            showSecondDrawer: false,
            secondPlacement: 'right',
            push: true
        };
        this.fPopDrawer = this.fPopDrawer.bind(this);
        this.fCloseDrawer = this.fCloseDrawer.bind(this);
        this.fPopSecondDrawer = this.fPopSecondDrawer.bind(this);
        this.fCloseSecondDrawer = this.fCloseSecondDrawer.bind(this);
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

    fPopSecondDrawer() {
        this.setState({
            showSecondDrawer: true
        })
    }

    fCloseSecondDrawer() {
        this.setState({
            showSecondDrawer: false
        })
    }

	handlePush = (val: boolean | {distance: string}) => {
	    console.log('A=>>>>>>>>>>', val)
	    this.setState({
	        push: val
	    })
	}

	render() {
	    let {placement, showDrawer, title, secondTitle, showSecondDrawer, secondPlacement} = this.state;
	    let container = document.querySelector('.container') === null ? 'body' : document.querySelector('.container') // 为了示例中drawer覆盖区域在导航栏下面
	    return (
	        <div className="demoPadding">
	            <div className="btnc">
	                <Button colors="primary" onClick={this.fPopDrawer}>打开</Button><br/>
	                <br/>
	                <Button onClick={this.handlePush.bind(this, true)}>push为true</Button>&nbsp;
	                <Button onClick={this.handlePush.bind(this, false)}>push为false</Button>&nbsp;
	                <Button onClick={this.handlePush.bind(this, {distance: '100'})}>push为对象</Button>
	            </div>
	            <Drawer push={this.state.push} style={{position: 'fixed'}} getPopupContainer={container as DrawerProps['container']} zIndex={1000}
	                mask={false} className={'demo4'} width={500} title={title} visible={showDrawer}
	                placement={placement} onClose={this.fCloseDrawer} closable={true}>
	                <div className="con">
	                    <Button onClick={this.fPopSecondDrawer} className="btn">二级抽屉</Button>
	                </div>
	                <Drawer getPopupContainer={container as DrawerProps['container']} style={{position: 'fixed'}} mask={false} className={'demo4'}
	                    width={'320px'} zIndex={1000001} title={secondTitle} visible={showSecondDrawer}
	                    placement={secondPlacement} onClose={this.fCloseSecondDrawer} closable={true}>
	                    <div className="con">
	                        <p>这是第一行文字</p>
	                        <p>这是第二行文字</p>
	                        <p>这是第三行文字，啦啦啦~</p>
	                        <p>这是第四行文字，啦啦啦~</p>
	                    </div>
	                </Drawer>
	            </Drawer>
	        </div>
	    )
	}
}

export default Demo4;
