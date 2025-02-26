/**
 *
 * @title getPopupContainer
 * @description getPopupContainer可以修改modal渲染节点
 *
 */

import {Button, Modal} from '@tinper/next-ui';
import React, {Component} from 'react';

class Demo16 extends Component<{}, {showModal: boolean}> {
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
                    className="demo-margin demo-margin16"
                    onClick={this.open}>
					打开模态框
                </Button>
                <Modal
                    visible={this.state.showModal}
                    destroyOnClose={true}
                    maskClosable={false}
                    getPopupContainer={() => document.querySelector('.demo-margin16')!}
                    //  bodyStyle={{ height: '700px' }}
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

export default Demo16;
