/**
 *
 * @title 单个FormItem布局
 * @description 使用FormItem
 */
import {Form, Input} from '@tinper/next-ui'
import React, {Component} from 'react'

const formItemLayout = {
    labelCol: {
        xs: {span: 4},
        sm: {span: 4}
    },
    wrapperCol: {
        xs: {span: 8},
        sm: {span: 8}
    }
}
const Demo1 = Form.createForm()(
    class Demo extends Component {

        render() {
            return (
                <Form.Item {...formItemLayout} label='姓名' name='name' colon>
                    <Input placeholder='请输入姓名'/>
                </Form.Item>
            )
        }
    }
)

export default Demo1
