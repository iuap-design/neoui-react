/**
 *
 * @title 时区
 * @description 通过 `timezone` 字段设置时区Asia/Shanghai。注意：使用 UTC 或者时区时间，传值的时候要用 timestamp 或者 Date 对象，使用字符串不能表示唯一时间，会造成困扰。对于传入的字符串时间，我们默认为Asia/Shanghai时区而非系统时区的时间。
 */
import React, {useState} from 'react';
import {DatePicker, Space, ConfigProvider} from '@tinper/next-ui';

const defaultValue = '2022-02-22 08:30';
const defaultRangeValue = ['2022-1-22 08:30', '2022-2-22 8:30'];

function Demo27() {
    const [value] = useState(defaultValue as any);
    const [rangeValue] = useState(defaultRangeValue as any);

    return (
        <Space direction='vertical'>
            <Space>
                <DatePicker
                    showTime
                    timezone="Asia/Tokyo"
                    value={value}
                    onChange={(v1: any, v2: any) => console.log('change--------', v1, v2)}
                />
                <DatePicker.RangePicker
                    showTime
                    timezone="America/Los_Angeles"
                    value={rangeValue as any}
                    onChange={(v1: any, v2: any) => console.log('change--------rangeValue--', v1, v2)}
                />
                <ConfigProvider timezone="America/New_York">
                    <DatePicker
                        showTime
                        value={value}
                        onChange={(v1: any, v2: any) => console.log('change------provider--', v1, v2)}
                    />
                </ConfigProvider>
            </Space>
        </Space>
    );
}

export default Demo27;
