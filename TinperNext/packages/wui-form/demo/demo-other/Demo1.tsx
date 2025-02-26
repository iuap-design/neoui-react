/**
 *
 * @title FormItem使用Tooltip
 * @description 默认及自定义Icon
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
                    <Form labelWrap>
                        <Form.Item {...formItemLayout} label='混元一气上方太乙金仙美猴王齐天大圣斗战胜佛孙悟空' name='name' colon tooltip={'混元一气上方太乙金仙美猴王齐天大圣斗战胜佛孙悟空'}>
                            <Input placeholder='我的label会换行哦'/>
                        </Form.Item>
                    </Form>
                    <Form.Item {...formItemLayout} label='混元一气上方太乙金仙美猴王齐天大圣斗战胜佛孙悟空' name='name' colon tooltip={{title: '混元一气上方太乙金仙美猴王齐天大圣斗战胜佛孙悟空', icon: <Icon type="uf-filter" />}}>
                        <Input placeholder='这是个直肠子label'/>
                    </Form.Item>
                    <Form.Item {...formItemLayout} label='住址' name='address' colon tooltip={{ title: '自定义图标', icon: <Icon title='' type="uf-earth" /> }}>
                        <Input placeholder='请输入地址'/>
                    </Form.Item>
                </>
            )
        }
    }
)

export default Demo1
