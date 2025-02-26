/**
 * @title 不同size
 * @description size=xs/sm/md/nm/lg
 **/

import {Select} from '@tinper/next-ui'
import React, {Component} from 'react'

const Option = Select.Option

const ComponentChildren: React.ReactNode[] = []
for (let i = 10; i < 36; i++) {
    ComponentChildren.push(<Option key={i.toString(36) + i}>{i.toString(36) + i}</Option>)
}

class Demo20 extends Component {
    render() {
        return (
            <div style={{display: 'grid', gridTemplateColumns: 'repeat(1, 1fr)', gridGap: '10px'}}>
                <Select size='xs' placeholder='请选择' maxTagCount='auto'>
                    {ComponentChildren}
                </Select>
                <Select size='sm' placeholder='请选择'>
                    {ComponentChildren}
                </Select>
                <Select size='md' placeholder='请选择' maxTagCount='auto'>
                    {ComponentChildren}
                </Select>
                <Select size='nm' placeholder='请选择'>
                    {ComponentChildren}
                </Select>
                <Select size='lg' placeholder='请选择' maxTagCount='auto'>
                    {ComponentChildren}
                </Select>

                <Select placeholder='请选择' maxTagCount='auto'>
                    {ComponentChildren}
                </Select>
                <Select placeholder='请选择'>{ComponentChildren}</Select>
            </div>
        )
    }
}

export default Demo20
