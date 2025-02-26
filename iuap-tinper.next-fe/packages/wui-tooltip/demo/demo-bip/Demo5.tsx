/**
 * @title Tooltip的children禁用
 * @description 按钮禁用时的提示
 */

import {Button, Tooltip, Tag} from '@tinper/next-ui'
import React, {Component} from 'react'

class Demo5 extends Component {
    render() {
        const style = {margin: '10px 30px'}
        const tip = <div>这是一个很强的提醒</div>

        return (
            <div className='demo-tooltip'>
                <Tooltip arrowPointAtCenter inverse overlay={tip}>
                    <Button disabled style={style}>
                        Button禁用
                    </Button>
                </Tooltip>

                <Tooltip arrowPointAtCenter inverse overlay={tip}>
                    <Tag disabled style={style}>
                        Tag禁用
                    </Tag>
                </Tooltip>

                <Tooltip arrowPointAtCenter inverse overlay={tip}>
                    <button disabled style={style}>
                        原生button元素禁用
                    </button>
                </Tooltip>
            </div>
        )
    }
}

export default Demo5
