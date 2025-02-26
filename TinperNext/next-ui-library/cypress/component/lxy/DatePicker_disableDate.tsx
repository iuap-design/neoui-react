/**
 *
 * @title 不可选择日期和时间
 * @description 可用 disabledDate 和 disabledTime 分别禁止选择部分日期和时间，其中 disabledTime 需要和 showTime 一起使用。
 */

import {DatePicker} from '@tinper/next-ui'
import moment from 'moment'
import React, {Component} from 'react'
import type {Moment} from 'moment'

const style = {marginLeft: 20, marginTop: 10, marginBottom: 300, width: '80%'}

function range(start: number, end: number) {
    const result: number[] = []
    for (let i = start; i < end; i++) {
        result.push(i)
    }
    return result
}

function disabledDate(current: Moment) {
    // Can not select days before today and today
    return current && current < moment('2022-09-23').endOf('day')
}

function disabledYear(current: Moment) {
    // Can not select days before year and year
    return current && current < moment('2022-09-23').endOf('year')
}

function disabledDateTime() {
    return {
        disabledHours: () => range(0, 24).splice(4, 20),
        disabledMinutes: () => range(30, 60),
        disabledSeconds: () => [55, 56]
    }
}

type ModeType = 'date' | 'month' | 'year'

const modeArr: [ModeType, ModeType][] = [
    ['date', 'date'],
    ['month', 'month'],
    ['year', 'year']
]

interface DemoState {
    index: number
    mode: [ModeType, ModeType]
}

class Demo5 extends Component<{}, DemoState> {
    constructor(props: {}) {
        super(props)
        this.state = {
            index: 1,
            mode: modeArr[0]
        }
    }

    changeMode = () => {
        this.setState({
            index: this.state.index + 1,
            mode: modeArr[(this.state.index + 1) % 3]
        })
    }

    render() {
        return (
            <div className='demo3'>
                <DatePicker
                    style={style}
                    open
                    allowClear={false}
                    disabledDate={disabledDate}
                    defaultPickerValue={moment('2022-09-23')}
                    placeholder='选择日期'
                />
                <DatePicker
                    style={style}
                    open
                    placeholder='选择日期时间'
                    format='YYYY-MM-DD HH:mm:ss'
                    disabledDate={disabledDate}
                    disabledTime={disabledDateTime}
                    defaultPickerValue={moment('2022-09-23')}
                    showTime={{
                        format: 'HH点mm',
                        showSecond: false,
                        use12Hours: true,
                        minuteStep: 5,
                        hideDisabledOptions: false
                    }}
                />
                <DatePicker
                    style={style}
                    picker='week'
                    open
                    allowClear={false}
                    disabledDate={disabledDate}
                    defaultPickerValue={moment('2022-09-23')}
                    placeholder='选择周'
                />
                <DatePicker
                    style={style}
                    picker='month'
                    open
                    allowClear={false}
                    disabledDate={disabledDate}
                    defaultPickerValue={moment('2022-09-23')}
                    placeholder='选择月份'
                />
                <DatePicker
                    style={style}
                    picker='quarter'
                    open
                    allowClear={false}
                    disabledDate={disabledDate}
                    defaultPickerValue={moment('2022-09-23')}
                    placeholder='选择季度'
                />
                <DatePicker
                    style={style}
                    picker='year'
                    open
                    placeholder='选择年'
                    format='YYYY'
                    disabledDate={disabledYear}
                    defaultPickerValue={moment('2022-11-23')}
                />
            </div>
        )
    }
}

export default Demo5
