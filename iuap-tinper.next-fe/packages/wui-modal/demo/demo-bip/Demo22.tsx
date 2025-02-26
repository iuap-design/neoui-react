/**
 *
 * @title 键盘模式 keyboard
 * @description onCancel: Alt+ N  onOk: Alt+Y / esc
 *
 */

import {Button, ModalProps, Modal} from '@tinper/next-ui';
import React, {Component} from 'react';

class Demo22 extends Component <{}, {showModal:boolean; keyboard: ModalProps['keyboard']}> {
    constructor(props:{}) {
        super(props);
        this.state = {
            showModal: false,
            keyboard: true
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

	changeKeyboard = (value: ModalProps['keyboard']) => {
	    this.setState({
	        keyboard: value
	    });
	}

	render() {
	    const {keyboard} = this.state;
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
	                destroyOnClose={true}
	                maskClosable={false}
	                keyboard={keyboard}
	                onOk={this.close}
	                onCancel={this.close}>
	                <Modal.Header closeButton closeButtonProps={{fieldid: 'closeBtn'}}>
	                    <Modal.Title>标题</Modal.Title>
	                </Modal.Header>
	                <Modal.Body>
	                    <p>Some contents...</p>
	                    <p>Some contents...</p>
	                    <p>Some contents...</p>
	                    <Button
	                        colors={keyboard === null ? "primary" : undefined}
	                        className="demo-margin"
	                        onClick={()=>this.changeKeyboard(undefined)}>
							键盘模式: “默认”
	                    </Button>
	                    <Button
	                        colors={keyboard === false ? "primary" : undefined}
	                        className="demo-margin"
	                        onClick={()=>this.changeKeyboard(false)}>
							键盘模式: “全部关闭”
	                    </Button>
	                    <Button
	                        colors={keyboard === true ? "primary" : undefined}
	                        className="demo-margin"
	                        onClick={()=>this.changeKeyboard(true)}>
							键盘模式: “全部开启”
	                    </Button>
	                    <Button
	                        colors={keyboard && typeof keyboard === 'object' ? "primary" : undefined}
	                        className="demo-margin"
	                        onClick={()=>this.changeKeyboard(['cancel', 'ok']) }>
							键盘模式: “定制： 仅 alt+ y ，alt + n”
	                    </Button>
	                </Modal.Body>
	            </Modal>
	        </div>
	    )
	}
}
// <Select dropdownClassName="test" value={selectValue}  onChange={this.changeKeyboard}>
//                             <Option value={null}>默认</Option>
//                             <Option value={true}>全部开启 </Option>
//                             <Option value={false}>全部关闭 </Option>
//                             <Option value={'cancel,ok'} >
//                               定制： 仅 alt+ y ，alt + n
//                             </Option>
//                           </Select>

export default Demo22;
