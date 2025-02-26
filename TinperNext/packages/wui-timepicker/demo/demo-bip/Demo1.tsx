/**
 *
 * @title 基本时间选择
 * @description 点击 Timepicker，然后可以在浮层中选择或者输入某一时间。
 *
 */
import { Icon, TimePicker } from '@tinper/next-ui';
import type { Moment } from 'moment';
import moment from "moment";
import React, { Component } from 'react';

class Demo1 extends Component<{}, {}> {
    onChange(time: Moment, timeString: string) {
        console.log(time, timeString);
    }

    render() {
        return (
            <div>
                <TimePicker id='123' placeholder='选择时间' use12Hours format='h:mm' onChange={this.onChange} />
                <TimePicker requiredStyle autoFocus use12Hours value={moment()} suffixIcon={<Icon type="uf-qq" />} popupClassName='abc123' />
                <TimePicker requiredStyle disabled use12Hours value={moment()} suffixIcon={<Icon type="uf-qq" />} popupClassName='abc123' />
                <TimePicker requiredStyle bordered='bottom' use12Hours value={moment()} suffixIcon={<Icon type="uf-qq" />} popupClassName='abc123' />
                <TimePicker requiredStyle disabled bordered='bottom' use12Hours value={moment()} suffixIcon={<Icon type="uf-qq" />} popupClassName='abc123' />
            </div>
        );
    }
}

export default Demo1;
