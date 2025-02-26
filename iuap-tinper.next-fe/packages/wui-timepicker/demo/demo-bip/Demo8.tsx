/**
 *
 * @title 不同size
 * @description 设置不同尺寸时间
 *
 */

import {TimePicker} from '@tinper/next-ui'
import React, {Component} from 'react'

class Demo8 extends Component {
    render() {
        return (
            <div style={{display: 'grid', gridTemplateColumns: 'repeat(1, 1fr)', gridGap: '10px'}}>
                <TimePicker />

                <TimePicker size='xs' placeholder='请选择时间' />

                <TimePicker size='sm' placeholder='请选择时间' />

                <TimePicker size='md' placeholder='请选择时间' />

                <TimePicker size='nm' placeholder='请选择时间' />

                <TimePicker size='lg' placeholder='请选择时间' popupClassName='test222' className='test111' />
            </div>
        )
    }
}

export default Demo8
