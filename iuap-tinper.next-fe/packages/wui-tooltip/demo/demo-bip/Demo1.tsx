/**
 * @title 基本Tooltip
 * @description trigger 设置显示方式。
 */

import {Button, Tooltip} from '@tinper/next-ui'
import React, {Component} from 'react'

class Demo1 extends Component {
	private tooltip?: HTMLDivElement
	private btn?: Button

	state = {
	    visible: false
	}

	componentDidMount() {
	    console.log(this.tooltip)
	    console.log(this.btn)
	}

	onHide = (visible: boolean) => {
	    console.log('onHide', visible)
	    this.setState({
	        visible: visible
	    })
	}

	show = () => {
	    console.log('show', this.state.visible)
	    this.setState({
	        visible: !this.state.visible
	    })
	}
	clickHandleBack: React.MouseEventHandler = e => {
	    console.log('e: ', e)
	}
	onMouseLeave: React.MouseEventHandler = e => {
	    console.log('e: ', e)
	}

	getPopupContainer = (trigger: React.ReactNode) => {
	    console.log(trigger)
	    return document.getElementById('tinperDemo')
	}

	render() {
	    let tip = (
	        <div>
	            <p>这是一个很强的提醒</p>
	            <p>这是一个很强的提醒</p>
	            <p>这是一个很强的提醒</p>
	            <p>这是一个很强的提醒</p>
	            <p>这是一个很强的提醒</p>
	            <p>这是一个很强的提醒</p>
	            <p>这是一个很强的提醒</p>
	            <p>这是一个很强的提醒</p>
	            <p>这是一个很强的提醒</p>
	            <p>这是一个很强的提醒</p>
	            <p>这是一个很强的提醒</p>
	            <p>这是一个很强的提醒</p>
	            <p>这是一个很强的提醒</p>
	            <p>这是一个很强的提醒</p>
	            <p>这是一个很强的提醒</p>
	            <p>这是一个很强的提醒</p>
	            <p>这是一个很强的提醒</p>
	            <p>这是一个很强的提醒</p>
	            <p>这是一个很强的提醒</p>
	            <p>这是一个很强的提醒</p>
	            <p>这是一个很强的提醒</p>
	            <p>这是一个很强的提醒</p>
	            <p>这是一个很强的提醒</p>
	            <p>这是一个很强的提醒</p>
	            <p>这是一个很强的提醒</p>
	            <p>这是一个很强的提醒</p>
	            <p>这是一个很强的提醒</p>
	            <p>这是一个很强的提醒</p>
	            <p>这是一个很强的提醒</p>
	            <p>这是一个很强的提醒</p>
	        </div>
	    )

	    return (
	        <div className='demo-tooltip'>
	            <Tooltip overlay={tip} placement='bottom'>
	                <Button colors='primary'>鼠标滑过显示</Button>
	            </Tooltip>
	            <Tooltip
	                id='inner-id'
	                fieldid='demo1-fieldid'
	                arrowPointAtCenter
	                className='--child-className--'
	                overlayClassName='--overlayClassName--'
	                onHide={this.onHide}
	                onMouseOut={this.onMouseLeave}
	                onClick={this.clickHandleBack}
	                trigger='click'
	                maskClosable
	                placement='bottom'
	                overlay={tip}
	                overlayMaxHeight={true}
	                visible={this.state.visible}
	                getPopupContainer={this.getPopupContainer}
	                ref={(ref: HTMLDivElement) => (this.tooltip = ref)}
	            >
	                <Button
	                    id='--btn-id--'
	                    style={{marginLeft: 10}}
	                    className='--btn-className--'
	                    colors='primary'
	                    onClick={this.show}
	                    ref={(ref: Button) => (this.btn = ref)}
	                >
						点击显示
	                </Button>
	            </Tooltip>
	        </div>
	    )
	}
}

export default Demo1
