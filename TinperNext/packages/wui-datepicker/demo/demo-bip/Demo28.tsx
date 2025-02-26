/**
 *
 * @title 每周第一天
 * @description 默认取工作台首选项配置，非必要请勿自行配置
 *
 */

import React, {Component} from 'react';
import {Button, DatePicker, Radio} from '@tinper/next-ui';
import type {DatePickerProps} from '@tinper/next-ui';
import moment from 'moment';
import type {Moment} from 'moment';

const {RangePicker} = DatePicker;

class Demo28 extends Component<{}, {dow: DatePickerProps['weekStartsOn']}> {
    bRef: Button | null = null;

    constructor(props: {}) {
        super(props);
        this.state = {
            dow: 1
        };
    }

    handleDowChange = (value: any) => {
        console.log('bRef: dow------', value, this.bRef);
        this.setState({
            dow: value as DatePickerProps['weekStartsOn']
        });
    };

    onChange = (d: Moment, dateString: string) => {
        console.warn('change--->', d, dateString, moment().localeData().firstDayOfWeek());
    };

    render() {
        const {dow} = this.state;
        return (
            <div className='demo12'>
                <div style={{display: 'flex', alignItems: 'center', marginBottom: 20}}>
                    <Radio.Group style={{marginRight: 20}} selectedValue={dow} onChange={this.handleDowChange}>
                        <Radio.Button value={1}>周一</Radio.Button>
                        <Radio.Button value={6}>周六</Radio.Button>
                        <Radio.Button value={7}>周日</Radio.Button>
                    </Radio.Group>
                </div>
                <DatePicker value='2023-03-03' weekStartsOn={dow} onChange={this.onChange} />

                <RangePicker value={['2023-03-03', '2023-08-08']} weekStartsOn={dow} />

                <Button type='primary' ref={ref => (this.bRef = ref)}>
                    按钮
                </Button>
            </div>
        );
    }
}

export default Demo28;
