/**
 *
 * @title isMaximize最大化完全受控属性显示示例2
 * @description 使用了isMaxmize，默认打开是最大化的，如果不设置maximize,右上角不会显示放大缩小按钮。可以自己设置放大缩小按钮
 *
 */

import { Button, Modal } from '@tinper/next-ui';
import React, { Component } from 'react';

class Demo28 extends Component<{}, { showModal: boolean, isMaximize: boolean }> {
    constructor(props: {}) {
        super(props);
        this.state = {
            showModal: false,
            isMaximize: true,
        };
    }

    close = () => {
        this.setState({
            showModal: false,
        });
    }

    open = () => {
        this.setState({
            showModal: true,
        });
    }

    maximize = () => {
        this.setState({
            isMaximize: !this.state.isMaximize
        });
    }

    render() {
        const { showModal, isMaximize } = this.state;

        return (
            <div>
                <Button
                    bordered
                    className="demo-margin"
                    onClick={this.open}>
                    打开模态框
                </Button>
                <Modal
                    visible={showModal}
                    isMaximize={isMaximize}
                    destroyOnClose={false}
                    maskClosable={false}
                    mask={true}
                    closable={true}
                    draggable
                    onCancel={this.close}>
                    <Modal.Header closeButton>
                        <Modal.Title>登陆</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <p>默认最大化的模态框...</p>
                        <p>默认最大化的模态框...</p>
                        <p>默认最大化的模态框...</p>
                    </Modal.Body>
                    <Modal.Footer>
                        <Button onClick={this.close} colors="secondary" style={{ marginRight: 8 }}>取消</Button>
                        <Button onClick={this.close} colors='primary'>确定</Button>
                        <Button onClick={this.maximize} colors='primary'>{isMaximize ? "缩小" : "放大"}</Button>
                    </Modal.Footer>
                </Modal>
            </div>
        )
    }
}

export default Demo28;
