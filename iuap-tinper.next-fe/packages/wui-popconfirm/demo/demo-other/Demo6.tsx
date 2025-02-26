/**
 *
 * @title getPopupContainer
 * @description getPopupContainer可以修改渲染节点
 * @type other
 * demo6
 */

import {Button, Icon, Popconfirm} from '@tinper/next-ui'
import React, {Component} from 'react'

class Demo6 extends Component {
    cancel = () => {
        console.log('cancel')
    }

    close = () => {
        console.log('close')
    }

    render() {
        const content = '您喜欢使用tinper-next组件库吗？'
        return (
            <div className='demoPadding demoPadding6'>
                <Popconfirm
                    trigger='click'
                    placement='right'
                    content={content}
                    showCancel={false}
                    // disabled
                    icon={<Icon type='uf-star' />}
                    onCancel={this.cancel}
                    onClose={this.close}
                    getPopupContainer={() => document.querySelector('.demoPadding6')}
                >
                    <Button colors='primary'>Popconfirm</Button>
                </Popconfirm>
            </div>
        )
    }
}

export default Demo6
