/**
 * @title 不可用状态
 * @description 添加 disabled 属性即可让输入框处于不可用状态
 */

import {Input} from '@tinper/next-ui'
import React, {Component} from 'react'

export default class Demo1 extends Component {
    render() {
        return (
            <div className='demo7'>
                <Input
                    disabled
                    value='test'
                    style={{marginTop: '10px', width: '200px'}}
                />
            </div>
        )
    }
}
