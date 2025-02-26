/**
 * @title 下划线模式
 * @description 设置bordered='bottom'
 */

import { Input } from '@tinper/next-ui'
import React, { Component } from 'react'

export default class Demo1 extends Component<{}, {value: string}> {
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
                className='demo1'
                style={{display: 'grid', gridTemplateColumns: 'repeat(1, minmax(200px, 1fr))', gridGap: '10px'}}
            >
                <Input requiredStyle bordered={false} size='xs' allowClear placeholder='无边框' />

                <Input requiredStyle value={this.state.value} onChange={this.onChange} bordered='bottom' size='xs' allowClear />

                <Input requiredStyle disabled
                    value='禁用'
                    onChange={this.onChange}
                    bordered='bottom'
                    size='xs'
                    allowClear
                    type='search'
                />

                <Input
                    value={this.state.value}
                    onChange={this.onChange}
                    bordered='bottom'
                    size='xs'
                    allowClear
                    type='password'
                />

                <Input readOnly value={this.state.value} onChange={this.onChange} bordered='bottom' size='xs' />

                <Input requiredStyle value={this.state.value} onChange={this.onChange} bordered='bottom' size='xs' type='search' />

                <Input requiredStyle value={this.state.value} onChange={this.onChange} bordered='bottom' size='xs' type='password' />

                <Input requiredStyle value={this.state.value} onChange={this.onChange} bordered='bottom' size='xs' suffix='元' />

                <Input requiredStyle value={this.state.value} onChange={this.onChange} bordered='bottom' size='sm' suffix='元' />

                <Input requiredStyle value={this.state.value} onChange={this.onChange} bordered='bottom' allowClear suffix='元' />

                <Input requiredStyle value={this.state.value} onChange={this.onChange} bordered='bottom' size='nm' suffix='元' />

                <Input requiredStyle
                    value={this.state.value}
                    onChange={this.onChange}
                    allowClear
                    suffix='元'
                    bordered='bottom'
                    size='lg'
                />

                <Input requiredStyle
                    allowClear
                    defaultValue={0}
                    maxLength={5}
                    value={this.state.value}
                    onChange={this.onChange}
                    bordered='bottom'
                />

                <Input requiredStyle value={this.state.value} onChange={this.onChange} bordered='bottom' size='nm' allowClear />

                <Input value={this.state.value} onChange={this.onChange} bordered='bottom' size='lg' allowClear />
            </div>
        )
    }
}
