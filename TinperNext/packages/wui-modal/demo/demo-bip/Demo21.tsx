/**
 *
 * @title 全屏显示示例
 * @description
 *
 */

import {Button, Modal} from '@tinper/next-ui';
import React, {Component} from 'react';

class Demo21 extends Component <{}, {showModal:boolean}> {
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
                    visible={this.state.showModal}
                    maskClosable={false}
                    mask
                    closable
                    draggable
                    onCancel={this.close}
                >
                    <Modal.Header closeButton maximize>
                        <Modal.Title>登陆</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <p>模态框...</p>
                        <p>模态框...</p>
                        <p>模态框...</p>
                    </Modal.Body>
                </Modal>
            </div>
        )
    }
}

export default Demo21;
