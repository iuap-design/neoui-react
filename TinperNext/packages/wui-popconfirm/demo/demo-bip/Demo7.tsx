/**
 *
 * @title 禁止点击 Popconfirm 子元素时弹出确认框
 * @type bip
 * demo7
 */

import {Button, Popconfirm} from '@tinper/next-ui'
import React, {Component} from 'react'

class Demo7 extends Component {
    render() {
        const content = '您喜欢使用tinper-next组件库吗？'
        return (
            <div className='demoPadding'>
                <Popconfirm trigger='click' placement='right' content={content} disabled>
                    <Button colors='primary'>禁用</Button>
                </Popconfirm>
            </div>
        )
    }
}

export default Demo7
