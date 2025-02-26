/**
 *
 * @title 12小时制时间选择及多语
 * @description 设置 `use12Hours` 使用 12 小时制的时间选择器，默认的 format 为 h:mm:ss a。
 *
 */

import {TimePicker} from '@tinper/next-ui'
import moment from 'moment'
import React, {Component} from 'react'
import type {Moment} from 'moment'

class Demo2 extends Component {
    onChange(time: Moment, timeString: string) {
        console.log(time, timeString)
    }

    render() {
        const format = 'h:mm a'
        const now = moment().hour(0).minute(0)
        return (
            <div>
                <TimePicker
                    fieldid='demo2_fieldid'
                    format={format}
                    showSecond={false}
                    defaultValue={now}
                    placeholder='选择时间'
                    onChange={this.onChange}
                    use12Hours
                    allowClear
                    locale='en'
                />
            </div>
        )
    }
}

export default Demo2
