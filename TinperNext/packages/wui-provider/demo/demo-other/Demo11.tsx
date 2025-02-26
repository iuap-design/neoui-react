/**
 *
 * @title 全局配置首选项格式
 * @description 支持全局或局部配置日期/时间组件格式并转换为输入框、面板配置
 *
 */

import {ConfigProvider, DatePicker, TimePicker} from '@tinper/next-ui'
import React, {Component} from 'react'
import moment from 'moment'

const {MonthPicker, RangePicker, YearPicker, WeekPicker} = DatePicker

class Demo11 extends Component<{}, any> {
    render() {
        // 配置dataFormat并的三个可选参数dateTimeFormat, dateFormat, timeFormat三个日期时间格式
        ConfigProvider.config({
            dataFormat: {dateTimeFormat: 'yyyy-MM-dd hh:mm:ss tt', dateFormat: 'YYYY.MM.DD', timeFormat: 'hh:mm a'}
        })

        return (
            <div className='demo1'>
                <ConfigProvider>
                    <DatePicker showTime={{showSecond: false}} />
                    <RangePicker showTime={{showSecond: false}} />
                    年历：
                    <YearPicker defaultValue={moment().format('YYYY')} />
                    月历：
                    <MonthPicker />
                    周历：
                    <WeekPicker />
                    <TimePicker />
                </ConfigProvider>
            </div>
        )
    }
}

export default Demo11
