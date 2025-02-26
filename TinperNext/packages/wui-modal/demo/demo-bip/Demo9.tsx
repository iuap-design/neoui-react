/**
 *
 * @title enforceFocus
 * @description 打开模态框时控制焦点的聚焦和离开
 *
 */

import {Button, Form, Input, Modal, Popconfirm} from '@tinper/next-ui';
import React, {Component} from 'react';

const FormItem = Form.Item;
interface DemoState {
    showModal?: boolean;
    showModal2?: boolean;
	name?:string;
}
class Demo9 extends Component <{}, DemoState> {
    constructor(props:{}) {
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

	handleChange = (state:string) => (value:string) => {
	    this.setState({
	        [state]: value
	    })
	}

	render() {
	    let content = (
	        <Form>
	            <FormItem name="用户名">
	                <Input
	                    value={this.state.name}
	                    onChange={this.handleChange('name')}
	                />
	            </FormItem>
	        </Form>
	    );
	    return (
	        <div className="demo-margin">
	            <Button
	                bordered
	                onClick={this.open}
	            >
					打开模态框
	            </Button>
	            <Modal
	                visible={this.state.showModal}
	                onCancel={this.close}
	                enforceFocus={false}
	                size='sm'
	            >
	                <span>
						在模态框中打开气泡组件，如果气泡组件中有文本框，文本框光标不会聚焦。需在modal中设置enforceFocus为false。
	                </span>
	                <div className="demoPadding">
	                    <Popconfirm trigger="click" placement="right" overlayClassName="demo9-popconfirm"
	                        content={content}>
	                        <Button style={{marginTop: 6}} bordered>打开气泡组件</Button>
	                    </Popconfirm>
	                </div>
	            </Modal>
	        </div>
	    )
	}
}


export default Demo9;
