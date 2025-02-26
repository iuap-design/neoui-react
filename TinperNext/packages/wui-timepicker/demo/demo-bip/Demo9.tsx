/**
 * @title 下划线模式
 * @description 设置bordered='bottom'
 */

import {TimePicker} from '@tinper/next-ui'
import moment from 'moment'
import React, {Component} from 'react'
import type {Moment} from 'moment'

class Demo9 extends Component {
    onChange(time: Moment, timeString: string) {
        console.log(time, timeString)
    }

    render() {
        const format = 'h:mm a'
        const now = moment().hour(0).minute(0)
        return (
            <div>
                <TimePicker
                    bordered={false}
                    fieldid='demo2_fieldid'
                    format={format}
                    showSecond={false}
                    defaultValue={now}
                    placeholder='无边框'
                    onChange={this.onChange}
                    use12Hours
                    allowClear
                    locale='en'
                    renderExtraFooter={() => (<>我是额外的页脚</>)}
                />
                <TimePicker
                    bordered='bottom'
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

export default Demo9