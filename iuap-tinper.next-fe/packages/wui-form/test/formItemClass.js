/**
 *
 * @title 默认的模态框
 * @description
 *
 */

import React, {Component} from 'react';
import Input from '../../wui-input/src';
import Form from '../src/index';

class DemoFormItem extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <Form.Item name="username" {...this.props}>
                <Input/>
            </Form.Item>
        )
    }
}

export default DemoFormItem;
