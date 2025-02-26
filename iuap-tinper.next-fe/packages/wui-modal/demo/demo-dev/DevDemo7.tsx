/**
 *
 * @title 支持 根据自定义节点Dom 左右居中
 * @description 该节点中放置自定义属性 tinper-next-role="modal-container"
 *
 */

import { Button, Modal } from '@tinper/next-ui';
import React, { Component } from 'react';

class Dev7 extends Component<{}, { showModal: boolean }> {
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
            <div style={{ width: "1920px", height: "900px", display: "flex" }}>
                <div style={{ width: "100px", height: "100%" }}></div>
                <div style={{ width: "1820px", height: "100%", backgroundColor: "#ccc" }}
                    // className="diwork-content-fixed"
                    tinper-next-role="modal-container"
                >
                    <Button
                        bordered
                        className="demo-margin"
                        onClick={this.open}>
                        打开模态框
                    </Button>
                    <Modal
                        visible={this.state.showModal}
                        destroyOnClose
                        draggable
                        width={"900px"}
                        bounds={'div[tinper-next-role="modal-container"]'}
                        maskClosable={false}
                        //  bodyStyle={{ height: '700px' }}
                        onCancel={this.close}
                    >
                        <p>Some contents...</p>
                        <p>Some contents...</p>
                        <p>Some contents...</p>
                    </Modal>
                </div>
            </div>
        )
    }
}

export default Dev7;
