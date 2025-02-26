/**
 *
 * @title 不同size
 * @description 不同尺寸的数字输入框
 * @type bip
 */

import {InputNumber} from '@tinper/next-ui'
import React, {Component} from 'react'

const style = {margin: '10px', width: '80%'}

class Demo2 extends Component {
    render() {
        return (
            <div style={{display: 'grid', gridTemplateColumns: 'repeat(2, minmax(100px, 1fr))'}}>
                <InputNumber style={style} iconStyle='one' size='xs' placeholder='demo2xs' />
                <InputNumber style={style} size='xs' placeholder='demo2xs' />
                <InputNumber style={style} iconStyle='one' size='sm' autoFocus value='123' placeholder='demo2sm' />
                <InputNumber style={style} size='sm' placeholder='demo2sm' />
                <InputNumber style={style} iconStyle='one' />
                <InputNumber style={style} />
                <InputNumber style={style} iconStyle='one' size='nm' disabled />
                <InputNumber style={style} size='nm' disabled />
                <InputNumber style={style} iconStyle='one' size='lg' />
                <InputNumber style={style} size='lg' />
            </div>
        )
    }
}

export default Demo2
