/**
 *
 * @title footerProps的使用
 * @description 在不包含Footer的Modal中使用footerProps 可以将属性传入内部footer中和 直接在modal中使用Modal.Footer组件达到同样的效果(支持Modal 中不包含Modal.Footer时亦可自定义渲染Footer)
 *
 *
 */

import { Button, Modal, Checkbox } from '@tinper/next-ui';
import React, { Component, ReactNode } from 'react';

class Demo26 extends Component<{}, { showModal: boolean, showModal1: boolean }> {
    constructor(props: {}) {
        super(props);
        this.state = {
            showModal: false,
            showModal1: false,
        };
        this.close = this.close.bind(this);
        this.open = this.open.bind(this);
    }

    close() {
        this.setState({
            showModal: false,
            showModal1: false
        });
    }

    open = () => {
        this.setState({
            showModal: true
        });
    }
    open1 = () => {
        this.setState({
            showModal1: true
        });
    }

    render() {
        return (
            <div>
                <Button
                    bordered
                    className="demo-margin"
                    onClick={this.open}>
                    打开无ModalFooter模态框
                </Button>
                <Modal
                    visible={this.state.showModal}
                    onOk={this.close}
                    onCancel={this.close}
                    zIndex={2000}
                    title="title"
                    okText="ok"
                    cancelText="cancel"
                    footerProps={{
                        className: "cutom-footer",
                        onCustomRender: (child) =>
                            // <>
                            //     <Checkbox>check it &nbsp;  &nbsp; </Checkbox>
                            //     {child}
                            // </>
                            [<Checkbox key="check it">check it &nbsp;  &nbsp; </Checkbox>, child]
                    }}
                >
                    <p>Some contents...</p>
                    <p>Some contents...</p>
                    <p>Some contents...</p>
                </Modal>
                <Button
                    bordered
                    className="demo-margin"
                    onClick={this.open1}>
                    打开有ModalFooter标签模态框
                </Button>
                <Modal
                    visible={this.state.showModal1}
                    destroyOnClose={true}
                    maskClosable={false}
                    onOk={this.close}
                    keyboard={['esc', 'cancel', 'ok']}
                    onCancel={this.close}>
                    <Modal.Header closeButton closeButtonProps={{ fieldid: 'closeBtn' }}>
                        <Modal.Title>标题</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <p>Some contents...</p>
                        <p>Some contents...</p>
                        <p>Some contents...</p>
                    </Modal.Body>
                    <Modal.Footer className="cutom-footer" onCustomRender={(child: ReactNode) =>
                        // <>
                        //     <Checkbox>check it &nbsp;  &nbsp; </Checkbox>
                        //     {child}
                        // </>
                        [<Checkbox key="check it">check it &nbsp;  &nbsp; </Checkbox>, child]
                    }>
                        <Button onClick={this.close} fieldid='demo_modal_footer_cancel' colors="secondary" style={{ marginRight: 8 }}>取消</Button>
                        <Button onClick={this.close} fieldid='demo_modal_foot_ok' colors='primary'>确定</Button>
                    </Modal.Footer>
                </Modal>
            </div>
        )
    }
}

export default Demo26;
