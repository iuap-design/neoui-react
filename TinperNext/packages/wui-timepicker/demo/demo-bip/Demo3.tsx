/**
 *
 * @title 限定时间
 * @description 点击 Timepicker，然后可以在浮层中选择或者输入某一时间。
 *
 */

import {TimePicker} from '@tinper/next-ui';
import moment from 'moment';
import React, {Component} from 'react';
import type {Moment} from 'moment'

const showSecond = true;
const str = showSecond ? 'HH:mm:ss' : 'HH:mm';

class Demo3 extends Component {

    onChange(value: Moment) {
        console.log(value && value.format(str));
    }

    generateOptions(length: number, excludedOptions: number[]) {
        const arr = [];
        for (let value = 0; value < length; value++) {
            if (excludedOptions.indexOf(value) < 0) {
                arr.push(value);
            }
        }
        return arr;
    }

    disabledHours() {
        return [0, 1, 2, 3, 4, 5, 6, 7, 8, 22, 23];
    }

    disabledMinutes(h: number) {
        switch (h) {
            case 9:
                return this.generateOptions(60, [30]);
            case 21:
                return this.generateOptions(60, [0]);
            default:
                return this.generateOptions(60, [0, 30]);
        }
    }

    disabledSeconds(h: number, m: number) {
        return [h + m % 60];
    }

    render() {
        const now = moment().hour(0).minute(0);
        return (
            <div>
                <TimePicker
                    placement='topRight'
                    showSecond={showSecond}
                    defaultValue={now}
                    onChange={this.onChange.bind(this)}
                    disabledHours={this.disabledHours}
                    disabledMinutes={this.disabledMinutes.bind(this)}
                    disabledSeconds={this.disabledSeconds.bind(this)}
                />
            </div>
        )
    }
}

export default Demo3;
