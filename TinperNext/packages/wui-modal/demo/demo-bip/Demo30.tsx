/**
 *
 * @title 可拖拽模态框内部放置iframe
 * @description 设置draggable后，为防止拖拽modal时鼠标移入iframe后松开鼠标，窗口依然跟随鼠标移动，需要设置样式 .react-draggable-transparent-selection iframe { pointer-events: none; }
 *
 */

import { Button, Modal } from '@tinper/next-ui';
import React, { Component } from 'react';


class Demo30 extends Component<{}, { showModal: boolean; checked: boolean }> {
    constructor(props: {}) {
        super(props);
        this.state = {
            showModal: false,
            checked: false,
        };
    }

	close = () => {
	    this.setState({
	        showModal: false
	    });
	}
	open = () => {
	    this.setState({
	        showModal: true
	    });
	}

	render() {
	    return (
	        <div className='demo12'>
	            <Button
	                bordered
	                className="demo-margin"
	                onClick={this.open}>
					打开模态框
	            </Button>
	            <Modal
	                visible={this.state.showModal}
	                onCancel={this.close}
	                size="xlg"
	                mask={false}
	                draggable={true}
	                bounds={'body'}// 可拖拽范围为当前可见区域
	                title='ModalBody 内放置iframe'
	            >
	                <iframe src='https://yondesign.yonyou.com/website/#/theme-viewer' allowFullScreen></iframe>
	            </Modal>
	        </div>
	    )
	}
}

export default Demo30;
