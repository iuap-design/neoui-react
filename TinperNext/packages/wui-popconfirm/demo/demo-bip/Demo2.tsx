/**
 *
 * @title 不同颜色气泡确认框
 * @description 气泡确认框提供黑和白两种颜色，并且支持是否能被全局点击事件关闭。
 * @type other
 * demo2
 */

import {Button, Popconfirm} from '@tinper/next-ui'
import React, {Component} from 'react'

class Demo2 extends Component {
    render() {
        const content = '您喜欢使用tinper-next组件库吗？'
        return (
            <div className='demoPadding'>
                <Popconfirm
                    trigger='click'
                    placement='right'
                    content={<div style={{color: '#fff'}}>您喜欢使用tinper-next组件库吗？</div>}
                    color='dark'
                >
                    <Button colors='primary' style={{margin: 'auto 10px'}}>
						黑色
                    </Button>
                </Popconfirm>
                <Popconfirm
                    trigger='click'
                    rootClose
                    placement='bottom'
                    content={content}
                >
                    <Button colors='primary' style={{margin: 'auto 10px'}}>
						点击其他关闭
                    </Button>
                </Popconfirm>
            </div>
        )
    }
}

export default Demo2
