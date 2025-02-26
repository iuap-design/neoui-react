/**
 *
 * @title 受控制的气泡卡片
 * @description 通过设置show，来控制气泡卡片的显示和隐藏。
 */

import React, {Component} from 'react';
import Button from '../../wui-button/src';
import Popover from '../src';

class PopoverDemo extends Component {
    constructor(props) {
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
	onVisibleChange = (visible) => {
	    console.log('显示状态改变时触发的回调: ', visible);
	    this.setState({
	        show: visible
	    })
	}
	onVisibleChangeTop = (visible) => {
	    console.log('显示状态改变时触发的回调1: ', visible);
	    this.setState({
	        showTop: visible
	    })
	}

	render() {
	    let content1 = (
	        <div>
	            <Popover
	                getPopupContainer={this.getPopupContainer}
	                placement="bottom"
	                trigger="click"
	                content={<div className="bbb">aaaaaaaaaa</div>}
	            >
	                <Button
	                    className="button2"
	                    colors="primary"
	                    onClick={this.showTop}
	                >确定按钮2</Button>
	            </Popover>
	        </div>
	    )
	    const {content = content1, ...otherProps} = this.props

	    return (
	        <div className="demo2">
	            <Popover
	                getPopupContainer={this.getPopupContainer}
	                placement="bottom"
	                trigger="click"
	                content={content}
	                {...otherProps}
	            >
	                <Button
	                    colors="primary"
	                    className="button1"
	                    onClick={this.show}
	                >确定按钮1</Button>
	            </Popover>
	        </div>
	    )
	}
}

export default PopoverDemo;

