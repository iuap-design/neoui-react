/**
 *
 * @title 气泡卡片嵌套
 * @description 通过指定getPopupContainer。
 */

import {Button, Popover} from '@tinper/next-ui';
import React, {Component} from 'react';


class Demo2 extends Component<{}, {show: boolean; showTop: boolean}> {
	private container?: any
	constructor(props: {}) {
	    super(props);
	    this.state = {
	        show: false,
	        showTop: false,
	    }
	    this.container = React.createRef();
	}

	handleClose = () => {
	    this.setState({
	        show: false
	    })
	}

	show = () => {
	    this.setState({
	        show: true
	    })
	}
	showTop = () => {
	    this.setState({
	        showTop: true
	    })
	}
	onVisibleChange = (visible: boolean) => {
	    console.log('显示状态改变时触发的回调: ', visible);
	    this.setState({
	        show: visible
	    })
	}
	onVisibleChangeTop = (visible: boolean) => {
	    console.log('显示状态改变时触发的回调1: ', visible);
	    this.setState({
	        showTop: visible
	    })
	}

	render() {
	    let content = (
	        <div>
	            <Popover
	                id="demo2"
	                hideArrow={false}
	                rootClose
	                // getPopupContainer={() => {
	                //     return this.container.current.getContainer();
	                // }}
	                placement="right"
	                trigger="click"
	                title={<h3 style={{margin: 4}}>请确认您的包裹已签收！</h3>}
	                show={this.state.showTop}
	                onOpenChange={this.onVisibleChangeTop}
	            >
	                <Button
	                    colors="primary"
	                    onClick={this.showTop}
	                >确定按钮</Button>
	            </Popover>
	        </div>
	    )
	    return (
	        <div className="demo2">
	            <Popover
	                id="demo2"
	                hideArrow={false}
	                rootClose
	                ref={this.container}
	                placement="right"
	                trigger="click"
	                title={<h3 style={{margin: 4}}>请确认您的包裹已签收！</h3>}
	                content={content}
	                show={this.state.show}
	                onOpenChange={this.onVisibleChange}
	            >
	                <Button
	                    colors="primary"
	                    onClick={this.show}
	                >确定按钮</Button>
	            </Popover>
	        </div>
	    )
	}
}

export default Demo2;
