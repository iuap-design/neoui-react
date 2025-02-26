/**
 *
 * @title modal 强制居中 (和resizable配合使用示例)
 * @description 窗体发生变化，`centered` 参数控制弹框是否强制居中。
 *
 */

import {Button, Modal, ModalProps} from '@tinper/next-ui';
import React, {Component} from 'react';


class Demo13 extends Component<{}, {showModal: boolean}> {
    constructor(props: {}) {
        super(props);
        this.state = {
            showModal: false
        };
        this.close = this.close.bind(this);
        this.open = this.open.bind(this);
    }

    close() {
        this.setState({
            showModal: false
        });
    }

    open() {
        this.setState({
            showModal: true
        });
    }

	onResizeStart: ModalProps['onResizeStart'] = (e, dir, elementRef) => {
	    console.log("onResizeStart", e, dir, elementRef)
	}
	onResize: ModalProps['onResize'] = (e, dir, elementRef, delta) => {
	    console.log("onResize", e, dir, elementRef, delta)
	}
	onResizeStop: ModalProps['onResizeStop'] = (e, dir, elementRef, delta) => {
	    console.log(e, dir, elementRef, delta)
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
	            <Modal
	                centered
	                visible={this.state.showModal}
	                destroyOnClose={false}
	                resizable
	                resizeClassName="resize-box"
	                minWidth={420}
	                minHeight={200}
	                onResizeStart={this.onResizeStart}
	                onResize={this.onResize}
	                onResizeStop={this.onResizeStop}
	                onCancel={this.close}
	            >
	                <p>Some contents...</p>
	                <p>Some contents...</p>
	                <p>Some contents...</p>
	            </Modal>
	        </div>
	    )
	}
}

export default Demo13;
