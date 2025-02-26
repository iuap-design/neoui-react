/**
 *
 * @title 被loading遮住的模态框
 * @description 当Modal组件和Loading组件同时出现的时候，Loading会把Modal遮住
 *
 */

import {Button, Modal, Spin} from '@tinper/next-ui';
import React, {Component} from 'react';

class Demo6 extends Component<{}, {showModal: boolean; showLoading: boolean;}> {
    constructor(props: {}) {
        super(props);
        this.state = {
            showModal: false,
            showLoading: false
        };
    }

	close = () => {
	    this.setState({
	        showModal: false,
	        showLoading: false
	    });
	}
	open = () => {
	    this.setState({
	        showModal: true,
	        showLoading: true
	    });
	    setTimeout(() => {
	        this.setState({
	            showLoading: false
	        })
	    }, 1000)
	}

	render() {
	    return (
	        <div>
	            <Button
	                bordered
	                className="demo-margin"
	                onClick={this.open}>
					打开模态框
	            </Button>
	            <Spin
	                showBackDrop={true}
	                // loadingType="line"
	                fullScreen
	                spinning={this.state.showLoading}
	            >
	            </Spin>
	            <Modal
	                visible={this.state.showModal}
	                onCancel={this.close}
	                size="sm"
	            >
					我是模态框，我的被loading遮住了~
	            </Modal>
	        </div>
	    )
	}
}

export default Demo6;
