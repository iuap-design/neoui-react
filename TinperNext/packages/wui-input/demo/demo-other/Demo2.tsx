/**
 * @title 无边框模式
 * @description 设置bordered=false
 */

import {Input} from '@tinper/next-ui'
import React, {Component} from 'react'

export default class Demo2 extends Component<{}, {value: string}> {
    constructor(props: {}) {
        super(props)
        this.state = {
            value: 'test'
        }
    }

    onChange = (v: string, e: React.ChangeEvent<HTMLInputElement>) => {
        console.log('v: --------- ', v, e)
        this.setState({value: v})
    }
    onBlur = (v: string) => {
        console.log(v)
    }

    render() {
        return (
            <div
                className='demo2'
                style={{display: 'grid', gridTemplateColumns: 'repeat(1, minmax(200px, 1fr))', gridGap: '10px'}}
            >
                <Input value={this.state.value} onChange={this.onChange} bordered={false} align='right' />

                <Input value={this.state.value} onChange={this.onChange} bordered={false} allowClear />

                <Input value={this.state.value} onChange={this.onChange} bordered={false} size='xs' allowClear />

                <Input
                    value={this.state.value}
                    onChange={this.onChange}
                    bordered={false}
                    size='xs'
                    allowClear
                    type='search'
                />

                <Input
                    value={this.state.value}
                    onChange={this.onChange}
                    bordered={false}
                    size='xs'
                    allowClear
                    type='password'
                />

                <Input value={this.state.value} onChange={this.onChange} bordered={false} size='xs' />

                <Input value={this.state.value} onChange={this.onChange} bordered={false} size='xs' type='search' />

                <Input value={this.state.value} onChange={this.onChange} bordered={false} size='xs' type='password' />

                <Input value={this.state.value} onChange={this.onChange} bordered={false} size='xs' suffix='元' />

                <Input value={this.state.value} onChange={this.onChange} bordered={false} size='sm' suffix='元' />

                <Input value={this.state.value} onChange={this.onChange} bordered={false} allowClear suffix='元' />

                <Input value={this.state.value} onChange={this.onChange} bordered={false} size='nm' suffix='元' />

                <Input
                    value={this.state.value}
                    onChange={this.onChange}
                    allowClear
                    suffix='元'
                    bordered={false}
                    size='lg'
                />

                <Input
                    allowClear
                    defaultValue={0}
                    maxLength={5}
                    value={this.state.value}
                    onChange={this.onChange}
                    bordered={false}
                />

                <Input value={this.state.value} onChange={this.onChange} bordered={false} size='nm' allowClear />

                <Input value={this.state.value} onChange={this.onChange} bordered={false} size='lg' allowClear />
            </div>
        )
    }
}
