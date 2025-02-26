/**
 *
 * @title 预设日期
 * @description 可以传入预设的日期快捷选项。
 */

import type { DatePickerProps } from '@tinper/next-ui'
import { Col, DatePicker, Row } from '@tinper/next-ui'
import moment from 'moment'
import React, { Component } from 'react'

interface DemoState {
    value: DatePickerProps['value']
    activePresetKey: string;
}

moment.locale('zh-cn')

class Demo7 extends Component<{}, DemoState> {
    constructor(props: {}) {
        super(props)
        this.state = {
            value: null,
            activePresetKey: 'today',
        }
    }

    /**
     * @param label 触发快捷日期文本
     * @param value 日期
     * @param key 快捷键的key
     */
    handlePresetChange: DatePickerProps['onPresetChange'] = (label, value, key) => {
        console.log(label, value, key)
        this.setState({value, activePresetKey: key})
    }

    render() {
        const {value, activePresetKey} = this.state
        return (
            <Row gutter={[10, 10]}>
                <Col md={6}>
                    <DatePicker
                        allowClear
                        activePresetKey={activePresetKey}
                        value={value}
                        onPresetChange={this.handlePresetChange}
                        showToday
                        showTime
                        use12Hours
                        presets={[
                            {
                                label: '今天',
                                key: 'today',
                                value: moment().startOf('day'),
                            },
                            'oneWeekLater',
                            {
                                label: '三年后', // 内置值仅传入key即可，自定义值需传入{label, key, value}对象
                                key: 'threeYearsLater',
                                value: moment().startOf('day').add(3, 'y'),
                            },
                        ]}
                    />
                </Col>
            </Row>
        )
    }
}

export default Demo7
