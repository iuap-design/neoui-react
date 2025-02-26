/**
 *
 * @title 指定modal显示位置
 * @description showPosition可以修改modal初始位置，优先级大于centered
 *
 */

import {Button, Modal} from '@tinper/next-ui';
import React, {Component} from 'react';

class Demo24 extends Component<{}, {showModal: boolean, position: {x: number, y: number}}> {
    constructor(props: {}) {
        super(props);
        this.state = {
            showModal: false,
            position: {
                x: 20, y: 300
            }
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
                    destroyOnClose
                    draggable
                    resizable
                    maskClosable={false}
                    showPosition={this.state.position}
                    onCancel={this.close}
                >
                    <p>Some contents...</p>
                    <button onClick={()=>{
                        this.setState({position: {x: this.state.position.x + 100, y: 300}})
                    }}>改变位置</button>
                    <p>Some contents...</p>
                    <p>Some contents...</p>
                </Modal>
            </div>
        )
    }
}

export default Demo24;
