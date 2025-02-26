/**
 *
 * @title 不同遮罩层状态的模态框
 * @description 遮罩层可以通过mask属性控制状态，可以为不响应事件，可以不显示。
 *
 */

import {Button, Modal} from '@tinper/next-ui';
import React, {Component} from 'react';


class Demo4 extends Component<{}, {
    showModal: boolean;
    modalDropup: boolean;
    maskClosable: boolean;
}> {
    constructor(props: {}) {
        super(props);
        this.state = {
            showModal: false,
            modalDropup: true,
            maskClosable: false
        };
        this.close = this.close.bind(this);
        this.open = this.open.bind(this);
        this.changeDropup = this.changeDropup.bind(this);

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

    changeDropup(state: boolean) {
        this.setState({
            modalDropup: state
        });
    }

    changeClosable(closable: boolean) {
        this.setState({
            maskClosable: closable
        });
    }

    render() {
        return (
            <div>
                <Button
                    style={{margin: 8}}
                    onClick={() => {
                        this.changeDropup(false);
                        this.open();
                    }}>
					无遮罩层模态框
                </Button>
                <Button
                    style={{margin: 8}}
                    onClick={() => {
                        this.changeDropup(true);
                        this.changeClosable(false);
                        this.open();
                    }}>
					点击遮罩不可关闭模态框
                </Button>
                <Button
                    style={{margin: 8}}
                    onClick={() => {
                        this.changeDropup(true);
                        this.changeClosable(true);
                        this.open();
                    }}>
					点击遮罩可关闭模态框
                </Button>
                <Modal
                    title='我来组成头部'
                    visible={this.state.showModal}
                    mask={this.state.modalDropup}
                    maskClosable={this.state.maskClosable}
                    onCancel={this.close}
                >
                    <h4> 这是一个沉默的标题 </h4>

                    <p> 一些描述。。。 </p>
                    <hr/>

                    <p> 用创想与技术推动商业和社会进步 </p>

                    <p> 我们基于创造性的思想与先进的技术（ 现阶段是信息技术）， 创新和运营高客户价值的产品与服务， 帮助客户实现发展目标， 进而推动商业和社会进步。 </p>

                    <p> 全球领先的企业与公共组织软件、 云服务、 金融服务提供商。 </p>

                    <p> 员工快乐工作， 成就事业， 分享成功的平台。 </p>
                    <Modal.Footer>
                        <Button colors="secondary" onClick={this.close}> 关闭 </Button>
                    </Modal.Footer>
                </Modal>
            </div>
        )
    }
}

export default Demo4;
