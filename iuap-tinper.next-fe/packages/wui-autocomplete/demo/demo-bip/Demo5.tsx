/**
 *
 * @title 不同size
 * @description 设置不同尺寸时间
 *
 */

import {AutoComplete} from '@tinper/next-ui'
import React, {Component} from 'react'

interface DemoState {
    options: string[]
    placeholder: string
}

class Demo5 extends Component<{}, DemoState> {
    constructor(props: {}) {
        super(props)
        this.state = {
            options: ['10000', '10001', '10002', '11000', '12010'],
            placeholder: '查找关键字,请输入1'
        }
    }

    render() {
        let {options, placeholder} = this.state
        return (
            <div style={{display: 'grid', gridTemplateColumns: 'repeat(1, 1fr)', gridGap: '10px'}}>
                <AutoComplete options={options} placeholder={placeholder} />

                <AutoComplete options={options} placeholder={placeholder} size='xs' />

                <AutoComplete options={options} placeholder={placeholder} size='sm' />

                <AutoComplete options={options} placeholder={placeholder} size='md' />

                <AutoComplete options={options} placeholder={placeholder} size='nm' />

                <AutoComplete options={options} placeholder={placeholder} size='lg' className='test111' />
            </div>
        )
    }
}

export default Demo5
