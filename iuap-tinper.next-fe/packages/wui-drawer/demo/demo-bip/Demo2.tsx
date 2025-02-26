/**
 *
 * @title Drawer位置示例
 * @description 从上下左右弹出抽屉
 * @type bip
 */

import {Button, Drawer, DrawerProps} from '@tinper/next-ui';
import React, {Component} from 'react';

interface DrawerState2 {
	left: boolean;
	right: boolean;
	top: boolean;
	down: boolean;
}

class Demo2 extends Component<{}, DrawerState2> {
    constructor(props: {}) {
        super(props);
        this.state = {
            left: false,
            right: false,
            top: false,
            down: false
        };
    }

	open = (placement: string) => {
	    switch (placement) {
	    case 'left':
	        this.setState({
	            left: true
	        })
	        break;
	    case 'right':
	        this.setState({
	            right: true
	        })
	        break;
	    case 'top':
	        this.setState({
	            top: true
	        })
	        break;
	    case 'down':
	        this.setState({
	            down: true
	        })
	        break;
	        default:
	            break;
	    }
	}
	close = (placement: string) => {
	    switch (placement) {
	    case 'left':
	        this.setState({
	            left: false
	        })
	        break;
	    case 'right':
	        this.setState({
	            right: false
	        })
	        break;
	    case 'top':
	        this.setState({
	            top: false
	        })
	        break;
	    case 'down':
	        this.setState({
	            down: false
	        })
	        break;
	        default:
	            break;
	    }
	}

	render() {
	    let {left, right, top, down} = this.state;
	    let container = document.querySelector('.container') === null ? 'body' : document.querySelector('.container') // 为了示例中drawer覆盖区域在导航栏下面
	    return (
	        <div className="demoPadding demo2">
	            <div className="btnc">
	                <Button colors="primary" onClick={() => {
	                    this.open('left')
	                }} style={{marginRight: '10px'}}>左边</Button>
	                <Button colors="primary" onClick={() => {
	                    this.open('right')
	                }} style={{marginRight: '10px'}}>右边</Button>
	                <Button colors="primary" onClick={() => {
	                    this.open('top')
	                }} style={{marginRight: '10px'}}>上边</Button>
	                <Button colors="primary" onClick={() => {
	                    this.open('down')
	                }}>下边</Button>
	            </div>
	            <Drawer getPopupContainer={container as DrawerProps['container']} zIndex={1000} mask={false} className={'demo2'} placement='left'
	                title="我从左边来" visible={left} onClose={() => {
	                    this.close('left')
	                }} closable={true}>
	                <div className="con">
	                    <p>我从左边来</p>
	                    <p>这是第一行文字</p>
	                    <p>这是第二行文字</p>
	                    <p>这是第三行文字，啦啦啦~</p>
	                </div>
	            </Drawer>
	            <Drawer getPopupContainer={container as DrawerProps['container']} zIndex={1000} mask={false} className={'demo2'} placement='right'
	                title="我从右边来" visible={right} onClose={() => {
	                    this.close('right')
	                }} closable={true}>
	                <div className="con">
	                    <p>我从右边来</p>
	                    <p>这是第一行文字</p>
	                    <p>这是第二行文字</p>
	                    <p>这是第三行文字，啦啦啦~</p>
	                </div>
	            </Drawer>
	            <Drawer getPopupContainer={container as DrawerProps['container']} zIndex={1000} mask={false} className={'demo2'} placement='top'
	                title="我从上边来" visible={top} onClose={() => {
	                    this.close('top')
	                }} closable={true}>
	                <div className="con">
	                    <p>我从上边来</p>
	                    <p>这是第一行文字</p>
	                    <p>这是第二行文字</p>
	                    <p>这是第三行文字，啦啦啦~</p>
	                </div>
	            </Drawer>
	            <Drawer getPopupContainer={container as DrawerProps['container']} zIndex={1000} mask={false} className={'demo2'} placement='bottom'
	                title="我从下边来" visible={down} onClose={() => {
	                    this.close('down')
	                }} closable={true}>
	                <div className="con">
	                    <p>我从下边来</p>
	                    <p>这是第一行文字</p>
	                    <p>这是第二行文字</p>
	                    <p>这是第三行文字，啦啦啦~</p>
	                </div>
	            </Drawer>
	        </div>
	    )
	}
}

export default Demo2;
