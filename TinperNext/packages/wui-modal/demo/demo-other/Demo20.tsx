/**
 *
 * @title 指定父元素范围内全屏显示
 * @description
 *
 */

import {Button, Modal} from '@tinper/next-ui';
import React, {Component} from 'react';

class Demo20 extends Component<{}, {showModal: boolean}> {
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
                <div>
                    <div style={{height: '80px'}}></div>
                    <div id="maximize-container" style={{height: '400px', width: '300px', background: '#ccc'}}
						 className="body-20">
                    </div>
                </div>
                <Button
                    bordered
                    className="demo-margin"
                    onClick={this.open}>
					打开模态框
                </Button>
                <Modal
                    visible={this.state.showModal}
                    destroyOnClose={false}
                    maskClosable={false}
                    maximize={document.getElementById('maximize-container')!}
                    mask
                    closable
                    draggable
                    onCancel={this.close}
                >
                    <p>模态框...</p>
                    <p>模态框...</p>
                    <p>模态框...</p>
                </Modal>
            </div>
        )
    }
}

export default Demo20;
