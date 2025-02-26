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
                    content={content}
                    color='dark'
                    visible
                >
                    <Button colors='primary' style={{margin: 'auto 10px'}}>
						黑色
                    </Button>
                </Popconfirm>
                <br />
                <Popconfirm
                    trigger='click'
                    rootClose
                    placement='bottom'
                    content={content}
                    visible
                >
                    <Button colors='primary' style={{marginTop: 300}}>
						点击其他关闭
                    </Button>
                </Popconfirm>
            </div>
        )
    }
}

export default Demo2