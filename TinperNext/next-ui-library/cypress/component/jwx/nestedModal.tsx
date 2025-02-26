import React, { Component } from 'react';
import { Modal, Button } from '../../../../packages';

interface DemoState {
    showModal: boolean;
    showModal2: boolean;
}
class NestedModal extends Component<{}, DemoState> {
    constructor(props: {}) {
        super(props);
        this.state = {
            showModal: false,
            showModal2: false
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

    close2 = () => {
        this.setState({
            showModal2: false
        });
    }

    open2 = () => {
        this.setState({
            showModal2: true
        });
    }

    render() {

        return (
            <div className="nested-modal">
                <Button
                    className="open1"
                    bordered
                    onClick={this.open}>
                    打开嵌套模态框
                </Button>
                <Modal
                    className='modal1'
                    visible={this.state.showModal}
                    onCancel={this.close}
                    size="lg"
                    destroyOnClose={false}
                    backdropClosable={true}
                    draggable
                    keyboard
                >
                    <Modal.Header closeButton>
                        <Modal.Title>第一个模态框</Modal.Title>
                    </Modal.Header>

                    <Modal.Body>
                        这是第一个模态框
                        <Button
                            className="open2"
                            bordered
                            size="sm"
                            style={{ marginLeft: 8 }}
                            onClick={this.open2}
                        >
                            打开第二个模态框~
                        </Button>
                    </Modal.Body>
                </Modal>
                <Modal
                    className='modal2'
                    keyboard
                    draggable
                    visible={this.state.showModal2}
                    onHide={this.close2}
                    size='sm'
                    destroyOnClose={false}
                    backdropClosable={false}

                >
                    <div> 这是第二个模态框~</div>
                </Modal>
            </div>
        )
    }
}

export default NestedModal;