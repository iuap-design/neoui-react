/**
 *
 * @title 不传Header，Body，Footer结构的模态框
 * @description
 *
 */

import {Button, Modal} from '@tinper/next-ui';
import React, {Component} from 'react';

class Demo14 extends Component <{}, {showModal:boolean}> {
    constructor(props:{}) {
        super(props);
        this.state = {
            showModal: false
        };
        this.close = this.close.bind(this);
        this.open = this.open.bind(this);
    }

    close(event?: React.MouseEvent<HTMLButtonElement> | React.TouchEvent<HTMLButtonElement>) {
        console.log('event is', event)
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
                    onOk={this.close}
                    onCancel={this.close}
                    zIndex={2000}
                    title="title"
                    okText="ok"
                    cancelText="cancel"
                    closeIcon={<span>close</span>}
                    size="sm"
                >
                    <span>内容</span>
                </Modal>
            </div>
        )
    }
}

export default Demo14;
