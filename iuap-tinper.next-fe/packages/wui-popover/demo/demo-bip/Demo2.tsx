/**
 *
 * @title 受控制的气泡卡片
 * @description 通过设置show，来控制气泡卡片的显示和隐藏。
 */

import {Button, Popover} from '@tinper/next-ui';
import React, {Component} from 'react';


class Demo2 extends Component<{}, {show: boolean; showTop: boolean}> {
	private bottomRef?: any

	constructor(props: {}) {
	    super(props);
	    this.state = {
	        show: false,
	        showTop: false,
	    }
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
	                //     // return this.container.current.getContainer();
	                //     return this.bottomRef.getContainer();
	                // }}
	                placement="right"
	                trigger="click"
	                title={<h3 style={{margin: 4}}>请确认您的包裹已签收！</h3>}
	                show={this.state.showTop}
	                onOpenChange={this.onVisibleChangeTop}
	            >
	                <Button
	                    colors="primary"
	                    style={{margin: '8px 0 4px'}}
	                    onClick={this.showTop}
	                >确定按钮</Button>
	            </Popover>
	        </div>
	    )
	    return (
	        <div className="demo2">
	            <Popover
	                id="demo2"
	                fieldid='demo2-fieldid'
	                hideArrow={false}
	                rootClose
	                className="content-class"
	                overlayClassName="overlay-class"
	                ref={(el: HTMLDivElement) => this.bottomRef = el}
	                placement="right"
	                trigger="click"
	                title={<h3 style={{margin: 4}}>请确认您的包裹已签收！</h3>}
	                content={content}
	                show={this.state.show}
	                onOpenChange={this.onVisibleChange}
	            >
	                <Button
	                    id='test'
	                    colors="primary"
	                    onClick={this.show}
	                >确定按钮</Button>
	            </Popover>
	        </div>
	    )
	}
}

export default Demo2;
