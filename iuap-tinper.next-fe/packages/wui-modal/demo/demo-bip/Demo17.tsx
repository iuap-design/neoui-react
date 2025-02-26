/**
 *
 * @title 阻断 关闭模态窗(延时关闭)
 * @description onCancel 返回 promise.resolve 设置为true 才能关闭模态窗
 *
 */

import {Button, Modal} from '@tinper/next-ui';
import React, {Component} from 'react';

class Demo17 extends Component <{}, {showModal:boolean}> {
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
                    onCancel={() => {
                        console.log('onCancel')
                        return new Promise((resolve, _reject) => {
                            setTimeout(() => {
                                resolve(true)
                            }, 1000)
                        });
                    }}
                    onOk={() => {
                        this.close()
                    }}
                    visible={this.state.showModal}
                    destroyOnClose={true}
                    maskClosable={false}
                >
                    <Modal.Header closeButton closeButtonProps={{fieldid: 'closeBtn'}}>
                        <Modal.Title>标题</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <p>Some contents...</p>
                        <p>Some contents...</p>
                        <p>Some contents...</p>
                    </Modal.Body>
                </Modal>
            </div>
        )
    }
}

export default Demo17;
