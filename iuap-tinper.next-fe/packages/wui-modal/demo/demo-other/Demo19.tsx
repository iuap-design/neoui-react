/**
 *
 * @title modal 强制居中示例（和draggable）
 * @description与拖拽Header `draggable` 优先级大于 centered，导致强制居中失效， 可通过 鼠标拖拽达到居中目的。
 *
 */

import {Button, Modal} from '@tinper/next-ui';
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
                    draggable
                    visible={this.state.showModal}
                    destroyOnClose={false}
                    minWidth={420}
                    minHeight={240}
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
