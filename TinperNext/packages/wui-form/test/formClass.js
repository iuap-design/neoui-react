/**
 *
 * @title 默认的模态框
 * @description
 *
 */

import React, {Component} from 'react';
import Button from '../../wui-button/src';
import Input from '../../wui-input/src';
import Form from '../src/index';

// const DemoForm = Form.createForm()(
class DemoForm extends Component {
    constructor(props) {
        super(props);
    }

	onFinish = (values) => {
	    console.log('Received values of form: ', values);
	};

	render() {
	    const {validateTrigger = "onChange", rules = [], ...props} = this.props;
	    return (

	        <Form {...props}>
	            <Form.Item
	                label="用户名"
	                name="username"
	                validateTrigger={validateTrigger}
	                rules={rules}
	            >
	                <Input/>
	            </Form.Item>
	            <Form.Item>
	                <Button colors="primary" htmlType="submit" className="login">
						登录
	                </Button>
	            </Form.Item>

	        </Form>
	    )
	}
}

// )
export default DemoForm;
