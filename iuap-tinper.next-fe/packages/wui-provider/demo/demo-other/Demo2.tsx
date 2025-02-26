/**
 *
 * @title 全局配置size
 * @description 全局配置组件size
 *
 */

import {
    Button,
    ConfigProvider,
    Cascader,
    DatePicker,
    Form,
    Input,
    InputNumber,
    Select,
    TimePicker,
    Radio,
    Space
} from '@tinper/next-ui'
import React, {Component} from 'react'

const {TextArea, Password, Search} = Input
const {Item} = Form

interface ProviderState {
    size: string
}
class Demo2 extends Component<{}, ProviderState> {
    bRef: Button | null = null

    constructor(props: {}) {
        super(props)
        this.state = {
            size: 'lg'
        }
    }

    handleSizeChange = (value: string) => {
        console.log(value)
        console.log('bRef:', this.bRef)
        this.setState({
            size: value
        })
    }

    render() {
        const {size} = this.state
        return (
            <div className='demo2'>
                <div style={{display: 'flex', alignItems: 'center', marginBottom: 20}}>
                    <Radio.Group style={{marginRight: 20}} selectedValue={size} onChange={this.handleSizeChange}>
                        <Radio.Button value='xs'>超小</Radio.Button>
                        <Radio.Button value='sm'>小</Radio.Button>
                        <Radio.Button value='md'>默认</Radio.Button>
                        <Radio.Button value='nm'>中</Radio.Button>
                        <Radio.Button value='lg'>大</Radio.Button>
                    </Radio.Group>
                </div>

                <ConfigProvider componentSize={size}>
                    <Space size={[0, 16]} style={{width: '100%'}} direction='vertical'>
                        <Form>
                            <Item label='级联菜单'>
                                <Cascader />
                            </Item>
                            <Item label='下拉框'>
                                <Select value={123}></Select>
                            </Item>
                            <Item label='日期'>
                                <DatePicker />
                            </Item>
                            <Item label='日期范围'>
                                <DatePicker picker='range' />
                            </Item>
                            <Item label='时间输入框'>
                                <TimePicker />
                            </Item>
                            <Item label='输入框'>
                                <Input />
                            </Item>
                            <Item label='搜索框'>
                                <Search />
                            </Item>
                            <Item label='搜索框(确认按钮)'>
                                <Search enterButton='搜索' />
                            </Item>
                            <Item label='密码框'>
                                <Password />
                            </Item>
                            <Item label='数字输入框'>
                                <InputNumber />
                            </Item>
                            <Item label='文本输入框'>
                                <TextArea />
                            </Item>
                        </Form>

                        <Button type='primary' ref={ref => (this.bRef = ref)}>
                            按钮
                        </Button>
                    </Space>
                </ConfigProvider>
            </div>
        )
    }
}

export default Demo2
