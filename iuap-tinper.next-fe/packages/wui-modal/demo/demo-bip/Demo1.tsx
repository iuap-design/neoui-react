/**
 *
 * @title 默认的模态框
 * @description
 *
 */

import { Button, Modal } from '@tinper/next-ui';
import React, { Component } from 'react';

class Demo1 extends Component<{}, {showModal: boolean}> {
    constructor(props: {}) {
        super(props);
        this.state = {
            showModal: false
        };
        this.close = this.close.bind(this);
        this.open = this.open.bind(this);
        // Modal.success({content: 'df'})
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
                    destroyOnClose={true}
                    maskClosable={false}
                    //  bodyStyle={{ height: '700px' }}
                    onCancel={this.close}
                    centered
                    draggable={false}
                >
                    <p>Some contents...</p>
                    <p>Some contents...</p>
                    <p>Some contents...</p>
                </Modal>
            </div>
        )
    }
}

export default Demo1;
