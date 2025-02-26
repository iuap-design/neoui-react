/**
 *
 * @title 不可选择日期和时间
 * @description 可用 disabledDate 和 disabledTime 分别禁止选择部分日期和时间，其中 disabledTime 需要和 showTime 一起使用。
 */

import { Button, DatePicker, RangePickerProps, Row, Col } from '@tinper/next-ui';
import moment from 'moment';
import React, { Component } from 'react';
import type { Moment } from 'moment';

const { RangePicker } = DatePicker;

function range(start: number, end: number) {
    const result: number[] = [];
    for (let i = start; i < end; i++) {
        result.push(i);
    }
    return result;
}

// 只能选 今天 ~ 后天 的日期
function disabledDate(current: Moment) {
    // Can not select days before today or 2 days later
    return current && (current < moment().startOf('day') || current > moment().add(2, 'day').endOf('day'));
}

function disabledYear(current: Moment) {
    // Can not select days before year and year
    return current && current > moment().endOf('year');
}

function disabledDateTime() {
    return {
        disabledHours: () => range(0, 24).splice(4, 20),
        disabledMinutes: () => range(30, 60),
        disabledSeconds: () => [55, 56]
    };
}

function disabledRangeTime(_: any, type: string) {
    if (type === 'start') {
        return {
            disabledHours: () => range(0, 60).splice(4, 20),
            disabledMinutes: () => range(30, 60),
            disabledSeconds: () => [55, 56]
        };
    }
    return {
        disabledHours: () => range(0, 60).splice(20, 4),
        disabledMinutes: () => range(0, 31),
        disabledSeconds: () => [55, 56]
    };
}

// 只能选 今天8点 ~ 后天17点 的日期时间范围：disabledDate + disabledTime
function disabledCustomRangeTime(date: Moment) {
    // console.log('disabledCustomRangeTime: ', type, date);
    if (date?.isSame(moment(), 'day')) { // 今天
        return {
            disabledHours: () => range(0, 8) // 禁用8点前
        }
    }
    if (date?.isSame(moment().add(2, 'day'), 'day')) { // 后天
        return {
            disabledHours: () => range(17, 24) // 禁用17点后
        }
    }
    return {}
}

function getIsValid(value: Moment | null, type = 'hour') {
    if (!value) return null
    const hours = disabledCustomRangeTime(value).disabledHours?.()
    const isDisabled = hours?.includes(value.get(type as any))
    return !isDisabled ? value : null
}

type ModeType = 'date' | 'month' | 'year';

const modeArr: [ModeType, ModeType][] = [
    ['date', 'date'],
    ['month', 'month'],
    ['year', 'year']
];

interface DemoState {
    index: number;
    mode: [ModeType, ModeType];
    rangeValue: RangePickerProps['value'];
}

class Demo5 extends Component<{}, DemoState> {
    constructor(props: {}) {
        super(props);
        this.state = {
            index: 1,
            mode: modeArr[0],
            rangeValue: undefined
        };
    }

    changeMode = () => {
        this.setState({
            index: this.state.index + 1,
            mode: modeArr[(this.state.index + 1) % 3]
        });
    };

    handleChangeDate: RangePickerProps['onChange'] = (value) => {
        if (value?.length === 2) {
            const [start, end] = value
            const rangeValue = [getIsValid(start), getIsValid(end)] as RangePickerProps['value']
            this.setState({
                rangeValue
            })
        }
    }

    render() {
        return (
            <div className='demo5'>
                <Row className='demo5-item' gutter={[10, 10]}>
                    <Col md={6}>
                        <DatePicker
                            placeholder='选择日期'
                            value={'2022-11-11'}
                            disabledDateValid={false}
                            disabledDate={disabledDate}
                            disabledTime={disabledDateTime}
                        />
                    </Col>
                    <Col md={6}>
                        <DatePicker
                            placeholder='选择日期时间'
                            format='YYYY-MM-DD HH:mm:ss'
                            value={'2022-11-11'}
                            disabledDateValid={false}
                            disabledDate={disabledDate}
                            disabledTime={disabledDateTime}
                            showTime={{
                                format: 'HH点mm',
                                showSecond: false,
                                use12Hours: true,
                                minuteStep: 5,
                                hideDisabledOptions: false
                            }}
                        />
                    </Col>
                    <Col md={6}>
                        <DatePicker
                            picker='week'
                            allowClear={false}
                            disabledDate={disabledDate}
                            placeholder='选择星期'
                        />
                    </Col>
                    <Col md={6}>
                        <DatePicker
                            picker='month'
                            allowClear={false}
                            disabledDate={disabledDate}
                            placeholder='选择月份'
                        />
                    </Col>
                    <Col md={6}>
                        <DatePicker
                            picker='quarter'
                            allowClear={false}
                            disabledDate={disabledDate}
                            placeholder='选择季度'
                        />
                    </Col>
                    <Col md={6}>
                        <DatePicker
                            picker='halfYear'
                            allowClear={false}
                            disabledDate={disabledDate}
                            placeholder='选择半年'
                        />
                    </Col>
                    <Col md={6}>
                        <DatePicker
                            picker='year'
                            placeholder='选择年'
                            format='YYYY'
                            disabledDate={disabledYear}
                            showTime={{ defaultValue: moment().format('YYYY') }}
                        />
                    </Col>
                    <Col md={6}>
                        <RangePicker
                            locale='zh-cn'
                            showToday
                            placeholder={['开始', '结束']}
                            disabledTime={disabledRangeTime}
                            mode={this.state.mode}
                            format='YYYY-MM-DD HH:mm:ss'
                            showTime={{ defaultValue: moment('00:00:00', 'HH:mm:ss') }}
                        />
                    </Col>
                    <Col md={6}>
                        <RangePicker
                            locale='zh-cn'
                            showToday
                            placeholder={['开始', '结束']}
                            disabled={[true, false]}
                            value={[moment(), moment().add(1, 'days')]}
                            mode={this.state.mode}
                            format='YYYY-MM-DD HH:mm:ss'
                            showTime={{ defaultValue: moment('00:00:00', 'HH:mm:ss') }}
                        />
                    </Col>
                    <Col md={12}>
                        <RangePicker
                            showTime
                            disabledDate={disabledDate}
                            disabledTime={disabledCustomRangeTime}
                            value={this.state.rangeValue}
                            onChange={this.handleChangeDate}
                        />
                        <div>只能选 今天8点 ~ 后天17点 的日期时间范围：disabledDate + disabledTime</div>
                    </Col>
                    <Col md={4}>
                        <Button onClick={this.changeMode}>点击切换不同mode</Button>
                    </Col>
                </Row>
            </div>
        );
    }
}

export default Demo5;
