/**
 *
 * @title 基本用法
 * @description 设置`loadingType`来修改Spin样式。默认是'default'。
 * @type bip
 */

import {Button, Spin} from '@tinper/next-ui';
import React, {Component} from 'react';

interface SpinState {
	showDefault: boolean;
	showRotate: boolean;
	showLine: boolean;
	showDelay: boolean;
}
class Demo1 extends Component<{}, SpinState> {
    constructor(props: {}) {
        super(props);
        this.state = {
            showDefault: false,
            showRotate: false,
            showLine: false,
            showDelay: false
        }
    }

	handleShow = () => {
	    this.setState({
	        showDefault: true
	    })
	    setTimeout(() => {
	        this.setState({
	            showDefault: false
	        })
	    }, 3000)

	}
	handleShowRotate = () => {
	    this.setState({
	        showRotate: true
	    })
	    setTimeout(() => {
	        this.setState({
	            showRotate: false
	        })
	    }, 3000)

	}

	handleShowLine = () => {
	    this.setState({
	        showLine: true
	    })
	    setTimeout(() => {
	        this.setState({
	            showLine: false
	        })
	    }, 3000)

	}

	handleShowDelay = () => {
	    // setInterval(()=>{console.log(new Date())},1000)
	    this.setState({
	        showDelay: true
	    })
	    setTimeout(() => {
	        this.setState({
	            showDelay: false
	        })
	    }, 1500)

	}

	render() {
	    return (
	        <div>
	            <Button
	                colors="primary"
	                onClick={this.handleShow}>
					点击显示默认Spin
	            </Button>
	            <Spin
	                fullScreen
	                showBackDrop={true}
	                spinning={this.state.showDefault}
	            />
	            <Button
	                colors="primary"
	                style={{marginLeft: 50}}
	                onClick={this.handleShowRotate}>
					点击显示 rotate Spin
	            </Button>
	            <Spin
	                fullScreen
	                showBackDrop={true}
	                spinning={this.state.showRotate}
	                loadingType="rotate"
	            />
	            <Button
	                colors="primary"
	                style={{marginLeft: 50}}
	                onClick={this.handleShowLine}>
					点击显示line Spin
	            </Button>
	            <Spin
	                fullScreen
	                showBackDrop={true}
	                loadingType="line"
	                spinning={this.state.showLine}
	            />
	            <Button
	                colors="primary"
	                style={{marginLeft: 50}}
	                onClick={this.handleShowDelay}>
					延迟显示默认Spin
	            </Button>
	            <Spin
	                fullScreen
	                showBackDrop={true}
	                delay={1000}
	                spinning={this.state.showDelay}
	            />
	        </div>
	    )
	}
}

export default Demo1;
