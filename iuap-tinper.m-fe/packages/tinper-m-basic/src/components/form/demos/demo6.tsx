/**
 * @title 控制只看必填项、控制收起展开
 * @description BIP特殊场景示例
 * @compact true
 */
import React, { useState } from 'react'
import { Form, Input, Radio, Switch, DateTimePicker, Accordion, Icon } from '@tinper/m'
import '@tinper/m-icons/lib/iconfont/iconfont.js'
import './demo6.less'

export default () => {
    const [checked, setChecked] = useState(false)
    const [more, setMore] = useState(true)

    const selectData = [
        { value: 1, text: '物料' },
        { value: 2, text: '设备' },
        { value: 3, text: '服务' },
        { value: 4, text: '外包' },
    ]

    const selectData1 = [
        { value: 1, text: '销售部' },
        { value: 2, text: '技术部' },
        { value: 3, text: '采购部' },
        { value: 4, text: '生产部' },
        { value: 5, text: '质管部' }
    ]

    const handleOk = (date: Date) => {
        console.log(`dateTimePicker ok: ${date}`)
    }
    const handleClose = () => {
        console.log(`dateTimePicker close`)
    }

    const handleChange = (checked: boolean) => {
        setChecked(checked)
    }

    const handleClick = () => {
        setMore(!more)
    }

    const title = (
        <span>
            标题
            <span className='sub-title'>副标题说明文案</span>
        </span>
    )
    return (
        <>
            <div className="demo6-form">
                <div className="form-required-switch">
                    <span>只看必填项</span>
                    <Switch onChange={handleChange} />
                </div>
                <Accordion defaultActiveKey={['1']} className="demo6-accordion">
                    <Accordion.Panel key='1' title={title}>
                        <Form
                            layout='horizontal'
                            className="demo6-form-1"
                            initialValues={{
                                a: '李三四'
                            }}
                        >
                            <Form.Item label='申请人' name='a' required>
                                <Input placeholder='请输入' />
                            </Form.Item>
                            <Form.Item label='申请类型' name='b' required>
                                <Radio.Control mandatorySelection dataSource={selectData} label='单选框' mode='list' showCloseButton title="申请类型" placeholder='请选择'>
                                </Radio.Control>
                            </Form.Item>
                            <Form.Item label='申请日期' name='c' required>
                                <DateTimePicker
                                    placeholder="请选择日期时间"
                                    defaultValue="2023-08-10"
                                    onOk={handleOk}
                                    onDismiss={handleClose}
                                />
                            </Form.Item>
                            <Form.Item label='申请部门' name='d' required>
                                <Radio.Control mandatorySelection dataSource={selectData1} label='单选框' mode='list' showCloseButton title="申请部门" placeholder='请选择'>
                                </Radio.Control>
                            </Form.Item>
                            <Form.Item label='开票时间' name='e' hidden={checked}>
                                <DateTimePicker
                                    use12Hours
                                    placeholder="请选择日期时间"
                                    defaultValue="2021-08-10 12:00:00"
                                    mode="second"
                                />
                            </Form.Item>
                            <Form.Item label='开票供应商' name='f' hidden={checked}>
                                <Input placeholder='请输入' />
                            </Form.Item>
                        </Form>
                    </Accordion.Panel>
                </Accordion>
            </div>

            <h3>控制收起展开</h3>
            <div className="demo7-form">
                <Form
                    layout='horizontal'
                    className="demo6-form-1"
                    initialValues={{
                        aa: '李三四'
                    }}
                >
                    <Form.Item label='申请人' name='aa'>
                        <Input placeholder='请输入' />
                    </Form.Item>
                    <Form.Item label='申请类型' name='bb'>
                        <Radio.Control mandatorySelection dataSource={selectData} label='单选框' mode='list' showCloseButton title="申请类型" placeholder='请选择'>
                        </Radio.Control>
                    </Form.Item>
                    <Form.Item label='申请日期' name='cc'>
                        <DateTimePicker
                            placeholder="请选择日期时间"
                            onOk={handleOk}
                            defaultValue="2023-08-10"
                            onDismiss={handleClose}
                        />
                    </Form.Item>
                    <Form.Item label='申请部门' name='dd' hidden={!more}>
                        <Radio.Control mandatorySelection dataSource={selectData1} label='单选框' mode='list' showCloseButton title="申请部门" placeholder='请选择'>
                        </Radio.Control>
                    </Form.Item>
                    <Form.Item label='开票时间' name='ee' hidden={!more}>
                        <DateTimePicker
                            use12Hours
                            placeholder="请选择日期时间"
                            mode="second"
                            defaultValue="2021-08-10 12:00:00"
                        />
                    </Form.Item>
                </Form>
                <div onClick={handleClick} className='more'>
                    <span>{more ? '收起更多' : '查看更多'}</span>
                    {more ? <Icon type='arcchevron-up' /> : <Icon type='arcchevron-down' />}
                </div>
            </div>
        </>

    )
}
