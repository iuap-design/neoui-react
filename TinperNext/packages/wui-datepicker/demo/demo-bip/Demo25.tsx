/**
 *
 * @title 不同size
 * @description 不同尺寸日期输入框，size=xs/sm/md/nm/lg
 */

import {DatePicker} from '@tinper/next-ui'
import React, {Component} from 'react'

const {RangePicker} = DatePicker

class Demo25 extends Component {
    render() {
        return (
            <div style={{display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gridGap: '10px'}}>
                <DatePicker />
                <RangePicker />

                <DatePicker size='xs' />
                <RangePicker size='xs' />

                <DatePicker size='sm' />
                <RangePicker size='sm' />

                <DatePicker size='md' />
                <RangePicker size='md' />

                <DatePicker size='nm' />
                <RangePicker size='nm' />

                <DatePicker size='lg' />
                <RangePicker size='lg' />
            </div>
        )
    }
}

export default Demo25
