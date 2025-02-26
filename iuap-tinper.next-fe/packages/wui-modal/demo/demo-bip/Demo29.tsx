/**
 *
 * @title forceRender强制渲染
 * @description 在第一次打开之前，Modal不可见，但是会渲染Modal的dom元素
 *
 */

import { Button, Modal } from '@tinper/next-ui';
import React, { Component } from 'react';

class Demo29 extends Component<{}, { showModal: boolean }> {
    constructor(props: {}) {
        super(props);
        this.state = {
            showModal: false
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
            <div>
                <Button
                    bordered
                    className="demo-margin"
                    onClick={this.open}>
                    打开模态框
                </Button>
                <Modal
                    forceRender
                    className='forceRender modal'
                    visible={this.state.showModal}
                    destroyOnClose={true}
                    maskClosable={false}
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

export default Demo29;
