/**
 *
 * @title 自定义大小的模态框
 * @description 通过width和height属性定义模态框大小
 *
 */

import { Button, Modal } from '@tinper/next-ui';
import React, { Component } from 'react';

interface Demo5State {
    showModal?: boolean,
    height?: string,
    width?: string,
    content?: string
}
class Demo5 extends Component<{}, Demo5State> {
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

    open(modalIndex: number) {
        if (modalIndex == 1) {
            this.setState({
                showModal: true,
                height: "400px",
                width: "400px",
                content: '这是一个宽高都是400像素的模态框，可以设置width和height属性自定义模态框的大小。'
            });
        } else {
            this.setState({
                showModal: true,
                height: "60%",
                width: "60%",
                content: '这是一个宽高都是60%的模态框，可以设置width和height属性为百分比实现模态框的自适应大小。'
            });
        }
    }

    render() {
        const { width, height, showModal, content } = this.state
        return (
            <div>
                <Button
                    bordered
                    className="demo-margin"
                    onClick={() => {
                        this.open(1)
                    }}>
                    自定义大小的模态框
                </Button>
                <Button
                    style={{ marginLeft: 10 }}
                    bordered
                    className="demo-margin"
                    onClick={() => {
                        this.open(2)
                    }}>
                    自适应大小的模态框
                </Button>
                <Modal
                    title='我是标题'
                    visible={showModal}
                    onCancel={this.close}
                    centered
                    width={width}
                    height={height}
                >
                    {content}
                </Modal>
            </div>
        )
    }
}

export default Demo5;
