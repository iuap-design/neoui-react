/**
 *
 * @title isMaximize最大化完全受控属性显示示例
 * @description 使用了isMaxmize，需要通过改变props.isMaxmize来控制最大化和缩小,示例中使用onMaximize来控制
 *
 */

import {Button, Modal} from '@tinper/next-ui';
import React, {Component} from 'react';

interface Demo27State {
    showModal: boolean,
    showModal2: boolean,
    isMaximize: boolean,
    isMaximize2: boolean
}

class Demo27 extends Component<{}, Demo27State> {
    constructor(props:{}) {
        super(props);
        this.state = {
            showModal: false,
            showModal2: false,
            isMaximize: true,
            isMaximize2: true
        };
        this.close = this.close.bind(this);
        this.open = this.open.bind(this);
    }

    close() {
        this.setState({
            showModal: false,
            showModal2: false
        });
    }

    open() {
        this.setState({
            showModal: true,
            // 使用了isMaxmize，如果希望每次打开都是最大化，可以在这里设置
            // isMaximize: true
        });
    }

    open2 = () => {
        this.setState({
            showModal2: true,
            // isMaximize2: true
        });
    }

    maximize = (isMaximize: boolean) => {
        this.setState({
            isMaximize
        });
    }

    maximize2 = (isMaximize: boolean) => {
        this.setState({
            isMaximize2: isMaximize
        });
    }

    render() {

        return (
            <div>
                <div>
                    <div id="maximize-container" style={{height: '400px', width: '300px', marginLeft: 15, background: '#ccc'}}
						 className="body-27">
                    </div>
                </div>
                <Button
                    bordered
                    className="demo-margin"
                    onClick={this.open}>
                    打开默认最大化的模态框
                </Button>
                <Modal
                    visible={this.state.showModal}
                    isMaximize={this.state.isMaximize}
                    destroyOnClose={false}
                    maskClosable={false}
                    mask={true}
                    closable={true}
                    draggable
                    onMaximize={this.maximize}
                    onCancel={this.close}
                >
                    <Modal.Header
                        closeButton
                        maximize
                        // onMaximize={this.maximize}
                        // header上的onMaximize会优先生效，但是推荐在Modal上使用
                    >
                        <Modal.Title>登陆</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <p>默认最大化的模态框...</p>
                        <p>默认最大化的模态框...</p>
                        <p>默认最大化的模态框...</p>
                    </Modal.Body>
                </Modal>
                <Button
                    bordered
                    className="demo-margin"
                    onClick={this.open2}>
                    指定范围最大化的模态框
                </Button>
                <Modal
                    visible={this.state.showModal2}
                    destroyOnClose={false}
                    maskClosable={false}
                    isMaximize={this.state.isMaximize2}
                    maximize={()=>document.getElementById('maximize-container')}
                    onMaximize={this.maximize2}
                    mask={true}
                    closable={true}
                    draggable
                    onCancel={this.close}
                >
                    <p>指定范围最大化的模态框...</p>
                    <p>指定范围最大化的模态框...</p>
                    <p>指定范围最大化的模态框...</p>
                </Modal>
            </div>
        )
    }
}

export default Demo27;
