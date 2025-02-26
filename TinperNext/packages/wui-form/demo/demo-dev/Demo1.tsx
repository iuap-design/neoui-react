/**
 *
 * @title 单个FormItem布局
 * @description 使用Tooltip
 */
import {Form, Input, Icon} from '@tinper/next-ui'
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
                <>
                    <Form.Item {...formItemLayout} label='姓名' name='name' colon tooltip={'支持汉字和英文'}>
                        <Input placeholder='请输入姓名'/>
                    </Form.Item>
                    <Form.Item {...formItemLayout} label='住址' name='address' colon tooltip={{ title: '自定义图标', icon: <Icon title='' type="uf-earth" /> }}>
                        <Input placeholder='请输入姓名'/>
                    </Form.Item>
                </>
            )
        }
    }
)

export default Demo1
