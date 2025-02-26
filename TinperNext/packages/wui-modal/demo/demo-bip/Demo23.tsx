/**
 *
 * @title fieldid 的添加（自动化test）
 * @description modal 简洁模式下 的 fieldid 和本例中 定义情况后缀相同
 *
 */

import {Button, Modal} from '@tinper/next-ui';
import React, {Component} from 'react';

class Demo23 extends Component <{}, {showModal:boolean}> {
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
            // modal 简洁模式下 的 fieldid 和以下 定义情况后缀相同
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
                    onOk={this.close}
                    fieldid="demo"
                    keyboard={['esc', 'cancel', 'ok']}
                    //  bodyStyle={{ height: '700px' }}
                    onCancel={this.close}>
                    <Modal.Header fieldid='demo_modal_header' closeButton closeButtonProps={{fieldid: 'closeBtn'}}>
                        <Modal.Title fieldid='demo_modal_title'>标题</Modal.Title>
                    </Modal.Header>
                    <Modal.Body fieldid='demo_modal_body'>
                        <p>Some contents...</p>
                        <p>Some contents...</p>
                        <p>Some contents...</p>
                    </Modal.Body>
                    <Modal.Footer fieldid='demo_modal_footer'>
                        <Button onClick={this.close} fieldid='demo_modal_footer_cancel' colors="secondary" style={{marginRight: 8}}>取消</Button>
                        <Button onClick={this.close} fieldid='demo_modal_foot_ok' colors='primary'>确定</Button>
                    </Modal.Footer>
                </Modal>
            </div>
        )
    }
}

export default Demo23;
