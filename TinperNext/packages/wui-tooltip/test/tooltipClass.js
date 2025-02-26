/**
 * @title 基本Tooltip
 * @description trigger 设置显示方式。
 */

import React, {Component} from 'react'
import Button from '../../wui-button/src'
import Tooltip from '../src'

class TooltipDemo extends Component {
	state = {
	    visible: false
	}

	onHide = visible => {
	    console.log('onHide', visible)
	    this.setState({
	        visible: visible
	    })
	}

	show = () => {
	    this.setState({
	        visible: !this.state.visible
	    })
	}
	clickHandleBack = e => {
	    console.log('e: ', e)
	}
	onMouseLeave = e => {
	    console.log('e: ', e)
	}
	onHide = e => {
	    console.log(e)
	}

	getPopupContainer = trigger => {
	    return document.getElementById('root')
	}

	render() {
	    let tip = <div>这是一个很强的提醒</div>

	    return (
	        <div id="root" className='demo-tooltip'>
	            <Tooltip
	                getPopupContainer={this.getPopupContainer}
	                overlay={tip}
	                placement="bottom"
	                trigger="click"
	                {...this.props}
	            >
	                <Button colors='primary'>鼠标滑过显示</Button>
	            </Tooltip>
	        </div>
	    )
	}
}

export default TooltipDemo
