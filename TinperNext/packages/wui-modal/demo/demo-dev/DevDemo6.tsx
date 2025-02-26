/**
 *
 * @title 测试 reesize  和maxWidth maxHeight
 * @description 测试 reesize 时 内容高度很大时 和maxWidth maxHeight之间的冲突。
 *
 */

import {Button, Modal, ModalProps} from '@tinper/next-ui';
import React, {Component} from 'react';


class Dev6 extends Component <{}, {showModal:boolean}> {
    constructor(props:{}) {
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
	    console.log("onResizeStop", e, dir, elementRef, delta)
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
	                draggable
	                visible={this.state.showModal}
	                destroyOnClose={false}
	                resizable={true}
	                resizeClassName="resize-box"
	                maxWidth={"1000"}
	                maxHeight={"500px"}
	                minWidth={420}
	                minHeight={240}
	                onResizeStart={this.onResizeStart}
	                onResize={this.onResize}
	                onResizeStop={this.onResizeStop}
	                onCancel={this.close}
	            >
	                <Modal.Body>
	                    <p>Some contents...</p>
	                    <p>Some contents...</p>
	                    <p>Some contents...</p>
	                    <p>Some contents...</p>
	                    <p>Some contents...</p>
	                    <p>Some contents...</p>
	                    <p>Some contents...</p>
	                    <p>Some contents...</p>
	                    <p>Some contents...</p>
	                    <p>Some contents...</p>
	                    <p>Some contents...</p>
	                    <p>Some contents...</p>
	                    <p>Some contents...</p>
	                    <p>Some contents...</p>
	                    <p>Some contents...</p>
	                    <p>Some contents...</p>
	                    <p>Some contents...</p>
	                    <p>Some contents...</p>

	                    <p>Some contents...</p>
	                    <p>Some contents...</p>
	                    <p>Some contents...</p>
	                    <p>Some contents...</p>
	                    <p>Some contents...</p>
	                    <p>Some contents...</p>
	                    <p>Some contents...</p>
	                    <p>Some contents...</p>
	                    <p>Some contents...</p>
	                    <p>Some contents...</p>
	                </Modal.Body>
	            </Modal>
	        </div>
	    )
	}
}

export default Dev6;
