/**
 *
 * @title 配合form使用
 * @description 各类型组件配合form使用，注意事项
 */

import {Button, DatePicker, Form, Row, Col} from '@tinper/next-ui'
import moment from 'moment'
import React, {Component} from 'react'
import type {Moment} from 'moment'

const {RangePicker} = DatePicker

interface DemoState {
    flag: false
    initialValues: Record<string, any>
    lastSelectDate: Moment | null
    ranges: Record<string, any>
}

class Demo11 extends Component<{}, DemoState> {
    private formRef: any
    constructor(props: {}) {
        super(props)
        this.formRef = null
        this.state = {
            // 如果初始值需要接口返回，则需要在组件初始化之前，获得初始值。 这里模拟设置初始值
            flag: false,
            initialValues: {
                date: '2019-02-03',
                dateTime: '2009-10-11 12:13:14',
                month: moment('2019-12'),
                year: moment('2019'),
                week: moment('2019-45', 'GGGG-WW'),
                range: ['2019-11-12', moment('2019-12-13')]
            },
            lastSelectDate: null,
            ranges: [
                {
                    label: '至过去',
                    key: 'toPast',
                    value: [undefined, moment().startOf('day')] // allowEmpty[0]=true
                },
                {
                    label: <span>至未来222</span>,
                    key: 'toFuture',
                    value: [moment().startOf('day'), null] // allowEmpty[1]=true
                },
                {
                    label: '今天',
                    key: 'today',
                    value: () => [moment().startOf('day'), moment().endOf('day')]
                },
                {
                    label: '本周',
                    key: 'currentWeek',
                    value: () => [moment().startOf('week'), moment().endOf('week')]
                },
                {
                    label: '本月',
                    key: 'currentMonth',
                    value: [moment().startOf('month'), moment().endOf('month')]
                }
            ]
        }
    }

    submit = () => {
        this.formRef
            .validateFields()
            .then((val: any) => {
                console.log(val)
            })
            .catch((err: any) => {
                console.log(err)
            })
    }

    change = () => {
        this.formRef.setFieldsValue({
            date: '2011-12-03',
            dateTime: '2009-11-11 12:13:14',
            month: moment('2011-11'),
            year: moment('2011'),
            week: moment('2011-45', 'GGGG-WW'),
            presetRange: [null, '2123-04-05'],
            range: [moment('2011-11-12'), '2011-12-13']
        })
    }

    handleChange = (value: Moment) => {
        console.log('handleChange---------', value?.format('YYYY-MM-DD'))
    }

    handleSelect = (date: Moment) => {
        const initRanges = this.state.ranges
        if (date) {
            this.setState({
                lastSelectDate: date,
                // 至过去、至未来自定义为用户选择的日期至过去、未来
                ranges: initRanges.map((range: { label: string; key: string; value: any[]; }) => {
                    let {label, key, value} = range
                    if (key === 'toPast') {
                        value = [undefined, date.startOf('day')]
                    } else if (key === 'toFuture') {
                        value = [date.startOf('day'), undefined]
                    }
                    return {label, key, value}
                })
            })
        }
    }

    changeVal = (changedValues: {dateTime: Moment}) => {
        if (changedValues.dateTime) {
            this.setState({
                initialValues: Object.assign(this.state.initialValues, {dateTime: changedValues.dateTime})
            })
        }
    }
    reset = () => {
        // 此方法将所有元素还原到 initialValue
        this.formRef.resetFields()
    }

    render() {
        return (
            <Form ref={ref => (this.formRef = ref)} onValuesChange={this.changeVal}>
                <Row gutter={[10, 10]}>
                    <Col span={6}>
                        <Form.Item name='dateTime' initialValue={this.state.initialValues.dateTime}>
                            <DatePicker showTime format='YYYY-MM-DD HH:mm:ss' />
                        </Form.Item>
                    </Col>

                    <Col span={4}>
                        <Form.Item name='date' initialValue={this.state.initialValues.date}>
                            <DatePicker format='YYYY-MM-DD' onChange={this.handleChange} />
                        </Form.Item>
                    </Col>

                    <Col span={4}>
                        <Form.Item name='month' initialValue={this.state.initialValues.month}>
                            <DatePicker picker='month' format='YYYY-MM' />
                        </Form.Item>
                    </Col>

                    <Col span={4}>
                        <Form.Item name='year' initialValue={this.state.initialValues.year}>
                            <DatePicker picker='year' format='YYYY' />
                        </Form.Item>
                    </Col>

                    <Col span={4}>
                        <Form.Item name='week' initialValue={this.state.initialValues.week}>
                            <DatePicker picker='week' format='GGGG-WW' />
                        </Form.Item>
                    </Col>

                    <Col span={6}>
                        <Form.Item name='range' initialValue={this.state.initialValues.range}>
                            <RangePicker format='YYYY-MM-DD' />
                        </Form.Item>
                    </Col>

                    <Col span={6}>
                        <Form.Item name='presetRange'>
                            <RangePicker
                                allowClear
                                allowEmpty={[true, true]}
                                ranges={this.state.ranges} // 快捷选项
                                onSelect={this.handleSelect}
                            />
                        </Form.Item>
                    </Col>
                </Row>

                <Button.Group>
                    <Button onClick={this.change}>改变初始值</Button>
                    <Button onClick={this.submit}>获得所有值</Button>
                    <Button onClick={this.reset}>还原所有值</Button>
                </Button.Group>
            </Form>
        )
    }
}

export default Form.createForm()(Demo11)
