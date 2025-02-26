/**
 *
 * @title 测试50%宽度 ，全屏恢复时 内容撑开modal的场景
 * @description
 *
 */

import {Button, Modal, ModalProps} from '@tinper/next-ui';
import React, {Component} from 'react';
interface DemoState {
    showModal: boolean;
        isMax: boolean;
        size: ModalProps['size'];
        visible: boolean;
}
class Dev1 extends Component <{}, DemoState> {
    constructor(props:{}) {
        super(props)

        this.state = {
            showModal: false,
            isMax: false,
            size: "md",
            visible: false,
        }
    }
    close = () => {
        this.setState({ showModal: false })
    }
    open = () => {
        this.setState({ showModal: true })
    }
    onClick = () => {
        this.setState({ size: "lg" })
    }
    render() {
        return (
            <div>
                <Button
                    bordered
                    className="demo-margin"
                    onClick={this.open}>
                    鎵撳紑TinperModal
                </Button>
                <Modal
                    visible={this.state.showModal}
                    mask={true}
                    centered={true}
                    maskClosable={false}
                    // width={'500px'}
                    // height={'400px'}
                    width={'50%'}
                    height={'50%'}
                    draggable={true}
                    resizable={true}
                    size={this.state.size}
                    onCancel={this.close}
                >

                    <Modal.Header
                        closeButton
                        maximize
                        closeButtonProps={{ fieldid: 'closeBtn' }}
                    >
                        <Modal.Title>鏍囬...</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <p>娴嬭瘯content娴嬭瘯content娴嬭瘯content娴嬭瘯content娴嬭瘯content娴嬭瘯content娴嬭瘯content娴嬭瘯content娴嬭瘯content娴嬭瘯content娴嬭瘯content娴嬭瘯content娴嬭瘯content娴嬭瘯content娴嬭瘯content娴嬭瘯content</p>
                        <p>娴嬭瘯content</p>
                        <p>娴嬭瘯content</p>
                        <p>娴嬭瘯content</p>
                        <p>娴嬭瘯content</p>
                        <p>娴嬭瘯content</p>
                        <p>娴嬭瘯content</p>
                        <p>娴嬭瘯content</p>
                        <p>娴嬭瘯content</p>
                        <p>娴嬭瘯content</p>
                        <p>娴嬭瘯content</p>
                        <p>娴嬭瘯content</p>
                        <p>娴嬭瘯content</p>
                        <Button colors='primary' onClick={this.onClick}>change</Button>
                    </Modal.Body>
                </Modal>
            </div >
        )
    }
}
export default Dev1;
