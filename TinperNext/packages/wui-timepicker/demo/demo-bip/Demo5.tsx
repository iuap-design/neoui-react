/**
 *
 * @title 时分秒部分不展示
 * @description 输入部分值即可
 *
 */

import {TimePicker} from '@tinper/next-ui'
import React, {Component} from 'react'
import type {Moment} from 'moment'

class Demo5 extends Component {
    onChange = (time: Moment) => {
        console.log(time)
    }

    render() {
        return (
            <div id={'box'}>
                <div style={{padding: '10px'}}>
                    <div>
                        <b>显示时分秒</b>
                    </div>
                    <TimePicker placeholder='选择时间' onChange={this.onChange} />
                </div>
                <div style={{padding: '10px'}}>
                    <div>
                        <b>显示时+分</b>
                    </div>
                    <TimePicker showSecond={false} placeholder='选择时间' onChange={this.onChange} />
                </div>
                <div style={{padding: '10px'}}>
                    <div>
                        <b>显示分+秒</b>
                    </div>
                    <TimePicker showHour={false} placeholder='选择时间' onChange={this.onChange} />
                </div>
                <div style={{padding: '10px'}}>
                    <div>
                        <b>只显示时或分或秒</b>
                    </div>
                    <TimePicker showMinute={false} showSecond={false} placeholder='只显示时' onChange={this.onChange} />
                    <TimePicker showHour={false} showSecond={false} placeholder='只显示分' onChange={this.onChange} />
                    <TimePicker showHour={false} showMinute={false} placeholder='只显示秒' onChange={this.onChange} />
                </div>
            </div>
        )
    }
}

export default Demo5
