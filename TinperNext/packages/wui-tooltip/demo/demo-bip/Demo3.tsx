/**
 * @title 受控显示和隐藏
 * @description `visible`属性控制
 */


import {Input, Tooltip} from '@tinper/next-ui';
import React, {Component} from 'react';

class Demo3 extends Component {
	state = {
	    visible: false,
	    value: ''
	}

	handleChange = (value: string) => {
	    let newState: {value?: string; visible?: boolean} = {
	        value
	    }
	    if (Number(value) > 5) {
	        newState.visible = false
	    } else {
	        newState.visible = true
	    }
	    this.setState(newState)
	}

	onFocus = () => {
	    let {value} = this.state;
	    if (Number(value) < 5) {
	        this.setState({
	            visible: true
	        })
	    }
	}

	onBlur = () => {
	    this.setState({
	        visible: false
	    })
	}

	// 使用控制弹出层显示时的钩子函数
	onVisibleChange = () => {
	    console.log('visible changed.')
	}

	render() {
	    let {visible, value} = this.state;
	    let tip = (
	        <div>
				输入的值必须大于5
	        </div>
	    )

	    return (
	        <div className="demo-tooltip">
	            <Tooltip
	                arrowPointAtCenter
	                visible={visible}
	                onOpenChange={this.onVisibleChange}
	                placement="top"
	                overlay={tip}>
	                <Input
	                    value={value}
	                    onChange={this.handleChange}
	                    onFocus={this.onFocus}
	                    onBlur={this.onBlur}
	                    style={{width: '200px'}}
	                />
	            </Tooltip>
	        </div>
	    )
	}
}

export default Demo3;
