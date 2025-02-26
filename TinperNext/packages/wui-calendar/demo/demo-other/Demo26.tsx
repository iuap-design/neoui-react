/**
 *
 * @title 时区
 * @description 通过 `timezone` 字段设置 UTC 时区时间。
 *
 */

import {Calendar, ConfigProvider} from '@tinper/next-ui';
import {Moment} from 'moment';
import React, {Component} from 'react';

function onSelect(value: Moment) {
    console.log(value.format('YYYY-MM-DD HH:mm'));
}

class Demo26 extends Component {
    onChange = (value: Moment) => {
        console.log('onChange', value);
        console.log(value.format('YYYY-MM-DD HH:mm'));
    };

    render() {
        return (
            <ConfigProvider timezone="America/New_York">
                <Calendar
                    style={{margin: 10}}
                    fullscreen={false}
                    onSelect={onSelect}
                    onChange={this.onChange}
                    fieldid='demo'
                />
            </ConfigProvider>
        );
    }
}

export default Demo26;
