/**
 *
 * @title 此刻快捷选项
 * @description 设置 `showNow` 显示此刻按钮。
 *
 */

import {TimePicker} from '@tinper/next-ui'
import moment from 'moment'
import React, {Component} from 'react'
import type {Moment} from 'moment'

class Demo7 extends Component {
    onChange(time: Moment, timeString: string) {
        console.log(time, timeString)
    }

    render() {
        const format = 'h:mm a'
        const now = moment().hour(0).minute(0)
        return (
            <div>
                <TimePicker
                    className='test111'
                    popupClassName='test222'
                    fieldid='demo7_fieldid'
                    format={format}
                    defaultValue={now}
                    placeholder='选择时间'
                    onChange={this.onChange}
                    use12Hours
                    allowClear
                    showNow
                    renderExtraFooter={() => (<>我是额外的页脚</>)}
                />
            </div>
        )
    }
}

export default Demo7
