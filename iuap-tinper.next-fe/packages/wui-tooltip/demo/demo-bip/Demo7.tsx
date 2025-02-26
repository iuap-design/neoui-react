/**
 * @title 自动调整箭头位置
 * @description isCenterArrow 属性控制自动调整箭头位置。
 */

import {Button, Tooltip} from '@tinper/next-ui'
import React, {Component} from 'react'

class Demo7 extends Component {
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
	        </div>
	    )

	    return (
	        <div className='demo-tooltip'>
	            <Tooltip overlay={tip} placement='bottomRight' trigger="click" isCenterArrow>
	                <Button colors='primary' style={{marginLeft: '500px'}}>鼠标</Button>
					{/* <span>图</span> */}
	            </Tooltip>
	        </div>
	    )
	}
}

export default Demo7
